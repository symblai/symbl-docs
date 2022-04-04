---
id: introduction
title: Streaming API
description: Streaming API can provide real-time transcription and extract actionable insights from your conversations. Learn how to implement Symbl.ai’s Streaming API now.
sidebar_label: Introduction
slug: /streamingapi/introduction/
---

<head>
    <title>How to Implement Streaming API</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl's Streaming API is based on WebSocket protocol and can be used for real-time use-cases where both the audio and its results from Symbl's back-end need to be available in real-time. It can be integrated directly via the browser or server.

:::info Identification and Redaction of PII data
Symbl allows you to identify and redact Personally Identifiable Information (PII) from messages and insights with Streaming APIs. Learn more in the [PII Identification and Redaction](/docs/concepts/redaction-pii) page.
:::

### Tutorials

Here is a list of tutorials to help you understand how to use Symbl's Streaming API:

- [Get Real-time Speech-To-Text Transcriptions Using Streaming API](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser)
- [Gain Real-time AI Insights From Your Device's Mic Using Symbl's Javascript SDK](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)

### Code Snippets

Here is a list of code snippets to help you get started on your journey with the Symbl Streaming API:

- [Start and Stop Streaming API Connection](/docs/streamingapi/code-snippets/start-and-stop-connection)
- [Receive Live Captioning](/docs/streamingapi/code-snippets/receive-live-captioning)
- [Receive Live Topics](/docs/streamingapi/code-snippets/receive-live-topics)
- [Receive Live AI Insights](/docs/streamingapi/code-snippets/receive-live-insights/)
- [Receive Speech to Text for a different language in a conversation](/docs/streamingapi/code-snippets/receive-speech-to-text-for-different-languages)


### Symbl Javascript SDK

The Programmable Javascript SDK allows you to add Conversational Intelligence directly into your web applications and meeting platforms. With the Javascript SDK, you can generate intelligent insights such as action items, topics and questions.

[Learn more about Symbl's Javascript SDK](/docs/javascript-sdk/introduction)

### API Reference

The Streaming API allows you to easily use Symbl's Language Insights capabilities. It exposes the functionality of Symbl to dial in to the conference. Supported endpoints are given below. Additionally, events can be passed for further processing:

- [Request Parameters](/docs/streaming-api/api-reference#request-parameters)
- [Connection Establishment](/docs/streaming-api/api-reference#connection-establishment)
- [Messages](/docs/streaming-api/api-reference#messages)
- [Subscribe API](/docs/subscribe-api)

:::info Termination due to elongated silence
If a meeting is silent for more than 30 minutes, it will be automatically terminated. The charges towards the silent minutes apply.
:::
