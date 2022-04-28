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

This tutorial provides step-by-step instructions on how to receive live transcripts and Conversation Intelligence such as Action Items, Topics, Follow Ups, Questions, and Trackers using the Web SDK. 

### Prerequisites 

Following are the prerequisites for using the Web SDK:

- **App ID and Secret**: Ensure that you have your API Credentials which are the App ID and App Secret handy. You can get them from the [Symbl Platform](https://platform.symbl.ai/#/login). Alternatively, you can use your access token for authentication as well, see the [Authentication](https://docs.symbl.ai/docs/developer-tools/authentication/) page to learn more.
- **`npm` package manager**: Install the latest version of the `npm` package manager (Version 6.0.0 +).

See the list of web browsers supported in the [Browsers Supported](/docs/web-sdk/overview/#supported-browsers) section. 

### Install the Web SDK
#### Using npm 

Install the Web SDK using npm with the following command:

```shell 
npm i  @symblai/symbl-web-sdk
```
:::note
You must have the latest version of npm package installed. If you don’t have it, run the following commands to get the latest: 
```shell
npm install
```
:::

### Import and Initialize 
You can import the Web SDK in via Browser, ES5 and ES6 syntax using the following code:

<Tabs
  defaultValue="es6"
  values={[
    { label: 'ES6', value: 'es6', },
    { label: 'ES5', value: 'es5', },
    { label: 'Native JavaScript', value: 'js', },
  ]
}>

<TabItem value="es5">

```js
const {Symbl} = require('@symblai/symbl-web-sdk');
```

 </TabItem>

<TabItem value="es6">

```js
import {Symbl} from '@symblai/symbl-web-sdk';
```
</TabItem>

<TabItem value="js">

```js
import {Symbl} from window;
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
    // reconnectOnError: false // If true, will attempt to reconnect if disconnected via error.
});
```
### Create Connection and Start Processing Audio

The code below shows the configuration as well as the Streaming API functions that will enable you to start live connection and receive Conversation Intelligence: 

```js
// Open a Symbl Streaming API WebSocket Connection.
const connection = await symbl.createConnection();

// Start processing audio from your default input device.
await connection.startProcessing({
  insightTypes: ["question", "action_item", "follow_up"],
  config: {
    encoding: "OPUS" // Encoding can be "LINEAR16" or "OPUS"
  },
  speaker: {
    userId: "user@example.com",
    name: "Your Name Here"
  }
});
```

For more information on the configuration parameters, see [Configuration Reference](/docs/web-sdk/web-sdk-reference/configuration-reference/).
 

### Get Live Transcripts and Conversation Intelligence

The [`connection.on`](/web-sdk/web-sdk-reference/web-sdk-reference/#oneventname-eventtypes-callback-function) function retrieves live Transcripts and Conversation Intelligence like Topics, Action Items, Follow Ups, and Trackers. 

```js
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

// Retrive questions from the conversation in real-time.
connection.on("question", (questionData) => {
  console.log("Question Found: ", questionData["payload"]["content"]);
});
```

You can get the following Conversation Intelligence in real-time with the Web SDK:

- **[Get Transcripts](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#speech-recognition-object)**<br />
You can get live transcripts of the audio using this callback. 

- **[Get Finalized Transcripts](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#message-response-object)**<br />
You can get the "finalized" transcription data.

- **[Get Topics](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#topic-response-object)**<br />
Topics provide a quick overview of the key things that were talked about in the conversation.

- **[Get Action Items](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#action-item-response-object)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

- **[Get Follow-ups](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#follow-up-response-object)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

- **[Get Questions](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#question-response-object)**<br />
Any explicit question or request for information that comes up during the conversation. 

- **[Get Trackers](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#tracker-response-object)**<br />
Trackers allow you to identify messages that contain specific phrases or sentences. 

To learn more about the insight callbacks, see [Events and Callbacks Reference](docs/web-sdk/web-sdk-reference/events-and-callbacks/). 


### Waiting 60 seconds before disconnecitng

The `Symbl.wait` method is a helper method that will wait for the milliseconds you provide before moving on to the next line.

`Symbl.wait` is only meant for testing and should not be used in a production environment.

```js
// This is just a helper method meant for testing purposes.
// Waits 60 seconds before continuing to the next API call.
await Symbl.wait(60000);
```


### Stop Processing and Close Connection

The code given below stops the audio processing from your device and allows you to close the Streaming API WebSocket connection:


```js
// Stops processing audio, but keeps the WebSocket connection open.
await connection.stopProcessing();

// Closes the WebSocket connection.
connection.disconnect();
```

## Full Code Sample

To get everything to run you need to stick all this code inside an `async` method.

:::note
View the [Importing](#importing) section for the various ways to import the Web SDK.
:::

```js

(async () => {

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
        insightTypes: ["question", "action_item", "follow_up"],
        config: {
          encoding: "OPUS" // Encoding can be "LINEAR16" or "OPUS"
        },
        speaker: {
          userId: "user@example.com",
          name: "Your Name Here"
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

      // Retrive questions from the conversation in real-time.
      connection.on("question", (questionData) => {
        console.log("Question Found: ", questionData["payload"]["content"]);
      });
      
      // This is just a helper method meant for testing purposes.
      // Waits 60 seconds before continuing to the next API call.
      await Symbl.wait(60000);
      
      // Stops processing audio, but keeps the WebSocket connection open.
      await connection.stopProcessing();
      
      // Closes the WebSocket connection.
      connection.disconnect();
  } catch(e) {
      // Handle errors here.
  }

})();
```

For more information, read the [Request Parameters](https://docs.symbl.ai/docs/streaming-api/api-reference/#request-parameters) section of the Streaming API. 
