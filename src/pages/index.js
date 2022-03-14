import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import featureStyling from "../css/feature.module.css";
import sectionStyling from "../css/section.module.css";
import jumbotronStyling from "../css/jumbotron.module.css";
import flashcardStyling from "../css/flashy.module.css";

const api = [
  {
    title: <>Streaming API</>,
    description: (
      <>
        Symbl's Streaming API is based on the WebSocket protocol and can be used
        for real-time use-cases where both the audio and its results need to be
        available in real-time.
      </>
    ),
    urlRedirect: "streamingapi/introduction",
  },
  {
    title: <>Async API</>,
    description: (
      <>
        The Async API provides a REST interface that helps you to submit any
        recorded or saved conversations to Symbl.
      </>
    ),
    urlRedirect: "async-api/introduction",
  },
  {
    title: <>Trackers API</>,
    description: (
      <>
        Custom Trackers enable developers to easily detect unique insights from
        any conversation, such as keywords and phrases, intent, entity, and
        more, with a simple API.
      </>
    ),
    urlRedirect: "streamingapi/introduction",
  },
  {
    title: <>Conversation API</>,
    description: (
      <>
        The Conversation API provides a REST API interface for getting your
        processed Speech to Text data(also known as Transcripts) and
        Conversational Insights.
      </>
    ),
    urlRedirect: "conversation-api/introduction",
  },
  {
    title: <>Telephony API</>,
    description: (
      <>
        The Telephony API provides an interface for the developers to have Symbl
        bridge/join VoIP calls and get the results back in real-time as well.
      </>
    ),
    urlRedirect: "telephony/introduction",
  },
  {
    title: <>Experience API</>,
    description: (
      <>
        Experience API generates Summary/ Pre-Built UIs. As they Summary the
        entire conversation done by the user we refer to them as Summary UI or
        since their UI design is fixed we also call this Pre Built UI.
      </>
    ),
    urlRedirect: "api-reference/experience-api/post-text-summary-ui",
  },
];

const popularLinks = [
  {
    title: <>Symbl in a min!</>,
    imgPath: "img/play-video-logo.png",
    href: "",
  },
  {
    title: <>Use Cases</>,
    imgPath: "img/discussion.png",
    href: "",
  },
  {
    title: <>Handbook</>,
    imgPath: "img/discussion.png",
    href: "",
  },
  {
    title: <>APIs</>,
    imgPath: "img/api-logo.png",
    href: "",
  },
];

const useCases = [
  {
    title: <>Use case 1</>,
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Use case 2</>,
    description: (
      <>
        DocSearch understands your data, the user input, the context and sends
        back instantly a fine selection of your content available with less
        interactions than any other method.
      </>
    ),
  },
  {
    title: <>Use case 3</>,
    description: (
      <>
        With a design very close to the native experience on mobile, we leverage
        users acquaintance with the interaction patterns of each OS.
      </>
    ),
  },
];

const integrations = [
  {
    title: <>Symbl for Zoom</>,
    imgPath: "img/zoom-logo.png",
    description: (
      <>
        A sample app for enabling you to invite Symbl to your Zoom meetings by
        doing nothing more than simply copy and pasting the meeting invite in
        the app.
      </>
    ),
    urlRedirect: "https://github.com/symblai/symbl-for-zoom",
  },
  {
    title: <>Twilio Video React App</>,
    imgPath: "img/twilio-logo.png",
    description: (
      <>
        Built with Twilio's Video SDK and React.js, this Symbl app uses APIs to
        add calling features such as live transcription over a WebSocket
        connection for meetings or conferences.
      </>
    ),
    urlRedirect: "https://github.com/symblai/symbl-twilio-video-react",
  },
  {
    title: <>Amazon Chime App</>,
    imgPath: "img/amazon-chime-logo.png",
    description: (
      <>
        Symbl's voice connector for AWS Chime's Javascript SDK for adding fully
        programmable, continuous, conversation intelligence to your meetings,
        calls, or conferences.
      </>
    ),
    urlRedirect: "https://github.com/symblai/symbl-chime-adapter",
  },
  {
    title: <>Next.js</>,
    imgPath: "img/next-logo.png",
    description: (
      <>
        Conversation AI using Symbl API Demo app built with NextJS. Detect
        Topics of discussion, live transcriptions, real-time insights like
        action items, follow-ups and questions, and a lot more.
      </>
    ),
    urlRedirect: "https://github.com/symblai/nextjs-symblai-demo",
  },
  {
    title: <>Symbl-Agora Marketplace</>,
    imgPath: "img/agora-logo.svg",
    description: (
      <>
        This extension allows you to embed real-time conversation intelligence
        into your mobile application providing contextual analysis of
        conversation data along with speech recognition without any upfront data
        training requirements.
      </>
    ),
    urlRedirect: "https://docs.symbl.ai/docs/integrations/agora-sdk-plugin/",
  },
];

