import React from "react";
import Layout from "@theme/Layout";
import styles from "./glossary.module.css";

function Glossary() {
  const glossaryDictionary = {
    A: [
      {
        title:"Analytics",
        description:<>Provides an overview of speaker talk and silence ratios and words per minute.</>
      },
      {
        title:"Amazon S3",
        description:<>Amazon S3 or Amazon Simple Storage Service is a service offered by Amazon Web Services that provides object storage through a web service interface. It uses the same scalable storage infrastructure that Amazon.com uses to run its global e-commerce network.</>
      },
      {
        title: "API",
        description:<>Application Programming Interface. Enables different systems to interact with each other programmatically. Two types of APIs are REST APIs (web APIs) and native-library APIs.</>
      },
      {
        title: "Async Audio API",
        description:
          <>The Async Audio API allows you to process an audio file. It can be useful for any use case where you have access to recorded audio and want to extract insights and other conversational attributes supported by Symbl's Conversation API. To learn more, go <a href="https://docs.symbl.ai/docs/async-api/introduction/#audio-api">here</a></>,
      },
    ],
    B: [
      {
        title: "Binary Message",
        description:
          <>Binary WebSocket messages carry a binary payload. For the Real-time API, audio is transmitted to the service by using binary messages.</>
      },
      {
        title: "Body params",
        description:
          <>The body params/parameter is established in the operation's parameters section and include body schema that explains the body data type and structure. The data type is an object but can also be primitive (string or number) or an array.</>
      },
    ],
    C: [
      {
        title: "Channel Metadata",
        description:
          <>Channel metadata carries the data needed to communicate with the channel on which transmission is occurring on, for example, the chat or phone channels.</>
      },
      {
        title: "Client Messages",
        description:
          <>It describes the messages that originate from the client and are sent to service</>
      },
      {
        title: "Code Snippets",
        description:
          <>A code snippet is a small amount of code design to illustrate a specific purpose.For example if you have a problem with your code and you're asking for help. No one wants to see your whole application. They want you show them a Code Snippet which they can use to reproduce the problem.</>
      },
      {
        title: "Conversational Analytics",
        description:
          <>Conversational Analytics is an understanding of a conversation between two or more people to gain insights on the customer behavior. To learn more, go <a href = "https://docs.symbl.ai/docs/concepts/conversational-analytics/">here</a></>
      },
      {
        title: "Conversation group",
        description:
        <>A logical entity that defines a criteria to group conversations.</>
      },
      {
        title: "Conversation metadata",
        description:
        <>Additional data about the conversation that is relevant for customer’s use case or business.</>,
      },
      {
        title:"Cross-Origin resource sharing (CORS)",
        description:<>Cross-origin resource sharing (CORS) is a mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.</>
      },
      {
        title: "cURL",
        description:
        <>cURL(Client URL) is a computer software project providing a library and command-line tool for transferring data using various network protocols.</>
      },
    ],
    D: [
      {
        title: "DTMF Sequence",
        description:
        <>The DTMF sequence is the sequence of keys you press to connect to the conference call once you have dialed in.</>
      },
    ],
    E: [
      {
        title: "Endpoints",
        description:
        <>An endpoint is one end of a transmission channel. While an API interacts with another system, the touchpoints of this communication are regarded as endpoints. For APIs, an endpoint can comprise a URL of service or server. Each endpoint is where APIs can access the resources they need to carry out their function.</>
      },
      {
        title: "Error Codes",
        description:
        <>An error response message is returned in JSON format when an API request fails, even for endpoints that support other MIME types. The error response message includes error message itself, a description of the error, a unique error code for the endpoint, an HTTP response message, and an HTTP response code.</>
      },
    ],
    F: [],
    G: [
      {
        title:"Graphic User Interface",
        description:<>The graphical user interface is a form of user interface that allows users to interact with electronic devices through graphic icons and an audio indicator such as primary notation instead of text-based user interfaces, typed command labels, or text navigation.</>
      }
    ],
    H: [
      {
        title: "Handshake process",
        description:
        <>It is a process that is used in a TCP/IP network to make a connection link between the server and client. It requires both the client and server to exchange synchronization and acknowledgment packets before the data communication process begins.</>,
      },
      {
        title:"Header Parameters",
        description:<>Parameters entered in the request header, usually associated with authorization.</>
      },
      {
        title: "HTTP",
        description:
        <>A protocol utilized to request and send files, particularly webpages and webpage components, over the internet or another computer network.</>
      },
    ],
    I: [
      {
        title: "Insight Response",
        description:
        <>It contains the insights from the ongoing conversation as soon as they are available. This message does not contain any messages.</>
      },
    ],
    J: [
      {
        title: "JSON (JavaScript Object Notation)",
        description:
        <>JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.</>
      },
    ],
    K: [],
    L: [
      {
        title:"Localized Summary UI",
        description:<>The Localized Summary UI provides users a translated meeting summary page chosen based on one of eight currently supported languages chosen when a session is initiated.</>
      }
    ],
    M: [
      {
        title: "Management API",
        description:
          <>The Management API allows you to access and manage various resources against your Symbl account. The resources created and managed by this API is maintained at the account level.</>
      },
      {
        title: "Markdown",
        description:
        <>Markdown is a lightweight markup language for creating formatted text using a plain-text editor.</>
      },
      {
        title: "Message Response",
        description:
        "It contains the processed messages as soon as they're ready and available, in the processing of the continuous audio stream.",
      },
      {
        title: "Methods",
        description:
        <>A method is a process associated with a message and an object. This allows the sending objects to invoke behaviors and to delegate the implementation of those behaviors to the receiving object.</>
      },
      {
        title: "Mono Channel",
        description:
        <>Mono or monophonic audio describes a mix in which all sounds are mixed together into a single channel.</>
      },
    ],
    N: [
      {
        title: "Node.js",
        description:
        <>Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.</>
      },
      {
        title: "Name",
        description:
        <>The name acts as a unique identifier assigned to the Tracker. It is case-sensitive which means that a Tracker can be created with the same name but with different cases.</>
      },
    ],
    O: [],
    P: [
      {
        title:"Parameters",
        description:<>Parameters are the variable components of a resource. They decide the type of action you require to take on the resource. Each parameter has a name, value type, and optional description. In simple terms, parameters are options that can be passed with the endpoint to determine the response.</>
      },
      {
        title:"Path Parameters",
        description:<>Path parameters are variable parts of a URL path. They are typically used to point to a specific resource within a collection, such as a user identified by ID.</>
      },
      {
        title: "Personally Identifiable Information (PII)",
        description:
        <>Personal data, also known as personal information or personally identifiable information (PII), is any information related to an identifiable person.</>
      },
      {
        title: "PSTN (Public Switched Telephone Networks)",
        description:
        <>The PSTN is a network that carries your calls when you dial in from a landline or cell phone. It refers to the worldwide network of voice-carrying telephone infrastructure, including privately-owned and government-owned infrastructure. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/pstn-and-sip">here</a></>
      },
    ],
    Q: [
      {
        title:"Query Parameters",
        description:<>Query parameters are a fixed set of parameters added to the end of a URL. They are extensions of the URL that are adopted to help determine particular content or actions based on the data being transferred.</>
      }
    ],
    R: [
      {
        title:"Request Body",
        description:<>A request body is data transmitted by the client to your API.</>
      },
      {
        title:"Response",
        description:<>The response body consists of the resource data requested by the client.</>
      },
      {
        title:"REST API",
        description:<>Representational state transfer (REST) is a software architectural style that was created to guide the design and development of the architecture for the World Wide Web. REST defines a set of constraints for how the architecture of an Internet-scale distributed hypermedia system, such as the Web, should behave.</>
      }
    ],
    S: [
      {
        title: "Service Messages",
        description:
        <>It describes the messages that originate in Service and are sent to the client.</>
      },
      {
        title: "Software development kit (SDK)",
        description:
        <>A software development kit is a collection of software development tools in one installable package. They facilitate the creation of applications by having a compiler, debugger and perhaps a software framework. They are normally specific to a hardware platform and operating system combination.</>
      },
      {
        title: "Speech-To-Text",
        description:
        <>Symbl offers state-of-the-art Speech-to-Text capability (also called transcription). You can convert audio and video conversations into text in real-time or after the conversation has ended. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/speech-to-text/">here</a></>
      },
      {
        title: "Sentiment Analysis",
        description:
        <>Sentiment analysis is the use of natural language processing, text analysis, computational linguistics, and biometrics to systematically identify, extract, quantify, and study affective states and subjective information.</>
      },
      {
        title: "Speaker Diarisation",
        description: <>Speaker diarisation (or diarization) is the process of partitioning an input audio stream into homogeneous segments according to the speaker identity. It can enhance the readability of an automatic speech transcription by structuring the audio stream into speaker turns and, when used together with speaker recognition systems, by providing the speaker’s true identity. It is used to answer the question "who spoke when".</>
      },
      {
        title: "Speaker Separation",
        description: <>The Async Audio & Async Video APIs can detect and separate unique speakers in a single stream of audio & video without need of separate speaker events. To learn more, go <a href="https://docs.symbl.ai/docs/async-api/overview/speaker-separation/">here</a></>
      },
      {
        title: "Summary UI",
        description: <>The Summary UI provides users with a translated meeting summary page with transcript, attendees, topics, action items, follows ups, and more.</>
      },
      {
        title: "SIP (Session Initiation Protocol)",
        description:
          <>The SIP is a standardized communications protocol that has been widely adopted for managing multimedia communication sessions for voice and video calls. SIP may be used to establish connectivity between your communications infrastructures and Symbl's communications platform. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/pstn-and-sip/">here</a></>
      },
      {
        title: "SIP URI scheme",
        description:
          <>The SIP URI scheme is a Uniform Resource Identifier (URI) scheme for the Session Initiation Protocol (SIP) multimedia communications protocol. A SIP address is a URI that addresses a specific telephone extension on a voice over IP system.</>
      },
      {
        title: "SIP Trunking",
        description:
          <>SIP (Session Initiation Protocol) is a voice over Internet Protocol (VoIP) technology and streaming media service based on the Session Initiation Protocol (SIP) by which Internet telephony service providers (ITSPs) deliver telephone services and unified communications to customers equipped with SIP-based private branch exchange (IP-PBX) and unified communications facilities.</>
      },
      {
        title: "Speaker Event",
        description:
        <>The speaker event is associated with different individual attendees in the meeting or session.</>
      },
      {
        title: "SRT (SubRip file format)",
        description:
        <>SubRip is a free software program for Microsoft Windows which extracts subtitles and their timings from various video formats to a text file.</>
      },
      {
        title: "Summarization API",
        description:
        <>This API allows you to get a Summary of important contextual messages in a conversation. Symbl's Conversational Intelligence distills important conversation messages and creates succinct Summaries. Summaries helps you save time required to grasp the contents of a conversation. Using Summary API, you can create Summaries in real-time or after the conversation has ended. You can also create Summaries for chat or email messages. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/summarization/">here</a></>
      },
      {
        title: "Symbl Python SDK",
        description:
        <>The Symbl Python SDK allows you to add Conversational Intelligence directly into your web applications and meeting platforms. You can generate Speech-to-Text and get intelligent insights such as action items, topics and questions, etc. To learn more, go <a href="https://docs.symbl.ai/docs/python-sdk/overview/">here</a></>
      },
    ],
    T: [
      {
        title: "Text Message",
        description:
        <>Text Message is the serialized JSON message. Every text message has a type field to specify the type or the purpose of the message.</>
      },
      {
        title: "Topic Hierarchy",
        description:
        <>In any conversation, there can be multiple related topics that get discussed and it is possible to organize them in a hierarchy for better insights and consumption. Symbl's Topic Hierarchy algorithm finds a pattern in the conversation and creates parent (global) topics with each parent topic having multiple child topics nested within it. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/topic-hierarchy/">here</a></>
      },
      {
        title:"Topics with Sentiment Score",
        description:<>Hover your cursor around the Topics to get the Sentiment Score applicable to that Topic. The Sentiment Score can tell you if the Topics discussed were positive or negative in nature. Read more in the Sentiment Polarity section.</>
      },
      {
        title: "Trackers",
        description:
        <>Trackers allow you to track the occurrence of certain key words or phrases in a conversation so you can identify emerging trends and gauge the nature of interactions. You can define keywords or phrases in a Tracker and Symbl will return messages that contain the same or contextually similar phrases.To learn more, go <a href="https://docs.symbl.ai/docs/concepts/trackers/">here</a></>
      },
      {
        title: "Tracker.id",
        description:
          <>The id is the unique identifier of the Tracker entity being updated.</>
      },
      {
        title:"Trackers and Analytics UI",
        description:<>The Trackers and Analytics UI provides a waveform visualization with conversation insights. The waveform highlights Topics in the timeline using color coded timestamps allowing you to get a snapshot of when they occured in the course of the conversation. You can view Trackers with sentiment score, transcripts, speaker information, and other conversation insights described below.</>
      },
      {
        title: "Transcripts",
        description:
        <>A compliation of the word-to-word conversation converted by speech-to-text.</>
      },
    ],
    U: [],
    V: [
      {
        title: "Video API",
        description:
        <>The Async Video API allows you to process a video file. It can be useful in any use case where you have access to a video file of any type of conversation, and you want to extract the insightful items supported by the Conversation API. To learn more, go <a href="https://docs.symbl.ai/docs/async-api/introduction/#video-api">here</a></>
      },
      {
        title: "Video Summary UI",
        description:
          <>The Video Summary UI provides users the ability to interact with the Symbl elements(transcripts section, Insights, Filters) from an audio and video. It surfaces a screen where users can select key elements like topics, transcripts, and insights and the interface will surface the timestamp where this occurred and begin playback from there. To learn more, go <a href="https://docs.symbl.ai/docs/pre-built-ui/summary-ui/#video-summary-ui">here</a></>
      },
      {
        title: "VoIP",
        description:
        <>Voice over Internet Protocol (VoIP), also called IP telephony, is a method and group of technologies for the delivery of voice communications and multimedia sessions over Internet Protocol (IP) networks, such as the Internet.</>
      },
      {
        title: "Vocabulary",
        description:
        <>The vocabulary contains a set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts.</>
      },
    ],
    W: [
      {
        title:"Waveform Timeline",
        description:<>The waveform timeline consists of color coded timestamps to show when exactly a Topic was discussed in the conversation.</>
      },
      {
        title: "Webhook",
        description:
        <>A webhook in web development is a method of augmenting or altering the behavior of a web page or web application with custom callbacks. These callbacks may be maintained, modified, and managed by third-party users and developers who may not necessarily be affiliated with the originating website or application.</>
      },
      {
        title: "WebSocket",
        description:
        <>WebSockets are a thin transport layer built on top of a device’s TCP/IP stack that support the famous “full duplex” connection. To learn more, go <a href="https://docs.symbl.ai/docs/concepts/websockets/">here</a></>
      },
    ],
    X: [],
    Y: [],
    Z: [],
  };

  const createGlossaryIndex = () => {
    const rows = [];

    for (let alphabet in glossaryDictionary) {
      let goTo = `#${alphabet}`;
      let anchorClass =
        glossaryDictionary[alphabet].length == 0
          ? styles.disabledAlphabetAnchor
          : styles.alphabetAnchor;

      rows.push(
        <a key={alphabet} href={goTo} className={anchorClass}>
          {alphabet}
        </a>
      );
    }
    return rows;
  };

  const createGlossaryElement = () => {
    const rows = [];

    for (let alphabet in glossaryDictionary) {
      glossaryDictionary[alphabet].length != 0
        ? rows.push(
            <h1 id={alphabet} className={styles.alphabetHeader}>
              {alphabet}
            </h1>
          )
        : null;

      for (let i = 0; i < glossaryDictionary[alphabet].length; i++) {
        rows.push(
          <div className={styles.glossaryElement}>
            <h1 className={styles.glossaryElementTitle}>
              {glossaryDictionary[alphabet][i]["title"]}
            </h1>
            <p className={styles.glossaryElementDescription}>
              {glossaryDictionary[alphabet][i]["description"]}
            </p>
          </div>
        );
      }
    }
    return rows;
  };

  return (
    <Layout title='Glossary'>
      <div className={styles.glossaryIndex}>{createGlossaryIndex()}</div>
      <div>{createGlossaryElement()}</div>
    </Layout>
  );
}

export default Glossary;
