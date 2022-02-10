import React from "react";
import Layout from "@theme/Layout";
import styles from "./glossary.module.css";

function Glossary() {
  const glossaryDictionary = {
    A: [
      {
        title: "Action Item",
        description:
          "An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action like set up a meeting, share a file, complete a task, etc. Essentially, the action items provides you with the insights of ‘who has to do what, by when’. The definition of 'when' is optional for detecting action items. To learn more, go ",
        url: "https://docs.symbl.ai/docs/concepts/action-items/",
      },
      {
        title: "API Reference",
        description:
          "It’s a concise reference manual containing all the information required to work with the API, with details about the functions, classes, return types, arguments and more, supported by tutorials and examples.",
      },
      {},
    ],
    B: [
      {
        title: "Binary Message",
        description:
          "Binary WebSocket messages carry a binary payload. For the Real-time API, audio is transmitted to the service by using binary messages.",
      },
    ],
    C: [
      {
        title: "Client Messages",
        description:
          "It describes the messages that originate from the client and are sent to service",
      },
      {
        title: "Code Snippets",
        description:
          "A code snippet is a small amount of code design to illustrate a specific purpose.For example if you have a problem with your code and you're asking for help. No one wants to see your whole application. They want you show them a Code Snippet which they can use to reproduce the problem.",
      },
      {
        title: "Conversation APIs",
        description:
          "Conversation APIs are a collection of different APIs. When a conversation is processed through Symbl Input APIs (i.e. Async, Telephony or Streaming) we are given a unique ID called Conversation ID. And using this conversation ID you can ask Symbl Conversation API to give particular details of conversation. ",
      },
      {
        title: "Conversation ID",
        description:
          "When you process any conversation through Symbl whether it's from Async API, Javascript SDK, Python SDK, Telephony or Streaming API, you'll always receive a unique Conversation ID (conversationId), which consists of numerical digits.To learn more, go ",
        url: "https://docs.symbl.ai/docs/conversation-api/introduction/#whats-a-conversation-id",
      },
    ],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [
      {
        title: "Handshake process",
        description:
          "It is a process that is used in a TCP/IP network to make a connection link between the server and client. It requires both the client and server to exchange synchronization and acknowledgment packets before the data communication process begins.",
      },
      {
        title: "HTTP",
        description:
          "A protocol utilized to request and send files, particularly webpages and webpage components, over the internet or another computer network.",
      },
    ],
    I: [
      {
        title: "Insight Response",
        description:
          "It contains the insights from the ongoing conversation as soon as they are available. This message does not contain any messages.",
      },
    ],
    J: [
      {
        title: "JSON (JavaScript Object Notation)",
        description:
          "JSON is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays.",
      },
    ],
    K: [],
    L: [],
    M: [
      {
        title: "Message Response",
        description:
          "It contains the processed messages as soon as they're ready and available, in the processing of the continuous audio stream.",
      },
    ],
    N: [
      {
        title: "Node.js",
        description:
          "Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.",
      },
    ],
    O: [],
    P: [
      {
        title: "Personally Identifiable Information (PII)",
        description:
          "Personal data, also known as personal information or personally identifiable information (PII), is any information related to an identifiable person.",
      },
    ],
    Q: [],
    R: [],
    S: [
      {
        title: "Service Messages",
        description:
          "It describes the messages that originate in Service and are sent to the client.",
      },
      {
        title: "Software development kit (SDK)",
        description:
          "A software development kit is a collection of software development tools in one installable package. They facilitate the creation of applications by having a compiler, debugger and perhaps a software framework. They are normally specific to a hardware platform and operating system combination.",
      },
      {
        title: "Speech-To-Text",
        description:
          "Symbl offers state-of-the-art Speech-to-Text capability (also called transcription). You can convert audio and video conversations into text in real-time or after the conversation has ended. To learn more, go ",
        url: "https://docs.symbl.ai/docs/concepts/speech-to-text/",
      },
    ],
    T: [
      {
        title: "Text Message",
        description:
          "Text Message is the serialized JSON message. Every text message has a type field to specify the type or the purpose of the message.",
      },
      {
        title: "Trackers",
        description:
          "Trackers allow you to track the occurrence of certain key words or phrases in a conversation so you can identify emerging trends and gauge the nature of interactions. You can define keywords or phrases in a Tracker and Symbl will return messages that contain the same or contextually similar phrases.To learn more, go ",
          url:"https://docs.symbl.ai/docs/concepts/trackers/"
      },
      {
        title: "Transcripts",
        description:
          "A compliation of the word-to-word conversation converted by speech-to-text.",
      },
    ],
    U: [],
    V: [],
    W: [
      {
        title: "WebSocket",
        description:
          "WebSockets are a thin transport layer built on top of a device’s TCP/IP stack that support the famous “full duplex” connection. To learn more, go ",
          url:"https://docs.symbl.ai/docs/concepts/websockets/"
      },
    ],
    X: [],
    Y: [],
    Z: [],
    "#": [],
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
        let hasUrl = "url" in glossaryDictionary[alphabet][i] ? true : false;

        rows.push(
          <div className={styles.glossaryElement}>
            <h1 className={styles.glossaryElementTitle}>
              {glossaryDictionary[alphabet][i]["title"]}
            </h1>
            <p className={styles.glossaryElementDescription}>
              {glossaryDictionary[alphabet][i]["description"]}
              {hasUrl == true ? (
                <a
                  href={glossaryDictionary[alphabet][i]["url"]}
                  target='_blank'
                >
                  here
                </a>
              ) : null}
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
