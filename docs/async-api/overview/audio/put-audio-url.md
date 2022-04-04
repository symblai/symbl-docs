---
id: put-audio-url
title: PUT Audio URL API
slug: /async-api/overview/audio/put-audio-url/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
The Async Audio URL API allows you to append an additional audio URL to the previous conversation, append the transcription and get conversational insights for the updated conversation.

It can be useful in any use case where you have access to multiple recorded audio stored publicly as a URL and you want to extract the insightful items supported by the [Conversation API](/docs/conversation-api/introduction).


:::important
If there are multiple requests are submitted for the same Conversation ID, all the requests will be processed synchronously
in order to maintain the order of the requests for the conversation.
:::

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### API Endpoint

`PUT https://api.symbl.ai/v1/process/audio/url/:conversationId`

### Example API Call

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Native Javascript', value: 'javascript', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request PUT "https://api.symbl.ai/v1/process/audio/url/:conversationId" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
  "confidenceThreshold": 0.6,
}'
```
</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

const payload = {
  'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
  // A valid url string. The URL must be a publicly accessible url.

  'name': "Business Meeting",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>

  // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

  'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized. >

  // 'detectPhrases': true,
  // <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API."

  // 'enableSeparateRecognitionPerChannel': True,
  // <Optional, boolean| enable_separate_recognition_per_channel> |Enables Speaker Separated Channel audio processing. Accepts true or false.",

  // 'channelMetadata': [{"channel": 1, "speaker": {"name": "Robert Bartheon", "email": "robertbartheon@example.com"}}],
  // ["<Optional, boolean| channel_metadata> |This object parameter contains two variables speaker and channel to specific which speaker corresponds to which channel. This object only works when enableSeparateRecognitionPerChannel query param is set to true."],

  // 'languageCode': "en-US"
  // <Optional, boolean| language_code> |code of language of recording.
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

const fetchData = {
  method: "PUT",
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}

fetch(`https://api.symbl.ai/v1/process/audio/url/${conversationId}`, fetchData).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(responses[response.status]);
  }
}).then(response => {
  console.log('response', response);
}).catch(error => {
  console.error(error);
});
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const webhookUrl = WEBHOOK_URL;
const conversationId = CONVERSATION_ID;

const payload = {
  'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
  // A valid url string. The URL must be a publicly accessible url.

  'name': "Business Meeting",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>

  // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

  'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized. >

  // 'detectPhrases': true,
  // <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API."

  // 'enableSeparateRecognitionPerChannel': True,
  // <Optional, boolean| enable_separate_recognition_per_channel> |Enables Speaker Separated Channel audio processing. Accepts true or false.",

  // 'channelMetadata': [{"channel": 1, "speaker": {"name": "Robert Bartheon", "email": "robertbartheon@example.com"}}],
  // ["<Optional, boolean| channel_metadata> |This object parameter contains two variables speaker and channel to specific which speaker corresponds to which channel. This object only works when enableSeparateRecognitionPerChannel query param is set to true."],

  // 'languageCode': "en-US"
  // <Optional, boolean| language_code> | code of language of recording.
}

const audioOption = {
  url: `https://api.symbl.ai/v1/process/audio/url/${conversationId}`,
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
   },
  qs: {
    webhookUrl: webhookUrl,
  },
  body: JSON.stringify(payload)
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

request.post(audioOption, (error, response, body) => {
  const statusCode = response.statusCode;
  if (err || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
    throw new Error(responses[statusCode]);
  }
  console.log('Status code: ', statusCode);
  console.log('Body', response.body);
});
```
</TabItem>
<TabItem value="python">

```py
import json
import requests

