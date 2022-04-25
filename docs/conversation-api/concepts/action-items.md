---
id: action-items
title: Action Items
sidebar_label: Action Items
slug: /concepts/action-items
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action like set up a meeting, share a file, complete a task, etc.

Essentially, the action items provides you with the insights of ‘who has to do what, by when’. The definition of 'when' is optional for detecting action items.

<!-- ![Action Items](/img/action_items_image.jpg) -->

#### Examples

- *"I will complete the presentation that needs to be presented to the management, by the end of today". Here, a person is committed to completing the presentation (task) by the end of the day.*

- *"I will make sure that all the bugs are fixed before the start of the next Sprint". Here, the person is committed to fixing the relevant bugs in a time-bound manner.*

## Key Features 

- Recognition of the **assignee and assignor** of an action item when possible.

- Recognition of the **date and time**, if specified in the insight.

- Make use of the *speaker context* to enhance the quality of the insights. For example, if speaker events are passed i.e. if the algorithm knows which speaker is speaking, it'll change "I will defend the North till the end of the day" to "John Snow will defend the wall till the end of the day."

- Ability to accept the timezone to calculate the accurate date and time references. If timezone details are passed in Symbl APIs and the conversation participant says "I will defend the North till the end of the day", in action item response dueBy time will be shown like `dueBy": "2020-02-10T07:00:00.000Z"`.

- Ability to control the confidence threshold for the insight. Confidence Threshold refers to a number between `0.0 - 1.0` where a decimal value closer to 1.0 means the detected phrase is an action item.

## Action Items APIs

To see Action Items API in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID** which is passed in Action Item API. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the detected action items from the conversation.

👉[Action Items API](/docs/conversation-api/action-items)

### Grab action items

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
curl "https://api.symbl.ai/v1/conversations/{conversationId}/action-items" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = "conversationId";

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/action-items`,
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
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/action-items`;

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

Refer to the following tutorials for code snippets and step-by-step instructions:

### Streaming API

To get Action Items in real-time with Streaming API (WebSocket protocol) see the tutorials given below: 

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


