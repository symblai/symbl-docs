---
id: start-and-stop-streaming-api-connection
title: Start and Stop Streaming API Connection
slug: /streamingapi/code-snippets/start-and-stop-connection/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Start Connection

Use this code to start a connection to the Streaming API using Javascript WebSockets. This example uses both the [Symbl's Javascript SDK](/docs/javascript-sdk/overview/introduction), which is meant to be run using Node.js, and native Javascript which can be run in the browser:

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Symbl SDK (Node.js)', value: 'nodejs' },
    { label: 'Native Javascript', value: 'javascript' },
  ]
}>
<TabItem value="nodejs">

```js
const {sdk} = require('@symblai/symbl-js');
const uuid = require('uuid').v4;

(async () => {
  try {
    // Initialize the SDK. You can find the appId and appSecret at https://platform.symbl.ai.
    await sdk.init({
      appId: appId,
      appSecret: appSecret,
      basePath: 'https://api.symbl.ai',
    })

    // Need unique Id
    const id = uuid()

    // Start Real-time Request (Uses Real-time WebSocket API behind the scenes)
    const connection = await sdk.startRealtimeRequest({
      id,
      insightTypes: ['action_item', 'question'],
      config: {
        meetingTitle: 'My Test Meeting',
        confidenceThreshold: 0.7,
        timezoneOffset: 480, // Offset in minutes from UTC
        languageCode: 'en-US',
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

#### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js uuid`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

</TabItem>
<TabItem value="javascript">

```js
const accessToken = accessToken;
// Refer to the Authentication section for how to generate the accessToken: https://docs.symbl.ai/docs/developer-tools/authentication
const uniqueMeetingId = btoa("user@example.com"); // btoa will take a string and generate a unique ID
const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;

const ws = new WebSocket(symblEndpoint);

ws.onmessage = (event) => {
  // You can find the conversationId in event.message.data.conversationId;
  const data = JSON.parse(event.data);
  if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
  }
  console.log('onmessage event', event);
};

// Fired when the WebSocket closes unexpectedly due to an error or lost connetion
ws.onerror  = (err) => {
  console.error(err);
};

// Fired when the WebSocket connection has been closed
ws.onclose = (event) => {
  console.info('Connection to websocket closed');
};

// Fired when the connection succeeds.
ws.onopen = (event) => {
  ws.send(JSON.stringify({
    type: 'start_request',
    meetingTitle: 'Websockets How-to', // Conversation name
    insightTypes: ['question', 'action_item'], // Will enable insight generation
    config: {
      confidenceThreshold: 0.5,
      languageCode: 'en-US',
      speechRecognition: {
        encoding: 'LINEAR16',
        sampleRateHertz: 44100,
      }
    },
    speaker: {
      userId: 'example@symbl.ai',
      name: 'Example Sample',
    }
  }));
};
```
:::note Backward Compatibility
The previous endpoint  `wss://api.symbl.ai/v1/realtime/insights/` is now updated to `wss://api.symbl.ai/v1/streaming/` to standardize our API nomenclature. This change is backward compatible. However, we recommend you to use the new endpoint. 
:::

#### Testing

Open up your browser's development environment and copy this code into the console. Replace the placeholder values with the proper values.

If successful you should receive a response in the console.

</TabItem>
</Tabs>

## Stop Connection

Once the connection is established you can stop the connection with this snippet:

<Tabs
  defaultValue="javascript"
  values={[
    { label: 'Javascript', value: 'javascript' },
  ]
}>
<TabItem value="javascript">

```js
ws.send(JSON.stringify({
  "type": "stop_request"
}));
```

</TabItem>
</Tabs>

:::info Termination due to elongated silence
If the meeting is silent for more than 30 minutes, it will be automatically terminated. The charges towards the silent minutes apply. 
:::
