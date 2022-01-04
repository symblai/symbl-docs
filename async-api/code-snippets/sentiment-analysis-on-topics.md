---
id: sentiment-analysis-on-topics
title: Sentiment Analysis on Topics (Beta)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Topics are key drivers of the conversation. They're the most important keywords or phrases used.  The topics algorithm provides a framework for the user to calibrate and precisely model the relationship among the concepts and understand how the semantics of the meetings is talked upon. Sentiment Analysis on topics determines whether the Topics resulting from the conversation are positive, negative, or neutral. 

:::note
Currently, with Sentiment Analysis, en-US (English US) is the only language supported.
:::

To get Sentiment Analysis on Text, follow the steps given below:

## Prerequisites
1. Your Symbl API Credentials. You can get these on the [Symbl Platform](https://platform.symbl.ai/#/login). If you're new to the platform, [create an account](https://platform.symbl.ai/?_ga=2.201716818.257081579.1638006100-1289486206.1635166797#/signup) to get started. If you get stuck somewhere, [Slack us](https://symbldotai.slack.com/join/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA#/).
2. You have generated your access token. To learn how to do the same, check out our [Authentication](/docs/developer-tools/authentication/#step-2-generate-the-access-token) page. 

## Step 1: Process conversation with Symbl
---

The first step is to use Symbl (text, audio, and video) Async APIs to process your conversation. 

In this example, we will process an audio file (in .wav format) via Async Audio APIs. You can do the same for text conversations and video conversations as well. 

To view the complete reference, see [Async API documentation](/docs/async-api/introduction). 

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

## Step 2: Use `conversationId` in Topics APIs and pass `sentiment=true`
---

The Conversation ID you received in Step 1 should be passed in the [Topics API](/docs/concepts/topics). Also, ensure that you pass `sentiment=true` as a query parameter. 

### Example API Endpoint

​​`​​GET https://api.symbl.ai/v1/conversations/{conversationId}/topics?sentiment=true`

### Request Headers

Ensure that you use your Bearer token in the Authorization header to make the API request. It is mandatory to create your Bearer token to invoke Symbl API calls.

To learn more about the Authorization Header, go to [Async POST Audio API](/docs/async-api/overview/audio/post-audio#request-headers)  page. 

```shell
curl --location --request GET
"https://api.symbl.ai/v1/conversations/{conversationId}/topics?sentiment=true" \
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
   "topics":[
      {
         "id":"5907389282779136",
         "text":"interns",
         "type":"topic",
         "score":0.7178597920690242,
         "messageIds":[
            "4600982711304192",
            "5487363432120320",
            "6109794119188480"
         ],
         "sentiment":{
            "polarity":{
               "score":0.389
            },
            "suggested":"positive"
         },
         "parentRefs":[
            
         ]
      },
      {
         "id":"5776859730018304",
         "text":"company-wise hiring",
         "type":"topic",
         "score":0.788856914361565,
         "messageIds":[
            "6298570346987520",
            "6330577953226752"
         ],
         "sentiment":{
            "polarity":{
               "score":0.012
            },
            "suggested":"neutral"
         },
         "parentRefs":[
            
         ]
      },
      {
         "id":"6697188878974976",
         "text":"new regulations",
         "type":"topic",
         "score":0.6968750176932417,
         "messageIds":[
            "5356560840654848",
            "5663440783802368",
            "5263998490509312",
            "6082396449406976",
            "4925138187321344"
         ],
         "sentiment":{
            "polarity":{
               "score":-0.809
            },
            "suggested":"negative"
         },
         "parentRefs":[
            
         ]
      }
   ]
}
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