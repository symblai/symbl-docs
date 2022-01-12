/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, {useEffect, memo, useMemo} from 'react';
import { useLocation } from 'react-router-dom'
import clsx from 'clsx';
import {
  usePrevious,
  Collapsible,
  useCollapsible,
  findFirstCategoryLink,
  ThemeClassNames,
  isSamePath,
  useTOCHighlight,
  useThemeConfig
} from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import {translate} from '@docusaurus/Translate';
import IconExternalLink from '@theme/IconExternalLink';
import styles from './styles.module.css';
import useIsBrowser from '@docusaurus/useIsBrowser'; // Optimize sidebar at each "level"
// TODO this item should probably not receive the "activePath" props
// TODO this triggers whole sidebar re-renders on navigation

/* These consts are for useTOCHighlight function */
const LINK_CLASS_NAME = 'menu__link';
const ACTIVE_LINK_CLASS_NAME = 'menu__link--active';
const TOP_OFFSET = 100;

const isActiveSidebarItem = (item, activePath) => {
  if (item.type === 'link') {
    if (item.customProps &&  item.customProps.hash) {
      const location = useLocation();
      return item.href + item.customProps.hash === location.pathname + location.hash;
    } else {
      return isSamePath(item.href, activePath);
    }
  }

  if (item.type === 'category') {
    return item.items.some((subItem) =>
      isActiveSidebarItem(subItem, activePath),
    );
  }

  return false;
};

export const DocSidebarItems = memo(({items, ...props}) => (
  <>
    {items.map((item, index) => (
      <DocSidebarItem
        key={index} // sidebar is static, the index does not change
        item={item}
        {...props}
      />
    ))}
  </>
));
export default function DocSidebarItem({item, ...props}) {
  switch (item.type) {
    case 'category':
      if (item.items.length === 0) {
        return null;
      }

      return <DocSidebarItemCategory item={item} {...props} />;

    case 'link':
    default:
      return <DocSidebarItemLink item={item} {...props} />;
  }
} // If we navigate to a category and it becomes active, it should automatically expand itself

function useAutoExpandActiveCategory({isActive, collapsed, setCollapsed}) {
  const wasActive = usePrevious(isActive);
  useEffect(() => {
    const justBecameActive = isActive && !wasActive;

    if (justBecameActive && collapsed) {
      setCollapsed(false);
    }
  }, [isActive, wasActive, collapsed, setCollapsed]);
} // When a collapsible category has no link, we still link it to its first child during SSR as a temporary fallback
// This allows to be able to navigate inside the category even when JS fails to load, is delayed or simply disabled
// React hydration becomes an optional progressive enhancement
// see https://github.com/facebookincubator/infima/issues/36#issuecomment-772543188
// see https://github.com/facebook/docusaurus/issues/3030

function useCategoryHrefWithSSRFallback(item) {
  const isBrowser = useIsBrowser();
  return useMemo(() => {
    if (item.href) {
      return item.href;
    } // In these cases, it's not necessary to render a fallback
    // We skip the "findFirstCategoryLink" computation

    if (isBrowser || !item.collapsible) {
      return undefined;
    }

    return findFirstCategoryLink(item);
  }, [item, isBrowser]);
}

function DocSidebarItemCategory({
  item,
  onItemClick,
  activePath,
  level,
  ...props
}) {
  const {items, label, collapsible, className, href, customProps} = item;
  const realHref = customProps && customProps.hash ? `${href}${customProps.hash}` : href;
  const hrefWithSSRFallback = useCategoryHrefWithSSRFallback(item);
  const isActive = isActiveSidebarItem(item, activePath);
  const {collapsed, setCollapsed, toggleCollapsed} = useCollapsible({
    // active categories are always initialized as expanded
    // the default (item.collapsed) is only used for non-active categories
    initialState: () => {
      if (!collapsible) {
        return false;
      }

      return isActive ? false : item.collapsed;
    },
  });
  useAutoExpandActiveCategory({
    isActive,
    collapsed,
    setCollapsed,
  });
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemCategory,
        ThemeClassNames.docs.docSidebarItemCategoryLevel(level),
        'menu__list-item',
        {
          'menu__list-item--collapsed': collapsed,
        },
        className,
      )}>
      <div className="menu__list-item-collapsible">
        <Link
          className={clsx('menu__link', {
            'menu__link--sublist': collapsible && !href,
            'menu__link--active': isActive,
            [styles.menuLinkText]: !collapsible,
            [styles.hasHref]: !!hrefWithSSRFallback,
          })}
          onClick={
            collapsible
              ? (e) => {
                  onItemClick?.(item);

                  if (href) {
                    setCollapsed(false);
                  } else {
                    e.preventDefault();
                    toggleCollapsed();
                  }
                }
              : () => {
                  onItemClick?.(item);
                }
          }
          href={collapsible ? hrefWithSSRFallback ?? '#' : hrefWithSSRFallback}
          {...props}>
          {customProps && customProps.label ? customProps.label : label}
        </Link>
        {href && collapsible && (
          <button
            aria-label={translate(
              {
                id: 'theme.DocSidebarItem.toggleCollapsedCategoryAriaLabel',
                message: "Toggle the collapsible sidebar category '{label}'",
                description:
                  'The ARIA label to toggle the collapsible sidebar category',
              },
              {
                label,
              },
            )}
            type="button"
            className="clean-btn menu__caret"
            onClick={(e) => {
              e.preventDefault();
              toggleCollapsed();
            }}
          />
        )}
      </div>

      <Collapsible lazy as="ul" className="menu__list" collapsed={collapsed}>
        <DocSidebarItems
          items={items}
          tabIndex={collapsed ? -1 : 0}
          onItemClick={onItemClick}
          activePath={activePath}
          level={level + 1}
        />
      </Collapsible>
    </li>
  );
}

function DocSidebarItemLink({item, onItemClick, activePath, level, ...props}) {
  const {href, label, className, customProps} = item;
  const realHref = customProps && customProps.hash ? `${href}${customProps.hash}` : href;
  const isActive = isActiveSidebarItem(item, activePath);
  /* Changes active link on scroll */
  if (customProps && customProps.hash && isActive) {
    const themeConfig = useThemeConfig();
    const minHeadingLevel = themeConfig.tableOfContents.minHeadingLevel;
    const maxHeadingLevel = themeConfig.tableOfContents.maxHeadingLevel;
    useTOCHighlight({
      linkClassName: LINK_CLASS_NAME,
      linkActiveClassName: ACTIVE_LINK_CLASS_NAME,
      minHeadingLevel,
      maxHeadingLevel
    });
  }
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={customProps && customProps.label ? customProps.label : label}>
      <Link
        className={clsx('menu__link', {
          'menu__link--active': isActive,
        })}
        aria-current={isActive ? 'page' : undefined}
        to={realHref}
        {...(isInternalUrl(href) && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        {isInternalUrl(href) ? (
          customProps && customProps.label ? customProps.label : label
        ) : (
          <span>
            {customProps && customProps.label ? customProps.label : label}
            <IconExternalLink />
          </span>
        )}
      </Link>
    </li>
  );
}
