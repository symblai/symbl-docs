---
id: experience-api
title: Create Pre-built UI using Experience API
sidebar_label: Create Pre-built UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This API returns the URL of the Video Summary and Text Summary UI depending upon the user request body.


### Types of Summary UI

#### Video Summary UI
![Video Summary UI](/img/videosummaryUI.gif)

<!-- #### Text Summary UI
![Text summary](/img/text-summary.png) -->


### HTTP REQUEST

```POST```  `https://api.symbl.ai/v1/conversations/{conversationId}/experiences`

### Example API Call

:::info
Before using the API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::


<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="cURL">

```bash
// Video Summary
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "video-summary",
  "videoUrl": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp4",
  "logo": "https://symblsanitydata.s3.us-east-2.amazonaws.com/symbl-logo.png",
  "favicon" :"https://symblsanitydata.s3.us-east-2.amazonaws.com/symbl-favicon.png",
  "color": {
    "background": "#0A2136",
    "topicsFilter": "#FF0000",
    "insightsFilter": "#FF0000"
    },
  "font": {
    "family": "roboto"
  }
}'


// Verbose text summary
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "verbose-text-summary",
  "logo": "https://symblsanitydata.s3.us-east-2.amazonaws.com/symbl-logo.png",
  "favicon" :"https://symblsanitydata.s3.us-east-2.amazonaws.com/symbl-favicon.png",
  "color": {
    "background": "#0A2136",
    "topicsFilter": "#FF0000",
    "insightsFilter": "#FF0000"
    },
  "font": {
    "family": "roboto"
  }
}'
```

</TabItem>

<TabItem value="nodejs">

```js

// Video Summary
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.post({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/experiences`,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      "name": "video-summary",
      "videoUrl": "https://storage.googleapis.com/rammer-transcription-bucket/small.mp4",
      "logo": "https://symblsanitydata.s3.us-east-2.amazonaws.com/symbl-logo.pngp"
    }),
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
</Tabs>


### Response
>Response for verbose-text-summary

```javascript
{
    "name": "verbose-text-summary",
    "url": "https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI0NTMyNTY2NDc2NDU1OTM2In0="
}
```
 >Response for video-summary

```javascript
{
    "name": "video-summary",
    "url": "https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI1ODU5NjczMDg1MzEzMDI0IiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0L3NtYWxsLm1wNCJ9?showVideoSummary=true"
}
```


### Request Headers

Method  | REQUIRED  | Value
---------- | ------- | -------
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Yes | The only current valid type is `application/json`.
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

Field  | REQUIRED  | Type | Description
---------- | ------- | ------- |  -------
```name``` | true | String |  For Summary UI use `verbose-text-summary` and for Video Summary UI use `video-summary`.
```videoUrl```| false | String |  This field is only required when the field `name` is set to `video-summary`.
```logo```| false | String |  This field accepts public URL for setting custom logo in Video Summary UI(`video-summary`) or Summary UI(`verbose-text-summary`).
```favicon```| false | String |  This field accepts public URL for setting custom favicon in Video Summary UI (`video-summary`) or Summary UI(`verbose-text-summary`).
```color```| false | Object | This option can be used to customise the colors of UI background, topics filter and insights filter elements in UI.
```font``` | false | Object | You can directly set any [Google Fonts](https://fonts.google.com/) by passing the name of the font.
```summaryURLExpiresIn``` | false | Number | This sets the expiry time for the summary URL. It is interpreted as seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.

#### color object

Field  | Description
---------- | -------
```background ``` | This field changes the background color of the UI. It accept color in Hex Color Code. For example ``"#0A2136"``.
``` topicsFilter``` | This field changes the color of the topics filter element. It accept color in Hex Color Code. For example ``"#FF0000"``.
``` insightsFilter``` | This field changes the color of the insights(includes action items, follow-ups, ideas, etc.) filter element. It accept color in Hex Color Code. For example ``"#FF0000"``.

#### font object

Field  | Description
---------- | -------
```family``` | The name of the font available in [Google Fonts](https://fonts.google.com/). This key changes the font family of the whole UI. For example: `"roboto"`

:::caution
`disableSummaryURLAuthentication` is not supported as we accept only secure URL generation to comply with the mandatory security requirements. 
:::