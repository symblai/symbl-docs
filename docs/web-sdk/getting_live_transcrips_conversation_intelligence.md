---
id: web-sdk-getting-live-transcripts
title: Getting Live Transcripts and Conversation Intelligence 
sidebar_label: Getting Live Transcripts and Conversation Intelligence 
slug: /web-sdk/web-sdk-getting-live-transcripts/
pagination_label: Getting Live Transcripts and Conversation Intelligence 
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This tutorial provides step-by-step instructions on how to receive live transcripts and Conversation Intelligence such as action items, topics, questions, trackers, and more using the Web SDK. 

### Prerequisites 

Following are the prerequisites for using the Web SDK:

- **App ID and Secret**: Ensure that you have your API Credentials which are the App ID and App Secret handy. You can get them from the [Symbl Platform](https://platform.symbl.ai/#/login). Alternatively, you can use your access token for authentication as well, see the [Authentication](https://docs.symbl.ai/docs/developer-tools/authentication/) page to learn more.
- **`npm` package manager**: Install the latest version of the `npm` package manager (Version 6.0.0 +).

See the list of web browsers supported in the [Browsers Supported](/docs/web-sdk/overview/#supported-browsers) section. 

### Step 1: Install the Web SDK
#### Using npm 

Install the Web SDK using npm with the following command:

```shell 
npm i  @symblai/symbl-web-sdk@1.0.0
```
:::note
You must have the latest version of npm package installed. If you don’t have it, run the following commands to get the latest: 
```shell
npm install
```
:::

### Step 2: Import and Initialize 
You can import the Web SDK in ES5 and ES6 syntax using the following code:

<Tabs
  defaultValue="es5"
  values={[
    { label: 'ES5', value: 'es5', },
    { label: 'ES6', value: 'es6', },
  ]
}>

<TabItem value="es5">

```js
var Symbl = require('@symblai/symbl-web-sdk');
var symbl = Symbl({
  accesssToken: '<YOUR ACCESS TOKEN>'
});
});
```

 </TabItem>

<TabItem value="es6">

```js
import Symbl from '@symblai/symbl-web-sdk';
var symbl = Symbl({
  accesssToken: '<YOUR ACCESS TOKEN>'
});

```
</TabItem>
</Tabs>

To initialize the Web SDK, you can pass in an access token generated using [Symbl’s Authentication mechanism](https://docs.symbl.ai/docs/developer-tools/authentication/). Alternatively, you can use the App ID and App Secret from the [Symbl Platform](https://platform.symbl.ai). Using the App ID and App Secret is not meant for production usage, as those are meant be secret.

```js
const symbl = new Symbl(({
    appId: '<your App ID>',
    appSecret: '<your App Secret>',
    // accessToken: '<your Access Token>', // Can be used instead of appId and appSecret
    // basePath: '<your custom base path>',// optional
    // logLevel: 'debug' // Sets which log level you want to view
});
```
### Step 3: Set Configuration and Start Connection
The code below shows the configuration as well as the Streaming API functions that will enable you to start live connection and receive Conversation Intelligence: 

```js
const connectionConfig = {
  disconnectOnStopRequest: false,
  disconnectOnStopRequestTimeout: 1800,
  noConnectionTimeout: 900,
  insightTypes: ["follow_up", "action_item"],
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
 
const connection = await symbl.createConnection(id)  //this creates connection with streaming API
 
await connection.startProcessing(connectionConfig) //this starts processing
```
#### Configuration Parameters 
You can pass any of the following `config` parameters:

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | Optional  | >=0.5 to <=1.0 | 0.5 | Minimum confidence score that you can set for an API to consider it as valid insight. The minimum confidence score should be in the range >=0.5 to <=1 (greater than or equal to `0.5` and less than or equal to `1.0`.). Default value is `0.5`.
```speechRecognition``` | Optional | | | See Speech Recognition details on the [Speech Recognition](https://docs.symbl.ai/docs/streaming-api/api-reference/#speech-recognition) section.
```meetingTitle``` | Optional | | | The name of the meeting.

For more information, read the [Request Parameters](https://docs.symbl.ai/docs/streaming-api/api-reference/#request-parameters) section of the Streaming API. 

