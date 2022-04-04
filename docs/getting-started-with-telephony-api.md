---
id: process-your-first-conversation
title: Getting started with Telephony API
slug: /getting-started-with-telephony-api/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Telephony API provides a speech-to-text transcription and enables you to extract follow-ups, topics, action-items, and questions from conversations over the Zoom call.

## 1. Get a transcription of your Zoom call.

This example uses the Symbl Javascript SDK to connect to a Zoom meeting and get a speech-to-text transcription of the call.

```js
sdk.startEndpoint({
  endpoint: {
    type: "pstn",
    phoneNumber: phoneNumber,
    dtmf: dtmfSequence,
  },
  data: {
    session: {
      name: meetingName,
    },
  },
}).then((connection) => {
  const connectionId = connection.connectionId;
  console.log('connection', connection);
  console.log("Successfully connected.", connectionId);
  console.log("Calling into Zoom now, please wait.");
})
.catch((err) => {
   console.error("Error while starting the connection", err);
});
```

For more details please checkout below mentioned links:

* [Connect Symbl To Zoom](/docs/telephony/tutorials/connect-to-zoom)
  * [Getting Started](/docs/telephony/tutorials/connect-to-zoom#getting-started)
  * [Setup Symbl SDK](/docs/telephony/tutorials/connect-to-zoom#set-up-symbl-sdk)
  * [Connect to Zoom](/docs/telephony/tutorials/connect-to-zoom#connect-to-zoom)
  * [Grabbing the Conversation ID](/docs/telephony/tutorials/connect-to-zoom#grabbing-the-conversation-id)
  * [Full Code Sample](/docs/telephony/tutorials/connect-to-zoom#full-code-sample)


## 2. How to get speech-to-text transcription from your conversations

After you run execute the code above you should receive a **Conversation ID** (`conversationId`) in the response. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the speech-to-text transcription from the conversation.

#### Grab speech-to-text transcription

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
