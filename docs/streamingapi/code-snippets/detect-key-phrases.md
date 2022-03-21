---
id: detect-key-phrases
title: Detect Key Phrases
slug: /streamingapi/code-snippets/detect-key-phrases/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach us at devrelations@symbl.ai.
:::

This example goes over how you can use the Symbl Streaming API to detect key prases using the [Trackers API](/docs/streaming-api/api-reference#using-trackers). This example uses both the [Symbl's Javascript SDK](/docs/javascript-sdk/overview/introduction), which is meant to be run using Node.js, and native Javascript which can be run in the browser.

:::info
If you wish to learn more about Trackers you can view our [Trackers Concept Page](/docs/concepts/trackers).
:::

## Track Phrases

To detect words or phrases you pass them in the configuration as such:

```json
{
  "trackers": [
    {
      "name": "COVID-19",
      "vocabulary": [
        "social distancing",
        "cover your face with mask",
        "vaccination"
      ]
    }
  ]
}
```

If these phrases are found in the conversation the API will trigger a callback which would contain the [tracker response](#ontrackerresponse-json-response-example).

## Snippet

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Symbl SDK (Node.js)', value: 'nodejs' },
    { label: 'Native Javascript', value: 'javascript' }
  ]
}>
<TabItem value="nodejs">

Below is an example that shows how to pass **Trackers** in the config object for the `startRealtimeRequest` of the Symbl’s Javascript SDK. This example also shows how to consume the results of the detected Trackers in real-time:

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

    const connection = await sdk.startRealtimeRequest({
      id,
      insightTypes: ['action_item', 'question'],
      trackers: [
        {
          name: "COVID-19",
          vocabulary: [
            "social distancing",
            "cover your face with mask",
            "vaccination"
          ]
        }
      ],
      config: {
        meetingTitle: "My Awesome Meeting",
        confidenceThreshold: 0.7,
        languageCode: "en-US",
        sampleRateHertz: 48000,
        trackers: {
          "interimResults": true
        }
      },
      speaker: {
        // Optional, if not specified, will simply not send an email in the end.
        userId: "john@example.com", // Update with valid email
        name: "John",
      },
      handlers: {
        onTrackerResponse: (data) => {
          // When a tracker is detected in real-time
          console.log('onTrackerResponse', JSON.stringify(data, null, 2));
          if (!!data) {
            data.forEach((tracker) => {
              console.log(`Detected Tracker Name: ${tracker.name}`);
              console.log(`Detected Matches`);
              tracker.matches.forEach((match) => {
                console.log(`Tracker Value: ${match.value}`);
                console.log(`Messages detected against this Tracker`);
                match.messageRefs.forEach((messageRef) => {
                  console.log(`Message ID: ${messageRef.id}`);
                  console.log(`Message text for which the match was detected: ${messageRef.text}`);
                  console.log(`\n`);
                });
                console.log(`\n\n`);
                
                console.log(`Insights detected against this Tracker`);
                match.messageRefs.forEach((insightRef) => {
                  console.log(`Insight ID: ${insightRef.id}`);
                  console.log(`Insight text for which the match was detected: ${insightRef.text}`);
                  console.log(`Insight Type: ${insightRef.type}`);
                  console.log(`\n`);
                });
                console.log(`\n\n`);
              });
            });
          }
        },
      },
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

Below is an example that shows how to pass **Trackers** in the config object for the WebSocket API in Native Javascript:

```js
const accessToken = accessToken;
// Refer to the Authentication section for how to generate the accessToken: https://docs.symbl.ai/docs/developer-tools/authentication
const uniqueMeetingId = btoa("user@example.com"); // btoa will take a string and generate a unique ID
const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;

const ws = new WebSocket(symblEndpoint);

// Fired when a message is received from the WebSocket server
ws.onmessage = (event) => {
  // You can find the conversationId in event.message.data.conversationId;
  const data = JSON.parse(event.data);
  if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
  }
  if (data.type === 'tracker_response') {
    for (let tracker of data.trackers) {
      for (let match of tracker.matches) {
        console.log('Tracker found:', match.value);
      }
    }
  }
  console.log(`Response type: ${data.type}. Object: `, data);
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
    trackers: [
      {
        name: "COVID-19",
        vocabulary: [
          "social distancing",
          "cover your face with mask",
          "vaccination"
        ]
      }
    ],
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
The previous endpoint  `wss://api.symbl.ai/v1/realtime/insights/` is now updated to `wss://api.symbl.ai/v1/streaming/` to standardize our API nomenclature. This change is backward compatible; however, we recommend you to use the new endpoint. 
:::

#### Connect Mic

After you connect, you want to connect to your device's microphone. This code is inserted after the `ws.onopen` function:

```js
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

/**
 * The callback function which fires after a user gives the browser permission to use
 * the computer's microphone. Starts a recording session which sends the audio stream to
 * the WebSocket endpoint for processing.
 */
const handleSuccess = (stream) => {
  const AudioContext = window.AudioContext;
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  const gainNode = context.createGain();
  source.connect(gainNode);
  gainNode.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = (e) => {
    // convert to 16-bit payload
    const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.bufferSize);
    const targetBuffer = new Int16Array(inputData.length);
    for (let index = inputData.length; index > 0; index--) {
        targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
    }
    // Send audio stream to websocket.
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(targetBuffer.buffer);
    }
  };
};


handleSuccess(stream);
```

#### Testing

Open up your browser's development environment and copy this code into the console. Replace the placeholder values with the proper values.

If successful you should receive a response in the console.

</TabItem>
</Tabs>

<a name="ontrackerresponse"></a>

### Handlers Reference

* `handlers`: This object has the callback functions for different events

  * `onTrackerResponse`: This callback provides you with any of the detected trackers in real-time as they are detected.  As with the `onMessageResponse` this would also return every tracker in case of multiple streams.<br /><br />

  #### onTrackerResponse JSON Response Example

  ```js
  [
    {
      "id": "4527907378937856",
      "name": "My Awesome Tracker",
      "matches": [
        {
          "messageRefs": [
            {
              "id": "4670860273123328",
              "text": "Wearing mask is a good safety measure.",
              "offset": -1
            }
          ],
          "type": "vocabulary",
          "value": "wear mask",
          "insightRefs": []
        }
      ]
    }
    ...
  ]
  ```





