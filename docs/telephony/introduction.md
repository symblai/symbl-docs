---
id: introduction
title: Telephony API
description: Telephony API enables developers to add Symbl.ai to bridges and join VoIP calls to get real-time intelligence. Check out the Telephony API tutorials to help you get started.
sidebar_label: Introduction
slug: /telephony/introduction/
---

<head>
    <title>Telephony API Tutorial- Introduction</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Based on PSTN and SIP protocols, the Telephony API provides an interface for the developers to have Symbl bridge/join VoIP calls and get the results back in real-time as well. Optionally, you can also trigger an email at the end of the conversation containing the URL to view the transcription, insights and topics in a single page Web Application.

### Tutorials

We have prepared a list of tutorials to help you understand how to use Symbl's Telephony API

- [Gain AI Insights On Your Zoom Call](/docs/telephony/tutorials/connect-to-zoom)
- [Get A Live Transcription From A Phone Call](/docs/telephony/tutorials/connect-to-phone-call)

### Code Snippets

We have provided a list of code snippets to help you get started on your journey with the Symbl Telephony API

- [Connect to a PSTN connection to get Speech to Text and AI Insights](/docs/telephony/code-snippets/connect-to-pstn)
- [Connect to a SIP connection to get Speech to Text and AI Insights](/docs/telephony/code-snippets/connect-to-sip)
- [Receive Speech to Text for a different language in a conversation](/docs/telephony/code-snippets/receive-speech-to-text-for-a-different-language)
- [Receive Prebuilt Summary UI email after each conversation](/docs/telephony/code-snippets/receive-prebuilt-ui-email-after-conversation)

### Symbl Javascript SDK

The Programmable Javascript SDK allows you to add Conversational Intelligence directly into your web applications and meeting platforms. With the Javascript SDK, you can generate intelligent insights such as action items, topics and questions.

[Learn more about Symbl's Javascript SDK](/docs/javascript-sdk/overview/introduction)

### API Reference

The Telephony API allows you to easily use Symbl's Language Insights capabilities. It exposes the functionality of Symbl to dial into the conference. Supported endpoints are given below. Additionally, events can be passed for further processing:

- [Endpoint](/docs/telephony-api/api-reference#endpoint)
- [Request Parameters](/docs/telephony-api/api-reference#request-parameters)
- [Response Parameters](/docs/telephony-api/api-reference#response-parameters)
- [Supported Languages](/docs/telephony-api/api-reference#supported-languages)
- [Specifying Timezones](/docs/telephony-api/api-reference#specifying-timezones)

### Concepts

The concepts sections explain various keywords you might find when looking through the Telephony API documentation:

- [PSTN (Public Switched Telephone Networks)](/docs/concepts/pstn-and-sip#pstn-public-switched-telephone-networks)
- [SIP (Session Initiation Protocol)](/docs/concepts/pstn-and-sip#sip-session-initiation-protocol)

:::info Termination due to elongated silence
If the meeting is silent for more than 30 minutes, it will be automatically terminated. The charges towards the silent minutes apply.
:::
