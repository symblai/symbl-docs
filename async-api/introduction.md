---
id: introduction
title: Async API
sidebar_label: Introduction
slug: /async-api/introduction
---

Hello world!

The Async API provides a REST interface that helps you to submit any recorded or saved conversations to Symbl. When you submit a conversation, you'll receive a Conversation ID (`conversationId`), which is unique to your conversation.

![Async API Diagram](/img/asyncDiagram.png)

## Conversation ID

#### `conversationId` helps you with:

1. Helps you append the transcription of an existing file using `PUT` (also known as `append file`)  Async APIs.  
2. Using [Conversation API](/docs/conversation-api/introduction) you can receive Speech to Text data and conversational insights.



## Async API Types


### Text API

The Async Text API allows you to process any text payload.

It can be useful for any use case where you have access to textual content and want to extract insights and other conversational attributes supported by Symbl's [Conversation API](/docs/conversation-api/introduction).

* [Submit Text File](/docs/async-api/overview/text/post-text)
* [Append Text File To Existing Conversation](/docs/async-api/overview/text/put-text)


### Audio API

The Async Audio API allows you to process an audio file.

It can be useful for any use case where you have access to recorded audio and want to extract insights and other conversational attributes supported by Symbl's [Conversation API](/docs/conversation-api/introduction).

#### Audio File Endpoints

* [Submit Audio File](/docs/async-api/overview/audio/post-audio)
* [Append Audio File To Existing Conversation](/docs/async-api/overview/audio/post-audio)

#### Audio URL Endpoints

* [Submit Audio URL](/docs/async-api/overview/audio/post-audio-url)
* [Append Audio URL To Existing Conversation](/docs/async-api/overview/audio/put-audio-url)

### Video API

The Async Video API allows you to process a video file.

It can be useful in any use case where you have access to a video file of any type of conversation, and you want to extract the insightful items supported by the [Conversation API](/docs/conversation-api/introduction).

#### Video File Endpoints

* [Submit Video File](/docs/async-api/overview/video/post-video)
* [Append Video File To Existing Conversation](/docs/async-api/overview/video/post-video)

#### Video URL Endpoints

* [Submit Video URL](/docs/async-api/overview/video/post-video-url)
* [Append Video URL To Existing Conversation](/docs/async-api/overview/video/put-video-url)
