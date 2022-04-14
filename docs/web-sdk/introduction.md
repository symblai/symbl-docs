---
id: web-sdk
title: Symbl Web SDK 
sidebar_label: Introduction
slug: /web-sdk/overview/
pagination_label: Web SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The Web SDK is a Typescript application that allows you to add Symbl’s Conversation Intelligence into your JavaScript application directly into the browser. It provides a pre-defined set of classes for easy utilization of our Streaming and Subscribe APIs.

:::info
The Web SDK is currently available with Symbl’s Streaming and Subscribe APIs. 
:::

## Supported Browsers
The following web browser supported with the Web SDK are given below: 

Operating System | Chrome | Edge | Firefox | Safari |
---------- | ------- | ------- | ------ | ------ |
macOS | ✅ | - | ✅ | ✅ | 
Windows | ✅ | ✅ | ✅ | ✅ |
Linux| ✅ | - | ✅ | ✅ | 


:::caution note 
Currently, the OPUS encoder support in Safari browser is not available. 
:::

## Prerequisites

Before using the Web SDK you must [Sign up with Symbl.ai](https://platform.symbl.ai) to generate your own App ID and App Secret values, which is used for authentication.

## Installation

### Using npm

Install the Web SDK using `npm` with the following command:

```shell
npm i  @symblai/symbl-web-sdk
```

### CDN

You can also import the file into your HTML appliaction using our CDN.\

#### Versioned CDN

```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/v1.0.0/symbl.min.js"></script>
```

#### Latest CDN

```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/latest/symbl.min.js"></script>
```

You would then access the `Symbl` class via the `window` method:

```js
const Symbl = window.Symbl;
const symbl = new Symbl({
  accessToken: "< YOUR ACCESS TOKEN >"
});
```

:::note
For production environemtns we recommend using the Versioned CDN.
:::

## Authentication

To initialize the Web SDK, you can pass in an access token generated using [Symbl’s Authentication method](https://docs.symbl.ai/docs/developer-tools/authentication/). Alternatively, you can use the App ID and App Secret from the [Symbl Platform](https://platform.symbl.ai). **Using the App ID and App Secret is not meant for production usage, as those are meant be secret.**


The code given below initializes the Web SDK:

```js
await symbl.init({
    accessToken: '<your Access Token>'
    // appId: '<your App ID>', // Should only be used for development environment
    // appSecret: '<your App Secret>', // Should only be used for development environment
    // basePath: '<your custom base path>',// optional
    // logLevel: 'debug' // Sets which log level you want to view
});
```
You can import the Web SDK in ES5 and ES6 syntax:

<Tabs
  defaultValue="es6"
  values={[
    { label: 'ES5', value: 'es5', },
    { label: 'ES6', value: 'es6', },
  ]
}>

<TabItem value="es5">

```js
const {Symbl} = require('@symblai/symbl-web-sdk');
const symbl = Symbl({
  accesssToken: '<YOUR ACCESS TOKEN>'
});
```

 </TabItem>

<TabItem value="es6">

```js
import {Symbl} from '@symblai/symbl-web-sdk';
const symbl = Symbl({
  accesssToken: '<YOUR ACCESS TOKEN>'
});
```
</TabItem>
</Tabs>

## Getting Started

In order to get started with the Symbl Web SDK we will start with a basic Hello World implementation

### Create a Hello World Application

This example will open up a WebSocket connection with the Symbl Streaming API and start processing audio data from the default input device. After 60 seconds the audio will stop being processed and the WebSocket connection will be closed. This is basic usage of the Symbl Streaming API simplified into a few lines a code.

```js
import { Symbl } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });
    
    // Open a Symbl Streaming API WebSocket Connection.
    const connection = await symbl.createConnection();
    
    // Start processing audio from your default input device.
    await connection.startProcessing({
      config: {
        encoding: "OPUS" // Encoding can be "LINEAR16" or "OPUS"
      }
    });

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });

    // Retrieve the topics of the conversation in real-time.
    connection.on("topic", (topicData) => {
      topicData.forEach((topic) => {
        console.log("Topic: " + topic.phrases);
      });
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);
    
    // Stops processing audio, but keeps the WebSocket connection open.
    await connection.stopProcessing();
    
    // Closes the WebSocket connection.
    connection.disconect();
} catch(e) {
    // Handle errors here.
}
```

### Subscribing to an existing connection

You can use the [`subscribeToConnection`](#subscribetoconnectionsessionid-string) method to subscribe to an existing connection using the Subscribe API.

```js

import { Symbl } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });
    
    // Open a Symbl Streaming API WebSocket Connection.
    const connection = await symbl.subscribeToConnection("<YOUR SESSION ID>");

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);;
    
    // Closes the WebSocket connection.
    connection.disconect();
} catch(e) {
    // Handle errors here.
}

```

### Using an external AudioStream

You can use an external [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) using the Web SDK [AudioStream](#audiostream-class) interface

```js

import { Symbl, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });

    // Boilerplate code for creating a new AudioContext and MediaStreamAudioSourceNode
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const sampleRate = stream.getAudioTracks()[0].getSettings().sampleRate;
    const context = new AudioContext({ sampleRate });
    const sourceNode = context.createMediaStreamSource(stream);

    // Creating a new AudioStream
    const audioStream = new LINEAR16AudioStream(sourceNode);
    
    // Open a Symbl Streaming API WebSocket Connection.
    const connection = await symbl.createAndStartNewConnection({
      config: {
        encoding: "LINEAR16",
        sampleRateHertz: sampleRate
      }
    }, audioStream);

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);
    
    // Stops processing audio, but keeps the WebSocket connection open.
    await connection.stopProcessing();
    
    // Closes the WebSocket connection.
    connection.disconect();
} catch(e) {
    // Handle errors here.
}

```

### Processing data from an audio file

You can process audio from an audio file using the [`attachAudioSourceElement`](#attachaudiosourceelementaudiosourcedomelement) method on the [AudioStream](#audiostream-class)

:::caution note 
Currently, only LINEAR16 encoding is supported for audio elements. Opus support will be addressed in a later update.
:::


```js

import { Symbl, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });

    // Create your audio element
    const myAudioElement = new Audio();
    myAudioElement.type = "audio/mp3";
    myAudioElement.src = "link-to-file.mp3";

    // Attach audio element to AudioStream
    const audioStream = new LINEAR16AudioStream();
    audioStream.attachAudioSourceElement(myAudioElement);

    // Create connection and start processing audio
    const connection = symbl.createConnection("abc123", audioStream);
    connection.startProcessing({
      config: {
        encoding: "LINEAR16"
      }
    });

    // Play the element once audio is ready to be processed.
    connection.on("processing_started", () => {
      myAudioElement.play();
    });

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);
    
    // Stops processing audio, but keeps the WebSocket connection open.
    await connection.stopProcessing();
    
    // Closes the WebSocket connection.
    connection.disconect();
} catch(e) {
    // Handle errors here.
}

```

## Configurations Reference

### Connection Configuration

The following code shows an example connection configuration for Web SDK. The connection configuration is passed into the Streaming API connection during the [`startProcessing`](#startprocessingoptions-streamingapiconnectionconfig) method. 

```js
const connectionConfig = {
  id: "bd82dd08-ad93-4549-827c-3f646647ae61",
  disconnectOnStopRequest: false,
  disconnectOnStopRequestTimeout: 1800,
  noConnectionTimeout: 900,
  insightTypes: ["follow_up", "action_item", "question"],
  config: {
      meetingTitle: "Mic Test", // Name for meeting
      confidenceThreshold: 0.7, //Minimum confidence score set for the API to consider an insight as valid.
      timezoneOffset: 480, // Offset in minutes from UTC
      languageCode: "en-US",
      encoding: "OPUS",// Also supports LINEAR16
      sampleRateHertz: 48000 // Rate of the incoming audio stream. Make sure the correct sample rate is provided for best results
  },
  trackers: [{
      name: "Promotion Mention", // Name of the Tracker
      vocabulary: ["We have a special promotion going on", "We have a sale right now on", "offer"] // Words or phrases that should be tracked
  }],
  speaker: {
      userId: "john@example.com", // Unique identifier of the speaker
      name: "john"
  }
}
```

You can pass any of the following connection configuration parameters:

    
Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
```id``` | Optional* | Should match this regex: `/^[\da-z]{64,128}$/i` | The ID for the current session. *If not provided, a UUID will be generated for you.
```insightTypes``` | Optional | action_item, question | Types of insights to return. If not provided, no insights will be returned.
```customVocabulary``` | Optional | List of String | An array of strings containing vocabulary specific to your company, products, or phrases. 
```config``` | Optional | Find the supported value [here](#config) | Configuration for this request. [See the config section below for more details](#config).
```speaker``` | Optional  | Find the supported value [here](#speaker) | Speaker identity to use for audio in this WebSocket connection. If omitted, no speaker identification will be used for processing. [See the speaker section below for more details](#speaker).
```trackers``` | Optional | List of Trackers | An array of trackers. [See the trackers section below for more details](#trackers).
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
  "trackers": [] // See Trackers section below.
}
```

---


#### <a name="config"></a>Config

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | false  | <=0.5 to <=1.0 | 0.5 | Minimum confidence score that you can set for an API to consider it as valid insight. The minimum confidence score should be in the range >=0.5 to <=1 (greater than or equal to `0.5` and less than or equal to `1.0`.). Default value is `0.5`.
```encoding``` | false  | `LINEAR16`, `Opus` | `LINEAR16` | Audio Encoding in which the audio will be sent over the WebSocket.
```sampleRateHertz  ``` | false  |  | `16000` | The rate of the incoming audio stream.
```meetingTitle``` | false | | | The name of the meeting.

##### <a name="config-example"></a>Code Example

```js
{
  "config": {
    "confidenceThreshold": 0.9,
    // "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "meetingTitle": "Client Meeting",
    "encoding": "LINEAR16",
    "sampleRateHertz": 16000 // Make sure the correct sample rate is provided for best results
  }
}
```

---


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

---
    
#### <a name="trackers"></a> Trackers
 
Field  | Required | Supported Value
---------- | ------- |  -------
```name``` | Optional | The name acts as a unique identifier assigned to the Tracker. It is case-sensitive, which means that a Tracker can be created with the same name but with different cases.
```vocabulary``` | Optional | The vocabulary contains a set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts. 
    
##### Code Example
    
```js
{
    trackers: [
        {
            name: "Goodness",
            vocabulary: [
                "This is awesome",
                "I like it",
                "I love this"
            ]
        }
    ]
}
```

---

#### Full Code Example

```js
const connectionConfig = {  
  "disconnectOnStopRequest": false,
  "disconnectOnStopRequestTimeout": 1800,
  "noConnectionTimeout": 1800,
  "insightTypes": ["question", "action_item"],
  "config": {
    "confidenceThreshold": 0.9,
    "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "encoding": "LINEAR16",
    "sampleRateHertz": 44100, // Make sure the correct sample rate is provided for best results
    "meetingTitle": "Client Meeting"
  },
  "trackers": [
    {
        "name": "Goodness",
        "vocabulary": [
            "This is awesome",
            "I like it",
            "I love this"
        ]
    }
  ],
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
};
 ```

### Symbl Config

Field  | Required | Supported Value
---------- | ------- |  -------
```accessToken``` | Optional* | The access token generated using [Symbl’s Authentication method](https://docs.symbl.ai/docs/developer-tools/authentication/). Recommended method for production environments. *Cannot be paired with `appId` or `appSecret`.
```appId``` | Optional* | The App ID from the [Symbl Platform](https://platform.symbl.ai). We only recommend using this on non-production environments. *Must be paired with `appSecret`.
```appSecret``` | Optional* | The App Secret from the [Symbl Platform](https://platform.symbl.ai). We only recommend using this on non-production environments. *Must be paired with `appId`.
```basePath``` | Optional | The base path of the Symbl API. By default it is `https://api.symbl.ai`.
```logLevel``` | Optional | The log level you wish to view in the console. Supported values are `error`,`warn`,`debug`,`info`,`log`,`trace`.


## Events / Callbacks

Both the conection and audio stream objects have an [`on`](#startprocessingoptions-streamingapiconnectionconfig) method which can be used to subscribe to events and perform callbacks.

### Connection Events

Listeners can subscribe to the following events on the Connection object:

#### Example

```js
connection.on("topic", (topicData) => {
  topicData.forEach((topic) => {
    console.log("Topic: " + topic.phrases);
  });
});
 
connection.on("disconnected", () => {
  console.log("User has been disconnected")
});
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connected`                   | When the WebSocket connection is successfully established.                        | None                                                                                        |
| `disconnected`                | When the WebSocket connection is disconnected.                                    | None                                                                               |
| `started_listening`          | Started listening to input device.                                                | None                                                                      |
| `stopped_listening`          | Stopped listening to input device.                                                 | None                                                                     |
| `processing_started`         | Audio data processing successfully started.                                       | None                                                                     |
| `processing_stopped`         | Audio data processing stopped.                                                    | None                                                                |
| `conversation_created`       | Conversation is created and an ID is generated.                                   | None                                                               |
| `conversation_completed`     | Conversation is ended.                                                            | None                                                             |
| `speech_recognition`         | When data is being transferred between the client and server                      | [Speech Recognition Object](#speech-recognition-object) |
| `message`                     | When the message object is detected.                                              | [Message Response Object](#message-response-object)                                                                                          |
| `topic`                       | When topics are detected.                                                         | [Topic Response Object](#topic-response-object)                                                                                                          |
| `tracker`                     | When Trackers are detected.                                                       | [Tracker Response Object](#tracker-response-object)                                                                                                       |
| `action_item`                | When Action Items are detected.                                                   | [Action Item Response Object](#action-item-response-object)                                                                                          |
| `follow_up`                  | When follow-ups are detected.                                                     |  [Follow Up Response Object](#action-item-response-object)                                                                                                 |
| `question`                    | When questions are detected.                                                      | [Question Response Object](#action-item-response-object)                                                                                                    |

### AudioStream Events

Listeners can subscribe to the following events on the Connection object:

#### Example

```js
const audioStream = new OPUSAudioStream();
audioStream.on("audio_source_disconnected", () => {
  // Do something.
});

// OR 

connection.audioStream.on("audio_source_disconnected", () => {
  // Do something.
});
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audio_source_connected`    | The audio source is connected to Symbl.                                           | Returns the sample rate of the new audio source                                                         |
| `audio_source_disconnected` | The audio source is connected.                                                    | None                                                 |
| `audio_source_changed`      | A new default device is detected                                                  | None

### Global Events

Listeners can subscribe to the following global Symbl Events using the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object.

#### Example

```js
window.addEventListener("error", (error) => {
  const thrownError = error.detail;

  // Do something.
})
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `error`                       | Errors recorded when there are potential anti-patterns or non-recommended coding. | The Error Object that was thrown. Will be found in the `callbackData.detail`. 


### Callback Data Reference

#### Speech Recognition Object

To retrieve the real-time transcription results as soon as they are detected. You can use this callback to render live transcription which is specific to the speaker of this audio stream.

```js
connection.on("speech_recognition", (speechData) => {
  // Handle speechData here.
});
```

####  JSON Response Example

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

---

#### Message Response Object

This callback function contains the "finalized" transcription data for this speaker and if used with multiple streams with other speakers this callback would also provide their messages.

The "finalized" messages mean that the automatic speech recognition has finalized the state of this part of transcription and has declared it "final". Therefore, this transcription will be more accurate than the [Speech Recognition Object](#speech-recognition-object).

```js
connection.on("message", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

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

---

#### Action Item Response Object

This callback provides you with any of the detected action items in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's action items in case of multiple streams.

```js
connection.on("action_item", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
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

---

#### Question Response Object

This callback provides you with any of the detected questions in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's questions in case of multiple streams.

```js
connection.on("question", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[
  {
    "id": "e0e44c21-c965-47b0-92d9-878ac22302ae",
    "confidence": 0.9834683553122807,
    "hints": [
      {
        "key": "confidenceScore",
        "value": "0.9957259328650095"
      },
      {
        "key": "comprehensionScore",
        "value": "0.971210777759552"
      }
    ],
    "type": "question",
    "assignee": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654003",
      "name": "Jane Doe",
      "userId": "user@example.com"
    },
    "tags": [],
    "dismissed": false,
    "payload": {
      "content": "How may I help you today?",
      "contentType": "text/plain"
    },
    "from": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654003",
      "name": "Jane Doe",
      "userId": "user@example.com"
    },
    "entities": null,
    "messageReference": {
      "id": "79a57ed7-d043-4a82-85fc-ae7844d8d2bb"
    }
  }
]
```

---

#### Follow Up Response Object

This callback provides you with any of the detected follow ups in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's follow ups in case of multiple streams.

```js
connection.on("follow_up", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[
  {
    "id": "05bfb176-c2d3-42fd-a7e7-bbc80596a3e9",
    "confidence": 1,
    "hints": [
      {
        "key": "addressedTo",
        "value": "[\"first_person_singular\",\"second_person_singular\"]"
      },
      {
        "key": "informationScore",
        "value": "0.7361413043478261"
      },
      {
        "key": "confidenceScore",
        "value": "1.0"
      }
    ],
    "type": "follow_up",
    "assignee": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
      "name": "Adam Voliva",
      "userId": "adam.symbl.test@gmail.com"
    },
    "tags": [
      {
        "type": "person",
        "text": "Adam Voliva",
        "beginOffset": 0,
        "value": {
          "value": {
            "name": "Adam Voliva",
            "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
            "assignee": true,
            "userId": "adam.symbl.test@gmail.com"
          }
        }
      }
    ],
    "dismissed": false,
    "payload": {
      "content": "Adam Voliva can send it internet service technician to your home.",
      "contentType": "text/plain"
    },
    "from": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
      "name": "Adam Voliva",
      "userId": "adam.symbl.test@gmail.com"
    },
    "entities": null,
    "messageReference": {
      "id": "05bfb176-c2d3-42fd-a7e7-bbc80596a3e9"
    }
  }
]
```

---

#### Topic Response Object

This callback provides you with any of the detected topics in real-time as they are detected.  As with the [Message Response Object](#message-response-object) this would also return every topic in case of multiple streams.

```js
connection.on("topic", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[{
  "id": "e69a5556-6729-11eb-ab14-2aee2deabb1b",
  "messageReferences": [{
    "id": "0df44422-0248-47e9-8814-e87f63404f2c",
    "relation": "text instance"
  }],
  "phrases": "auto insurance",
  "rootWords": [{
    "text": "auto"
  }],
  "score": 0.9,
  "type": "topic"
}]
```

---

#### Tracker Response Object

This callback provides you with any of the detected trackers in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every tracker in case of multiple streams.

```js
connection.on("tracker", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
{
  "type": "tracker_response",
  "isFinal": true,
  "trackers": [
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "This is awesome",
          "messageRefs": [
            {
              "id": "fa93aa64-0e8d-4697-bb52-e2916ca63192",
              "text": "This is awesome.",
              "offset": 0
            }
          ],
          "insightRefs": []
        },
        {
          "type": "vocabulary",
          "value": "Hello world",
          "messageRefs": [
            {
              "id": "8e720656-fed7-4b11-b359-3931c53bbcec",
              "text": "Hello world.",
              "offset": 0
            }
          ],
          "insightRefs": []
        }
      ]
    },
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "I like it",
          "messageRefs": [
            {
              "id": "193dc144-2b55-4214-b211-ab83bd3e4a2e",
              "text": "I love it.",
              "offset": -1
            }
          ],
          "insightRefs": []
        }
      ]
    }
  ],
  "sequenceNumber": 1
}
```


## SDK API Reference

### Symbl Class

The Symbl class takes in an optional [SymblConfig](#symbl-config). **If no config is passed, you must authenticate later using the `init` method.**

#### `init(symblConfig: SymblConfig)`

Validates and initializes Symbl with application configuration.

#### Example

```js
const symbl = new Symbl();
symbl.init({
  accessToken: '<Your Access Token>',
  // appId: '<Your App ID>',
  // appSecret: '<Your App Secret>',
})
```

---

#### `createConnection(sessionId?: string, audioStream?: AudioStream)`

Accepts an optional sessionId and an optional instance of [AudioStream](#audiostream-class).

Validates that SessionID is unique and then opens a Symbl Streaming API WebSocket connection.

Returns an instance of [StreamingAPIConnection](#streamingapiconnection-class).

#### Example

```js
const symbl = new Symbl();
const connection = symbl.createConnection("abc123");
```

---

#### `createAndStartNewConnection(options: StreamingAPIConnectionConfig, audioStream?: AudioStream)`

Accepts a required [Connection Config](#connection-configuration) object and an optional instance of [AudioStream](#audiostream-class).

Opens a new connection and starts processing audio.

Returns an instance of [StreamingAPIConnection](#streamingapiconnection-class).

#### Example

```js
const symbl = new Symbl();
const connection = symbl.createAndStartNewConnection({
  config: {
    encoding: "OPUS"
  }
});
```

---

#### `subscribeToConnection(sessionId: string)`

Accepts a required Session ID to subscribe to.

Establishes a Subscribe API connection with session ID.

Returns an instance of [SubscribeAPIConnection](#subscribeapiconnection-class)

#### Example

```js
const symbl = new Symbl();
const connection = symbl.subscribeToConnection(sessionId);
```

---

#### `wait(time: number, unit: string = TimeUnit.MS)`

Waits for provided amount of time in the supplied units (ms, s, min).

#### Example

```js
const symbl = new Symbl();
const connection = symbl.wait(5000);
```

### StreamingAPIConnection Class

The `StreamingAPIConnection` class represents a Streaming API WebSocket connection. In most instances you would be interfacing with this class from the return variable on [`createConnection`](#createconnectionsessionid-string-audiostream-audiostream) or [`createAndStartNewConnection`](#createandstartnewconnectionoptions-streamingapiconnectionconfig-audiostream-audiostream). You can also import it from the Web SDK and use it separately: `import { StreamingAPIConnection } from '@symblai/symbl-web-sdk';`. `StreamingAPIConnection` inherits from the `BaseConnection` base class.

#### `connect()`

Will open a Symbl Streaming API WebSocket connection. If already connected will log a warning. Once successfully connected, will send out the `connected` event.

##### Example

```js
const connection = await symbl.createConnection();
await connection.connect();
```

---

#### `disconnect()`

Disconnects from Symbl Streaming API WebSocket

##### Example

```js
connection.disconnect();
```

---

#### `startProcessing(options: StreamingAPIConnectionConfig)`

Accepts a required [Connection Config](#connection-configuration)

Triggers the streaming connection to begin processing audio through Symbl websocket

##### Example

```js
connection.startProcessing({
  config: {
    encoding: "OPUS"
  }
});
```

---

#### `stopProcessing()`

Triggers the streaming connection to stop processing audio through Symbl websocket. If `disconnectOnStopRequest` is set to `false` then the WebSocket will be put into a non-processing state which can be resumed later by calling `startProcessing` again. If `disconnectOnStopRequest` is not set or set to `true` the WebSocket connection will need to be re-opened to start processing audio again.

##### Example

```js
connection.startProcessing({
  config: {
    encoding: "OPUS"
  }
});
```

---

#### `on(eventName: EventTypes, callback: Function)`

Subscribe to an event and perform a callback when it's fired.

##### Example

```js
connection.on('connected', () => {
  console.log('I am connected!');
})
```

---

#### `getSessionId()`

Getter for the `sessionId`.

##### Example

```js
const sessionId = connection.getSessionId();
```

---

#### `isProcessing()`

Returns true if the connection is processing audio.

##### Example

```js
connection.isProcessing();
```

---

#### `isConnected()`

Returns true if connected to the WebSocket.

##### Example

```js
connection.isConnected();
```


#### `updateAudioStream(audioStream: AudioStream)`

Accepts an [AudioStream](#audiostream-class) instance.

Replaces the existin audio stream with the one provided. Will stop processing if currently processing audio.

##### Example

```js
const audioStream = new OpusAudioStream();
connection.updateAudioStream(audioStream);
```

### SubscribeAPIConnection Class

The `SubscribeAPIConnection` class represents a Subscribe API WebSocket connection. In most instances you would be interfacing with this class from the return variable on [`subscribeToConnection`](#subscribetoconnectionsessionid-string). You can also import it from the Web SDK and use it separately: `import { SubscribeAPIConnection } from '@symblai/symbl-web-sdk';`. `SubscribeAPIConnection` inherits from the `BaseConnection` base class.

#### `connect()`

Will open a Symbl Subscribe API WebSocket connection. If already connected will log a warning. Once successfully connected, will send out the `connected` event.

##### Example

```js
const connection = await symbl.createConnection();
await connection.connect();
```

---

#### `disconnect()`

Disconnects from Symbl Subscribe API WebSocket

##### Example

```js
connection.disconnect();
```

---

#### `on(eventName: EventTypes, callback: Function)`

Subscribe to an event and perform a callback when it's fired.

##### Example

```js
connection.on('connected', () => {
  console.log('I am connected!');
})
```

---

#### `isConnected()`

Returns true if connected to the WebSocket.

##### Example

```js
connection.isConnected();
```

### AudioStream Class

`LINEAR16AudioStream` and `OpusAudioStream` both inherit from the `AudioStream` base class, so their usage is identical. The main difference is `LINEAR16AudioStream` is meant to be paired with the `LINEAR16` encoding type, and the `OpusAudioStream` is meant to be paired with the `OPUS` encoding type.

#### `attachAudioDevice(deviceId: string, mediaStream: MediaStream)`

Accepts an optional [deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) and an optional [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream). If no `deviceId` is passed, the default device is used.

Attaches audio device either through default browser method creating a MediaStream or via a passed in MediaStream

##### Example

```js
audioStream.attachAudioDevice("my-device-id");
```

---

#### `detachAudioDevice()`

Disconnects processor to cleanly detach the audio input device.

##### Example

```js
audioStream.detachAudioDevice();
```

---

#### `updateAudioDevice(deviceId: string, mediaStream: MediaStream)`

Accepts an optional [deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) and an optional [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream). If no `deviceId` is passed, the default device is used.

Updates the audio device in use by the audio stream.

##### Example

```js
audioStream.updateAudioDevice("my-device-id");
```

---

#### `attachAudioSourceElement(audioSourceDomElement)`

Accepts a required [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Attaches an audio element to the processor and starts processing audio data from the audio file. In order to start processing you need to call `.play()` on the audio element. We recommend doing this after the `processing_started` Event has been fired.

:::caution note 
Currently, only LINEAR16 encoding is supported for audio elements. Opus support will be addressed in a later update.
:::


##### Example

```js
// Authenticate with Symbl
const symbl = new Symbl({
  accessToken: "< MY ACCESS TOKEN >"
});

// Create your audio element
const myAudioElement = new Audio();
myAudioElement.type = "audio/mp3";
myAudioElement.src = "link-to-file.mp3";

// Attach audio element to AudioStream
const audioStream = new LINEAR16AudioStream();
audioStream.attachAudioSourceElement(myAudioElement);

// Create connection and start processing audio
const connection = symbl.createConnection("abc123", audioStream);
connection.startProcessing({
  config: {
    encoding: "LINEAR16"
  }
});

// Play the element once audio is ready to be processed.
connection.on("processing_started", () => {
  myAudioElement.play();
});
```

---

#### `detachAudioSourceElement()`

Disconnects processor to cleanly detach the audio source element.

##### Example

```js
audioStream.detachSourceElement();
```

---

#### `updateAudioSourceElement(audioSourceDomElement)`

Accepts a required [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Updates the audio element attached to the audio stream.

:::caution note 
Currently, only LINEAR16 encoding is supported for audio elements. Opus support will be addressed in a later update.
:::

##### Example

```js
audioStream.updateAudioSourceElement(myAudioElement);
```

---




## Known Issues

In this version of the Web SDK, a few Known Issues have been observed. You can see the complete list of Known Issues [here](/docs/changelog/#known-issues).


## Read more

- [Getting Live Transcripts and Conversation Intelligence](/docs/web-sdk/web-sdk-getting-live-transcripts/)
- [Sending external Audio Streams](/docs/web-sdk/web-sdk-sending-external-audio-streams/)
- [Updating Audio Source Mid-Stream](/docs/web-sdk/web-sdk-updating-audio-streams/)
