---
id: creating-video-summary-ui
title: Creating Video Summary UI
sidebar_label: Video Summary UI
slug: /tutorials/pre-built-summary-ui/creating-video-summary-ui/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This tutorial contains step-by-step instructions on how to create a Video Summary UI.

:::note
In this tutorial, we will take the example of processing an audio file. 
However, Video Summary UI supports both audio, and video files. 
:::

## 1. **Send a `POST` request to Async Audio API**
---

Process your audio file with Symbl by sending a `POST` request to the Async Audio URL API. This returns a `conversationId`.

If you have already processed your audio file and have the `conversationId`, skip to [Step 2]

```shell
POST https://api.symbl.ai/v1/process/audio/url
```
#### Sample Request

```shell
curl --location --request POST "https://api.symbl.ai/v1/process/audio/url" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
 "url": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp3",
 "name": "Business Meeting",
 "confidenceThreshold": 0.6,
}'
```
The `url` is a mandatory parameter to be sent in the request body and must be a publicly accessible.

For more sample requests, see detailed documentation for [Async Audio API URL](/docs/async-api/overview/audio/post-audio-url). 

#### Sample Response
```shell
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

### 2. Send `POST` request to Experience API
---

Using the conversationId from Step 1, send a POST request to Experience API, as shown below:

```shell
POST https://api.symbl.ai/v1/conversations/{conversationId}/experiences
```

#### Request Body

 ```shell
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
 "name": "video-summary",
 "videoUrl": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp3",
}'
```

### Request Body Params

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
`name` | Mandatory | String | Set the name as `video-summary`.
`videoUrl` | Optional | String  | The `videoUrl` must match the `conversationId`. In other words, the `videoUrl` needs to be the same URL that was submitted to the Async API to generate the `conversationId`.
```summaryURLExpiresIn``` | Mandatory | Number | This sets the expiry time for the summary URL. It is interpreted in seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.
:::caution
`disableSummaryURLAuthentication` is not supported as we accept only secure URL generation to comply with the mandatory security requirements. 
:::

### Response Body

```shell
 {
   "name": "video-summary",
   "url":"https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI0NTMyNTY2NDc2NDU1OTM2In0="
}
```
The `url` returned in the response body can then be opened in the browser to view the Trackers and Analytics UI. 


## What's next

- View the complete description of [Video Summary API](/docs/api-reference/experience-api/post-video-summary-ui)
- Learn how to [Tune your Video Summary UI](/docs/pre-built-ui/tuning-summary-page)
- Learn how to [White label your Video Summary UI](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)
- Learn how to [Add custom domain to your Video Summary UI](/docs/pre-built-ui/custom-domain).