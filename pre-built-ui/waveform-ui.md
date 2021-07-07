---
id: trackers-and-analytics-ui
title: Trackers and Analytics UI
sidebar_label: Trackers and Analytics UI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

--- 

The **Trackers and Analytics UI** provides a waveform visualization with conversation insights. The waveform highlights Topics in the timeline using color coded timestamps allowing you to get a snapshot of when they occured in the course of the conversation. You can view Trackers with sentiment score, transcripts, speaker information, and other conversation insights described below.

In this version, the Tracker and Analytics UI is supported for audio conversations. 


![Waveform](/img/trackers-and-analytics-ui.png)

  | Description  | 
---------- | ------- | 
 **1. Waveform Timeline** | The waveform timeline consists of color coded timestamps to show when exactly a Topic was discussed in the conversation. | 
 **2. Topics with Sentiment Score** | Hover your cursor around the Topics to get the Sentiment Score applicable to that Topic. The Sentiment Score can tell you if the Topics discussed were positive or negative in nature. Read more in the [Sentiment Polarity](/docs/async-api/code-snippets/how-to-use-sentiment-analysis/#polarity) section. <br/><br/>              ![Waveform](/img/tracker-ui-score.png) |
 **3. Trackers** | You can view the Trackers identified in the course of the conversation. It provides details on how many times the Trackers occured and who said it.<br/><br/>![Waveform](/img/trackers-ui.png) |
 **4. Analytics** | Provides an overview of speaker talk and silence ratios and words per minute.<br/><br/>![Waveform](/img/wpm.png)|
 **5. Transcript** | Transcript of the conversation with Speaker separation if the Speaker Diarization is enabled. See Best Practices information below. |
 **6. Speaker Analytics** | A timeline showing speakers talk time along with timestamps of when and who asked questions.<br/><br/>![Waveform](/img/speaker-analytics-1.png)|

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

## Generating Trackers and Analytics UI

To generate the Trackers and Analytics UI, follow the steps given below:

### 1. Send a `POST` request to Async Audio API 
---

Process your audio file with Symbl by sending a `POST` request to the Async Audio URL API. This returns a `conversationId`.

If you have already processed your audio file and have the `conversationId`, skip to [Step 2](#2-enable-cors-for-files-hosted-on-amazon-s3). 

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

### 2. Enable CORS (for files hosted on Amazon S3)
---
CORS (Cross-Origin-Resource-Sharing) is required for files hosted on Amazon S3.

> **Why do I need to enable CORS?** <br/>
> The Trackers and Analytics UI has a visual component that renders waveform visuals based on the audio resource in the URL. To generate such visuals, the browser requires read-access to the audio frequency data, for which CORS configurations need to be enabled. Modern browsers by default, prevent reads to audio frequency through CORS.

If your audio file is not on Amazon S3, skip to the [next step](#3-send-post-request-with-experience-api).<br/>

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

### 3. Send `POST` request to Experience API 
---

Using the `conversationId` from Step 1, send a `POST` request to Experience API:

```shell
POST https://api.symbl.ai/v1/conversations/{conversationId}/experiences
```

#### Request Body

```shell
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "audio-summary",
  "audioUrl": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp3",
}'
```

### Request Body Params

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
`name` | Mandatory | String | `audio-summary`
`audioUrl` | Mandatory | String  | The `audioUrl` must match the `conversationId`. In other words, the `audioUrl` needs to be the same URL that was submitted to the Async API to generate the `conversationId`.
```summaryURLExpiresIn``` | Mandatory | Number | This sets the expiry time for the summary URL. It is interpreted in seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.

:::caution
`disableSummaryURLAuthentication` is not supported as we accept only secure URL generation to comply with the mandatory security requirements. 
:::
 
### Response Body

```shell
{
    "name": "video-summary",
    "url": "https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI1ODU5NjczMDg1MzEzMDI0IiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0L3NtYWxsLm1wNCJ9?showVideoSummary=true"
}
```
The `url` returned in the response body can then be opened in the browser to view the Trackers and Analytics UI. 

## Customizing Trackers and Analytics UI

---

You can customize the Trackers and Analytics UI by adding your own logo, favicon, and other components to match your brand identity.

When generating the Trackers and Analytics with Experience API endpoint mentioned [above](/docs/pre-built-ui/trackers-and-analytics-ui#3-send-post-request-to-experience-api), pass the following parameters in the request body:

```shell
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "audio-summary",
  "audioUrl": "https://cors-enabled-audio.mp3",
  "logo": "https://my-logo.png",
  "favicon": "https://my-favicon.png",
  "color": {
    "background": "#FFFF00"
  },
  "speakerAvatarURLs": {
    "9d6d34d9-5019-4694-9c9a-8ba7bfc8cfab": "https://gravatar.com/avatar/4908e2307fdc3350084daaf702d17a60?s=400&d=robohash&r=x", 
    "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325": "https://gravatar.com/avatar/9839b07ba341232442f17282d4d67869?s=400&d=robohash&r=x",
  },
  "font": {
    "family": "Roboto"
    }
}'
```

### Request Parameters

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
```logo```| Optional | String |  URL string where the logo image file is hosted. This needs to be publicly accessible.
```favicon```| Optional | String |  URL string where the favicon file is hosted. This needs to be publicly accessible.
```color```| Optional | Object | Color object can customize the background color. Refer [below](#color-object) for object schema.
```font``` | Optional | Object | Font can be customized to any valid [Google Fonts](https://fonts.google.com/). Refer [below](#font-object) for object schema.
```speakerAvatarURLs``` | Optional | Object | Speaker avatar in the Transcript component can be customized to accept an avatar image. Refer [below](#speakeravatarurls-object) for object schema.

#### `color` object

Field  | Required | Type | Description
---------- | ------- | ------ | ------
```background ``` | Optional | String | Changes the background color of the app bar. Accepts color in Hex color code. Default background color is #333333.

#### `font` object

Field  | Required | Type | Description
---------- | ------- | ------- | ------
```family``` | Optional | String | The name of the font available in [Google Fonts](https://fonts.google.com/). The font type will be applied globally.

#### `speakerAvatarURLs` object
Field  | Required | Type | Description
---------- | ------- | ------- | ------
```family``` | Optional | String | The `speakerAvatarURL` object is a collection of key-value pairs, where the unique `speakerId` is the key and the public URL (to the avatar image) is the value. <br/> Example: `9d6d34d9-5019-4694-9c9a-8ba7bfc8cfab` is the key and `https://gravatar.com/avatar/4908e2307fdc3350084daaf702d17a60?s=400&d=robohash&r=x` is the value. There is a one-to-one mapping between `speakerId` and the avatar URL. <br/>**Note**: All of the `speakerIds` can be fetched via a GET request to the `/conversations/:id/members` endpoint.

