---
id: post-trackers-and-analytics-ui
title: POST Trackers and Analytics UI
sidebar_label: POST Trackers and Analytics UI
slug: /api-reference/experience-api/post-trackers-and-analytics-ui/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns the URL of the [Trackers and Analytics UI](/docs/pre-built-ui/trackers-and-analytics-ui).

👉 [See Trackers and Analytics UI sample](https://meetinginsights-experience.symbl.ai/?_ga=2.9776305.580174444.1626193486-1247610446.1617102437#/eyJjb252ZXJzYXRpb25JZCI6IjU5NDg0ODUwNDUwNTk1ODQiLCJhdWRpb1VybCI6Imh0dHBzOi8vc3ltYmwtdGVzdC1jb252ZXJzYXRpb24uczMuYW1hem9uYXdzLmNvbS80X2NvbWNhc3RfY3VzdG9tZXJfc2VydmljZV85bWluMDNzZWMubXAzIn0.?o=fb5a99d192b2821a40639c5c7af86021db2ed6c7e32b3a8fccf6967b7e126c4ed6bd1e4636082ba3fc3a3da3980e5b99272c241e9d44c518715bf5c9772fe3bc405efb43e2cd11ef9c6e106215034ee3ac91c8dda4c09263032103519e56c690980c1c3f07604c183b1a4ddbcfca5df6cee1f7841492017eb2bb28b761cf57f218f05e233a2f34d223d4e0e4d8615fb2fca9c31fa534237c82e276ef4c4ec2c77f4fa320a7c00cded9e897d879b0f77d819475c0383f677214fa366d85bd6b99b10e1b7f56410d1c5813fd71d8f7f441de040f0bddfe2253c6161cb9990ca47f69e052ae5553a33b3cb0fd9dff80c009b466953f671d0ddefcf4534a17b56b2a89b671c07f0bc51daa85939494423b394ada8fabd44b91efc1817e77566ead15ab69e61fe2773a4eb4086d3ae0ca6bceda3274c5361e5ad389)

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

```shell
curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/experiences" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "name": "audio-summary",
  "audioUrl": "https://symbl-test-conversation.s3.amazonaws.com/4_comcast_customer_service_9min03sec.mp3",
}'
```

### Response

```javascript
{
    "name": "audio-summary",
    "url": "https://meetinginsights-experience.symbl.ai/#/eyJjb252ZXJzYXRpb25JZCI6IjU5NDg0ODUwNDUwNTk1ODQiLCJhdWRpb1VybCI6Imh0dHBzOi8vc3ltYmwtdGVzdC1jb252ZXJzYXRpb24uczMuYW1hem9uYXdzLmNvbS80X2NvbWNhc3RfY3VzdG9tZXJfc2VydmljZV85bWluMDNzZWMubXAzIn0.?o=fb5a99d192b2821a40639c5c7af86021db2ed6c7e32b3a8fccf6967b7e126c4ed6bd1e4636082ba3fc3a3da3980e5b99272c241e9d44c518715bf5c9772fe3bc405efb43e2cd11ef9c6e106215034ee3ac91c8dda4c09263032103519e56c690980c1c3f07604c183b1a4ddbcfca5df6cee1f7841492017eb2bb28b761cf57f218f05e233a2f34d223d4e0e4d8615fb2fca9c31fa534237c82e276ef4c4ec2c77f4fa320a7c00cded9e897d879b0f77d819475c0383f677214fa366d85bd6b99b10e1b7f56410d1c5813fd71d8f7f441de040f0bddfe2253c6161cb9990ca47f69e052ae5553a33b3cb0fd9dff80c009b466953f671d0ddefcf4534a17b56b2a89b671c07f0bc51daa85939494423b394ada8fabd44b91efc1817e77566ead15ab69e61fe2773a4eb4086d3ae0ca6bceda3274c5361e5ad389"
}
```

### Request Body

Field  | Required  | Type | Description
---------- | ------- | ------- |  -------
```name``` | Mandatory | String |  As the Tracker and Analytics UI is supported for audio conversations use `audio-summary`.
```audioURL```| Mandatory | String | The `audioUrl` must match the `conversationId`. In other words, the `audioUrl` needs to be the same URL that was submitted to the Async API to generate the `conversationId`.
```logo```| Optional | String |  This field accepts public URL for setting custom logo.
```favicon```| Optional | String |  This field accepts public URL for setting custom favicon.
```color```| Optional | Object | This option can be used to customise the colors of UI background, topics filter and insights filter elements in UI.
```font``` | Optional | Object | You can directly set any [Google Fonts](https://fonts.google.com/) by passing the name of the font.
```summaryURLExpiresIn``` | Optional | Number | This sets the expiry time for the summary URL. It is interpreted as seconds. If the value 0 is passed the URL will never expire. Default time for a URL to expire is 2592000 which is 30 days.
```readOnly``` | Optional | Boolean | Setting this parameter to `true` generates a non-editable, read-only version of the audio summary. It is defaulted to `false`. Note that this feature does not have any impact on the existing summary URLs that have already been generated. 

:::note
Currently, custom domain is not supported for Trackers and Analytics Summary UI. 
:::

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