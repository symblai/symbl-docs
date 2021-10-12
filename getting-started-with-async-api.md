---
id: getting-started-with-async-api
title: Getting started with Async API
slug: /getting-started-with-async-api
show_sidebar: true
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import useBaseUrl from '@docusaurus/useBaseUrl';

# Overview

In this guide you will learn how to do the following:
+ Send an audio file to the **Async API**.
+ Grab speech-to-text transcription from the conversation, 
+ Gain valuable conversational insights such as follow-ups, topics, action items, and questions using Conversation API.

**Prerequisites**
1. URL of an audio file to extract the data from.

:::info
For processing an audio file from your local PC or your server, see [POST Audio API](/docs/async-api/overview/audio/post-audio).
:::

In this example, we have provided you an [audio file](https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav) that you can see below. 

<p align="center">
<iframe width="350" height="250" src="https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav"></iframe>
</p>


2. `AUTH_TOKEN` variable for authentication that is sent through the `Authorization` header. This can be obtained from [our authentication process](/docs/developer-tools/authentication).



## Step 1. Process an audio file using Async API

Use the code below to pass the URL of an audio file to the Async API.

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Javascript', value: 'javascript', },
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request POST "https://api.symbl.ai/v1/process/audio/url" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav"
}'
```
</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const fs = require('fs');
const authToken = AUTH_TOKEN;

const audioOption = {
  url: 'https://api.symbl.ai/v1/process/audio/url',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
  })
};

request.post(audioOption, (err, response, body) => {
  console.log(err, body);
});
```

</TabItem>
<TabItem value="javascript">

```js
const authToken = "AUTH_TOKEN";
const url = "https://api.symbl.ai/v1/process/audio/url";

// Set headers
let headers = new Headers();
headers.append('Authorization', `Bearer ${authToken}`);
headers.append('Content-Type', 'application/json');

const body = {
  "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
}
const data = {
  method: "POST",
  headers: headers,
  body: JSON.stringify(body)
}

// https://developer.mozilla.org/en-US/docs/Web/API/Request
const request = new Request(url, data);

fetch(request)
  .then(response => {
    console.log('response', response);
    if (response.status === 201) {
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

### Example response

```js
{
  "conversationId": "6690671572287488",
  "jobId": "50c63f4f-8232-45d7-8ec5-5ad5d379f042"
}
```

## Step 2. Obtain speech-to-text transcription from your conversation

On successfully executing the above code you will receive a **Conversation ID** (`conversationId`) in the response. 
A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call that grabs the speech-to-text transcription from the conversation.

### Grab speech-to-text transcription

Replace the `conversationId` in the API call with the **Conversation ID** you received from the previous API call.

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
const conversationId = "conversationId";

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
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


## Step 3. Grab additional conversational insights


Here's more data that you can grab with our [Conversation API](/docs/conversation-api/introduction):


**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Conversation topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

# See Also

+ [Getting Started with Streaming API](/docs/getting-started-with-streaming-api)
+ [Getting Started with Telephony API](/docs/getting-started-with-telephony-api)

