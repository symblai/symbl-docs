---
<<<<<<< HEAD:docs/async-api/overview/async-api-supported-languages.md
id: async-api-supported-languages
title: What languages does Async API Support?
sidebar_label: Languages Supported
---

---
=======
id: reference
title: Async API 
sidebar_label: Introduction
---

The Async API provides a REST interface that helps you to submit any recorded or saved conversations to Symbl. When you submit a conversation, you'll receive a Conversation ID (`conversationId`), which is unique to your conversation.

![Async API Diagram](/img/asyncDiagram.png)

## Conversation ID

#### `conversationId` helps you with:

1. Helps you append the transcription of an existing file using `PUT` (also known as `append file`)  Async APIs.  
2. Using [Conversation API](/docs/conversation-api/introduction) you can receive Speech to Text data and conversational insights.

To learn more about Conversation ID, go to [Using Conversation ID](/docs/api-reference/getting-started#using-conversation-id) section. 

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

## Endpoints Table

### Text API

| Method | Endpoint | |
|--------|----------|-|
|`POST` | `https://api.symbl.ai/v1/process/text` | [Reference](/docs/async-api/overview/text/post-text)
|`PUT` | `https://api.symbl.ai/v1/process/text/{conversationId}` | [Reference](/docs/async-api/overview/text/put-text)


### Audio API

| Method | Endpoint | |
|--------|----------|-|
|`POST` | `https://api.symbl.ai/v1/process/audio` | [Reference](/docs/async-api/overview/audio/post-audio)
|`POST` | `https://api.symbl.ai/v1/process/audio/url` | [Reference](/docs/async-api/overview/audio/post-audio-url)
|`PUT` | `https://api.symbl.ai/v1/process/audio/{conversationId}` | [Reference](/docs/async-api/overview/audio/put-audio)
|`PUT` | `https://api.symbl.ai/v1/process/audio/url/{conversationId}` | [Reference](/docs/async-api/overview/audio/put-audio-url)


### Video API

| Method | Endpoint | |
|--------|----------|-|
|`POST` | `https://api.symbl.ai/v1/process/video` | [Reference](/docs/async-api/overview/video/post-video)
|`POST` | `https://api.symbl.ai/v1/process/video/url` | [Reference](/docs/async-api/overview/video/post-video-url)
|`PUT` | `https://api.symbl.ai/v1/process/video/{conversationId}` | [Reference](/docs/async-api/overview/video/put-video)
|`PUT` | `https://api.symbl.ai/v1/process/video/url/{conversationId}` | [Reference](/docs/async-api/overview/video/put-video-url)

## Supported Languages
>>>>>>> a168d5a (New updates):async-api/reference/reference.md

The Async Audio and Async Video APIs can work with languages other than English.

The following list of languages(with their [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language-codes) are currently supported:

 | Supported Languages          | Code    |
 |------------------------------|---------|
 | English (United States)      | `en-US` |
 | English (United Kingdom)     | `en-GB` |
 | English (Australia)          | `en-AU` |
 | English (Ireland)            | `en-IE` |
 | English (India)              | `en-IN` |
 | English (South Africa)       | `en-ZA` |
 | Russian (Russian Federation) | `ru-RU` |
 | French (Canada)              | `fr-CA` |
 | French (France)              | `fr-FR` |
 | German (Germany)             | `de-DE` |
 | Italian (Italy)              | `it-IT` |
 | Dutch (Netherlands)          | `nl-NL` |
 | Japanese (Japan)             | `ja-JP` |
 | Spanish (United States)      | `es-US` |
 | Spanish (Spain)              | `es-ES` |
 | Arabic (Saudi Arabia)        | `ar-SA` |
 | Hindi (India)                | `hi-IN` |
 | Portuguese (Brazil)          | `pt-BR` |
 | Portuguese (Portugal)        | `pt-PT` |
 | Persian (Iran)               | `fa-IR` |   



:::caution
1. If the parameter `languageCode` is not specified then `en-US`(English - United States) is used as the default language.
2. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
:::

### Passing the Parameters

* In Submit File Async **POST** ([Async Audio](/docs/async-api/overview/audio/post-audio), [Async Video](/docs/async-api/overview/video/post-video)) & **PUT** ([Async Audio](/docs/async-api/overview/audio/put-audio), [Async Video](/docs/async-api/overview/video/put-video)) you have to pass the `languageCode` in **query parameter**.  

* In Async URL APIs **POST** ([Async Audio URL](/docs/async-api/overview/audio/post-audio-url), [Async Video URL](/docs/async-api/overview/video/post-video-url)) & **PUT** ([Async Audio URL](/docs/async-api/overview/audio/put-audio-url), [Async Video URL](/docs/async-api/overview/video/put-video-url)) you have to pass the `languageCode` in **request body**.

<!--
:::info
Currently only the messages endpoint of Conversation API will return the transcribed data and insights will be return an empty array.
::: -->
