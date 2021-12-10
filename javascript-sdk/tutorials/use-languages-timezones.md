---
id: use-languages-timezones
title: How To use different languages and timezones with Symbl
sidebar_label: Different languages and timezones with Symbl
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';


<Redirect to="/docs/javascript-sdk/code-snippets/use-languages-timezones-with-sdk" />


This example shows how to use languages other than English and also how to pass
in `timezone` in which the conversation is taking place.

#### Utilising other languages
Javascript SDK allows you to work with audio from multiple different languages.
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


The above are all BCP-47 standard language codes and currently ONLY 1 should be
passed in the `languages` array as shown below. Support for detecting multiple
languages in the same conversation will be added soon!

For timezones, please refer to [this](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

You can also use `moment-timezone` package to obtain a list of time zones like
the following `const timeZones = moment.tz.names()`

:::caution
 1. If the language is not specified then `en-US`(English - United States) is used as the default language.
 2. If no timezone is passed it will default to UTC.
 3. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
:::

Throughout the documentation you'll find various references to these variable names, which you will have to replace with your own values:

Key  | Description
---------- | -------
```APP_ID``` | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Sybml.
```DEFAULT_PHONE_NUMBER``` | A phone number that you want the API to connect to. Be sure to include the country code.
```EMAIL_ADDRESS``` | The email address you wish to send the summary email to.

[View on Github](https://github.com/symblai/getting-started-samples/tree/master/examples/voice-sdk/telephony-custom-language-and-timezone)

## Getting started

This example runs on node server, so we will use `@symblai/symbl-js` package.

Open `.env` file and add your `APP_ID`, `APP_SECRET`, `EMAIL_ADDRESS`.


```javascript
require('dotenv').config();
const {sdk} = require('@symblai/symbl-js');
```

Let's start by initialising `@symblai/symbl-js` sdk


```js
await sdk.init({
  appId: process.env.APP_ID,
  appSecret: process.env.APP_SECRET,
  basePath: 'https://api.symbl.ai'
});
```

Now start your endpoint and provide `language` and `timezone` properties:


```js
const connection = await sdk.startEndpoint({
  ...config,
  languages: ['ja-JP'],
  timezone: 'Asia/Tokyo'
});
```
