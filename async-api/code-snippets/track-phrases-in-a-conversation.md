---
id: track-phrases-in-a-conversation
title: Track Phrases In A Conversation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

## Process video file

The first thing you need to do before you start tracking phrases in a conversation is to process your conversation. This code is taken directly from our [POST Video URL](/docs/async-api/overview/video/post-video-url) page. If you want to use an audio or text conversation you can use the code from the [POST Audio URL](/docs/async-api/overview/audio/post-audio-url) or [POST Text](/docs/async-api/overview/text/post-text) pages.

While we provide you with a default textual conversation for the API to process you can replace that with any other conversation.

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

### Request Example

:::info
Before using the Async API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

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
  "name": "BusinessMeeting",
  "trackers": [{
    "name": "Preparing",
    "vocabulary": [
      "Interviewing for a new job",
      "Most common interview questions",
      "Be polite and friendly",
      "Practice"
    ]
  }]
}'

```
</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;

const payload = {
  "url": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
  "name": "BusinessMeeting",
  "trackers": [{
    "name": "Preparing",
    "vocabulary": [
      "Interviewing for a new job",
      "Most common interview questions",
      "Be polite and friendly",
      "Practice"
    ]
  }]
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
  "url": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
  "name": "BusinessMeeting",
  "trackers": [{
    "name": "Preparing",
    "vocabulary": [
      "Interviewing for a new job",
      "Most common interview questions",
      "Be polite and friendly",
      "Practice"
    ]
  }]
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
    "url": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4",
    "name": "BusinessMeeting",
    "trackers": [{
        "name": "Preparing",
        "vocabulary": [
            "Interviewing for a new job",
            "Most common interview questions",
            "Be polite and friendly",
            "Practice"
        ]
    }]
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
  "conversationId": "6641302944874496",
  "jobId": "d48ad9fa-c4e3-49a0-8e1a-e7114b0d3908"
}
```


## View Detected Trackers

In the response above, you will notice the `conversationId` field. Using the `conversationId` you can send a request to [GET Trackers](/docs/conversation-api/trackers) endpoint in the [Conversation API](/docs/conversation-api/introduction), which will give you a list and information about the detected trackers in the conversation.

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

```sh
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/trackers-detected" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/trackers-detected`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/trackers-detected"
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

response = requests.request("GET", url, headers=headers, params=json.dumps(params))

if response.status_code == 200:
    # Successful API execution
    print("trackers => " + str(response.json()['tracjers']))
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
[
  {
    "id": "4756677603622912",
    "name": "Preparing",
    "matches": [
      {
        "messageRefs": [
          {
            "id": "6564679117701120",
            "text": "That's all about preparing for a job interview.",
            "offset": -1
          },
          {
            "id": "4735091769081856",
            "text": "This is part 1 of a five part series on preparing for an interview interviewing for a new job can be a huge source of stress and anxiety.",
            "offset": 67
          }
        ],
        "type": "vocabulary",
        "value": "Interviewing for a new job",
        "insightRefs": []
      },
      {
        "messageRefs": [
          {
            "id": "4776569274892288",
            "text": "And if you're interviewing for a job in a non-native language, the stress can be even higher in this video.",
            "offset": -1
          },
          {
            "id": "5391969637367808",
            "text": "You will see me interview for a job throughout the interview will discuss some of the most common interview questions and how to answer them.",
            "offset": 86
          },
          {
            "id": "4735091769081856",
            "text": "This is part 1 of a five part series on preparing for an interview interviewing for a new job can be a huge source of stress and anxiety.",
            "offset": -1
          },
          {
            "id": "5048132138172416",
            "text": "For instance if the interviewer asks you how your weekend was you might respond.",
            "offset": -1
          },
          {
            "id": "6626693613617152",
            "text": "All you need to do is be polite and friendly keep your answers short you can also Feel free to turn the question back to the interviewer.",
            "offset": -1
          },
          {
            "id": "5288167592689664",
            "text": "Did you have any trouble finding the office Small Talk most interviews will start out with a handshake and some small talk?",
            "offset": -1
          },
          {
            "id": "4786205738663936",
            "text": "It's very common for interviewers to Simply ask you to tell them about yourself.",
            "offset": -1
          },
          {
            "id": "5966231091806208",
            "text": "If you're preparing for an interview practice talking about yourself and your work history record yourself with a video camera if possible.",
            "offset": -1
          },
          {
            "id": "4583072743817216",
            "text": "It's important that you don't just write a paragraph and memorize it but simply practice free talking with some key phrases the more you practice before the interview the more comfortable you will feel answering the questions during the interview.",
            "offset": -1
          },
          {
            "id": "5831946489823232",
            "text": "We will go over three more common interview questions.",
            "offset": -1
          },
          {
            "id": "6116201249898496",
            "text": "What attracted you to our company and what's your greatest strength I hope this video on job interviews has been helpful there's nothing better than walking out of an interview feeling that you were fully prepared if you have interview related questions or stories, please post them in the comments below I would love to hear them.",
            "offset": -1
          }
        ],
        "type": "vocabulary",
        "value": "Most common interview questions",
        "insightRefs": [
          {
            "text": "Did you have any trouble finding the office Small Talk most interviews will start out with a handshake and some small talk?",
            "offset": -1,
            "type": "question",
            "id": "6250461063544832"
          },
          {
            "id": "5978748673327104",
            "text": "We need to go over three more common interview questions.",
            "offset": -1,
            "type": "action_item"
          }
        ]
      },
      {
        "messageRefs": [
          {
            "id": "6626693613617152",
            "text": "All you need to do is be polite and friendly keep your answers short you can also Feel free to turn the question back to the interviewer.",
            "offset": 22
          }
        ],
        "type": "vocabulary",
        "value": "Be polite and friendly",
        "insightRefs": []
      },
      {
        "messageRefs": [
          {
            "id": "5010445679198208",
            "text": "Kitchens, you could also practice with a friend here is an example of small talk.",
            "offset": 25
          },
          {
            "id": "6227772957523968",
            "text": "It may seem silly, but you can practice small talk on your own by asking yourself simple easy to answer non personal.",
            "offset": 31
          },
          {
            "id": "5966231091806208",
            "text": "If you're preparing for an interview practice talking about yourself and your work history record yourself with a video camera if possible.",
            "offset": 37
          },
          {
            "id": "4583072743817216",
            "text": "It's important that you don't just write a paragraph and memorize it but simply practice free talking with some key phrases the more you practice before the interview the more comfortable you will feel answering the questions during the interview.",
            "offset": 80
          }
        ],
        "type": "vocabulary",
        "value": "Practice",
        "insightRefs": []
      }
    ]
  }
]
```

## Receiving More AI Insights

Here's more data you can grab with our [Conversation API](/docs/conversation-api/introduction):

**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Summary topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

:::caution Old Endpoint
The old endpoint for fetching Trackers (given below) is deprecated and not recommended to be used
`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`
:::