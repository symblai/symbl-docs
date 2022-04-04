---
id: getting-started-with-streaming-api
title: Getting started with Streaming API
slug: /getting-started-with-streaming-api/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---


The Streaming API provides live speech-to-text transcription and extracts follow-ups, topics, action-items, and questions from conversations as they unfold in real-time.

## 1. Get live streaming of Speech to Text from your device's microphone

These examples use the Javascript SDK to connect to your device's microphone and process an audio stream in real-time. Here we will give you two separate guides: one for server-side implementation and one for client-side implementation. Both these guides do essentially the same thing.

### Server-side implementation (Node.js)

The server-side implementation uses Javascript SDK or you can also use other Node.js packages to enable your device's microphone which you can use for real-time speech-to-text transcription. You can view the full example on [GitHub](https://github.com/symblai/getting-started-samples/tree/master/examples/voice-sdk/realtime-websocket-single-stream).

Using your microphone you can see live speech-to-text transcription and AI Insights.

```js
const mic = require('mic');
const sampleRateHertz = 16000;
const micInstance = mic({
  rate: sampleRateHertz,
  channels: '1',
  debug: false,
  exitOnSilence: 6
});
```

For more details please checkout below mentioned links:

* [Server-side implementation (Node.js)](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)
  * [Getting Started](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer#getting-started)
  * [Handle the audio stream](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer#handle-the-audio-stream)
  * [Process speech using device's microphone](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer#process-speech-using-devices-microphone)
  * [Grabbing the Conversation ID](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer#grabbing-the-conversation-id)
  * [Full Code Sample](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer#full-code-sample)

### Client-side implementation

The client-side implementation can be run entirely in your browser and uses your device's microphone which you can use for gathering AI insights and for real-time speech-to-text transcription. When the code is run, the user will be prompted to allow permission for the browser to use their microphone. You can view the full code example on [GitHub](https://github.com/symblai/real-time-speech-recognition-with-websockets).


![Access Microphone](/img/access_microphone.png)

For more details please checkout below mentioned links:

* [Client-side implementation](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser)
  * [Getting Started](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#getting-started)
  * [Create the WebSocket](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#create-the-websocket)
  * [Create the Audio Stream](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#create-the-audio-stream)
  * [Stopping the WebSocket Connection](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#stopping-the-websocket-connection)
  * [Grabbing the Conversation ID](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#grabbing-the-conversation-id)
  * [Full Code Sample](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser#full-code-sample)

## 2. How to get speech-to-text transcription from your conversations

After you execute the code above, you should receive a **Conversation ID** (`conversationId`) in the response. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the speech-to-text transcription from the conversation.

### Grab speech-to-text transcription

Remember to replace the `conversationId` in the API call with the Conversation ID you get from the previous API call.

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Javascript', value: 'javascript', }
  ]
}>
<TabItem value="cURL">

```js
curl "https://api.symbl.ai/v1/conversations/{conversationId}/messages" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;

request.get({
    url: 'https://api.symbl.ai/v1/conversations/{conversationId}/messages',
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="javascript">

```js
const conversationId = "conversationId";
const authToken = "AUTH_TOKEN";
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/messages`;

// Set headers
let headers = new Headers();
headers.append('Authorization', `Bearer ${authToken}`);

const data = {
  method: "GET",
  headers: headers,
}

// https://developer.mozilla.org/en-US/docs/Web/API/Request
const request = new Request(url, data);

fetch(request)
  .then(response => {
    console.log('response', response);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error('Something went wrong on api server!');
    }
  })
  .then(response => {
    console.log('Success');
    // ...
  }).catch(error => {
    console.error(error);
  });
```
</TabItem>
</Tabs>

#### Example response

```js
{
  "conversationId": "6690671572287488",
  "jobId": "50c63f4f-8232-45d7-8ec5-5ad5d379f042"
}
```


## 3. Grabbing other conversational insights using Conversation API


Here's more data you can grab with our [Conversation API](/docs/conversation-api/introduction):


**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Summary topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.
