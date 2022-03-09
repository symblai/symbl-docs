---
id: streaming-audio-real-time
title: Streaming Audio in real-time
sidebar_label: Streaming Audio in real-time
slug: /javascript-sdk/code-snippets/streaming-audio-real-time/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This section talks about streaming the audio in real-time using the Javascript SDK. We can use this API to pass in audio via a single stream and multiple isolated streams of audio, each of which can contain one or more speaker's audio data.

:::note
If you plan to use the multiple audio streams we recommend using single streams for each speaker involved to get the most accurate of transcription and speaker separation.
:::

You can also consume the processed results in real-time, which include:

* real-time Transcription
* real-time Insights (Action Items and Questions)
* When using multiple audio streams (Each stream for 1 speaker) you also get access to speaker-separated data (including transcription and messages)


## Example with Single Stream

The example below utilises the `mic` package to stream audio in real-time. This will be a single stream of audio obtained through `mic` which may have one or more than one speaker's audio.
The link to the complete example below can be found [here](https://github.com/symblai/getting-started-samples/blob/master/examples/voice-sdk/realtime-websocket-single-stream.js)

### Import required packages

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const {sdk} = require('@symblai/symbl-js');
const uuid = require('uuid').v4;
// For demo purposes, we're using mic to simply get audio from microphone and pass it on to websocket connection
const mic = require('mic');
```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>


In the above snippet we import the `sdk`, `uuid` and `mic` npm packages. The `uuid` package is used for generating a unique ID to represent this stream and it's strongly recommended to use it.
The `mic` package is used to obtain the audio stream in real-time to pass to the SDK.

### Initialise an instance of mic

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const sampleRateHertz = 16000;
const micInstance = mic({
    rate: sampleRateHertz,
    channels: '1',
    debug: false,
    exitOnSilence: 6
});
```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

We now declare the `sampleRateHertz` variable to specify the [Sample Rate](https://en.wikipedia.org/wiki/Sampling_(signal_processing)#Sampling_rate) of the audio obtained from the `mic`.
It is imperative to use the same Sample Rate used for initialising the `mic` package and for passing in to the `startRealtimeRequest` of Javascript SDK as we will see below.
Otherwise the transcription will be completely in-accurate.

We also initialise `mic` with `channels: '1'` (mono channel) audio as currently only mono channel audio data is supported.

### Initialise the Javascript SDK

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
// Initialize the SDK
await sdk.init({
    // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
    appId: APP_ID,
    appSecret: APP_SECRET,
    basePath: 'https://api.symbl.ai'
});
// Need unique Id
const id = uuid();
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

Next we initialise a helper function to execute our code in the `async/await` style. The following code snippets (including the one just above) will be a part of the same function.
We now initialise the Javascript SDK with the `init` call, passing in `appId` and `appSecret` which you can be obtain by signing up on [Symbl Developer Platform](https://platform.symbl.ai)
We also initialise variable `id` with `uuid` function for the unique ID required for this stream as was also mentioned above in the import section snippet.

### Call the startRealtimeRequest

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
// Start Real-time Request (Uses Real-time WebSocket API behind the scenes)
const connection = await sdk.startRealtimeRequest({
    id,
    insightTypes: ["action_item", "question"],
    config: {
        meetingTitle: 'My Test Meeting',
        confidenceThreshold: 0.7,
        timezoneOffset: 480, // Offset in minutes from UTC
        languageCode: "en-US",
        sampleRateHertz
    },
    speaker: { // Optional, if not specified, will simply not send an email in the end.
        userId: 'john.doe@example.com', // Update with valid email
        name: 'John'
    },
    handlers: {
        'onSpeechDetected': (data) => {
            console.log(JSON.stringify(data));
            // For live transcription
            if (data) {
                const {punctuated} = data;
                console.log('Live: ', punctuated && punctuated.transcript);
            }
        },
        'onMessageResponse': (data) => {
            // When a processed message is available
            console.log('onMessageResponse', JSON.stringify(data));
        },
        'onInsightResponse': (data) => {
            // When an insight is detected
            console.log('onInsightResponse', JSON.stringify(data));
        }
    }
});
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

The next call is made to `startRealtimeRequest` of the Javascript SDK and includes various parameters passed in.
Lets breakdown the configuration and take a look at them one by one.

1. `id`: The unique ID that represents this stream. (This needs to be unique, which is why we are using `uuid`)

2. `insightTypes`: This array represents the type of insights that are to be detected. Today the supported ones are `action_item` and `question`.

3. `config`: This configuration object encapsulates the properties which directly relate to the conversation generated by the audio being passed.

    a. `meetingTitle` : This optional parameter specifies the name of the conversation generated. You can get more info on conversations [here](/docs/conversation-api/conversation-data)

    b. `confidenceThreshold` : This optional parameter specifies the confidence threshold for detecting the insights. Only the insights that have `confidenceScore` more than this value will be returned.

    c. `timezoneOffset` : This specifies the actual timezoneOffset used for detecting the time/date related entities.

    d. `languageCode` : It specifies the language to be used for transcribing the audio in BCP-47 format. (Needs to be same as the language in which audio is spoken)

    e. `sampleRateHertz` : It specifies the sampleRate for this audio stream.

4. `speaker`: Optionally specify the details of the speaker whose data is being passed in the stream. This enables an e-mail with the Summary UI URL to be sent after the end of the stream.

5. `handlers`: This object has the callback functions for different events

    a. `onSpeechDetected`: To retrieve the real-time transcription results as soon as they are detected. We can use this callback to render live transcription which is specific to the speaker of this audio stream.

    b. `onMessageResponse`: This callback function contains the "finalized" transcription data for this speaker and if used with multiple streams with other speakers this callback would also provide their messages.
    The "finalized" messages mean that the ASR has finalized the state of this part of transcription and has declared it "final".

    c. `onInsightResponse`: This callback would provide with any of the detected insights in real-time as they are detected. As with the `onMessageResponse` above this would also return every speaker's insights in case of multiple streams.

### Retrieve audio data from mic


<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
console.log('Successfully connected.');

const micInputStream = micInstance.getAudioStream();
micInputStream.on('data', (data) => {
    // Push audio from Microphone to websocket connection
    connection.sendAudio(data);
});

console.log('Started listening to Microphone.');
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

After the `startRealtimeRequest` returns successfully, it signifies that the connection has been established successfully with the passed configuration.
In the above snippet we now obtain the audio data from the `micInputStream` and as it's received we relay it to the active connection instance we now have with Javascript SDK.

### Stop the stream

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
setTimeout(async () => {
    // Stop listening to microphone
    micInstance.stop();
    console.log('Stopped listening to Microphone.');
    try {
        // Stop connection
        await conversationData = connection.stop();
        console.log('Conversation ID: ' + conversationData.conversationId);
        console.log('Connection Stopped.');
    } catch (e) {
        console.error('Error while stopping the connection.', e);
    }
}, 60 * 1000); // Stop connection after 1 minute i.e. 60 secs
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

For the purpose of demoing a continuous audio stream we now simulate a `stop` on the above stream after 60 seconds.
The `connection.stop()` would close the active connection and will trigger the optional email if the `speaker` config is included.
Here the `conversationData` variable includes the `conversationId` you can use with the [Conversation API](/docs/conversation-api/conversation-data) to retrieve this conversation's data.

And that's it! This marks the completion of streaming audio in real-time (Single Audio Stream) with Javascript SDK.
The complete code for the example explained above can be found [here](https://github.com/symblai/getting-started-samples/blob/master/examples/voice-sdk/realtime-websocket-single-stream/index.js)

### With Multiple Streams

The same example explained above can be deployed on multiple machines, each with one speaker to simulate the multiple streams use-case.
The only thing common needs to be the unique ID created in the above example which is used to initialize `startRealtimeRequest` request.

Having this unique ID in common across all different ensures that the audio streams of all the speakers are bound the context of a single conversation.
This conversation can be retrieved by the `conversationId` via the [Conversation API](/docs/conversation-api/conversation-data) which will include the data of all the speakers connecting using the same common ID.
