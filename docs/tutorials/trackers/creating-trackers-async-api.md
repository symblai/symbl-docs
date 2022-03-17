---
id: create-trackers-async-api
title: Creating Trackers with Async API
sidebar_label: Creating Trackers with Async API
slug: /tutorials/trackers/create-trackers-async-api/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Symbl provides a diverse set of Async APIs based on Audio/Video or Textual content. For more details on Async APIs refer to the documentation [here](/docs/async-api/introduction). 

The Trackers once ingested via the request, will then try to detect these in the Conversation. Once the job is complete, you can fetch the Trackers from the Conversation API through the `/trackers` endpoint described below.

:::info Creating Trackers with Management API
While you can create Trackers with Async or Streaming APIs, it is recommended that you create Trackers using Management API because Trackers created with Management APIs are saved and can be reused while the same is not possible with Async or Streaming APIs. 
:::


### Async Audio File API
The Tracker entities should be passed in as a **query parameter** in the Async Audio API’s URL like shown below

### API Endpoint

```json
"https"://api.symbl.ai/v1/process/audio?trackers=[
   {
      "name":"COVID-19",
      "vocabulary":[
         "social distancing",
         "cover your face with mask",
         "vaccination"
      ]
   }
]
```
### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Optional | `application/json` This header must contain the MIME Type of the audio file’s container.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

## Async Audio URL API

The Tracker entities should be passed in as a member of the **request body** of the Async Audio URL API like shown below:

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/process/audio/url`**

### Request Header

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json` This header must contain the MIME Type of the audio file’s container.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).


### Request Body

```json
{
    "url": "<PUBLIC_AUDIO_FILE_URL>",
    "confidenceThreshold": 0.6,
    "timezoneOffset": 0,
    "trackers": [
        {
            "name": "Promotion Mention",
            "vocabulary": [
                "We have a special promotion going on if you book this before",
                "I can offer you a discount of 10 20 percent you being a new customer for us",
                "We have our month special this month",
                "We have a sale right now on"
            ]
        }
    ]
}
```
Notice that the trackers member follows the same structure as mentioned in the Trackers section above.

### Response

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

### Async Video File API
The Tracker entities should be passed in as a **query parameter** in the Async Video API’s URL like shown below:

### API Endpoint

```json
"https"://api.symbl.ai/v1/process/video?trackers=[
   {
      "name":"COVID-19",
      "vocabulary":[
         "social distancing",
         "cover your face with mask",
         "vaccination"
      ]
   }
]
```

### Request Header

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Optional | `application/json` This header must contain the MIME Type of the audio file’s container.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

Notice that the trackers query parameter follows the same structure as mentioned in the Trackers section above.

### Response

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

### Async Video URL API
The Tracker entities should be passed in as a member of the request body of the Async Video URL API like shown below:

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/process/video/url`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json` This header must contain the MIME Type application/json.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body
```json
{
    "url": "<PUBLIC_VIDEO_FILE_URL>",
    "confidenceThreshold": 0.6,
    "timezoneOffset": 0,
    "trackers": [
        {
            "name": "Promotion Mention",
            "vocabulary": [
                "We have a special promotion going on if you book this before",
                "I can offer you a discount of 10 20 percent you being a new customer for us",
                "We have our month special this month",
                "We have a sale right now on"
            ]
        }
    ]
}
```
Notice that the trackers member follows the same structure as mentioned in the Trackers section above.

### Response

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

### Async Text API
The Tracker entities should be passed in as a member of the **request body** of the Async Text API like shown below:

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/process/text`**


### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json` This header must contain the MIME Type application/json.
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

```json
{
    "name": "My Sales Conversation",
    "conversationType": [
        "sales"
    ],
    "messages": [
        {
            "payload": {
                "content": "<CONVERSATION_PAYLOAD>",
                "contentType": "text/plain"
            },
            "from": {
                "name": "John",
                "userId": "john@example.com"
            }
        }
    ],
    "trackers": [
        {
            "name": "Promotion Mention",
            "vocabulary": [
                "We have a special promotion going on if you book this before",
                "I can offer you a discount of 10 20 percent you being a new customer for us",
                "We have our month special this month",
                "We have a sale right now on"
            ]
        }
    ]
}
```
Notice that the trackers member follows the same structure as the Trackers section above.

### Response

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```
