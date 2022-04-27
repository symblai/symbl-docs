---
id: get-real-time-sentiment-analysis
title: Live sentiment analysis
slug: /streamingapi/tutorials/get-real-time-sentiment-analysis-from-your-web-browser/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

In this guide you will learn how to get started with Symbl’s native Streaming API, which is our most accurate API for conversation analysis. Symbl's Streaming API is an API for enabling real-time conversational analysis on voice, video, or chat, or any live streaming directly through your web browser. If you have voice, video, or chat enabled, Symbl's API for streaming enables you to tap the raw conversational data of those streams. In addition to the setting up Symbl.ai's Streaming API, you create a function that logs sentiment analysis in real-time. Sentiment analysis operates through a call to the Message API with a query parameter. 

:::note 
The code sample you use today runs entirely in the browser without Node.js but requires you to understand HTTP requests.
:::
## Contents

In this guide you will learn the following:

* [Getting Started](#getting-started)
* [Create the WebSocket](#create-the-websocket)
  * [Set the WebSocket listeners](#set-the-websocket-listeners)
  * [Start the WebSocket connection](#start-the-websocket-connection)
* [Create the Audio Stream](#create-the-audio-stream)
  * [Handle the audio stream](#handle-the-audio-stream)
* [Stopping the WebSocket Connection](#stopping-the-websocket-connection)
* [Test](#test)
* [Grabbing the Conversation ID](#grabbing-the-conversation-id)
* [Logging Sentiments](#logging-sentiments)
* [Full Code Sample](#full-code-sample)



## Getting Started

The first thing you want to do is create the endpoint for the WebSocket to connect to. The WebSocket endpoint has two parts:

1. A unique meeting ID. The unique meeting ID is used to connect each client to the same namespace. It can be any string of your choosing.
2. A GET parameter named `access_token`. This is the access token generated during our [Authentication process](/docs/developer-tools/authentication).

Check the example below:


```js
/**
 * The JWT token you get after authenticating with our API.
 * Check the Authentication section of the documentation for more details.
 https://docs.symbl.ai/docs/developer-tools/authentication
 */
const accessToken = accessToken;
const uniqueMeetingId = btoa("user@example.com");
const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;
```
:::note Backward Compatibility
The previous endpoint  `wss://api.symbl.ai/v1/realtime/insights/` is now updated to `wss://api.symbl.ai/v1/streaming/` to standardize our API nomenclature. This change is backward compatible. However, we recommend you to use the new endpoint. 
:::

## Create the WebSocket

Now that you have constructed the endpoint, let's create a new WebSocket!

:::info
You can use JavaScript's API for WebSockets. For more info on JavaScript's API for WebSockets please see: https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
:::


```js
const ws = new WebSocket(symblEndpoint);
```
Before you connect the WebSocket to the endpoint you first want to subscribe to its event listeners so you don’t miss any messages.

### Set WebSocket listeners

```js
// Fired when a message is received from the WebSocket server
ws.onmessage = (event) => {
  // You can find the conversationId in event.message.data.conversationId;
  const data = JSON.parse(event.data);
  if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
  }
  if (data.type === 'message_response') {
    for (let message of data.messages) {
      console.log('Transcript (more accurate): ', message.payload.content);
    }
  }
  if (data.type === 'topic_response') {
    for (let topic of data.topics) {
      console.log('Topic detected: ', topic.phrases)
    }
  }
  if (data.type === 'insight_response') {
    for (let insight of data.insights) {
      console.log('Insight detected: ', insight.payload.content);
    }
  }
  if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
    console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
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
```

### Start the WebSocket connection

Once the connection has been opened you want to send this message to the WebSocket to start the connection to the Streaming API.


```js
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

:::info
Check out our guide on the [Best Practices for Audio Integrations with Symbl](https://symbl.ai/best-practices-for-audio-integrations-with-symbl/) to learn more about our audio encoding options.
:::

## Create the Audio Stream

Once the connection to the Streaming API is set up, the next step is creating an audio stream.
You can do this with the `Navigator` API by accessing `mediaDevices` and calling `getUserMedia`.
This will allow you to grant the browser access to your computer's microphone.


```js
const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
```
<aside class="">
Since you are processing audio data in this tutorial, you don’t need to request video device access.
</aside>

### Handle the audio stream

Now that you have granted access to the microphone you can actually use the
 WebSocket to handle the data stream so transcripts and insights can be analyzed in real-time.
 You can do this by creating a new `AudioContext` and using the microphones stream you retrieved
 from the Promise resolution above to create a new source and processor.


```js
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


## Stopping the WebSocket Connection

To stop the WebSocket connection once you're done, run this code in your web browser:

```js
// Stops the WebSocket connection.
ws.send(JSON.stringify({
  "type": "stop_request"
}));
```

## Test

To verify and check if the code is working open up your browser's development environment and copy the code directly into the console. You'll see the popup for microphone permissions and if you accept the application will start recording. Start speaking to see the results being logged to the console.

## Grabbing the Conversation ID

The Conversation ID is very useful for our other APIs such as the [Conversation API](/docs/conversation-api/introduction). We don't use it in this example because it's mainly used for non-real-time data gathering, but it's good to know how to grab it as you can use the Conversation ID later to extract the conversation insights.

If you look closely at the `onmessage` handler you can see how to get the Conversation ID:

```js
// Fired when a message is received from the WebSocket server
ws.onmessage = (event) => {
  // You can find the conversationId in event.message.data.conversationId;
  const data = JSON.parse(event.data);
  if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
  }
  if (data.type === 'message_response') {
    for (let message of data.messages) {
      console.log('Transcript (more accurate): ', message.payload.content);
    }
  }
  if (data.type === 'topic_response') {
    for (let topic of data.topics) {
      console.log('Topic detected: ', topic.phrases)
    }
  }
  if (data.type === 'insight_response') {
    for (let insight of data.insights) {
      console.log('Insight detected: ', insight.payload.content);
    }
  }
  if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
    console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
  }
  console.log(`Response type: ${data.type}. Object: `, data);
};
```

With the Conversation ID you can do each of the following (and more!):

**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Summary topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

In addition to being able to log topics, action items, or follow-ups, you can also log sentiments in real-time. Below you create a function for logging sentiments in real-time. 

## Logging Sentiments

The first step to creating a function for logging sentiments is to ensure that you log the `conversationId`. Earlier you log the `conversationId` through the following log: `console.log('conversationId', data.message.data.conversationId)`. 

Since the `ws.onmessage` method logs events, the events contain data. Through a parse of the event's message data, you access the `conversationId` :  `data.message.data.conversationId`

After parsing the event data, the next step is to cache the `conversationId`, you save the `conversationId` to a constant in JavaScript. 

```js
const conversationId = data.message.data.conversationId;
```

With the `conversationId` cached, you can set up a `POST` request to the Symbl's Conversation API's- Message API with a query parameter together with the cached `conversationId`.  

To create the `POST` request, 

1. Use an HTTP library. The library used here is `XMLHttpRequest()` but you are free to use any library you like. 
2. Set up the request, indicate the response type, the `POST` request type, and configure the headers. 
3. Create a log.
4. Configure the request to make a call to `.send()`. 

Here is the full sample of the function for logging sentiments in real-time over the WebSocket. 

```js

// Fired when a message is received from the WebSocket server
ws.onmessage = (event) => {// You can find the conversationId in event.message.data.conversationId;
const data = JSON.parse(event.data);
if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
    const conversationId = data.message.data.conversationId;console.log('onmessage event', event);

    // You can log sentiments on messages from data.message.data.conversationId 
    const request = new XMLHttpRequest();
    request.responseType = "text";
    const sentimentEndpoint = `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`;
    request.open("GET", sentimentEndpoint)
    request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange=(e)=> {console.log(request.responseText)}
    request.send()
    }

};
```

## Full Code Sample

Here's the complete code sample below which you can also [view on GitHub](https://github.com/symblai/real-time-speech-recognition-with-websockets):

```js
/**
 * The JWT token you get after authenticating with our API.
 * Check the Authentication section of the documentation for more details.
 */
const accessToken = ""
const uniqueMeetingId = btoa("user@example.com")
const symblEndpoint = `wss://api.symbl.ai/v1/streaming/${uniqueMeetingId}?access_token=${accessToken}`;

const ws = new WebSocket(symblEndpoint);

// Fired when a message is received from the WebSocket server
ws.onmessage = (event) => {
// You can parse the JSON data
const data = JSON.parse(event.data);

// You can find the conversationId in event.message.data.conversationId;
if (data.type === 'message' && data.message.hasOwnProperty('data')) {
    console.log('conversationId', data.message.data.conversationId);
    const conversationId = data.message.data.conversationId;console.log('onmessage event', event);

    // You can log sentiments on messages from data.message.data.conversationId 
    const request = new XMLHttpRequest();
    request.responseType = "text";
    const sentimentEndpoint = `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`;
    request.open("GET", sentimentEndpoint)
    request.setRequestHeader('Authorization', `Bearer ${accessToken}`);
    request.setRequestHeader('Content-Type', 'application/json');
    request.onreadystatechange=(e)=> {console.log(request.responseText)}
    request.send()
    }

  if (data.type === 'message_response') {
    for (let message of data.messages) {
      console.log('Transcript (more accurate): ', message.payload.content);
    }
  }
  if (data.type === 'topic_response') {
    for (let topic of data.topics) {
      console.log('Topic detected: ', topic.phrases)
    }
  }
  if (data.type === 'insight_response') {
    for (let insight of data.insights) {
      console.log('Insight detected: ', insight.payload.content);
    }
  }
  if (data.type === 'message' && data.message.hasOwnProperty('punctuated')) {
    console.log('Live transcript (less accurate): ', data.message.punctuated.transcript)
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

If you properly implemented the code, the code runs successfully in the browser!
