---
id: post-video
title: POST Video API
slug: /async-api/overview/video/post-video/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Async Video API allows you to process a video file.

It can be useful in any use case where you have access to the video file of any type of conversation, and you want to extract the insightful items supported by the [Conversation API](/docs/conversation-api/introduction).

:::info
This API supports only <b>mp4</b> file formats. If you have any other type of file, you need to first convert the file to the supported format in order to use the API.
:::

### API Endpoint
`POST https://api.symbl.ai/v1/process/video`


### Example API Call

Before using the Async Video API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).

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

  // 'detectPhrases': true,
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

    # 'detectPhrases': true,
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

### Query Parameters

Parameter | Required | Type | Description
--------- | --------- | ------- | -------
```name``` | Optional | String | Your meeting name. Default name set to `conversationId`.
```webhookUrl``` | Optional | String | Webhook URL on which job updates to be sent. This should be post API. For Webhook payload, refer to the [Using Webhook](#using-webhook) section below. 
```customVocabulary``` | Optional | String[] | Contains a list of words and phrases that provide hints to the speech recognition task.
```confidenceThreshold``` | Optional | Double | Minimum confidence score that you can set for an API to consider it as a valid insight (action items, follow-ups, topics, and questions). It should be in the range <=0.5 to <=1.0 (i.e., greater than or equal to `0.5` and less than or equal to `1.0`.). The default value is `0.5`.
```detectPhrases```| Optional | Boolean | Accepted values are `true` & `false`. It shows [Actionable Phrases](/docs/conversation-api/action-items) in each sentence of conversation. These sentences can be found in the [Conversation's Messages API](/docs/conversation-api/messages).
```entities``` | Optional | Object[] | Input custom entities which can be detected in your conversation using [Entities API](/docs/conversation-api/entities). Sample request for Custom Entity is given in the [Custom Entity](#custom-entity) section below. 
```detectEntities``` | Optional | Boolean | Default value is `false`. If not set the [Entities API](/docs/conversation-api/entities) will not return any entities from the conversation. 
 ```languageCode```| Optional | String | We accept different languages. Please [check language Code](/docs/async-api/overview/async-api-supported-languages) as per your requirement.
``` mode``` | Optional | String | Accepts `phone` or `default`. `phone` mode is best for audio that is generated from phone call(which is typically recorded at 8khz sampling rate).<br />`default` mode works best for audio generated from video or online meetings(which is typically recorded at 16khz or more sampling rate).<br />When you don't pass this parameter `default` is selected automatically.
```enableSeparateRecognitionPerChannel```| Optional | Boolean | Enables Speaker Separated Channel video processing. Accepts `true` or `false` values.
```channelMetadata```| Optional | Object[] | This object parameter contains two variables `speaker` and `channel` to specify which speaker corresponds to which channel. This object only works when `enableSeparateRecognitionPerChannel` query param is set to `true`. Read more in the [Channel Metadata](#channel-metadata) section below. 
```trackers``` <font color="orange"> BETA</font> | Optional | List | A `tracker` entity containing `name` and `vocabulary` (a list of key words and/or phrases to be tracked). Read more in the [Tracker API](/docs/management-api/trackers/overview) section. 
```enableAllTrackers```<font color="orange"> BETA </font> | Optional | Boolean | Default value is `false`. Setting this parameter to `true` will enable detection of all the Trackers maintained for your account by the Management API.This will allow Symbl to detect all the available Trackers in a specific Conversation.  Learn about this parameter [here](/docs/management-api/trackers/overview#step-2-submit-files-using-async-api-with-enablealltrackers-flag). 
```enableSummary```<font color="blue"> ALPHA </font> | Optional | Boolean | Setting this parameter to `true` allows you to generate Summaries using [Summary API (Labs)](/conversation-api/summary). Ensure that you use the base URL as `https://api-labs.symbl.ai`.
```enableSpeakerDiarization``` | Optional | Boolean | Whether the diarization should be enabled for this conversation. Pass this as `true` to enable Speaker Separation. To learn more, refer to the [Speaker Separation](#speaker-separation) section below. 
```diarizationSpeakerCount``` | Optional | String | The number of unique speakers in this conversation. To learn more, refer to the [Speaker Separation](#speaker-separation) section below. 

### Response 

```js
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

Field | Description
---------- | ------- |
`conversationId` | ID to be used with [Conversation API](/docs/conversation-api/introduction).
`jobId` | ID to be used with Job API.

#### Custom Entity

```json
{
  "detectEntities": true,
  "entities": [
    {
      "customType": "identify_people",
      "text": "executives"
    },
    {
      "customType": "identify_colour",
      "text": "blue"
    }
  ]
}
```
#### Channel Metadata

The `channelMetadata` object has the members `channel` and `speaker` as shown below: 

Given below is an example of a `channelMetadata` object:

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
```channel``` | Yes | Integer | This denotes the channel number in the audio file. Each channel will contain independent speaker's voice data.
```speaker``` | Yes | String | This is the wrapper object which defines the speaker for this channel.

`speaker`  has the following members:

Field | Required | Type | Description
| ------- | ------- | ------- | ------
```name``` | No | String | Name of the speaker.
```email``` | No | String | Email address of the speaker.

### Speaker Separation
---

The Async Audio & Async Video APIs can detect and separate unique speakers in a single stream of audio & video without the need for separate speaker events.

To enable this capability with either of the APIs the `enableSpeakerDiarization` and `diarizationSpeakerCount` query parameters need to be passed with the request. The `diarizationSpeakerCount` should be equal to the number of unique speakers in the conversation. If the number varies then this might introduce false positives in the diarized results.

👉 To learn how to implement Speaker Separation, see [How to implement Speaker Separation](/docs/async-api/tutorials/get-speaker-separation-audio-video) page.

If you’re looking for similar capability in Real-Time APIs, please refer to [Active Speaker Events](/docs/javascript-sdk/code-snippets/active-speaker-events) and Speaker Separation in WebSocket API sections.

:::note
**Speaker Diarization Language Support**

Currently, Speaker Diarization is available for English and Spanish languages only.

**Billing for Speaker Separated Channels**

The billing for a speaker separated channel audio file is according to the number of channels present in the audio files. The duration for billing will be calculated according to the below formula:

`totalDuration = duration_of_the_audio_file * total_number_of_channels`

So, if you send a 120-second file with 3 speaker separated channels, the total duration for billing would be 360 seconds or 6 minutes.
:::

### Using Webhook 
---

The `webhookUrl` will be used to send the status of job created for uploaded audio URL. Every time the status of the job changes it will be notified on the Webhook Url.

##### Code Example

```js
{
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "status": "in_progress"
}
```

Field | Description
| ------- | -------
```jobId``` | ID to be used with [Job API](/docs/async-api/overview/jobs-api).
```status``` |  Current status of the job. (Valid statuses: [ `scheduled`, `in_progress`, `completed`, `failed` ])

### API Limit Error
---
```js
{
  "statusCode" : 429,
  "message" : "This API has a limit of maximum of `X` number of concurrent jobs per account. If you are looking to scale, and need more concurrent jobs than this limit, please contact us at support@symbl.ai"
}
```

Here value of `X` can be found in [FAQ](/docs/faq). 

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::