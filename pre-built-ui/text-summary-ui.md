---
id: text-summary-ui
title: Text Summary UI
sidebar_label: Text Summary UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The **Text Summary UI** provides you with a **textual interface** that shows actionable insights of your conversation. You can also track all the questions asked and action items for the conversation. Here action items refer to any specific action discussed in a meeting like setting up another call, sharing a file, completing a task, etc. 

The Text Summary UI allows you to interact with the Symbl elements (transcripts section, Insights, Filters) from audio and video. It surfaces a screen where you can select key elements like topics, transcripts, and insights, and the interface will surface the timestamp where this occurred and begin playback from there.

👉 [See Text Summary UI sample](https://oob-prod.symbl.ai/meeting/?__hstc=142565997.f13e6f687289922af636bba5b8ac2aab.1598766952817.1606472347899.1606474504198.210&__hssc=142565997.1.1606474504198&__hsfp=1690225618&_ga=2.43028069.1767386795.1632916447-941182599.1627371222#/eyJ1c2VySWQiOiJzdXJiaGlyYXRob3JlQHJhbW1lci5haSIsIm5hbWUiOiJTdXJiaGkiLCJzZXNzaW9uSWQiOiI2MzA0NTA2NTcyNzAxNjk2In0)

In this version, the Text Summary UI is supported for audio conversations.

![Text Summary UI](/img/textsummaryui.png)

- **Title** - The title represents the subject and the importance of a meeting in a concise manner.
- **Date** - Date of the meeting, formatted in the standard style of MM/DD/YY.
- **Time** - Specific time at which the meeting occurred, formatted in Coordinated Universal Time or UTC standard.
- **Duration** - Total duration of the meeting.
- **Attendees** - A compact list of the people who attended the meeting. You can use the feature to abbreviate each attendee according to their function/position. For Example, an Agent or a Customer.
- **Summary Topics** - A concise list of a cluster of subjects discussed throughout the meeting.
- **Transcript** - Transcript of the conversation with Speaker Separation if the Speaker Diarization is enabled. You can view the transcription of the entire conversation and see what each participant spoke. 
- **Insights** - Insights section shows you all the Conversation Intelligence such as Questions, Action Items, Topics, and Follow Ups, etc., that is being talked about in the conversation. When you click on Insights, you will be redirected to the relevant part in the transcript where the insight was detected.

# Generating Text Summary UI

To generate the Text Summary UI, follow the steps given below. 

**Note**: In this tutorial, we will process an audio file. 
However, Text Summary UI supports both: Audio, and Video files. 

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
 "name": "verbose-text-summary",
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

Response for `verbose-text-summary`

```shell
 {
   "name": "verbose-text-summary",
   "url":"https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI0NTMyNTY2NDc2NDU1OTM2In0="
}
```
The `url` returned in the response body can then be opened in the browser to view the Trackers and Analytics UI. 

