---
id: receive-ai-insights
title: Receive Live AI Insights
slug: /streamingapi/code-snippets/receive-live-insights
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This example goes over how you can use the Symbl Streaming API to receive [Insights](/docs/conversation-api/insights), which are what the Symbl API determines to be the most important keywords or phrases used in a conversation. This example uses both the [Symbl's Javascript SDK](/docs/javascript-sdk/overview/introduction), which is meant to be run using Node.js, and native Javascript which can be run in the browser: 

## Connect

The first thing we do is connect to the Web Socket using the SDK. If you're using the SDK you can use [`onInsightResponse`](#oninsightresponse) handler after the connection is established, otherwise you'll have to parse the response in the `onmessage` callback for the WebSocket.

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Symbl SDK (Node.js)', value: 'nodejs' },
    { label: 'Native Javascript', value: 'javascript' }
  ]
}>
<TabItem value="nodejs">

```js
const {sdk} = require('symbl-node');
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
         * When Symbl detects an insight, this callback will be called.
         */
        onInsightResponse: (data) => {
          console.log('onInsightResponse', JSON.stringify(data, null, 2))
        },
      }
    });
  } catch (e) {
    console.error(e);
  }
})();

```

#### Connect Mic

After you connect, you want to connect to your device's microphone. This code is inserted after the `connection` and before the closing of the `try...catch`

```js
const micInputStream = micInstance.getAudioStream()
/** Raw audio stream */
micInputStream.on('data', (data) => {
  // Push audio from Microphone to websocket connection
  connection.sendAudio(data)
})

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Started listening to Microphone.')
})

micInputStream.on('silence', function () {
  console.log('Got SIGNAL silence')
})

micInstance.start()

setTimeout(async () => {
  // Stop listening to microphone
  micInstance.stop()
  console.log('Stopped listening to Microphone.')
  try {
    // Stop connection
    await connection.stop()
    console.log('Connection Stopped.')
  } catch (e) {
    console.error('Error while stopping the connection.', e)
  }
}, 60 * 1000) // Stop connection after 1 minute i.e. 60 secs
```

#### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install symbl-node uuid`. Now in the terminal run

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
  if (data.type === 'insight_response') {
    for (let insight of data.insights) {
      console.log('insight:', insight.payload.content)
    }
  }
  console.log('data', event);
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

#### Connect Mic

After you connect, you want to connect to your device's microphone. This code is inserted after the `connection` and before the closing of the `try...catch`

```js
const micInputStream = micInstance.getAudioStream()
/** Raw audio stream */
micInputStream.on('data', (data) => {
  // Push audio from Microphone to websocket connection
  connection.sendAudio(data)
})

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Started listening to Microphone.')
})

micInputStream.on('silence', function () {
  console.log('Got SIGNAL silence')
})

micInstance.start()

setTimeout(async () => {
  // Stop listening to microphone
  micInstance.stop()
  console.log('Stopped listening to Microphone.')
  try {
    // Stop connection
    await connection.stop()
    console.log('Connection Stopped.')
  } catch (e) {
    console.error('Error while stopping the connection.', e)
  }
}, 60 * 1000) // Stop connection after 1 minute i.e. 60 secs
```

#### Testing

Open up your browser's development environment and copy this code into the console. Replace the placeholder values with the proper values.

If successful you should receive a response in the console.

</TabItem>
</Tabs>

<a name="oninsightresponse"></a>

### Handlers Reference

* `handlers`: This object has the callback functions for different events

    * `onInsightResponse`: This callback provides you with any of the detected insights in real-time as they are detected. As with the `onMessageResponse` this would also return every speaker's insights in case of multiple streams.

    ```js
    [{
      "id": "94020eb9-b688-4d56-945c-a7e5282258cc",
      "confidence": 0.9909798145016999,
      "messageReference": {
        "id": "94020eb9-b688-4d56-945c-a7e5282258cc"
      },
      "hints": [{
        "key": "informationScore",
        "value": "0.9782608695652174"
      }, {
        "key": "confidenceScore",
        "value": "0.9999962500210938"
      }, {
        "key": "comprehensionScore",
        "value": "0.9983848333358765"
      }],
      "type": "action_item",
      "assignee": {
        "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
        "name": "John Doe",
        "userId": "emailAddress"
      },
      "dueBy": {
        "value": "2021-02-05T00:00:00-07:00"
      },
      "tags": [{
        "type": "date",
        "text": "today",
        "beginOffset": 39,
        "value": {
          "value": {
            "datetime": "2021-02-05"
          }
        }
      }, {
        "type": "person",
        "text": "John Doe",
        "beginOffset": 8,
        "value": {
          "value": {
            "name": "John Doe",
            "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
            "assignee": true,
            "userId": "emailAddress"
          }
        }
      }],
      "dismissed": false,
      "payload": {
        "content": "Perhaps John Doe can submit the report today.",
        "contentType": "text/plain"
      },
      "from": {
        "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
        "name": "John Doe",
        "userId": "emailAddress"
      }
    }]
    ```

## See Also

- [Receive live captioning](/docs/streamingapi/code-snippets/receive-live-captioning)
- [Receive live topics](/docs/streamingapi/code-snippets/receive-live-topics)