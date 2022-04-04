---
id: sentiment-analysis-on-messages 
title: Sentiment Analysis on Messages (Beta)
slug: /async-api/code-snippets/sentiment-analysis-on-messages/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Sentiment Analysis is the process of determining whether each message/line in a conversation is positive, negative, or neutral. Sentiment analysis on messages combines natural language processing and machine learning procedures to allot sentiment scores to the message.

:::note
Currently, with Sentiment Analysis, en-US (English US) is the only language supported.
:::

For Sentiment Analysis on Messages, you need to process your conversation with Symbl and then use conversationId you received in Messages APIs and pass sentiment parameter to get the transcript with the sentiment, polarity, and score. 

To get Sentiment Analysis on Messages, follow the detailed steps given below:

## Prerequisites
1. Your Symbl API Credentials. You can get these on the [Symbl Platform](https://platform.symbl.ai/#/login). If you're new to the platform, [create an account](https://platform.symbl.ai/?_ga=2.201716818.257081579.1638006100-1289486206.1635166797#/signup) to get started. If you get stuck somewhere, [Slack us](https://symbldotai.slack.com/join/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA#/).
2. You have generated your access token. To learn how to do the same, go to our [Authentication](/docs/developer-tools/authentication/#step-2-generate-the-access-token) page. 

## Step 1: Process conversation with Symbl
---

The first step is to use Symbl (text, audio, and video) Async APIs to process your conversation. 

In this example, we will process an audio file (in .wav format) via Async Audio APIs. You can do the same for text conversations and video conversations as well. 

To view the complete reference, see [Async API documentation](/docs/async-api/introduction). 

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### Example API Endpoint

`POST https://api.symbl.ai/v1/process/audio`

### Request Headers

Ensure that you use your Bearer token in the Authorization header to make the API request. It is mandatory to create your Bearer token to invoke Symbl API calls.

To learn more about the Authorization Header, go to [Async POST Audio API](/docs/async-api/overview/audio/post-audio#request-headers)  page. 

```shell
curl --location --request POST "https://api.symbl.ai/v1/process/audio \
--header 'Content-Type: audio/wav' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-binary '@/file/location/audio.wav'
```

Header Name  | Required | Value
----------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Length```| Mandatory |  This should correctly indicate the length of the request body in bytes.
```Content-Type``` | Optional | This is OPTIONAL field which describes the format and codec of the provided audio data. Accepted values are `audio/wav`, `audio/mpeg`, `audio/mp3` and `audio/wave` only. If your audio is in a format other than these, do not use this field.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

:::note
Headers requirements vary based on the conversation “content-type”. Therefore, refer to the respective [API Reference](/docs/async-api/introduction) for the exact Header values to be passed based on your requirements.
:::

### Response Body 

```js
{
  "conversationId": "5006340993843200",
  "jobId": "f98171b5-0f24-4582-92bc-325c3fa9473b"
}
```

This Conversation ID is a unique identifier of the conversation and will be applied in the Messages API to receive the Sentiment Analysis. This is provided in details in Step 2. 

The Job ID is a unique identifier of the processing job(ongoing API request) that you can use to get the job status. Learn more about how to get the Job Status on the [JOB API](/docs/async-api/overview/jobs-api/) page.

:::note
You must wait for he processing job to be completed before you can proceed with the next step. The time taken for the job to complete depends on the file size.
:::

## Step 2: Use `conversationId` in Messages APIs and pass `sentiment=true`
---

The Conversation ID you received in Step 1 should be passed in the [Messages API](/docs/concepts/speech-to-text). Also, ensure that you pass `sentiment=true` as a query parameter. 

### Example API Endpoint

​​`GET https://api.symbl.ai/v1/conversations/{conversationId}/messages?sentiment=true` 

### Request Headers

Ensure that you use your Bearer token in the Authorization header to make the API request. It is mandatory to create your Bearer token to invoke Symbl API calls.

To learn more about the Authorization Header, go to [Async POST Audio API](/docs/async-api/overview/audio/post-audio#request-headers)  page. 

```shell
curl --location --request GET
"https://api.symbl.ai/v1/conversations/{conversationId}/messages?sentiment=true" \
--header 'Content-Type: audio/wav' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-binary '@/file/location/audio.wav'
```

Header Name  | Required | Value
----------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Length```| Mandatory |  This should correctly indicate the length of the request body in bytes.
```Content-Type``` | Optional | This is OPTIONAL field which describes the format and codec of the provided audio data. Accepted values are `audio/wav`, `audio/mpeg`, `audio/mp3` and `audio/wave` only. If your audio is in a format other than these, do not use this field.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

:::note
Headers requirements vary based on the conversation “content-type”. Therefore, refer to the respective [API Reference](/docs/async-api/introduction) for the exact Header values to be passed based on your requirements.
:::

### Response

```js
{
 "messages":[
   {
     "id":"6131375637790720",
     "text":"Okay, so you're talking about that file, which I am sending you.",
     "from":{
      
     },
     "startTime":"2021-04-12T22:10:39.881Z",
     "endTime":"2021-04-12T22:10:43.981Z",
     "conversationId":"6320529160011776",
     "phrases":[
       {
         "type":"action_phrase",
         "text":"sending I you"
       }
     ],
     "sentiment":{
       "polarity":{
         "score":-0.201
       },
       "suggested":"neutral"
     }
   },
   {
     "id":"6605033355345920",
     "text":"Ah There is way I don't think there is way too now.",
     "from":{
      
     },
     "startTime":"2021-04-12T22:10:46.681Z",
     "endTime":"2021-04-12T22:10:53.281Z",
     "conversationId":"6320529160011776",
     "phrases":[
       {
         "type":"action_phrase",
         "text":"think there is way too now"
       }
     ],
     "sentiment":{
       "polarity":{
         "score":-0.201
       },
       "suggested":"neutral"
     }
   },
   ...
 ]
```

The body parameter is defined in the operation's parameters section and includes the following: objects that describe the body data type and structure. Learn more about Response Body Parameters [here](/docs/conversation-api/messages/#response-object).

### Polarity and Score
Sentiment Analysis is the interpretation of the general thought, feeling, or sense of an object or a situation. In the Response, you’ll notice the `sentiment` field which shows the sentiment type (positive, negative, and neutral). It is scored using “polarity” values which shows the intensity of the sentiment. It ranges from -1.0 to 1.0, where -1.0 is the most negative sentiment and 1.0 is the most positive sentiment.  

### Sample Code Snippet: 

```js
{
  "sentiment": {
    "polarity": {
      "score": 0.6
    }
  }
}
```

| polarity         | Suggested Sentiment |
|------------------|---------------------|
| -1.0 => x > -0.3 | negative            |
| -0.3 => x <= 0.3 | neutral             |
| 0.3 < x <= 1.0   | positive            |

:::info
We have chosen the below polarity ranges with respect to sentiment type which covers a wide range of conversations. Polarity Sentiment may vary for your use case. We recommend that you define a threshold that works for you, and then adjust the threshold after testing and verifying the results.
:::