---
id: whitelabeling-summary-ui
title: White labeling Summary UI
sidebar_label: White labeling Summary UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can customize the Summary UI by adding your own logo, favicon, and other components to match your brand identity.

Customization is available with [Text](/docs/pre-built-ui/text-summary-ui), [Video](/docs/pre-built-ui/video-summary-ui) and [Trackers and Analytics UI](/docs/pre-built-ui/trackers-and-analytics-ui).  


When generating the Summary UI with [Experience API](/docs/api-reference/experience-api/post-text-summary-ui), pass the following parameters in the request body. 

:::info
In the example given below, we have shown the customization of Trackers and Analytics UI, but the same is supported with Text and Video Summary UI as well. 
:::

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
    "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325": "https://gravatar.com/avatar/9839b07ba341232442f17282d4d67869?s=400&d=robohash&r=x"
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

