---
id: post-video
title: POST Video API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Async Video API allows you to process a video file.

It can be useful in any use case where you have access to the video file of any type of conversation, and you want to extract the insightful items supported by the [Conversation API](/docs/conversation-api/introduction).

:::info
This API supports only <b>mp4</b> file formats. If you have any other type of file, you need to first convert the file to the supported format in order to use the API.
:::

### HTTP REQUEST
`POST https://api.symbl.ai/v1/process/video`


### Example API Call

:::info
Before using the Async Video API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request POST "https://api.symbl.ai/v1/process/video?name=Business%20Meeting&customVocabulary=%5B%22Platform%22,%22Discussion%22,%22Targets%22%5D&confidenceThreshold=0.6&detectPhrases=true&languageCode=en-US" \
--header 'Content-Type: video/mp4' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-binary '@/file/location/your_video.mp4'

```
</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const fs = require('fs');
const authToken = AUTH_TOKEN;
const webhookUrl = WEBHOOK_URL;
const videoFileStream = fs.createReadStream('/file/location/video.mp4');

const params = {
  'name': "Business Meeting",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

  'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>

  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>",

  // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

  // 'detectPhrases': True,
  // <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.

  // 'languageCode': "en-US"
  // <Optional, boolean| language_code> |code of language of recording.
}

const videoOption = {
  url: 'https://api.symbl.ai/v1/process/video',
  headers: {
    'Authorization': `Bearer ${authToken}`
    'Content-Type': 'video/mp4'
  },
  qs: params,
  json: true,
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

videoFileStream.pipe(request.post(videoOption, (err, response, body) => {
  const statusCode = response.statusCode;
  if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
    throw new Error(responses[statusCode]);
  }
  console.log('Status code: ', statusCode);
  console.log('Body', response.body);
}));
```

</TabItem>
<TabItem value="python">

```py
import json
import requests

url = "https://api.symbl.ai/v1/process/video"

payload = None

try:
    video_file = open('destination/of/file/file.mp4', 'rb')  # use (r"path/to/file") when using windows path
    payload = video_file.read()
except FileNotFoundError:
    print("Could not find the file provided.")
    exit()

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'video/mp4'  # Describes the format and codec of the provided video. Accepted value video/mp4
}

params = {
    'name': "Business Meeting",
    # <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

    'confidenceThreshold': 0.6,
    # <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>

    # 'webhookUrl': "https://yourdomain.com/jobs/callback",
    # <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>",

    # 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
    # <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

    # 'detectPhrases': True,
    # <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.

    # 'languageCode': "en-US"
    # <Optional, boolean| language_code> |code of language of recording.
}

responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=payload, params=json.dumps(params))

if response.status_code == 201:
    # Successful API execution
    print("conversationId => " + response.json()['conversationId'])  # ID to be used with Conversation API.
    print("jobId => " + response.json()['jobId'])  # ID to be used with Job API.
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


### Request Headers

Header Name | Required | Description
---------- | ------- | ---------
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Mandatory | Describes the format and codec of the provided video. Accepted value `video/mp4`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Query Params

Parameter | Required | Type | Description
--------- | --------- | ------- | -------
```name``` | Optional | String | Your meeting name. Default name set to `conversationId`.
```webhookUrl``` | Optional | String | Webhook URL on which job updates to be sent. This should be post API.
```customVocabulary``` | Optional | String[] | Contains a list of words and phrases that provide hints to the speech recognition task.
```confidenceThreshold``` | Optional | Double | Minimum required confidence for the insight to be recognized. The range is from 0.0 to 1.0. Default value 0.5.
```detectPhrases```| Optional | Boolean | Accepted values are `true` & `false`. It shows [Actionable Phrases](/docs/conversation-api/action-items) in each sentence of conversation. These sentences can be found in the [Conversation's Messages API](/docs/conversation-api/messages).
```customEntities``` | Optional | Object[] | Input custom entities which can be detected in your conversation using [Entities API](/docs/conversation-api/entities).
```detectEntities``` | Optional | Boolean | Default value is `false`. If not set the [Entities API](/docs/conversation-api/entities) will not return any entities from the conversation.
 ```languageCode```| Optional | String | We accept different languages. Please [check language Code](/docs/async-api/overview/async-api-supported-languages) as per your requirement.
``` mode``` | Optional | String | Accepts `phone` or `default`. `phone` mode is best for audio that is generated from phone call(which is typically recorded at 8khz sampling rate).<br />`default` mode works best for audio generated from video or online meetings(which is typically recorded at 16khz or more sampling rate).<br />When you don't pass this parameter `default` is selected automatically.
```enableSeparateRecognitionPerChannel```| Optional | Boolean | Enables Speaker Separated Channel video processing. Accepts `true` or `false` values.
```channelMetadata```| Optional | Object[] | This object parameter contains two variables `speaker` and `channel` to specify which speaker corresponds to which channel. This object only works when `enableSeparateRecognitionPerChannel` query param is set to `true`. Read more in the [Channel Metadata](#channelmetadata) section below. 
```trackers``` <font color="orange"> BETA</font> | Optional | String | A list of key words or/and phrases to be tracked using the [Tracker API.](/docs/concepts/trackers)
```enableSummary```<font color="blue"> LABS </font> | Optional | Boolean | Setting this parameter to `true` allows you to generate Summaries using [Summary API (Labs)](/conversation-api/summary). Ensure that you use the base URL as `https://api-labs.symbl.ai`.

