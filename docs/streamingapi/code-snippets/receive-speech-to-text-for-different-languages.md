---
id: receive-speech-to-text-for-different-languages
title: Receive Speech to Text for a different language in a conversation
slug: /streamingapi/code-snippets/receive-speech-to-text-for-different-languages/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This example goes over how you can use the Symbl Streaming API to receive a speech-to-text transcription of a conversation in many different languages. This example uses both the [Symbl's Javascript SDK](/docs/javascript-sdk/overview/introduction) and native Javascript. 

:::note
Currently, we only support English language in Streaming & Telephony API. 
The support for Spanish language is also available in Streaming API in the Labs environment.
Please feel free to reach out to us at support@symbl.ai for any queries.
:::

## Connect

When we're connecting to the Web Socket, we can define which language we use in the configuration. Here we will set the `languageCode` key to Spanish (`es-ES`). You can view the full list of supported languages [here](/docs/streaming-api/api-reference#supported-languages).

### Configuration Snippet

```js
{
  config: {
    meetingTitle: 'My Test Meeting',
    confidenceThreshold: 0.7,
    timezoneOffset: 480, // Offset in minutes from UTC
    languageCode: 'es-ES',
    sampleRateHertz: 44100,
  }
}
```


### Full Code Snippet

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Symbl SDK (Node.js)', value: 'nodejs' },
    { label: 'Native Javascript', value: 'javascript' },
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
        languageCode: 'es-ES',
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
      languageCode: 'es-ES',
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

<a name="onspeechdetected"></a>

### Handlers Reference (Symbl SDK)

* `handlers`: This object has the callback functions for different events

  * `onSpeechDetected`: To retrieve the real-time transcription results as soon as they are detected. You can use this callback to render live transcription which is specific to the speaker of this audio stream.<br /><br />

  #### onSpeechDetected JSON Response Example

  ```js
  {
    "type": "recognition_result",
    "isFinal": true,
    "payload": {
      "raw": {
        "alternatives": [{
          "words": [{
            "word": "Hello",
            "startTime": {
              "seconds": "3",
              "nanos": "800000000"
            },
            "endTime": {
              "seconds": "4",
              "nanos": "200000000"
            }
          }, {
            "word": "world.",
            "startTime": {
              "seconds": "4",
              "nanos": "200000000"
            },
            "endTime": {
              "seconds": "4",
              "nanos": "800000000"
            }
          }],
          "transcript": "Hello world.",
          "confidence": 0.9128385782241821
        }]
      }
    },
    "punctuated": {
      "transcript": "Hello world."
    },
    "user": {
      "userId": "emailAddress",
      "name": "John Doe",
      "id": "23681108-355b-4fc3-9d94-ed47dd39fa56"
    }
  }
    ```

  <a name="onmessageresponse"></a>

  * `onMessageResponse`: This callback function contains the "finalized" transcription data for this speaker and if used with multiple streams with other speakers this callback would also provide their messages.
  The "finalized" messages mean that the automatic speech recognition has finalized the state of this part of transcription and has declared it "final". Therefore, this transcription will be more accurate than `onSpeechDetected`.<br /><br />

  #### onMessageResponse JSON Response Example

  ```js
  [{
    "from": {
      "id": "0a7a36b1-047d-4d8c-8958-910317ed9edc",
      "name": "John Doe",
      "userId": "emailAddress"
    },
    "payload": {
      "content": "Hello world.",
      "contentType": "text/plain"
    },
    "id": "59c224c2-54c5-4762-9582-961bf250b478",
    "channel": {
      "id": "realtime-api"
    },
    "metadata": {
      "disablePunctuation": true,
      "timezoneOffset": 480,
      "originalContent": "Hello world.",
      "words": "[{\"word\":\"Hello\",\"startTime\":\"2021-02-04T20:34:59.029Z\",\"endTime\":\"2021-02-04T20:34:59.429Z\"},{\"word\":\"world.\",\"startTime\":\"2021-02-04T20:34:59.429Z\",\"endTime\":\"2021-02-04T20:35:00.029Z\"}]",
      "originalMessageId": "59c224c2-54c5-4762-9582-961bf250b478"
    },
    "dismissed": false,
    "duration": {
      "startTime": "2021-02-04T20:34:59.029Z",
      "endTime": "2021-02-04T20:35:00.029Z"
    }
  }]
  ```