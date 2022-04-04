import React from 'react';

export default function VideoDemoButton(props) {
  const {href, text} = props;

  const transformUrl = h => {
    let start = h.indexOf('&');
    let end = h.indexOf('#');
    if (start === -1) {
      start = end;
    }
    return h.substr(0, start) + h.substr(end) + h.substr(start, end - start);
  }

  const handleClick = (e) => {
    e.preventDefault();
    let a = document.createElement("a");
    a.href = transformUrl(e.target.href);
    a.target="_blank";
    a.click();

  };

  return (
    <a href={href} onClick={handleClick}>{text}</a>
  );
}