### Speaker Separation

The Async Audio & Async Video APIs can detect and separate unique speakers in a single stream of audio & video without the need for separate speaker events.

To enable this capability with either of the APIs the `enableSpeakerDiarization` and `diarizationSpeakerCount` query parameters need to be passed with the request.

The `diarizationSpeakerCount` should be equal to the number of unique speakers in the conversation. If the number varies then this might introduce false positives in the diarized results.

If you’re looking for similar capability in Real-Time APIs, please refer to [Active Speaker Events](/docs/javascript-sdk/code-snippets/active-speaker-events) and Speaker Separation in WebSocket API sections.

#### Query Params

Parameter | Required | Value
--------- | --------- | -------
```enableSpeakerDiarization``` | Mandatory | Whether the diarization should be enabled for this conversation. Pass this as `true` to enable this capability.
```diarizationSpeakerCount``` | Mandatory | The number of unique speakers in this conversation.

### Channel Metadata <a name="channelmetadata"></a>

This object parameter contains two variables `speaker` and `channel` to specify which speaker corresponds to which channel. This object only works when `enableSeparateRecognitionPerChannel` query param is set to `true`.

#### channelMetadata Object

```js
{
  "channelMetadata": [
    {
      "channel": 1,
      "speaker": {
        "name": "Robert Bartheon",
        "email": "robertbartheon@example.com"
      }
    },
    {
      "channel": 2,
      "speaker": {
        "name": "Arya Stark",
        "email": "aryastark@example.com"
      }
    }
  ]
}
```
`channelMetadata` object has following members:

Field | Required | Type | Description
| ------- | ------- | ------- | --------
```channel``` | Mandatory | Integer | This denotes the channel number in the audio file. Each channel will contain independent speaker's voice data.
```speaker``` | Mandatory | String | This is the wrapper object which defines the speaker for this channel.

`speaker`  has the following members:

Field | Required | Type | Description
| ------- | ------- | ------- | ------
```name``` | Optional | String | Name of the speaker.
```email``` | Optional | String | Email address of the speaker.

### Webhook Payload

`webhookUrl` will be used to send the status of job created for uploaded audio url. Every time the status of the job changes it will be notified on the WebhookUrl

Field | Description
| ------- | -------
```jobId``` | ID to be used with Job API.
```status``` |  Current status of the job. (Valid statuses: [ `scheduled`, `in_progress`, `completed`, `failed` ])


##### Code Example

```js
{
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "status": "in_progress"
}
```

### Response


#### Response Object

Field | Description
---------- | ------- |
`conversationId` | ID to be used with [Conversation API](/docs/conversation-api/introduction).
`jobId` | ID to be used with Job API

##### Code Example

```js
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

### API Limit Error

```js
{
  "statusCode" : 429,
  "message" : "This API has a limit of maximum of `X` number of concurrent jobs per account. If you are looking to scale, and need more concurrent jobs than this limit, please contact us at support@symbl.ai"
}
```

Here value of `X` can be found in [FAQ](/docs/faq). 

