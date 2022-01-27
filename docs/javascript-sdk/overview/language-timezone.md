---
id: language-timezone
title: Language and TimeZone
sidebar_label: Language and TimeZone
---
import {Redirect} from '@docusaurus/router';


<Redirect to="/docs/javascript-sdk/code-snippets/use-languages-with-sdk" />

You can also specify languages other than English to be used for calls made via PSTN or SIP. You can also pass in the time zxone which will be used to render the Summary UI to the language and timezone specified.

The code examples will show you how to use these features with Javascript SDK:

## Language Support

Javascript SDK allows you to work with audio from multiple different languages.
The following is a list of supported languages and their [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language codes:

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
 1. If the language is not specified then `en-US`(English - United States) is used as the default language.
 2. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
:::

You can pass in `languages` as an array in the `startEndpoint` as shown in the [code example below](#code-example). Please note that currently only one language can be specified per call and support for detecting multiple languages in the same call will be added soon.

## Time zone support.

With calls taking place in different regions around the world it is important to capture and utitlize that information.
Our Javascript SDK allows you to pass in `timeZone` in the `startEndpoint` call which will render the Summary UI in the time zone specified.
You can find a [list of supported timezones here](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

## <a name="code-example"></a>Code Example
A complete example showcasing this capability can be found [here](https://github.com/symblai/getting-started-samples/blob/master/examples/voice-sdk/telephony-custom-language-and-timezone/index.js)
