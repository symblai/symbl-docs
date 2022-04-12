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

The Web SDK allows you to add Symbl’s Conversation Intelligence into your JavaScript application directly into the browser. It provides a pre-defined set of classes for easy utilization of our APIs.

:::info
The Web SDK is currently available with Symbl’s Streaming and Subscribe APIs. 
:::

### Supported Browsers
The following web browser supported with the Web SDK are given below: 

Operating System | Chrome | Edge | Firefox | Safari | ------ 
---------- | ------- | ------- | ------
macOS | ✅ | - | ✅ | ✅ | 
Windows | ✅ | ✅ | ✅ | ✅ |
Linux| ✅ | - | ✅ | ✅ | 


:::caution note 
Currently, the OPUS encoder support in Safari browser is not available. 
:::

### Supported Languages
- JavaScript
- TypeScript

### Prerequisites 

Following are the prerequisites for using the Web SDK:

- **App ID and Secret**: Ensure that you have your API Credentials which are the App ID and App Secret handy. You can get them from the [Symbl Platform](https://platform.symbl.ai/#/login). Alternatively, you can use your access token for authentication as well, see the [Authentication](https://docs.symbl.ai/docs/developer-tools/authentication/) page to learn more.
- **`npm` package manager**: Install the latest version of the `npm` package manager (Version 6.0.0 +).

### Installation

**Using npm**

Install the Web SDK using `npm` with the following command:

```shell
npm i  @symblai/symbl-web-sdk
```

:::note
You must have the latest version of npm package installed. If you don’t have it, run the following commands to get the latest: 
```shell
npm install
```
:::

### Initialization
To initialize the Web SDK, you can pass in an access token generated using [Symbl’s Authentication method](https://docs.symbl.ai/docs/developer-tools/authentication/). Alternatively, you can use the App ID and App Secret from the [Symbl Platform](https://platform.symbl.ai). Using the App ID and App Secret is not meant for production usage, as those are meant be secret.


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
  defaultValue="es5"
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
import { Symbl } from '@symblai/symbl-web-sdk';
const symbl = Symbl({
  accesssToken: '<YOUR ACCESS TOKEN>'
});

```
</TabItem>
</Tabs>

### Configuration

The following code shows an example configuration for Web SDK. All fields are optional: 

```js
{
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
 
 
#### Configuration Parameters 
You can pass any of the following `config` parameters:

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | Optional  | >=0.5 to <=1.0 | 0.5 | Minimum confidence score that you can set for an API to consider it as valid insight. The minimum confidence score should be in the range >=0.5 to <=1 (greater than or equal to `0.5` and less than or equal to `1.0`.). Default value is `0.5`.
```speechRecognition``` | Optional | | | See Speech Recognition details on the [Speech Recognition](https://docs.symbl.ai/docs/streaming-api/api-reference/#speech-recognition) section.
```meetingTitle``` | Optional | | | The name of the meeting.

For more information, read the [Request Parameters](https://docs.symbl.ai/docs/streaming-api/api-reference/#request-parameters) section of the Streaming API. 

### Usage
You can use the Web SDK to perform the following capabilities. These capabilities are Streaming API:

#### Open a New Connection
To create a new connection, call the function createConnection. If no userId is passed, a UUID is generated for you. After the connection is successful, the connected callback is fired.

```js
const connection = await symbl.createConnection(userId);
```

#### Start Processing Audio Data
Once a connection is established, you can start processing the audio data by calling the function startProcessing, as shown below. By default, startProcessing will connect your default audio input device to Symbl and start processing audio. startProcessing takes connectionConfig which is the same config defined in the Configuration section.

```js
await connection.startProcessing(connectionConfig);
```
 
#### - Open a New Connection and Start Processing 
If you want to skip multiple steps, and open a new connection and start processing audio in one go, you can make use of the `createAndStartNewConnection` as shown below. This takes `connectionConfig` which is the same `config` defined in the [Configuration](#configuration) section.

```js
const connection = await symbl.createAndStartNewConnection(connectionConfig);
```

#### Stop Processing Audio

To stop processing audio, use the `connection.stopProcessing()` method, as shown below. This puts the connection back into non-processing mode. If the `disconnectOnStopRequest` config is `false`, the connection can be started again later. If not, a new connection has to be made.

```js
await connection.stopProcessing();
```
 
#### Close a Connection
To disconnect from the WebSocket permanently, call the function connection.disconnect as shown below. This will completely sever the connection and if you wish to establish the connection again, a new one would have to be created.

```js
await connection.disconnect();
```

#### Create a Hello World Application
To create a simple “Hello World” application with Symbl Web SDK, use the code given below:

```js
import { Symbl } from "@symblai/symbl-web-sdk";
 
try {
    const symbl = new Symbl();
    await symbl.init({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
    });
     
    const connection = await symbl.createConnection();
    await connection.startProcessing({
      config: {
        encoding: "OPUS"
      }
    });
     
    await symbl.wait(10000);
     
    await connection.stopProcessing();
    await connection.disconect();
} catch(e) {
    // Handle errors here.
}
``` 

#### Subscribe to Stream
You can subscribe to an on-going stream and get live transcripts and Conversation insights with `subscribeToConnection(id)` as shown below. You must have the conversation ID to subscribe to a stream:

```js
const subscription = await symbl.subscribeToConnection(id);
``` 
#### Disconnect from Stream
To stop subscribing to events, you can disconnect from the Subscribe object using the code given below. You will not be able to see the transcription and insights once the stream is disconnected.

```js
await subscription.disconnect()
```

### Events
The `on` method available with the connection and subscription objects (example, `connection.on` and `subscription.on` allows you to listen to data from the Streaming API. 

```js
connection.on("topic", (topicData) => {
  // Callback logic here
});
 
connection.on("disconnected", () => {
  alert("User has been disconnected")
});
```
 
Listeners can be enabled for the following events:

| Event                       | Description                                                                       | Code Snippet                                                                                                                                                                |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connected`                   | When the WebSocket connection is successfully established.                        | `connection.on("connected", (data) => {            console.log("connected", data);});`                                                                                        |
| `disconnected`                | When the WebSocket connection is disconnected.                                    | `connection.on("disconnected", (data) => {          console.log("disconnected", data);});`                                                                               |
| `started_listening`          | Started listening to input device.                                                | `connection.on("started_listening", (data) => {     console.log("started_listening", data);});`                                                                      |
| `stopped_listening`          | Stopped listening to input device.                                                 | `connection.on("stopped_listening", (data) => {      console.log("stopped_listening", data);});`                                                                     |
| `processing_started`         | Audio data processing successfully started.                                       | `connection.on("processing_started", (data) => {     console.log("processing_started", data);});`                                                                     |
| `processing_stopped`         | Audio data processing stopped.                                                    | `connection.on("processing_stopped", (data) => {       console.log("processing_stopped", data);       });`                                                                |
| `conversation_created`       | Conversation is created and an ID is generated.                                   | `connection.on("conversation_created", (data) => {          console.log("conversation_created", data); }); `                                                                |
| `conversation_completed`     | Conversation is ended.                                                            | `connection.on("conversation_completed", (data) => {           console.log("conversation_completed", data);});`                                                             |
| `error`                       | Errors recorded when there are potential anti-patterns or non-recommended coding. | `window.addEventListener("error", (data) => {console.log("error", data);});`                                                                            |
| `speech_recognition`         | When data is being transferred between the client and server                      | `connection.on("speech_recognition", (data) => {             console.log("speech_recognition", data);             console.log(data.punctuated.transcript);});` |
| `message`                     | When the message object is detected.                                              | `connection.on("message", (data) => {             console.log("message", data);});`                                                                                           |
| `topic`                       | When topics are detected.                                                         | `connection.on("topic", (data) => { console.log("topic", data);});`                                                                                                           |
| `tracker`                     | When Trackers are detected.                                                       | `connection.on("tracker", (data) => { console.log("tracker", data);}); `                                                                                                      |
| `action_item`                | When Action Items are detected.                                                   | `connection.on("action_item", (data) => { console.log("action_item", data); });`                                                                                            |
| `follow_up`                  | When follow-ups are detected.                                                     | `connection.on("follow_up", (data) => { console.log("follow_up", data);});`                                                                                                 |
| `question`                    | When questions are detected.                                                      | `connection.on("question", (data) => { console.log("question", data);});`                                                                                                    |
| `audio_source_connected`    | The audio source is connected to Symbl.                                           | `connection.audioStream.on('audio_source_connected', (data) => { console.log('audio_source_connected', data);});`                                                         |
| `audio_source_disconnected` | The audio source is connected.                                                    | `connection.audioStream.on("audio_source_disconnected", (data) => {console.log("audio_source_disconnected", data);});`                                                  |
| `audio_source_changed`      | A new default device is detected                                                  | `connection.audioStream.on(“audio_source_changed”, () => {});`                                                                                                              |
### Known Issues

In this version of the Web SDK, a few Known Issues have been observed. You can see the complete list of Known Issues [here](/docs/changelog/#known-issues).
### Read more

- [Getting Live Transcripts and Conversation Intelligence](/docs/web-sdk/web-sdk-getting-live-transcripts/)
- [Sending external Audio Streams](/docs/web-sdk/web-sdk-sending-external-audio-streams/)
- [Updating Audio Source Mid-Stream](/docs/web-sdk/web-sdk-updating-audio-streams/)
