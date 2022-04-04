---
id: generate-pre-built-ui-from-video-recordings
title: Generate a Pre-built UI From Video Recordings
slug: /async-api/code-snippets/generate-pre-built-ui-from-video-recordings/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

[Symbl's Async API](/docs/async-api/introduction) allows you to process audio, video or text data and transform them into AI insights such as Topics, Action Items, Questions, and more. In this guide, we will walk you through how to process a video recording and receive our [Pre-built UI](/docs/pre-built-ui/summary-ui). The Pre-built UI generates a UI which contains all the information and analysis from your conversation which can be shared through a shareable link.

![Video Summary UI](/img/summary-ui-intro.png)

## Contents 

* [Getting Started](#getting-started)
* [Process Video File](#process-video-file)
    * [Example API Call](#example-api-call)
    * [Example API Response](#example-api-response)
* [Generate Pre-built UI](#generate-pre-built-ui)
    * [Example API Call](#example-api-call-1)
    * [Example API Response](#example-api-response-1)
* [Conclusion](#conclusion)

## Getting Started

In this guide, we will provide you a video, which can be found [here](https://storage.googleapis.com/demo-conversations/interview-prep.mp4), though you can replace that video with whichever video you want. You can read the pages here to learn how to do that:

* [POST Video Using URL](/docs/async-api/overview/video/post-video-url)
* [POST Video File](/docs/async-api/overview/video/post-video)

## Process Video File

To get the Summary UI, we need to process the video using Symbl's [POST Video Using URL](/docs/async-api/overview/video/post-video-url) endpoint. Here's a few examples of how to do that:

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

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
curl --location --request POST "https://api.symbl.ai/v1/process/video/url" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN" \
--data-raw '{
  "url": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
  "name": "Interview Prep", 
  "customVocabulary": ["Platform", "Discussion", "Targets"],
  "confidenceThreshold": 0.6,
  "detectPhrases": true,
  "languageCode": "en-US"
}'

```
</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;

const payload = {
  'url': "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
  // A valid url string. The URL must be a publicly accessible url.
  'name': "Interview Prep",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
  'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
  'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
  'detectPhrases': true,
  // <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
  'languageCode': "en-US"  // <Optional, boolean| language_code> |code of language of recording.>
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
// const webhookUrl = WEBHOOK_URL;

const payload = {
  'url': "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
  // A valid url string. The URL must be a publicly accessible url.
  'name': "Interview Prep",
  // <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
  // 'webhookUrl': "https://yourdomain.com/jobs/callback",
  // <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
  'customVocabulary': ['Platform', 'Discussion', 'Targets'],
  // <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
  'confidenceThreshold': 0.6,
  // <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
  'detectPhrases': true,
  // <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
  'languageCode': "en-US"  // <Optional, boolean| language_code> |code of language of recording.>
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
    'url': "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
    # A valid url string. The URL must be a publicly accessible url.
    'name': "Interview Prep",
    # <Optional, string| your_conversation_name | Your meeting name. Default name set to conversationId.>
    # 'webhookUrl': "https://yourdomain.com/jobs/callback",
    # <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>
    'customVocabulary': ['Platform', 'Discussion', 'Targets'],
    # <Optional, list| custom_vocabulary_list> |Contains a list of words and phrases that provide hints to the speech recognition task.
    'confidenceThreshold': 0.6,
    # <Optional, double| confidence_threshold | Minimum required confidence for the insight to be recognized.>
    'detectPhrases': True,
    # <Optional, boolean| detect_phrases |Accepted values are true & false. It shows Actionable Phrases in each sentence of conversation. These sentences can be found in the Conversation's Messages API.>
    'languageCode': "en-US"  # <Optional, boolean| language_code> |code of language of recording.>
}

responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload), params=json.dumps(params))

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

Once that call is run you'll get an example response with a `jobId` and `conversationId`, which we can later use to create our Pre-built UI.

### Example API Response

```js
{
    "conversationId": "XXXXXXXXXXXX2048",
    "jobId": "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXfaeb"
}
```

## Generate Pre-built UI

Now that we have the Conversation ID (`conversationId`), we can make a call to the [Experience API](/docs/pre-built-ui/experience-api) to generate our Pre-built UI.


### Example API Call

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
  "name": "video-summary",
  "videoUrl": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
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
        "videoUrl": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
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
    }),
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
</Tabs>

Once we make that call to the Experience API you will get a response with the Video Summary UI URL:

### Example API Response

```js
{
    "name": "video-summary",
    "url": "https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI2NjQxMzAyOTQ0ODc0NDk2IiwiZmF2aWNvbiI6Imh0dHBzOi8vc3ltYmxzYW5pdHlkYXRhLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3N5bWJsLWZhdmljb24ucG5nIiwibG9nbyI6Imh0dHBzOi8vc3ltYmxzYW5pdHlkYXRhLnMzLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tL3N5bWJsLWxvZ28ucG5nIiwiY29sb3IuYmFja2dyb3VuZCI6IiMwQTIxMzYiLCJjb2xvci50b3BpY3NGaWx0ZXIiOiIjRkYwMDAwIiwiY29sb3IuaW5zaWdodHNGaWx0ZXIiOiIjRkYwMDAwIiwiZm9udC5mYW1pbHkiOiJyb2JvdG8iLCJ2aWRlb1VybCI6Imh0dHBzOi8vc3RvcmFnZS5nb29nbGVhcGlzLmNvbS9kZW1vLWNvbnZlcnNhdGlvbnMvaW50ZXJ2aWV3LXByZXAubXA0In0=?showVideoSummary=true&o=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NDEzMDI5NDQ4NzQ0OTYiLCJpYXQiOjE2MTg5NTE4NTgsImV4cCI6MTYyMTU0Mzg1OH0.9unYru1yP9M3dBWviTp2CRo6yx8v8PS2ZUxAn6krWEE"
}
```

## Conclusion

In the response is a `url` field that contains the URL to the Video Summary UI. Opening up that page will bring us to our Pre-built UI.