baseUrl = "https://api.symbl.ai/v1/process/audio/url/"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl + conversationId

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
    # A valid url string. The URL must be a publicly accessible url.

    'name': "Business Meeting",
    # <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>

    # 'webhookUrl': "https://yourdomain.com/jobs/callback",
    # <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>

    # 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
    # <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.

    'confidenceThreshold': 0.6,
    # <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized. >

    # 'detectPhrases': True,
    # <Optional, boolean| detect_phrases> |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API."

    # 'enableSeparateRecognitionPerChannel': True,
    # <Optional, boolean| enable_separate_recognition_per_channel> |Enables Speaker Separated Channel audio processing. Accepts true or false.",

    # 'channelMetadata': [{"channel": 1, "speaker": {"name": "Robert Bartheon", "email": "robertbartheon@example.com"}}],
    # ["<Optional, boolean| channel_metadata> |This object parameter contains two variables speaker and channel to specific which speaker corresponds to which channel. This object only works when enableSeparateRecognitionPerChannel query param is set to true."],

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

response = requests.request("PUT", url, headers=headers, data=json.dumps(payload), params=json.dumps(params))

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
```Content-Type``` | Mandatory | Accepted values is `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Path Parameter

Parameter | Description
--------- | ----------
```conversationId``` | `conversationId` which is provided by the first request submitted using POST async audio API.

### Request Body

```json
{
  "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav",
  "customVocabulary": [
    "Platform",
    "Discussion",
    "Targets"
  ],
  "confidenceThreshold": 0.6,
  "detectPhrases": true,
  "name": "Business Meeting",
  "webhookUrl": "",
  "entities": [
    {
      "customType": "Company Executives",
      "value": "Marketing director",
      "text": "Marketing director"
    }
  ],
  "detectEntities": true,
  "languageCode": "en-US",
  "mode": "phone",
  "enableSeparateRecognitionPerChannel": true,
  "channelMetadata": [],
  "trackers": [
    {
      "name": "Promotion Mention",
      "vocabulary": [
        "We have a special promotion going on if you book this before",
        "I can offer you a discount of 10 20 percent you being a new customer for us",
        "We have our month special this month",
        "We have a sale right now on"
      ]
    }
  ]
}
```
### Request Body Parameters

Parameters | Required | Type | Description
---------- | ------- | ------- | -----
```url``` | Mandatory | String | A valid url string. The URL must be a publicly accessible url.
```customVocabulary``` | Optional | String[] | Contains a list of words and phrases that provide hints to the speech recognition task.
```confidenceThreshold``` | Optional | Double | Minimum confidence score that you can set for an API to consider it as a valid insight (action items, follow-ups, topics, and questions). It should be in the range <=0.5 to <=1.0 (i.e., greater than or equal to `0.5` and less than or equal to `1.0`.). The default value is `0.5`.
```detectPhrases```| Optional | Boolean | It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's  Messages API. It's a boolean value where the default value is `false`.
```name``` | Optional | String | Your meeting name. Default name set to `conversationId`.
```webhookUrl``` | Optional | String | Webhook URL on which job updates to be sent. This should be post making the API call. For Webhook payload, refer to the [Using Webhook](#using-webhook) section below. 
```customEntities``` | Optional | Object[] | Input custom entities which can be detected in your conversation using [Entities API](/docs/conversation-api/entities).
```detectEntities``` | Optional | Boolean | Default value is `false`. If not set the [Entities API](/docs/conversation-api/entities) will not return any entities from the conversation.
 ```languageCode```| Optional | String | We accept different languages. Please [check language Code](/docs/async-api/overview/async-api-supported-languages) as per your requirement.
``` mode``` | Optional  | String | Accepts `phone` or `default`. `phone` mode is best for audio that is generated from phone call(which is typically recorded at 8khz sampling rate).<br />`default` mode works best for audio generated from video or online meetings(which is typically recorded at 16khz or more sampling rate).<br />When you don't pass this parameter `default` is selected automatically. 
```enableSeparateRecognitionPerChannel``` | Optional | Boolean | Enables Speaker Separated Channel audio processing. Accepts `true` or `false`.
```channelMetadata``` | Optional | Object[] | This object parameter contains two variables `speaker` and `channel` to specific which speaker corresponds to which channel. This object **only** works when `enableSeparateRecognitionPerChannel` is set to `true`.  Learn more in the [Channel Metadata](#channel-metadata) section below. 
```trackers``` <font color="orange"> BETA</font> | Optional | List | A `tracker` entity containing `name` and `vocabulary` (a list of key words and/or phrases to be tracked). Read more in the [Tracker API](/docs/management-api/trackers/overview) section. 
```enableAllTrackers```<font color="orange"> BETA </font> | Optional | Boolean | Default value is `false`. Setting this parameter to `true` will enable detection of all the Trackers maintained for your account by the Management API.This will allow Symbl to detect all the available Trackers in a specific Conversation. Learn about this parameter [here](/docs/management-api/trackers/overview#step-2-submit-files-using-async-api-with-enablealltrackers-flag).
```enableSummary```<font color="blue"> ALPHA </font> | Optional | Boolean | Setting this parameter to `true` allows you to generate Summaries using [Summary API](/conversation-api/summary). Ensure that you use `https://api.symbl.ai/` as the base URL.
```enableSpeakerDiarization``` | Optional | Boolean | Whether the diarization should be enabled for this conversation. Pass this as `true` to enable Speaker Separation. To learn more, refer to the [Speaker Separation](#speaker-separation) section below. 
```diarizationSpeakerCount``` | Optional | String | The number of unique speakers in this conversation. To learn more, refer to the [Speaker Separation](#speaker-separation) section below. 

#### Channel Metadata

The `channelMetadata` object has the members `channel` and `speaker`.
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
```channel``` | Mandatory | Integer | This denotes the channel number in the audio file. Each channel will contain independent speaker's voice data.
```speaker``` | Mandatory | String | This is the wrapper object which defines the speaker for this channel.

`speaker`  has the following members:

Field | Required | Type | Description
| ------- | ------- | ------- | ------
```name``` | Optional | String | Name of the speaker.
```email``` | Optional | String | Email address of the speaker.

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

The `webhookUrl` will be used to send the status of the job created for uploaded audio URL. Every time the status of the job changes it will be notified on the Webhook Url. The user's server should respond with the status code 200 on receiving the `webhookUrl` update. This will prevent Symbl from resending the same update.

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

##### Sample User Server Simulation

Here is a sample code that simulates a local server "api" endpoint for `webhookUrl`:

```js
const express = require('express');
const app = express();
app.listen(9000, () => console.log('Listening at 9000'));
app.use(express.static('public'));
app.use(express.json({limit:'1mb'}));
app.post('/api',(request,response) => {
    let currentDate = new Date();
    let data = request.body;
    console.log('datetime:',currentDate,' jobId:',data.id,' status:', data.status);
    response.json({
        status:200
    });
    }
)
```

Let's say your server runs on `localhost:9000`, then use `ngrok` to make your localhost and the "api" handle the Symbl Async API request by printing the events received from the request. Run `ngrok http 9000` and then pass the url `https://.../` with the "api" string address to the Async request through `webhookUrl`. For example: `https://0bd1-2601-600-8780-9280-181a-4525-3a3f-882d.ngrok.io/api`. Run your localhost server and then send the Async API request through the ngrok `webhookUrl`. You will receive the following status from your localhost server:

```shell
Listening at 9000

datetime: 2021-11-10T03:29:34.998Z  jobId: f4535f3f-9b7c-458b-a47a-cc84b916d9e6  status: scheduled

datetime: 2021-11-10T03:29:35.526Z  jobId: f4535f3f-9b7c-458b-a47a-cc84b916d9e6  status: in_progress

datetime: 2021-11-10T03:31:39.777Z  jobId: f4535f3f-9b7c-458b-a47a-cc84b916d9e6  status: completed
```


### API Limit Error

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
