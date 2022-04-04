---
id: messages
title: GET Speech to Text
sidebar_label: GET Speech to Text
slug: /conversation-api/messages/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Messages API returns a list of all the messages in a conversation. You can use this for getting **Speech to Text** data (also known as transcription) for video conference, meeting or a telephone call. Here, the message refers to a continuous sentence by a speaker.

:::info Sentiment Analysis in messages <font color="orange"> BETA</font>

You can enable sentiment analysis over each message being spoken in the conversation. To do this, pass the query parameter `sentiment=true`. Read more about Sentiment Analysis [here](/docs/concepts/sentiment-analysis).
:::

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/messages`

### Example API Call

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
             "timeOffset": 5.9, 
             "duration": 1,
             "conversationId": "6749556955938816",
             "phrases": [
                {
                    "type": "action_phrase",
                    "text": "submit the documents",
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
                     "score": 0.91,
                     "timeOffset": 5.9,
                     "duration": 0.2
                     
                 },
                 {
                     "word": "package",
                     "startTime": "2020-08-18T11:10:16.536Z",
                     "endTime": "2020-08-18T11:10:17.536Z",
                     "score": 0.80,
                     "timeOffset": 6.1,
                     "duration": 0.1
                     
                 },
                 {
                     "word": "for",
                     "startTime": "2020-08-18T11:10:18.536Z",
                     "endTime": "2020-08-18T11:10:19.536Z",
                     "score": 0.68,
                     "timeOffset": 6.2,
                     "duration": 0.1
                    
                 },
                 {
                     "word": "you",
                     "startTime": "2020-08-18T11:10:20.536Z",
                     "endTime": "2020-08-18T11:10:22.536Z",
                     "score": 0.68,
                     "timeOffset": 6.3,
                     "duration": 0.3
                     
                 },
                 {
                     "word": "is",
                     "startTime": "2020-08-18T11:10:22.536Z",
                     "endTime": "2020-08-18T11:10:25.536Z",
                     "score": 0.68,
                     "timeOffset": 6.6,
                     "duration": 0.3
                 },
                 {
                     "word": "$69.99",
                     "startTime": "2020-08-18T11:10:25.536Z",
                     "endTime": "2020-08-18T11:10:27.536Z",
                     "score": 0.68,
                     "timeOffset": 6.67,
                     "duration": 0.3
                 },
                 {
                     "word": "per",
                     "startTime": "2020-08-18T11:10:27.536Z",
                     "endTime": "2020-08-18T11:10:29.536Z",
                     "score": 0.67,
                     "timeOffset": 6.6,
                     "duration": 0.4                 
                 },
                 {
                     "word": "month.",
                     "startTime": "2020-08-18T11:10:30.536Z",
                     "endTime": "2020-08-18T11:10:32.536Z",
                     "score": 0.67,
                     "timeOffset": 6.8,
                     "duration": 0.5
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
             "timeOffset": 15.27,
             "duration": 1.23,
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
                     "score": 0.91,
                     "timeOffset": 15.25,
                     "duration": 0.59
                     
                 },
                 {
                     "word": "Where",
                     "startTime": "2020-08-18T11:11:14.936Z",
                     "endTime": "2020-08-18T11:11:15.436Z",
                     "score": 0.91,
                     "timeOffset": 15.25,
                     "duration": 0.59                  
                 },
                 {
                     "word": "is",
                     "startTime": "2020-08-18T11:11:16.236Z",
                     "endTime": "2020-08-18T11:11:16.536Z",
                     "score": 0.88,
                     "timeOffset": 15.25,
                     "duration": 0.58                   
                 },
                 {
                     "word": "the",
                     "startTime": "2020-08-18T11:11:16.536Z",
                     "endTime": "2020-08-18T11:11:16.936Z",
                     "score": 0.85,
                     "timeOffset": 15.25,
                     "duration": 0.58              
                 },
                 {
                     "word": "file?",
                     "startTime": "2020-08-18T11:11:16.936Z",
                     "endTime": "2020-08-18T11:11:17.236Z",
                     "score": 0.89,
                     "timeOffset": 15.25,
                     "duration": 0.59
                 }
    ]
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | Unique message identifier.|
```text``` | Message text.|
```from``` | User object with name and email.|
```startTime``` | DateTime value.|
```endTime``` | DateTime value.|
```timeOffset``` | Returned as a float value measuring in seconds, up to 2 decimal points. It indicates the seconds elapsed since the start of the conversation. It is returned at the sentence level as well as the word level.<br/> timeOffset= startTime (of current sentence/ word) - startTime (of the very first sentence/ word in the conversation).<br/> This variable is currently in <font color="orange"> Labs</font>.|
```duration``` |  Returned as a float value measuring in seconds, upto 2 decimal points. It indicates for how long the sentence or word was spoken. It is returned at the sentence level as well as the word level.<br/> `duration= endTime (of current sentence/ word) - startTime (of current sentence/ word)`.<br/> This variable is currently in <font color="orange"> Labs</font>.
```conversationId``` | Unique conversation identifier. Read more about the Conversation ID [here](/docs/api-reference/getting-conversation-intelligence#what-is-a-conversation-id). |
```words``` | Words object with properties `word`, `startTime`, `endTime` and `score`. The `score` is the word level confidence score that represents the confidence level of individual words within the transcript. The `score` shows the relevancy of the word in the transcript. Higher the word-level confidence score, the more relevant it is to the transcript message. When you pass `verbose=true`, the word-level confidence score is by default returned. <br/> Note that a processed `text` conversation will not return any confidence score since it is already in the transcript form. `words` also return the `timeOffset` and `duration` variables. The word level confidence score is currently in <font color="orange"> Labs</font>. |
```phrases``` | It shows the most important action phrases in each sentence. It is enabled when you pass `detectPhrases=true` while submiting the request in Async and Websocket API.|
```sentiment```| Shows the sentiment polarity (intensity of negativity or positivity of a sentence) and suggested sentiment type (positive, negative and neutral). |