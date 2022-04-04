---
id: how-to-use-sentiment-analysis
title: How To Use Sentiment Analysis (Beta)
slug: /async-api/code-snippets/how-to-use-sentiment-analysis/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

## Process file

The first thing you need to do before getting your Sentiment Analysis is to process your audio, video or text file. This code is taken directly from our [POST Video URL](/docs/async-api/overview/video/post-video-url) page. If you want to use an audio or text file you can use the code from the [POST Audio URL](/docs/async-api/overview/audio/post-audio-url) or [POST Text File](/docs/async-api/overview/text/post-text) pages.

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

While we provide you with a default video URL for the API to process, which can be downloaded [here](https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4), you can replace that with any other video URL.

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
  "name": "BusinessMeeting", 
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


### Response Example

```js
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

## Receive Sentiment Analysis


In the response above, you will notice the `conversationId` field. Using the `conversationId` you can send a request to [GET Speech to Text](/docs/conversation-api/messages) endpoint, in the [Conversation API](/docs/conversation-api/introduction), which will give you a detailed transcript of the video. Sentiment Analysis also works with the [GET Topics](/docs/conversation-api/get-topics) endpoint, which gives you information about detected conversational topics in the video. **To to get the Sentiment Analysis from the endpoint you must pass the query parameter `sentiment=true` in the Conversation API URL.** Below is an example:

### Request Example

This is example call to the [GET Speech to Text](/docs/conversation-api/messages) endpoint.

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```bash
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/messages?sentiment=true" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages?sentiment=true`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/messages?sentiment=true"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

params = {
    'verbose': True,  # <Optional, boolean| Gives you word level timestamps of each sentence.>
    'sentiment': True  # <Optional, boolean| Give you sentiment analysis on each message.>
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("GET", url, headers=headers)

if response.status_code == 200:
    # Successful API execution
    print("messages => " + str(response.json()['messages']))  # messages is a list of id, text, from, startTime, endTime, conversationId, words, phrases, sentiment
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
  "messages":[
    {
      "id":"6131375637790720",
      "text":"Okay, so you're talking about that file, which I am sending you.",
      "from":{
        
      },
      "startTime":"2021-04-12T22:10:39.881Z",
      "endTime":"2021-04-12T22:10:43.981Z",
      "conversationId":"6320529160011776",
      "phrases":[
        {
          "type":"action_phrase",
          "text":"sending I you"
        }
      ],
      "sentiment":{
        "polarity":{
          "score":-0.201
        },
        "suggested":"neutral"
      }
    },
    {
      "id":"6605033355345920",
      "text":"Ah There is way I don't think there is way too now.",
      "from":{
        
      },
      "startTime":"2021-04-12T22:10:46.681Z",
      "endTime":"2021-04-12T22:10:53.281Z",
      "conversationId":"6320529160011776",
      "phrases":[
        {
          "type":"action_phrase",
          "text":"think there is way too now"
        }
      ],
      "sentiment":{
        "polarity":{
          "score":-0.201
        },
        "suggested":"neutral"
      }
    },
    ...
  ]
}
```

### Polarity

In the response you'll notice the polarity field which shows the intensity of the sentiment. It ranges from -1.0 to 1.0, where -1.0 is the most negative sentiment and 1.0 is the most positive sentiment. If you wish to read more about Polarity you can checkout our article on Sentimental Analysis [here](/docs/concepts/sentiment-analysis).

```js
{
  "sentiment": {
    "polarity": {
      "score": 0.6
    }
  }
}
```

:::info
We have chosen the below polarity ranges wrt sentiment type which covers a wide range of conversations.
Polarity Sentiment may vary for your use case. We recommend that you define a threshold that works for you, and then adjust the threshold after testing and verifying the results.
:::


| polarity         | Suggested Sentiment |
|------------------|---------------------|
| -1.0 => x > -0.3 | negative            |
| -0.3 => x <= 0.3 | neutral             |
| 0.3 < x <= 1.0   | positive            |