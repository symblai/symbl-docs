---
id: topic-hierarchy
title: Topic Hierarchy (Beta)
sidebar_label: Introduction
slug: /concepts/topic-hierarchy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

:::info
This API performs best when the audio is clear and the meeting length is greater than 10 minutes.
Longer length meetings are broken down by our algorithm in contextually relevant parts which helps in producing
high-quality topic hierarchy.
:::

In any conversation, there can be multiple related topics that get discussed and it is possible to organize them in a hierarchy for better insights and consumption. Symbl's Topic Hierarchy algorithm finds a pattern in the conversation and creates parent (global) topics with each parent topic having multiple child topics nested within it. 

#### For example,

*If in a meeting “Sales Conversation” was talked about and after that, discussions around “Activity Call logs”, “Salesforce”, “Draft”, “Custom Integration” and “Jira” took place, the Topic Hierarchy will make Sales Conversation as the parent topic and the rest of the topics as the child topics under it.*

Topic Hierarchy understands customer conversation and returns the parent (global) topic and its child topics.

* <strong>Parent Topic</strong>: The highest-level abstraction of a meeting. These are the key points on which the speakers of the meeting expanded and discussed at length.

* <strong>Child Topic</strong>: These are the subtopics that aggregate or are originated from the parent topic itself. Child Topics are the topics that are linked to the parent topic as they form the time chunks of the parent topics in a certain way.


### Request object

#### Query Params
Parameter | Required | Value |Description|
--------- | --------- | ------- | -------
```parentRefs```| No | true | Gives you topic hierarchy when passed in Topic API.

### Response object

|       Field      | Description                                                        |
|------------------|--------------------------------------------------------------------|
| ``parentRefs``   | For each topic in the response, it has a parentRefs field that points to its parent topic. If parentRefs is NULL it signifies that the topic is a parent.                     |


#### Sample Response


```javascript
{
    "topics": [
        {   //Child Topic
            "id": "5907389282779136",
            "text": "salesforce",
            "type": "topic",
            "score": 0.7178597920690242,
            "messageIds": [
                "4600982711304192",
                "5487363432120320",
                "6109794119188480"
            ],
            "parentRefs": [
                {
                    "type": "topic",
                    "text": "sales conversation"
                }
            ]
        },
        {   //Parent Topic
            "id": "6697188878974976",
            "text": "sales conversation",
            "type": "topic",
            "score": 0.6968750176932417,
            "messageIds": [
                "5356560840654848",
                "5663440783802368",
                "5263998490509312",
                "6082396449406976",
                "4925138187321344"
            ],
            "parentRefs": []
        }
    ]
}
```



## Topics Hierarchy API

To see Topics Hierarchy in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID**. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the detected topics from the conversation.

👉 [Topics Hierarchy](/docs/conversation-api/get-topics)

### Grab detected topics

Remember to replace the `conversationId` in the API call with the Conversation ID you get from the previous API call.

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'JavaScript', value: 'javascript', }
  ]
}>
<TabItem value="cURL">

```js
curl "https://api.symbl.ai/v1/conversations/{conversationId}/topics" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = "conversationId";

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/topics`,
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
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/topics`;

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
