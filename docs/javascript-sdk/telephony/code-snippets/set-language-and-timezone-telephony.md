---
id: use-languages-timezones-with-sdk
title: Set Language and Timezone When Connecting To An Endpoint
slug: /javascript-sdk/code-snippets/use-languages-timezones-with-sdk/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Getting Started

This snipet shows how to use languages other than English and also how to set the timezone to the timezone in which the conversation is taking place.

:::note
Currently, we only support English language in Streaming & Telephony API. 
We support languages other than English only for our enterprise plan.
Please feel free to reach out to us at support@symbl.ai for any queries.
:::

#### Utilising other languages

Javascript SDK allows you to work with audio from multiple different languages. You can find which language the Telephony API supports [here](/docs/telephony-api/api-reference#supported-languages).

For timezones, please refer to [this](/docs/telephony-api/api-reference#specifying-timezones).

You can also use `moment-timezone` node package to obtain a list of time zones like
the following `const timeZones = moment.tz.names()`

:::caution
 1. If the language is not specified then `en-US`(English - United States) is used as the default language.
 2. If no timezone is passed it will default to UTC.
 3. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
 4. Currently, we only support up to one language.
:::


## Code Snippet

### Configuration Snippet

Here you set the language key to Japanese: `"languages": ["ja-JP"],` and the timezone to Tokyo: `"timezone": "Asia/Tokyo"`.

```json
{
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": "DEFAULT_PHONE_NUMBER"
  },
  "languages": ["ja-JP"],
  "timezone": "Asia/Tokyo",
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        "user@example.com"
      ]
    }
  }],
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}
```

### Full Snippet

```js
const {sdk, SpeakerEvent} = require("@symblai/symbl-js");

sdk.init({
  appId: APP_ID,
  appSecret: APP_SECRET,
  basePath: "https://api.symbl.ai",
}).then(async() => {
  console.log('SDK initialized.');
  try {
    const phoneNumber = "PHONE_NUMBER";  // Telephony API currently only supports US phone numbers.

    sdk.startEndpoint({
      endpoint: {
        type: "pstn",
        phoneNumber: DEFAULT_PHONE_NUMBER,
      },
      languages: ["ja-JP"],
      timezone: "Asia/Tokyo",
      actions: [
        {
          invokeOn: "stop",
          name: "sendSummaryEmail",
          parameters: {
            emails: [
              "user@example.com"
            ],
          },
        },
      ],
      data: {
        session: {
          name: "Meeting name",
        },
      },
    }).then((connection) => {
      const connectionId = connection.connectionId;
      console.log("Successfully connected.", connectionId);
      console.log('Conversation ID', connection.conversationId);
    })
    .catch((err) => {
       console.error("Error while starting the connection", err);
    });
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));
```

### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.
