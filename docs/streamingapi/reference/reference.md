---
id: api-reference
title: Streaming API Reference
slug: /streaming-api/api-reference/
sidebar_label: Request Parameters
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl's Streaming API is based on the WebSocket protocol and can be used for real-time use-cases where both the audio and its results need to be available in real-time. 

:::info
Currently, Streaming API is supported in English only. However, the support for Spanish is available as a part of [Symbl Labs](/docs/labs/). 
::: 


### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### Endpoint

`wss://api.symbl.ai/v1/streaming/{CONNECTION_ID}?access_token=ACCESS_TOKEN`

:::note Backward Compatibility
The previous endpoint  `wss://api.symbl.ai/v1/realtime/insights/` is now updated to `wss://api.symbl.ai/v1/streaming/` to standardize our API nomenclature. This change is backward compatible. However, we recommend you to use the new endpoint. 
:::

### Request Parameters

#### <a name="message-body"></a>Main Message Body

Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
```type``` | Mandatory | `start_request`, `stop_request` | Type of message. 
```type``` | Optional | `modify_request` | Type of message. Allows you to modify the request. See the [Modify Request](#modify-request) section below for more details.
```insightTypes``` | Optional | action_item, question | Types of insights to return. If not provided, no insights will be returned.
```customVocabulary``` | Optional | List of String | An array of strings containing vocabulary specific to your company, products, or phrases. 
```config``` | Optional | Find the supported value [here](#config) | Configuration for this request. [See the config section below for more details](#config).
```speaker``` | Optional  | Find the supported value [here](#speaker) | Speaker identity to use for audio in this WebSocket connection. If omitted, no speaker identification will be used for processing. [See the speaker section below for more details](#speaker).
```noConnectionTimeout``` | Optional |  Between `0` to `1800` seconds | The buffer time (in seconds) during which the WebSocket API connection stays open even if there’s no Streaming API connection active for that duration. This allows the Speaker to reconnect to the same meeting with the same Subscribers if they lost the connection previously. <br/> <br/> For example,  when this parameter is set to `noConnectionTimeout = 600 secs` and if there is no graceful termination using `stop_request` message sent explicitly when there just one WebSocket connection, the `connectionId` and `conversationId` are kept valid for 600 seconds before finalizing the connection, after which connectionId will be not available to subscribe and `conversationId` will have all the last know information associated with it.
```disconnectOnStopRequest``` | Optional | `true` or `false` | This parameter allows you to set your Streaming API connection in such a way that even when the `stop_request` is sent. The connection does not drop-off, only the processing is stopped and the `conversationId` and connection is kept live for `1800` seconds by default. You can always override this value by passing the `disconnectOnStopRequest` parameter. <br/> <br/> This allows you to stop and start the Streaming API processing without dropping the WebSocket connection, so that you can stop and resume the processing in the middle of a call and optimize the Streaming API usage costs. <br/> <br/> The default value is `true`. |
```disconnectOnStopRequestTimeout``` | Optional | Between `0` to `1800` seconds | This parameter allows you to override the idle time out (if a WebSocket connection is idle for 30 minutes). Set this parameter with a value between `0` to `1800` seconds. If the idle connection needs to be kept alive beyond `1800` seconds, you have to restart the connection at `1800` seconds elapsed. <br/> <br/> If the value is passed as `0`, the WebSocket connection is dropped when `stop_request` is received. The default value is `1800`.

##### Code Example

```js
{
  "type": "start_request",
  "insightTypes": ["question", "action_item"],
  "customVocabulary": ["acme", "acme-platform"],
  "config": {},  // See Config section below.
  "speaker": {}  // See Speaker section below.
}
```

#### <a name="config"></a>Config

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | false  | <=0.5 to <=1.0 | 0.5 | Minimum confidence score that you can set for an API to consider it as valid insight. The minimum confidence score should be in the range <=0.5 to <=1.0 (greater than or equal to `0.5` and less than or equal to `1.0`.). Default value is `0.5`.
```speechRecognition``` | false | | | See Speech Recognition section [below](#speech-recognition).
```meetingTitle``` | false | | | The name of the meeting.

##### <a name="config-example"></a>Code Example

```js
{
  "config": {
    "confidenceThreshold": 0.9,
    // "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "speechRecognition": {}  // See Speech Recognition section below.
    "meetingTitle": "Client Meeting"
  }
}
```


####  <a name="speech-recognition"></a>Speech Recognition

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  -------
```encoding``` | false  | `LINEAR16`, `FLAC`, `MULAW`, `Opus` | `LINEAR16` | Audio Encoding in which the audio will be sent over the WebSocket.
```sampleRateHertz	``` | false  |  | `16000` | The rate of the incoming audio stream. The following are supported with the sample rates: <br/> encoding `LINEAR16` for sample rates `8000` to `48000`, <br/> encoding `FLAC` for sample rates `16000 ` and above, <br/> encoding `MULAW` for sample rates `8000`, <br/> encoding `Opus` for sample rates `16000` to `48000`.
 

##### Code Example

```js
{
  "speechRecognition": {
    "encoding": "LINEAR16",
    "sampleRateHertz": 16000 // Make sure the correct sample rate is provided for best results
  }
}
```

####  <a name="speaker"></a>Speaker

Field  | Required | Supported Value
---------- | ------- |  -------
```userId``` | Optional | Any user identifier for the user.
```name``` | Optional | Display name of the user.

##### Code Example

```js
{
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
}
```

### Full Code Example

```js
{
  "type": "start_request",
  "insightTypes": ["question", "action_item"],
  "config": {
    "confidenceThreshold": 0.9,
    // "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "speechRecognition": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 44100 // Make sure the correct sample rate is provided for best results
    },
    "meetingTitle": "Client Meeting"
  },
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
}
 ```


## Connection Establishment

This is a WebSocket endpoint, and it starts as an HTTP request that contains HTTP headers that indicate the client's desire to upgrade the connection to a WebSocket instead of using HTTP semantics. The server indicates its willingness to participate in the WebSocket connection by returning an HTTP 101 Switching Protocols response. After the exchange of this handshake, both client and server keep the socket open and begin using a message-based protocol to send and receive information. 

Please refer to [WebSocket Specification RFC 6455](https://tools.ietf.org/html/rfc6455) for a more in-depth understanding of the Handshake process.

### Start Request

```js
{
  "type": "start_request",
  "insightTypes": ["question", "action_item"],
  "config": {
    "confidenceThreshold": 0.9,
    "speechRecognition": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 16000
    }
  },
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
}
```

This is a request to start the processing after the connection is established. Right after this message has been sent, the audio should be streamed, any binary audio streamed before the receipt of this message will be ignored.

To get direct access to the mic, we are going to use an API in the WebRTC specification called `getUserMedia()`.

Once the code is running, start speaking and you should see the `message_response` and `insight_response` messages getting printed on the console.


<Tabs
  defaultValue="javascript"
  values={[
    { label: 'Javascript', value: 'javascript', }
  ]
}>

<TabItem value="javascript">

```js
const handleSuccess = function(stream) {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = function(e) {
    // convert to 16-bit payload
    const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.options.bufferSize);
    const targetBuffer = new Int16Array(inputData.length);
    for (let index = inputData.length; index > 0; index--)
        targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
    // Send to websocket
    if(ws.readyState === WebSocket.OPEN){
        ws.send(targetBuffer.buffer);
    }
  };
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

// Schedule the stop of the client after 2 minutes (120 sec)
setTimeout(() => {
  // Send stop request
  ws.send(JSON.stringify({
    "type": "stop_request"
  }));
  ws.close();
}, 120000);
```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

### Stop Message
```js
{
  "type": "stop_request"
}
```

### Modify Request​
The `modify_request` allows you to modify the request during Streaming API call, i.e., after the WebSocket connection has established, if there is a device change event. 

Using the `type` field with the supported value `modify_request`, you can update the sample rate and encoding based on the new device information in the same conversation itself.

```js
  setTimeout(() => {
        micInstance.stop();
        connection.sendUTF(JSON.stringify({
            "type": "modify_request",
            "speechRecognition": {
                "encoding": 'LINEAR16',
                "sampleRateHertz": 8000,
            },
        }));
        micInstance = mic({
            rate: '8000',
            channels: '1',
            debug: false,
            exitOnSilence: 6,
        });
        micInputStream = micInstance.getAudioStream();
        micInstance.start();
    }, 0.5 * 60 * 1000);
```

## Messages

### Message Formats
Client and server can both send messages after the connection is established. According to RFC 6455, WebSocket messages can have either text or a binary encoding. The two encodings use different on-the-wire formats. Each format is optimized for efficient encoding, transmission, and decoding of the message payload.

#### Text Message
Text messages over WebSocket must use UTF-8 encoding. Text message is the serialized JSON message. Every text message has a type field to specify the type or the purpose of the message.

#### Binary Message
Binary WebSocket messages carry a binary payload. For the Real-time API, audio is transmitted to the service by using binary messages. All other messages are the Text messages.

#### Client Messages
This section describes the messages that originate from the client and are sent to service. The types of messages sent by the client are `start_request`, `stop_request` and binary messages containing audio.

This is a request to stop the processing. After the receipt of this message, the service will stop any processing and close the WebSocket connection.

### Sending Binary Messages with Audio
The client needs to send the audio to Service by converting the audio stream into a series of audio chunks. Each chunk of audio carries a segment of audio that needs to be processed. The maximum size of a single audio chunk is 8,192 bytes.

### Service Messages
This section describes the messages that originate in Service and are sent to the client.

Service sends mainly two types of messages (`message_response`, `insight_response`) to the client as soon as they're available.

### Message Response
The `message_response` contains the processed messages as soon as they are ready and available, in the processing of the continuous audio stream. This message does not contain any insights.

Example of the `message_response` object:


```js
{
  "type": "message_response",
  "messages": [
    {
      "from": {
        "name": "Jane",
        "userId": "jane.doe@example.com"
      },
      "payload": {
        "content": "I was very impressed by your profile, and I am excited to know more about you.",
        "contentType": "text/plain"
      }
    },
    {
      "from": {
        "name": "Jane",
        "userId": "jane.doe@example.com"
      },
      "payload": {
        "content": "So tell me, what is the most important quality that you acquired over all of your professional career?",
        "contentType": "text/plain"
      }
    }
  ]
}
```

### Insight Response
The `insight_response` contains the insights from the ongoing conversation as soon as they are available. This message does not contain any messages.



Example of the `insight_response` object

```js
{
  "type": "insight_response",
  "insights": [
    {
      "type": "question",
      "text": "So tell me, what is the most important quality that you acquired over all of your professional career?",
      "confidence": 0.9997962117195129,
      "hints": [],
      "tags": []
    },
    {
      "type": "action_item",
      "text": "Jane will look into the requirements on the hiring for coming financial year.",
      "confidence": 0.9972074778643447,
      "hints": [],
      "tags": [
        {
          "type": "person",
          "text": "Jane",
          "beginOffset": 0,
          "value": {
            "value": {
              "name": "Jane",
              "alias": "Jane",
              "userId": "jane.doe@symbl.ai"
            }
          }
        }
      ]
    }
  ]
}
```

## Using Trackers

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Symbl provides a real-time Streaming API for processing audio content in real-time. You can also capture Trackers for a conversation in real-time. For more details on Trackers, refer to the [Trackers](/docs/concepts/trackers) documentation. 

Below is an example that shows how to pass Trackers in the `config` object for the `startRealtimeRequest` of the Symbl’s JavaScript SDK. This example also shows how to consume the results of the detected Trackers in real-time.

Below is the code snippet:

```js
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
        sampleRateHertz: 48000,
        trackers: {
            "interimResults": true,
            "enableAllTrackers": true 
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
})
```

Let’s go over all the parameters passed in the configuration object in the above function:

1. `id`: A unique UUID that represents the users' session.

2. `insightType`: The types of **Insights** to be detected for this conversation.

3. `trackers`: The **Trackers** to be detected in real-time for that conversation.<!--  Follows the same structure as shown in the Trackers section. -->

4. `config`: The `config` object encapsulates the metadata for the WebSocket API session.

  a. `meetingTitle`: The title for this conversation or meeting.

  b. `confidenceThreshold`:  The **Insights** having confidence scores greater than this threshold will be the ones detected for the conversation.

  c. `sampleRateHertz`: The sample rate of the incoming audio data which is being pushed to Symbl.

  d. `trackers.interimResults`| The `interimResults` flag tells Symbl to send the tracker results as soon as they are detected. If `false`, the tracker results are detected for the finalized transcription responses.
  
  e. `trackers.enableAllTrackers`| The `enableAllTrackers` parameter must be sent to detect all the Trackers. The purpose of this flag is to enable detection of all the Trackers created with the Management API that maintains your entities with Symbl at the account level.

5. `speaker`: The details of the speaker in this conversation.

  a. `userId`: Unique identifier to represent the user.

  b. `name`: The name of the user.

6. `handlers`: The object encapsulating the call-back functions to be invoked on detection of those specific entities. For more information on various other handlers, check out the [Javascript SDK Reference](/docs/javascript-sdk/reference#event-handlers-1).

  a. `onTrackerResponse`: This function is invoked when Symbl detects a Tracker in real-time. The structure of the **Tracker** object is shown in the above code snippet.

### Tracker Response

The following response is returned when Tracker object is passed in the Streaming API:

```js
"trackers":[
      {
         "name":"Documents Tracker",
         "matches":[
            {
               "type":"vocabulary",
               "value":"Documents",
               "messageRefs":[
                  {
                     "id":"53867534-0459-4d22-b590-984ee82166aa",
                     "text":"Anyways, so I will submit documents tomorrow.",
                     "offset":26
                  },
                  {
                     "id":"4d20d90c-50a7-4594-bb10-2995dcd4bbd1",
                     "text":"I will submit documents tomorrow.",
                     "offset":14
                  }
               ],
            }
```

Field Name  | Description 
---------- | ------- |  
`name` | The name of the Tracker detected. | 
`matches` | Array of match objects which contain the references to messages and insights detected in that conversation. |
`type` | The match type for the text. In the above example, the match is of type `vocabulary`. |
`value` | The textual value of the vocabulary for which this match was detected. |
`messageRefs` | Array of messages for which this Tracker was detected. |
`messageRefs.id`| The unique identifier of the message. |
`messageRefs.text` | The text body of the message. |
`messageRefs.offset`| The closest match of the text in the message. Offset of -1 means that an exact match for that specific vocabulary wasn’t found and this was the similar match. An offset value greater than 0 indicates an exact match for the tracker in the payload of the message.


### Streaming API Logs

You can view the logs of your Streaming API request on your Symbl Platform account. To view the logs, sign in to [Symbl Platform](https://platform.symbl.ai/#/login). The logs provide the following details:

- Connection ID

- Conversation ID

- Log details 

  - Date of Creation

  - Log Type (Start request, Conversation created, Started listening, Recognition started, Stop request, etc.)

- Ability to search for old logs

- Ability to filter logs with dates 

- Ability to filter logs with only errors.

![image-api-logs](/img/streaming-api-logs.png)