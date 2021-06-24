---
id: action-items
title: Action Items
sidebar_label: Action Items
slug: /concepts/action-items
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action like set up a meeting, share a file, complete a task, etc.

Essentially, the action items provides you with the insights of ‘who has to do what, by when’. The definition of 'when' is optional for detecting action items.


<!-- ![Action Items](/img/action_items_image.jpg) -->

#### Examples

- *"I will complete the presentation that needs to be presented to the management, by the end of today". Here, a person is committed to completing the presentation (task) by the end of the day.*

- *"I will make sure that all the bugs are fixed before the start of the next Sprint". Here, the person is committed to fixing the relevant bugs in a time-bound manner.*


- *"We can resize these little icons here and that would be a much better UI". Here, the person is proposing an idea that can potentially be taken up in the future, and which would be acted upon.*

- *"I think we have to work on the other priority issues and then move on to this one." Here, the person thinks that other issues are to be worked on, which may be the final action item, depending on how the conversation progresses.*

## Key Features 

- Recognition of the **assignee and assignor** of an action item when possible.

- Recognition of the **date and time**, if specified in the insight.

- Make use of the *speaker context* to enhance the quality of the insights. For example, if speaker events are passed i.e. if the algorithm knows which speaker is speaking, it'll change "I will defend the North till the end of the day" to "John Snow will defend the wall till the end of the day."

- Ability to accept the timezone to calculate the accurate date and time references. If timezone details are passed in Symbl APIs and the conversation participant says "I will defend the North till the end of the day", in action item response dueBy time will be shown like `dueBy": "2020-02-10T07:00:00.000Z"`.

- Ability to control the confidence threshold for the insight. Confidence Threshold refers to a number between `0.0 - 1.0` where a decimal value closer to 1.0 means the detected phrase is an action item.

## Action Item APIs

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

## Comprehensive Action Items (Labs)

> **Symbl Labs** <br/><br/>
This API is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. You can access the Labs features using your Symbl App Id and Secret. If you don't already have it, sign up on our platform to get your credentials. <br/><br/>
For any queries or feedback, please contact us at labs@symbl.ai.

The **Comprehensive Action Items API** is similar to the Action Items API except that the Comprehensive Action Items API returns a rephrased form of the original action item message that's enriched with its corresponding context.

While both are equally powerful in providing Action Items that relate to a discussion, the Comprehensive Action Items API is designed to provide more details such as references to speaker names, context in which the action item was mentioned and an overall comprehensive description of the action items. 

You can use the Action Items API if you wish to relate a message one-to-one with an action item and use the exact sentence from a transcript or utilize the Comprehensive Action Items API if you require more context to be sent in the response in a comprehensive format.

#### Examples 
 |  | 
| --------- | --------- 
**Returned by Action Items API** | *"So I will go ahead and I will set up a discussion with product."*
**Returned by Comprehensive Action Items** | *"John and Kay need to shift their focus more towards dev. Kay will go ahead and set up a discussion with product."*| 

### Comprehensive Action Items API

Find the details of the Comprehensive Action Items API endpoint, parameters and its usage in the link given below:

👉[Comprehensive Action Items API](/docs/conversation-api/comprehensive-action-items)