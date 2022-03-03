---
id: supported-languages
title: Supported Languages
sidebar_label: Supported Languages
---

## Supported Languages

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

* In Submit File Async **POST** ([Async Audio](/docs/async-api/overview/audio/post-audio), [Async Video](/docs/async-api/overview/video/post-video)) & **PUT** ([Async Audio](/docs/async-api/overview/audio/put-audio), [Async Video](/docs/async-api/overview/video/put-video)) we pass the `languageCode` in **query parameter**.  

* In Async URL APIs **POST** ([Async Audio URL](/docs/async-api/overview/audio/post-audio-url), [Async Video URL](/docs/async-api/overview/video/post-video-url)) & **PUT** ([Async Audio URL](/docs/async-api/overview/audio/put-audio-url), [Async Video URL](/docs/async-api/overview/video/put-video-url)) we pass the `languageCode` in **request body**.

<!--
:::info
Currently only the messages endpoint of Conversation API will return the transcribed data and insights will be return an empty array.
::: -->
