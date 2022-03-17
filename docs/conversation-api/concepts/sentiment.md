---
id: sentiment
title: Sentiment Analysis (Beta)
sidebar_label: Introduction
description: Sentiment API enables developers to detect positive or negative sentiment from conversations in real-time. Learn more.
slug: /concepts/sentiment-analysis/
---

<head>
    <title>Sentiment API- Analysing Texts in Real-time (Beta)</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Sentiment Analysis is the interpretation of the general thought, feeling, or sense of an object or a situation.

Symbl's Sentiment API works over Speech-to-Text sentences and Topics (or aspect).

<div style={{textAlign: 'center'}}>

<!-- ![Speech to text](/img/sentiment.png) -->

</div>

## Sentiment API

To see Sentiment API in action, you need to process a conversation using Symbl. After you process a conversation, you'll receive a **conversation Id** which can be passed in below-mentioned Conversation APIs. All you need to do is pass query parameters `sentiment=true`.

:::info
Each continuous sentence spoken by a speaker in conversation is referred to as a Message. **Hence ,we named our Speech to Text API as Messages API**. Messages API returns you a list of messages in a conversation.
:::

### 👉[Messages API](/docs/conversation-api/messages)

:::info
For topic level, the sentiment is calculated over the topic messages scope i.e. it factors in the sentiment of messages where the topic was talked about.
:::

### 👉[Topics API](/docs/conversation-api/get-topics)

### API Response

<Tabs
defaultValue="javascript"
values={[
{ label: 'Speech to Text', value: 'javascript', },
{ label: 'Topics', value: 'topics', }
]
}>

<TabItem value="javascript">

```js
{
    "messages": [
         {
             "id": "6412283618000896",
             "text": "Best package for you is $69.99 per month.",
             "from": {
                 "name": "Roger",
                 "email": "Roger@example.com"
             },
             "startTime": "2020-07-10T11:16:21.024Z",
             "endTime": "2020-07-10T11:16:26.724Z",
             "conversationId": "6749556955938816",
             "phrases": [
                {
                    "type": "action_phrase",
                    "text": "$69.99 per month"
                }
             ],
             "sentiment": {
                "polarity": {
                    "score": 0.6
        }       ]
}
```

</TabItem>
<TabItem value="topics">

```js
{
    "topics": [
        {
            "id": "5907389282779136",
            "text": "interns",
            "type": "topic",
            "score": 0.7178597920690242,
            "messageIds": [
                "4600982711304192",
                "5487363432120320",
                "6109794119188480"
            ],
            "sentiment": {
                "polarity": {
                    "score": 0.389
                },
                "suggested": "positive"
            },
            "parentRefs": []
        }     ]
}
```

</TabItem>
</Tabs>

#### Object

| Field       | Description                                                                                                                                         |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `polarity`  | Shows the intensity of the sentiment. It ranges from -1.0 to 1.0, where -1.0 is the most negative sentiment and 1.0 is the most positive sentiment. |
| `suggested` | display suggested sentiment type (negative, neutral and positive).                                                                                  |

#### suggested object

:::info
We have chosen the below polarity ranges wrt sentiment type which covers a wide range of conversations.
Polarity Sentiment may vary for your use case. We recommend that you define a threshold that works for you, and then adjust the threshold after testing and verifying the results.
:::

| polarity         | Suggested Sentiment |
| ---------------- | ------------------- |
| -1.0 => x > -0.3 | negative            |
| -0.3 => x <= 0.3 | neutral             |
| 0.3 > x <= 1.0   | positive            |

### Tutorials

- View tutorial on Sentiment Analysis on Messages [here](/docs/async-api/code-snippets/sentiment-analysis-on-messages)
- View tutorial on Sentiment Analysis on Topics [here](/docs/async-api/code-snippets/sentiment-analysis-on-topics)