const builds = [
  {
    title: <>Revenue Intelligence</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Sales Intelligence</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Sales Enablement</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Call Quality Tool</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Option 5</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
  {
    title: <>Talk to us</>,
    imgPath: "img/discussion.png",
    description: (
      <>
        First built to fulfill our own developers' needs, DocSearch quickly
        evolved as a successful community project. Over the years, the project
        kept on adressing the complex challenge of search for the open source
        community.
      </>
    ),
  },
];

const labs = [
  {
    title: <>Comprehensive Action Items API</>,
    description: (
      <>
        Comprehensive Action Items API returns a rephrased form of the original
        action item message, that's enriched with its corresponding context.
      </>
    ),
    urlRedirect: "concepts/comprehensive-action-items",
  },
  {
    title: <>Abstract Topics</>,
    description: (
      <>
        Abstract Topics are topics that at a glance help you determine recurrent
        themes in a conversation.
      </>
    ),
    urlRedirect: "concepts/redaction-pii",
  },
  {
    title: <>PII and PCI Identification and Redaction</>,
    description: (
      <>
        Symbl provides the capability to identify and redact Personally
        Identifiable Information (PII) and Payment Card Industry data (PCI) data
        from conversations and insights it processes. Redaction of PII and PCI
        data is a process of concealing confidential information in messages and
        insights.
      </>
    ),
    urlRedirect: "guides/abstract-topics",
  },
];

const Jumbotron = () => {
  return (
    <section
      className={clsx(
        sectionStyling["section--inner"],
        sectionStyling["section--slim--accent"]
      )}
    >
      <div className={jumbotronStyling.jumbotron}>
        <h2
          className={clsx(
            sectionStyling.section__title,
            sectionStyling["section__title--jumbotron"],
            sectionStyling["section__title--accent"]
          )}
        >
          Welcome to Symbl Docs
        </h2>

        <p
          className={clsx(
            sectionStyling.section__subtitle,
            sectionStyling["section__subtitle--jumbotron"],
            sectionStyling["section__subtitle--accent"]
          )}
        >
          Natively integrate conversation intelligence into your voice or video
          applications without building machine learning models.
        </p>

        <div className={jumbotronStyling.jumbotron__cta}>
          <a
            className={clsx(styles.button, jumbotronStyling.jumbotron__link)}
            href='/docs/introduction'
            target='_blank'
          >
            Get Started..
          </a>
          <a
            className={clsx(styles.button, jumbotronStyling.jumbotron__link)}
            target='_blank'
            href='https://github.com/symblai/symbl-docs'
          >
            GitHub
          </a>
        </div>
      </div>

      <img
        className={styles.bannerImage}
        src={useBaseUrl("img/home_banner_img.png")}
      ></img>
    </section>
  );
};

const AboutSymbl = () => {
  return (
    <section
      className={clsx(
        sectionStyling["section--inner"],
        sectionStyling["section--slim--accent"]
      )}
    >
      <div>
        <h2 className={clsx(sectionStyling.section__title)}>This is Symbl</h2>
        <p className={clsx(sectionStyling.section__subtitle)}>
          Symbl is an AI-powered, API first, Conversation Intelligence platform
          for natural human conversations that works on audio, video, and
          textual content in real-time or recorded files. Symbl's APIs let you
          generate real-time Sentiment Analysis, Action Items, Jumbotronics,
          Trackers, Summary and much more in your applications.
        </p>
        <h2>Steps to use Symbl</h2>
        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          <a
            className={styles.stepsParagraph}
            href='developer-tools/authentication/'
            target='_blank'
          >
            <p className={featureStyling.feature__header}>
              Get API credentials
            </p>
          </a>
          <a
            className={styles.stepsParagraph}
            href='async-api/introduction'
            target='_blank'
          >
            <p className={featureStyling.feature__header}>Send Conversation</p>
          </a>
          <a
            className={styles.stepsParagraph}
            href='async-api/introduction'
            target='_blank'
          >
            <p className={featureStyling.feature__header}>
              Get Conversation Intelligence
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

const ApiContainer = () => (
  <section
    className={clsx(sectionStyling.section, sectionStyling["section--odd"])}
  >
    <div
      className={clsx(
        sectionStyling["section--inner"],
        sectionStyling["section--center"]
      )}
    >
      <h3
        className={clsx(
          sectionStyling.section__title,
          featureStyling["section__title--wide"],
          "text--center"
        )}
      >
        Explore our API's
      </h3>
      <p className={clsx("text--center")}>
        Easily build and deploy conversation intelligence in your speech, text
        or video driven applications with our AI, comprehensive suite of APIs
        and developer tools.
      </p>
      <div
        className={clsx(
          sectionStyling.section__footer,
          sectionStyling["section__footer--feature-cards"]
        )}
      >
        {api.map((props, idx) => (
          <a
            href={props.urlRedirect}
            className={clsx(featureStyling["feature--bg"])}
          >
            <h3 className={featureStyling.feature__header}>{props.title}</h3>
            <p className={featureStyling.feature__content}>
              {props.description}
            </p>
            <button className={featureStyling.feature__button}>
              Read more..
            </button>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const UseCaseContainer = () => {
  return (
    <section
      className={clsx(sectionStyling.section, sectionStyling["section--odd"])}
    >
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      >
        <h3
          className={clsx(
            sectionStyling.section__title,
            featureStyling["section__title--wide"],
            "text--center"
          )}
        >
          Explore some use cases
        </h3>
        <p className={clsx("text--center")}>
          This is a subtitle that will gel well with the title on Jumbotron
        </p>
        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          {useCases.map((props, idx) => (
            <a className={clsx(featureStyling["feature--bg"])}>
              <h3 className={featureStyling.feature__header}>{props.title}</h3>
              <p className={featureStyling.feature__content}>
                {props.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const BuildsContainer = () => {
  return (
    <section className={clsx(sectionStyling.section)}>
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      >
        <h3
          className={clsx(
            sectionStyling.section__title,
            featureStyling["section__title--wide"],
            "text--center"
          )}
        >
          What do you want to build?
        </h3>

        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          {builds.map((props, idx) => (
            <a className={clsx(featureStyling["feature--bg"])}>
              <img src={useBaseUrl(props.imgPath)}></img>
              <h3 className={featureStyling.feature__header}>{props.title}</h3>
              <p className={featureStyling.feature__content}>
                {props.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const LabsContainer = () => {
  return (
    <section className={clsx(sectionStyling.section)}>
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      >
        <h3
          className={clsx(
            sectionStyling.section__title,
            featureStyling["section__title--wide"],
            "text--center"
          )}
        >
          What's cooking in labs?
        </h3>
        <p className={clsx("text--center")}>
          Symbl Labs is our experimental wing designed to share our bleeding
          edge AI research on human conversations with anyone who wants to
          explore its limits.
        </p>
        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          {labs.map((props, idx) => (
            <a
              href={props.urlRedirect}
              target='_blank'
              className={clsx(featureStyling.feature)}
            >
              <h3 className={featureStyling.feature__header}>{props.title}</h3>
              <p className={featureStyling.feature__content}>
                {props.description}
              </p>
              <button className={featureStyling.feature__button}>
                Read more..
              </button>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const IntegrationContainer = () => {
  return (
    <section className={clsx(sectionStyling.section)}>
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      >
        <h3
          className={clsx(
            sectionStyling.section__title,
            featureStyling["section__title--wide"],
            "text--center"
          )}
        >
          Integration
        </h3>
        <p className={clsx("text--center")}>
          Symbl provides integrations with native applications and SDKs and
          supports Conversation Intelligence capabilities that suits your
          business requirement.
        </p>
        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          {integrations.map((props, idx) => (
            <a
              className={clsx(featureStyling["feature--bg"])}
              href={props.urlRedirect}
              target='_blank'
            >
              <img
                className={featureStyling.feature__image}
                src={useBaseUrl(props.imgPath)}
              ></img>
              <h3 className={featureStyling.feature__header}>{props.title}</h3>
              <p className={featureStyling.feature__content}>
                {props.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const PopularLinks = () => {
  return (
    <section
      className={clsx(sectionStyling.section, sectionStyling["section--odd"])}
    >
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      >
        <div
          className={clsx(
            sectionStyling.section__footer,
            sectionStyling["section__footer--feature-cards"]
          )}
        >
          {popularLinks.map((props, idx) => (
            <a
              className={clsx(
                flashcardStyling.flashy,
                flashcardStyling["flashy--primary"]
              )}
            >
              <img
                className={flashcardStyling.flashy__image}
                src={useBaseUrl(props.imgPath)}
              ></img>
              <h3 className={flashcardStyling.flashy__title}>{props.title}</h3>
              <p className={flashcardStyling.flashy__content}>
                {props.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const SymblSteps = () => {
  return (
    <section
      className={clsx(sectionStyling.section, sectionStyling["section--odd"])}
    >
      <div
        className={clsx(
          sectionStyling["section--inner"],
          sectionStyling["section--center"]
        )}
      ></div>
    </section>
  );
};

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Description will go into a meta tag in <head />'
    >
      <Jumbotron />
      <AboutSymbl />
      <SymblSteps />
      <PopularLinks />
      <IntegrationContainer />
      <ApiContainer />
      <BuildsContainer />
      <UseCaseContainer />
      <LabsContainer />
    </Layout>
  );
}

export default Home;
