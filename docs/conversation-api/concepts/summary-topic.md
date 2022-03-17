---
id: topics
title: Topics
description: Automatically identify and extract topics from conversations with Symbl.ai's Topic API.
sidebar_label: Introduction
slug: /concepts/topics/
---

<head>
    <title>Topics API- Extracting Relevant Topics</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Topics are key drivers of the conversation. They're the **most important keywords or phrases used**. Symbl’s topic model is based on the internal conversation structure of how concepts are interrelated in a discussion, contrary to common intuition and traditional topic modeling algorithms which depend on the frequency, probability distribution and supervised training algorithm.

Human beings when in a free-flowing conversation tend to initiate a discourse on a topic and tend to switch to another topic as the conversation proceeds in time. **Every time context switch happens in the conversation, Symbl's topic algorithm can detect the change in the context and extract the most important topics out of it.**

The topics algorithm provide a framework for user to calibrate and exactly model the relationship among the concepts and understand how the semantics of the meetings are talked upon and the analysis of certain fundamental features of the graph provide an ability to abstract and derive the most relevant topics unlike the keyword and LDA driven models.

## Key Features

- **Keywords Ranking**: It not only identifies the top keywords in a conversation but also assigns a contextual score to them based on the graph intelligence that model’s the structure of conversation. You can see this scoring of keyword ranking in the Topics API response.

- **Topic Based Sentiments**: The ability to accurately detect the segment of discussion till which the topic has an impact or boundary enables the user to accurately calculate the sentiments of the topics discussed in the meetings. You can see topic based sentiments in the Topics API response when you pass `sentiment=true` in query parameter.

- **Parent Topics**: Parent Topics are the highest level of abstraction of discussion and key aspects of discussion that the speakers talked and expanded their discussion on in the meeting. You can see ParentTopics of conversation in the Topics API response.

- **Scope**: Scope of a topic defines the sentences and the information in the conversation, that is directly linked to the topic of discussion. You can see the scope of the topic in the Topics API response.

- Works with **real-time and Offline** conversations.

## Topics API

To see Topics API in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID** which is passed in Topics API. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the detected topics from the conversation.

👉 [Topics API](/docs/conversation-api/get-topics)

### Grab detected topics

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
curl "https://api.symbl.ai/v1/conversations/{conversationId}/topics" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require("request");
const authToken = AUTH_TOKEN;
const conversationId = "conversationId";

request.get(
  {
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/topics`,
    headers: { Authorization: `Bearer ${authToken}` },
    json: true,
  },
  (err, response, body) => {
    console.log(body);
  }
);
```

</TabItem>
<TabItem value="javascript">

```js
const conversationId = "conversationId";
const authToken = "AUTH_TOKEN";
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/topics`;

// Set headers
let headers = new Headers();
headers.append("Authorization", `Bearer ${authToken}`);

const data = {
  method: "GET",
  headers: headers,
};

// https://developer.mozilla.org/en-US/docs/Web/API/Request
const request = new Request(url, data);

fetch(request)
  .then((response) => {
    console.log("response", response);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on api server!");
    }
  })
  .then((response) => {
    console.log("Success");
    // ...
  })
  .catch((error) => {
    console.error(error);
  });
```

</TabItem>
</Tabs>
