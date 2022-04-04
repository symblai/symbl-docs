---
id: creating-trackers-and-analytics-ui
title: Creating Trackers and Analytics UI
sidebar_label: Trackers and Analytics UI
slug: /tutorials/pre-built-summary-ui/creating-trackers-and-analytics-ui/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This tutorial contains step-by-step instructions on how to create a Trackers and Analytics UI.

:::note
Currently, the Tracker and Analytics UI is supported for audio conversations only.
:::

:::info Best Practices
In order to get a full-fledged version of the **Trackers and Analytics UI**, ensure that you have:

1. **A pre-configured set of Trackers**:
Ensure that you have created Trackers, and processed it with Symbl (i.e., "conversationId" is generated). This happens when you submit the conversation data to the Async API for processing. Read about the step-by-step instructions [here](/docs/management-api/trackers/overview). 

2. **Enabled Speaker Separation**:
Ensure that the Speaker Separation step is also enabled when submitting data to the Async API.
“enableSpeakerDiarization=true” and “diarizationSpeakerCount={number}” should be passed in the query parameter. Read more in the [Speaker Separation](/docs/async-api/overview/speaker-separation/#query-params) page. 
If these optional parameters are set, the Speaker Analytics component can generate high-resolution information.

Please note that once the raw conversation data is processed by Symbl (i.e., "conversationId" is generated), there is no way of retroactively adding trackers or enabling speaker separation. In this case, you have to submit the conversation data once more to the Async API with the optional parameters.
:::

To create the Trackers and Analytics UI, follow the steps given below:

## 1. Send a `POST` request to Async Audio API 
---

Process your audio file with Symbl by sending a `POST` request to the Async Audio URL API. This returns a `conversationId`.

If you have already processed your audio file and have the `conversationId`, skip to [Step 2](#2-enable-cors-for-files-hosted-on-amazon-s3). 

```shell
POST https://api.symbl.ai/v1/process/audio/url
```
### Sample Request 

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

### Sample Response 
```shell
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

## 2. Enable CORS (for files hosted on Amazon S3)
---
CORS (Cross-Origin-Resource-Sharing) is required for files hosted on Amazon S3.

> **Why do I need to enable CORS?** <br/>
> The Trackers and Analytics UI has a visual component that renders waveform visuals based on the audio resource in the URL. To generate such visuals, the browser requires read-access to the audio frequency data, for which CORS configurations need to be enabled. Modern browsers by default, prevent reads to audio frequency through CORS.

:::note
Enabling CORS is mandatory only if you wish to get the Trackers and Analytics UI in the waveform visualization (i.e., as audio waveform player). If you do not enable CORS, you can still access the same insights but the UI will show the standard audio player instead of the waveform. 
:::

If your audio file is not on Amazon S3, skip to the [next step](#3-send-post-request-to-experience-api).<br/>

To enable CORS for Amazon S3 Bucket,<br/>
1. Go to Amazon S3 Console (https://s3.console.aws.amazon.com/). <br/>

2. Select the Bucket where the audio file is hosted. <br/>

![Waveform](/img/cors-1.png) <br/>

3. Go to the **Permissions** tab. <br/>

![Waveform](/img/cors-2.png) <br/>

4. Scroll down to the **Cross-Origin resource sharing (CORS)** section. <br/>

![Waveform](/img/cors-3.png) <br/>

5. Edit the JSON to enable CORS for the Symbl URL. <br/>

![Waveform](/img/cors-4.png)

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": [],
        "MaxAgeSeconds": 3000
    }
]
```

## 3. Send `POST` request to Experience API 
---

Using the `conversationId` from Step 1, send a `POST` request to Experience API:

```shell
POST https://api.symbl.ai/v1/conversations/{conversationId}/experiences
```

### Request Body

```shell
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "audio-summary",
  "audioUrl": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp3",
}'
```

## Request Body Params

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
`name` | Mandatory | String | `audio-summary`
`audioUrl` | Mandatory | String  | The `audioUrl` must match the `conversationId`. In other words, the `audioUrl` needs to be the same URL that was submitted to the Async API to generate the `conversationId`.
```summaryURLExpiresIn``` | Mandatory | Number | This sets the expiry time for the summary URL. It is interpreted in seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.

:::caution
`disableSummaryURLAuthentication` is not supported as we accept only secure URL generation to comply with the mandatory security requirements. 
:::
 
## Response Body

```shell
{
    "name": "audio-summary",
    "url": "https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI1ODU5NjczMDg1MzEzMDI0IiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0L3NtYWxsLm1wNCJ9?showVideoSummary=true"
}
```
The `url` returned in the response body can then be opened in the browser to view the Trackers and Analytics UI. 

:::info
You can also Whitelable your Trackers and Analytics UI by adding custom logo, favicon, etc. Go to the [White labelling](/docs/) page to learn more. 
:::


## What's next

- View the complete description of [Trackers and Analytics UI API](/docs/api-reference/experience-api/post-trackers-and-analytics-ui)
- Learn how to [White label your Trackers and Analytics UI Page](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui).

:::note
Tuning and adding custom domain is not supported for Trackers and Analytics UI yet.
:::
