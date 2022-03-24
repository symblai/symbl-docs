---
id: receive-conversation-analytics
title: Receive Conversation Analytics
slug: /async-api/code-snippets/receive-conversation-analytics/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Process video file

The first thing you need to do before getting your conversational analytics is to process your video file. This code is taken directly from our [POST Video URL](/docs/async-api/overview/video/post-video-url) page. If you want to use an audio or text file you can use the code from the [POST Audio URL](/docs/async-api/overview/audio/post-audio-url) or [POST Text File](/docs/async-api/overview/text/post-text) pages.

While we provide you with a default video URL for the API to process, which can be downloaded [here](https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4), you can replace that with any other video URL.

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### Request Example

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
curl --location --request POST "https://api.symbl.ai/v1/process/video/url" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "url": "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4",
  "name": "BusinessMeeting"
}'

```
</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;

const payload = {
  'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4",
  // A valid url string. The URL must be a publicly accessible url.
  'name': "BusinessMeeting",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
  // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
  // 'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
  // 'detectPhrases': true,
  // <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
  // 'languageCode': "en-US"  // <Optional, boolean| language_code> |code of language of recording.>
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

const fetchData = {
  method: "POST",
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}

fetch("https://api.symbl.ai/v1/process/video/url", fetchData).then(response => {
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

const payload = {
  'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4",
  // A valid url string. The URL must be a publicly accessible url.
  'name': "BusinessMeeting",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
  // 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
  // 'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
  // 'detectPhrases': true,
  // <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
  // 'languageCode': "en-US"  // <Optional, boolean| language_code> |code of language of recording.>
}

const videoOption = {
  url: 'https://api.symbl.ai/v1/process/video/url',
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json'
  },
  // qs: {
  //   webhookUrl: webhookUrl,
  //   entities: [{
  //     "customType": "Custom_Entity_Type",
  //     "text": "Custom Entity to be searched in transcript"
  //   }]
  // },
  body: JSON.stringify(payload)
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

request.post(videoOption, (err, response, body) => {
  const statusCode = response.statusCode;
  if (error || Object.keys(responses).indexOf(statusCode.toString()) !== -1) {
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

url = "https://api.symbl.ai/v1/process/video/url"

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'url': "https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4",
    # A valid url string. The URL must be a publicly accessible url.
    'name': "BusinessMeeting",
    # <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
    # 'webhookUrl': "https://yourdomain.com/jobs/callback",
    # <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
    # 'customVocabulary': ['Platform', 'Discussion', 'Targets'],
    # <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
    # 'confidenceThreshold': 0.6,
    # <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
    # 'detectPhrases': True,
    # <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
    # 'languageCode': "en-US"  # <Optional, boolean| language_code> |code of language of recording.>
}

responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload), params=json.dumps(params)))

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


### Response Example

```js
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

## Receive Conversational Analytics

In the response above, you will notice the `conversationId` field. Using the `conversationId` you can send a GET request to [GET Analytics](/docs/conversation-api/analytics) endpoint in the [Conversation API](/docs/conversation-api/introduction), which will give you various analytics on the conversation such as talk time and listen time.

### Request Example

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/analytics" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/analytics"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("GET", url, headers=headers)

if response.status_code == 200:
    # Successful API execution
    print("metrics => " + str(response.json()['metrics']))  # metrics list containing followUp type, percent, seconds
    print("members => " + str(response.json()['members']))  # members list containing member id, name, pace, talkTime, listenTime, overlap object
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Response Example

```javascript
{
  "metrics": [
    {
      "type": "total_silence",
      "percent": 29.061,
      "seconds": 23.432
    },
    {
      "type": "total_talk_time",
      "percent": 70.939,
      "seconds": 57.199
    },
    {
      "type": "total_overlap",
      "percent": 55.071,
      "seconds": 31.5
    }
  ],
  "members": [
    {
      "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
      "name": "Speaker 1",
      "pace": {
        "wpm": 68
      },
      "talkTime": {
        "percentage": 40.912,
        "seconds": 23.401
      },
      "listenTime": {
        "percentage": 59.088,
        "seconds": 33.798
      },
      "overlap": {
        "overlapDuration": 31.5,
        "overlappingMembers": [
          {
            "id": "a52def45-be6e-484f-908b-9ac66eaecabb",
            "name": "Speaker 2",
            "percent": 61.58,
            "seconds": 24.94
          },
          {
            "id": "a52def45-be6e-484f-908b-9ac66eaecacb",
            "name": "Speaker 3",
            "percent": 7.51,
            "seconds": 1.9
          },
          {
            "id": "a52def45-be6e-484f-908b-9ac56eaecabb",
            "name": "Speaker 4",
            "percent": 12.199,
            "seconds": 4.66
          }
        ]
      }
    },
    {
      "id": "a52def45-be6e-484f-908b-9ac66eaecabb",
      "name": "Speaker 2",
      "pace": {
        "wpm": 132
      },
      "talkTime": {
        "percentage": 29.894,
        "seconds": 17.099
      },
      "listenTime": {
        "percentage": 70.106,
        "seconds": 40.1
      },
      "overlap": {
        "overlapDuration": 24.94,
        "overlappingMembers": [
          {
            "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
            "name": "Speaker 1",
            "percent": 61.58,
            "seconds": 24.94
          }
        ]
      }
    },
    {
      "id": "a52def45-be6e-484f-908b-9ac66eaecacb",
      "name": "Speaker 3",
      "pace": {
        "wpm": 189
      },
      "talkTime": {
        "percentage": 3.322,
        "seconds": 1.9
      },
      "listenTime": {
        "percentage": 96.678,
        "seconds": 55.299
      },
      "overlap": {
        "overlapDuration": 1.9,
        "overlappingMembers": [
          {
            "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
            "name": "Speaker 1",
            "percent": 7.51,
            "seconds": 1.9
          }
        ]
      }
    },
    {
      "id": "a52def45-be6e-484f-908b-9ac56eaecabb",
      "name": "Speaker 4",
      "pace": {
        "wpm": 152
      },
      "talkTime": {
        "percentage": 25.873,
        "seconds": 14.799
      },
      "listenTime": {
        "percentage": 74.127,
        "seconds": 42.4
      },
      "overlap": {
        "overlapDuration": 4.66,
        "overlappingMembers": [
          {
            "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
            "name": "Speaker 1",
            "percent": 12.199,
            "seconds": 4.66
          }
        ]
      }
    }
  ]
}

```

For a full reference of the response fields here you can view them on the [GET Analytics](/docs/conversation-api/analytics) page.

## Receiving More AI Insights

Here's more data you can grab with our [Conversation API](/docs/conversation-api/introduction):

**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Summary topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.
