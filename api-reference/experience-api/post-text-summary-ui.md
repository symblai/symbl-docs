---
id: post-text-summary-ui
title: POST Text Summary UI
sidebar_label: POST Text Summary UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns the URL of the [Text Summary UI](/docs/pre-built-ui/text-summary-ui).

👉 [See Text Summary UI sample](https://oob-prod.symbl.ai/meeting/?__hstc=142565997.f13e6f687289922af636bba5b8ac2aab.1598766952817.1606472347899.1606474504198.210&__hssc=142565997.1.1606474504198&__hsfp=1690225618&_ga=2.43028069.1767386795.1632916447-941182599.1627371222#/eyJ1c2VySWQiOiJzdXJiaGlyYXRob3JlQHJhbW1lci5haSIsIm5hbWUiOiJTdXJiaGkiLCJzZXNzaW9uSWQiOiI2MzA0NTA2NTcyNzAxNjk2In0)

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/conversations/{conversationId}/experiences`**

:::info
Before using the API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

### Request Headers

Method  | REQUIRED  | Value
---------- | ------- | -------
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Yes | The only current valid type is `application/json`.
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Sample Request

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="cURL">

```bash

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
    },
  "readOnly": true
  }
}'

```
</TabItem>
<TabItem value="nodejs">

```js
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
      },
      "readOnly": true
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

### Request Body

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
```name``` | Mandatory | String |  For Text Summary UI, use `verbose-text-summary`.
```logo```| Optional | String |  This field accepts public URL for setting custom logo in the Text Summary UI(`verbose-text-summary`).
```favicon```| Optional | String |  This field accepts public URL for setting custom favicon in the Text Summary UI(`verbose-text-summary`).
```color```| Optional | Object | This option can be used to customise the colors of UI background, topics filter and insights filter elements in UI.
```font``` | Optional | Object | You can directly set any [Google Fonts](https://fonts.google.com/) by passing the name of the font.
```summaryURLExpiresIn``` | Optional | Number | This sets the expiry time for the summary URL. It is interpreted as seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.
```readOnly``` | Optional | Boolean | Setting this parameter to `true` generates a non-editable, read-only version of the video-summary and verbose-text-summary. It is defaulted to `false`. Note that this feature does not have any impact on the existing summary URLs that have already been generated. 
```enableCustomDomain``` | Optional | Boolen |  Enable generation of personalized URLs for Summary UI. Currently, custom domain is not supported for Trackers and Analytics Summary UI. 

#### `color` object

Field  | Description
---------- | -------
```background ``` | This field changes the background color of the UI. It accept color in Hex Color Code. For example ``"#0A2136"``.
``` topicsFilter``` | This field changes the color of the topics filter element. It accept color in Hex Color Code. For example ``"#FF0000"``.
``` insightsFilter``` | This field changes the color of the insights(includes action items, follow-ups, ideas, etc.) filter element. It accept color in Hex Color Code. For example ``"#FF0000"``.

#### `font` object

Field  | Description
---------- | -------
```family``` | The name of the font available in [Google Fonts](https://fonts.google.com/). This key changes the font family of the whole UI. For example: `"roboto"`

:::caution
`disableSummaryURLAuthentication` is not supported as we accept only secure URL generation to comply with the mandatory security requirements. 
:::
