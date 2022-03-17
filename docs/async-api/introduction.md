---
id: introduction
title: Async API
description: Symbl.ai Async APIs provides a REST interface for submitting any recorded or saved conversations for transcription. Check out our Async APIs documentation to get started.
sidebar_label: Introduction
slug: /async-api/introduction/
---

<head>
    <title>Async API Documentation</title>
</head>

---

The Async API provides a REST interface that helps you to submit any recorded or saved conversations to Symbl. When you submit a conversation, you'll receive a Conversation ID (`conversationId`), which is unique to your conversation.

![Async API Diagram](/img/asyncDiagram.png)

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

## Conversation ID

#### `conversationId` helps you with:

1. Helps you append the transcription of an existing file using `PUT` (also known as `append file`) Async APIs.
2. Using [Conversation API](/docs/conversation-api/introduction) you can receive Speech to Text data and conversational insights.

## Async API Types

### Text API

The Async Text API allows you to process any text payload.

It can be useful for any use case where you have access to textual content and want to extract insights and other conversational attributes supported by Symbl's [Conversation API](/docs/conversation-api/introduction).

- [Submit Text File](/docs/async-api/overview/text/post-text)
- [Append Text File To Existing Conversation](/docs/async-api/overview/text/put-text)

### Audio API

The Async Audio API allows you to process an audio file.

It can be useful for any use case where you have access to recorded audio and want to extract insights and other conversational attributes supported by Symbl's [Conversation API](/docs/conversation-api/introduction).

#### Audio File Endpoints

- [Submit Audio File](/docs/async-api/overview/audio/post-audio)
- [Append Audio File To Existing Conversation](/docs/async-api/overview/audio/post-audio)

#### Audio URL Endpoints

- [Submit Audio URL](/docs/async-api/overview/audio/post-audio-url)
- [Append Audio URL To Existing Conversation](/docs/async-api/overview/audio/put-audio-url)

### Video API

The Async Video API allows you to process a video file.

It can be useful in any use case where you have access to a video file of any type of conversation, and you want to extract the insightful items supported by the [Conversation API](/docs/conversation-api/introduction).

#### Video File Endpoints

- [Submit Video File](/docs/async-api/overview/video/post-video)
- [Append Video File To Existing Conversation](/docs/async-api/overview/video/post-video)

#### Video URL Endpoints

- [Submit Video URL](/docs/async-api/overview/video/post-video-url)
- [Append Video URL To Existing Conversation](/docs/async-api/overview/video/put-video-url)

## Endpoints

### Text API

| Method | Endpoint                                                |                                                      |
| ------ | ------------------------------------------------------- | ---------------------------------------------------- |
| `POST` | `https://api.symbl.ai/v1/process/text`                  | [Reference](/docs/async-api/overview/text/post-text) |
| `PUT`  | `https://api.symbl.ai/v1/process/text/{conversationId}` | [Reference](/docs/async-api/overview/text/put-text)  |

### Audio API

| Method | Endpoint                                                     |                                                            |
| ------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `POST` | `https://api.symbl.ai/v1/process/audio`                      | [Reference](/docs/async-api/overview/audio/post-audio)     |
| `POST` | `https://api.symbl.ai/v1/process/audio/url`                  | [Reference](/docs/async-api/overview/audio/post-audio-url) |
| `PUT`  | `https://api.symbl.ai/v1/process/audio/{conversationId}`     | [Reference](/docs/async-api/overview/audio/put-audio)      |
| `PUT`  | `https://api.symbl.ai/v1/process/audio/url/{conversationId}` | [Reference](/docs/async-api/overview/audio/put-audio-url)  |

### Video API

| Method | Endpoint                                                     |                                                            |
| ------ | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `POST` | `https://api.symbl.ai/v1/process/video`                      | [Reference](/docs/async-api/overview/video/post-video)     |
| `POST` | `https://api.symbl.ai/v1/process/video/url`                  | [Reference](/docs/async-api/overview/video/post-video-url) |
| `PUT`  | `https://api.symbl.ai/v1/process/video/{conversationId}`     | [Reference](/docs/async-api/overview/video/put-video)      |
| `PUT`  | `https://api.symbl.ai/v1/process/video/url/{conversationId}` | [Reference](/docs/async-api/overview/video/put-video-url)  |
