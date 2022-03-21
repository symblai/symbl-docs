---
id: use-languages-with-sdk
title: Set Language When Connecting To A Web Socket
slug: /javascript-sdk/code-snippets/use-languages-with-sdk/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Getting Started

This snippet shows how to use languages other than English and also how to set the timezone to the timezone in which the conversation is taking place.

:::note
Currently, we only support English language in Streaming & Telephony API. 
We support languages other than English only for our enterprise plan.
Please feel free to reach out to us at support@symbl.ai for any queries.
:::

#### Utilising other languages

Javascript SDK allows you to work with audio from multiple different languages. You can find which language the Streaming API supports [here](/docs/streaming-api/api-reference#supported-languages).

:::caution
 1. If the language is not specified then `en-US`(English - United States) is used as the default language.
 2. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
:::


## Code Snippet

### Configuration Snippet

Here you set the language key to Japanese: `"languages": ["ja-JP"],`.

```json
{
  "type": "start_request",
  "meetingTitle": "Websockets How-to", // Conversation name
  "insightTypes": ["question", "action_item"], // Will enable insight generation
  "config": {
    "confidenceThreshold": 0.5,
    "languageCode": "ja-JP",
    "speechRecognition": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 44100,
    }
  },
  "speaker": {
    "userId": "example@symbl.ai",
    "name": "Example Sample",
  }
}
```

This configuration will be passed to the `startRealtimeRequest` function during initialization, which you can see in the full code snippet below:


### Full Snippet

```js
const {sdk} = require('@symblai/symbl-js');
const uuid = require('uuid').v4;

(async () => {
  try {
    // Initialize the SDK
    await sdk.init({
      appId: appId,
      appSecret: appSecret,
      basePath: 'https://api.symbl.ai',
    })

    // Need unique Id
    const id = uuid();

    // Start Real-time Request (Uses Real-time WebSocket API behind the scenes)
    const connection = await sdk.startRealtimeRequest({
      id,
      insightTypes: ['action_item', 'question'],
      config: {
        meetingTitle: 'My Test Meeting',
        confidenceThreshold: 0.7,
        timezoneOffset: 480, // Offset in minutes from UTC
        languageCode: 'ja-JP',
        sampleRateHertz: 44100,
      },
      speaker: {
        // Optional, if not specified, will simply not send an email in the end.
        userId: 'emailAddress', // Update with valid email
        name: 'My name'
      },
      handlers: {
        /**
         * This will return live speech-to-text transcription of the call.
         */
        onSpeechDetected: (data) => {
          console.log(JSON.stringify(data))
          if (data) {
            const {punctuated} = data
            console.log('Live: ', punctuated && punctuated.transcript)
          }
        },
        /**
         * When processed messages are available, this callback will be called.
         */
        onMessageResponse: (data) => {
          console.log('onMessageResponse', JSON.stringify(data, null, 2))
        },
        /**
         * When Symbl detects an insight, this callback will be called.
         */
        onInsightResponse: (data) => {
          console.log('onInsightResponse', JSON.stringify(data, null, 2))
        },
        /**
         * When Symbl detects a topic, this callback will be called.
         */
        onTopicResponse: (data) => {
          console.log('onTopicResponse', JSON.stringify(data, null, 2))
        }
      }
    });
  } catch (e) {
    console.error(e);
  }
})();

```

### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::
