---
id: messages
title: GET Speech to Text
sidebar_label: GET Speech to Text
slug: /conversation-api/messages
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Messages API returns a list of all the messages in a conversation. You can use this for getting **Speech to Text** data (also known as transcription) for video conference, meeting or a telephone call.

Here, the message refers to a continuous sentence spoken by a speaker.

#### Sentiment Analysis in messages <font color="orange"> BETA</font>

You can enable sentiment analysis over each message being spoken in the conversation.

To do this, pass the query parameter `sentiment=true`. Read more about Sentiment Analysis [here](/docs/concepts/sentiment-analysis).

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/messages`

### Example API Call

:::info
Before using the Conversation API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```sh
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/messages" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/messages"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

params = {
    'verbose': True,  # <Optional, boolean| Gives you word level timestamps of each sentence.>
    'sentiment': True  # <Optional, boolean| Give you sentiment analysis on each message.>
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("GET", url, headers=headers)

if response.status_code == 200:
    # Successful API execution
    print("messages => " + str(response.json()['messages']))  # messages is a list of id, text, from, startTime, endTime, conversationId, words, phrases, sentiment
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```
</TabItem>
</Tabs>

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Query Params

Parameter | Required | Value |Description |
--------- | --------- | ------- | -------
```verbose``` | Optional | true | Gives you word level timestamps and score of each sentence.
```sentiment```| Optional | true | Give you [Sentiment Analysis](/docs/concepts/sentiment-analysis) on each message.

### Response

```javascript
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
             "timeOffset": 15.251,
             "duration": 1.235,
             "conversationId": "6749556955938816",
             "phrases": [
                {
                    "type": "action_phrase",
                    "text": "$69.99 per month",
                }
             ],
             "sentiment": {
                "polarity": {
                    "score": 0.6
                },
                "suggested": "positive"
              },
              "words": [
                 {
                     "word": "Best",
                     "startTime": "2020-08-18T11:10:14.536Z",
                     "endTime": "2020-08-18T11:10:15.536Z",
                     "timeOffset": 15.251,
                     "duration": 0.590,
                     "score": 0.91,
                 },
                 {
                     "word": "package",
                     "startTime": "2020-08-18T11:10:16.536Z",
                     "endTime": "2020-08-18T11:10:17.536Z",
                     "timeOffset": 15.262,
                     "duration": 0.587,
                     "score": 0.80,
                 },
                 {
                     "word": "for",
                     "startTime": "2020-08-18T11:10:18.536Z",
                     "endTime": "2020-08-18T11:10:19.536Z",
                     "timeOffset": 15.265,
                     "duration": 0.586,
                     "score": 0.79,
                 },
                 {
                     "word": "you",
                     "startTime": "2020-08-18T11:10:20.536Z",
                     "endTime": "2020-08-18T11:10:22.536Z",
                     "timeOffset": 15.266,
                     "duration": 0.585,
                     "score": 0.85,
                 },
                 {
                     "word": "is",
                     "startTime": "2020-08-18T11:10:22.536Z",
                     "endTime": "2020-08-18T11:10:25.536Z",
                     "timeOffset": 15.267,
                     "duration": 0.584,
                     "score": 0.89,
                 },
                 {
                     "word": "$69.99",
                     "startTime": "2020-08-18T11:10:25.536Z",
                     "endTime": "2020-08-18T11:10:27.536Z",
                     "timeOffset": 15.268,
                     "duration": 0.583,
                     "score": 0.86,
                 },
                 {
                     "word": "per",
                     "startTime": "2020-08-18T11:10:27.536Z",
                     "endTime": "2020-08-18T11:10:29.536Z",
                     "timeOffset": 15.269,
                     "duration": 0.581,
                     "score": 0.82,
                 },
                 {
                     "word": "month.",
                     "startTime": "2020-08-18T11:10:30.536Z",
                     "endTime": "2020-08-18T11:10:32.536Z",
                     "timeOffset": 15.270,
                     "duration": 0.580,
                     "score": 0.90,
                 }]
          },
         {
             "id": "5661493169225728",
             "text": "Okay, Where is the file?",
             "from": {
                 "name": "John",
                 "email": "John@example.com"
             }
             "startTime": "2020-08-18T11:11:14.536Z",
             "endTime": "2020-08-18T11:11:18.536Z",
             "timeOffset": 15.272,
             "duration": 1.238,
             "conversationId": "5139780136337408",
             "phrases": [],
             "sentiment": {
                    "polarity": {
                        "score": 0.2,
                    },
                    "suggested": "neutral"
              },
             "words": [
                 {
                     "word": "Okay,",
                     "startTime": "2020-08-18T11:11:14.536Z",
                     "endTime": "2020-08-18T11:11:14.936Z",
                     "timeOffset": 15.251,
                     "duration": 0.590,
                     "score": 0.91,
                 },
                 {
                     "word": "Where",
                     "startTime": "2020-08-18T11:11:14.936Z",
                     "endTime": "2020-08-18T11:11:15.436Z",
                     "timeOffset": 15.252,
                     "duration": 0.591,
                     "score": 0.91,
                 },
                 {
                     "word": "is",
                     "startTime": "2020-08-18T11:11:16.236Z",
                     "endTime": "2020-08-18T11:11:16.536Z",
                     "timeOffset": 15.253,
                     "duration": 0.589,
                     "score": 0.88,
                 },
                 {
                     "word": "the",
                     "startTime": "2020-08-18T11:11:16.536Z",
                     "endTime": "2020-08-18T11:11:16.936Z",
                     "timeOffset": 15.254,
                     "duration": 0.587,
                     "score": 0.85,
                 },
                 {
                     "word": "file?",
                     "startTime": "2020-08-18T11:11:16.936Z",
                     "endTime": "2020-08-18T11:11:17.236Z",
                     "timeOffset": 15.256,
                     "duration": 0.590,
                     "score": 0.89,
                 }
    ]
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | Unique message identifier.
```text``` | Message text.
```from``` | User object with name and email.
```startTime``` | DateTime value.
```endTime``` | DateTime value.
```timeOffset``` | This variable is returned as a float value measuring in seconds. It is returned at the sentence level as well as the word level. At the sentence level, it means the relative timestamp of when the sentence was spoken to when the conversation started (i.e., `startTime`). At the word level, it means the relative timestamp of when the word was spoken  to  when the conversation started (i.e., `startTime`). This variable is currently in <font color="orange"> Labs</font>.
```duration``` |  This variable is returned as a float value measuring in seconds. It is returned at the sentence level as well as the word level. At the sentence level, it means the relative timestamp of when the sentence was spoken to when the conversation ended (i.e.,`endTime`). At the word level, it means the relative timestamp of when the word was spoken to when the conversation ended (i.e., `endTime`). This variable is currently in <font color="orange"> Labs</font>.
```conversationId``` | Unique conversation identifier. Read more about the Conversation ID [here](/docs/api-reference/getting-conversation-intelligence#what-is-a-conversation-id). 
```words``` | Words object with properties `word`, `startTime`, `endTime` and `score`. The `score` is the word level confidence score that represents the confidence level of individual words within the message or transcript. The confidence score shows the relevancy of the word in the transcript which means higher the word-level confidence score, the more relevant it is to the message. The word level confidence score is currently in <font color="orange"> Labs</font>. 
```phrases``` | It shows the most important action phrases in each sentence. It's enabled when you pass `detectPhrases=true` during submiting the request in Async and Websocket API.
```sentiment```| Shows the sentiment polarity(intensity of negativity or positivity of a sentence) and suggested sentiment type (positive, negative and neutral).