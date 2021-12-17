---
id: follow-ups
title:  Follow Ups
sidebar_label:  Follow Ups
slug: /concepts/follow-ups
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl recognizes if an action item has a connotation or nature of language, which requires following up in general or by someone in a conversation.

#### For Example,

* *"I will sync up with my manager and find out the agreed dates with the vendor".* Here, a person needs to follow up with their manager in order to complete this action.

* *“We’ll need to set up a meeting with the design team to find out more details”.* Here, they need to organize and schedule a meeting with the design team, which indicates that there are things required to be followed upon.

* *“I will probably sync up with you tomorrow on this”.* Here, it’s clear that there needs to be a follow-up, but the tonality doesn’t indicate whether it is the final decision, it just indicates the possibility of a sync up the next day.

* *“I may have to schedule a meeting with the client to discuss this further”.* Here, although there needs to be further discussion with the client on the matter, it is still not clear whether that will be set up to not.


## Follow Ups API

To see Follow Ups API in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID**. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the detected follow-ups from the conversation.

👉 [Follow Ups API](/docs/conversation-api/follow-ups)

### Grab follow-ups

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
curl "https://api.symbl.ai/v1/conversations/{conversationId}/follow-ups" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = "conversationId";

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/follow-ups`,
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
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/follow-ups`;

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

## Tutorials

Refer to the following tutorials for code snippets and step-by-step instuctions:

### Streaming API

To get Follow-ups in real-time with Streaming API (WebSocket protocol) see the tutorials given below: 

* [Live Speech-to-Text and AI insights on browser](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser)
* [Live Speech-to-Text and AI insights on local server](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)
* [Gain Real-time AI Insights From Your Device's Mic Using Symbl's Javascript SDK](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)

<button class="button button1"><a href="/docs/streamingapi/code-snippets/start-and-stop-connection">View all Tutorials</a></button><br/> 


### Telephony API

To get Action Items in real-time with Telephony API (SIP/PSTN protocol) see the tutorials given below: 

* [Gain AI Insights On Your Zoom Call](/docs/telephony/tutorials/connect-to-zoom)
* [Connect to a PSTN connection to get Speech to Text and AI Insights](/docs/telephony/code-snippets/connect-to-pstn)
* [Connect to a SIP connection to get Speech to Text and AI Insights](/docs/telephony/code-snippets/connect-to-sip) 

<button class="button button2"><a href="/docs/telephony/introduction">View all Tutorials</a></button>

### Symbl SDK
 
The Programmable Symbl'S SDK allows you to add Conversation Intelligence directly into your web applications and meeting platforms. You can generate intelligent insights such as action items, topics and questions.

* [Gain Real-time AI Insights From Your Device's Mic Using Symbl's Javascript SDK](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)

<button class="button button2"><a href="/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer">Learn more about Symbl's SDK</a></button>


