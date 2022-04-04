---
id: post-text
title: POST Text API
slug: /async-api/overview/text/post-text/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Async Text API allows you to process any text payload. This API is useful for when you want to extract Conversation Insights from textual content.

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### API Endpoint

`POST https://api.symbl.ai/v1/process/text`

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
curl --location --request POST 'https://api.symbl.ai/v1/process/text' \
--header "Authorization: Bearer $AUTH_TOKEN" \
# Set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Business Meeting",
  "detectPhrases": "true",
  "confidenceThreshold": 0.6,
  "messages": [
    {
      "duration": {
        "startTime": "2020-07-21T16:04:19.99Z",
        "endTime": "2020-07-21T16:04:20.99Z"
      },
      "payload": {
        "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you are providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family? Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
        "contentType": "text/plain"
      },
      "from": {
        "name": "John",
        "userId": "john@example.com"
      }
    }
  ]
}'
```
</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;

const payload = {
  // <Optional,String| your_meeting_name by default conversationId>
  "name": "Business Meeting",
  // <Optional,double| Minimum required confidence for the insight to be recognized. Value ranges between 0.0 to 1.0. Default value is 0.5.>
  "confidenceThreshold": 0.6,
  // <Optional,boolean| It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's Messages API. Default value is false.>
  "detectPhrases": true,
  "messages": [
    {

      // <Optional, object| Duration object containing startTime and/or endTime for the transcript.>, e.g.
      "duration": {
        "startTime": "2020-07-21T16:04:19.99Z",
        "endTime": "2020-07-21T16:04:20.99Z"
      },
      "payload": {
        "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you're providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That's it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
        "contentType": "text/plain"
      },
      // <Optional, object| Information about the User information i.e. name and/or userId, produced the content of this message.>
      "from": {
        "name": "John",
        "userId": "john@example.com"
      }
    }
  ]
}

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

fetch(`https://api.symbl.ai/v1/process/text`, fetchData).then(response => {
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
// set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
const authToken = AUTH_TOKEN;

const options = {
  'method': 'POST',
  'url': 'https://api.symbl.ai/v1/process/text',
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  },
  body: JSON.stringify({
    // <Optional,String| your_meeting_name by default conversationId>
    "name": "Business Meeting",
    // <Optional,double| Minimum required confidence for the insight to be recognized. Value ranges between 0.0 to 1.0. Default value is 0.5.>
    "confidenceThreshold": 0.6,
    // <Optional,boolean| It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's Messages API. Default value is false.>
    "detectPhrases": true,
    "messages": [
      {

        // <Optional, object| Duration object containing startTime and/or endTime for the transcript.>, e.g.
        "duration": {
          "startTime": "2020-07-21T16:04:19.99Z",
          "endTime": "2020-07-21T16:04:20.99Z"
        },
        "payload": {
          "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you're providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That's it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
          "contentType": "text/plain"
        },
        // <Optional, object| Information about the User information i.e. name and/or userId, produced the content of this message.>
        "from": {
          "name": "John",
          "userId": "john@example.com"
        }
      }
    ]
  })
};

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

request(options, function (error, response) {
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

url = "https://api.symbl.ai/v1/process/text"

payload = {
    "name": "Business Meeting",  # <Optional,String| your_meeting_name by default conversationId>

    "confidenceThreshold": 0.6,
    # <Optional,double| Minimum required confidence for the insight to be recognized. Value ranges between 0.0 to 1.0. Default value is 0.5.>

    "detectPhrases": true,
    # <Optional,boolean| It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's Messages API. Default value is false.>

    "messages": [
        {
            "duration": {"startTime": "2020-07-21T16:04:19.99Z", "endTime": "2020-07-21T16:04:20.99Z"},
            # <Optional, object| Duration object containing startTime and/or endTime for the transcript.>, e.g.
            "payload": {
                "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you're providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That's it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
                "contentType": "text/plain"
            },
            "from": {"name": "John", "userId": "john@example.com"}
            # <Optional, object| Information about the User information i.e. name and/or userId, produced the content of this message.>
        }
    ]
}

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

# webhookUrl = <Optional, string| your_webhook_url| Webhook url on which job updates to be sent. (This should be post API)>" e.g https://yourdomain.com/jobs/callback
# if webhookUrl is not None:
#   url += "?webhookUrl" + webhookUrl  

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


### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

```json
{
  "name": "Afternoon Business Meeting",
  "detectPhrases": true,
  "confidenceThreshold": 0.6,
  "entities": [
    {
      "customType": "Company Executives",
      "value": "Marketing director",
      "text": "Marketing director"
    }
  ],
  "detectEntities": true,
  "messages": [],
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

Field | Required | Type |  Description
---------- | ------- | ------- |  ------- |
```name``` | Optional | String | Your meeting name. Default name set to `conversationId`.
```detectPhrases```| Optional | Boolean | It shows Actionable Phrases in each sentence of conversation. These sentences can be found using the Conversation's  Messages API. Default value is `false`.
```confidenceThreshold``` | Optional | Double | Minimum confidence score that you can set for an API to consider it as a valid insight (action items, follow-ups, topics, and questions). It should be in the range <=0.5 to <=1.0 (i.e., greater than or equal to `0.5` and less than or equal to `1.0`.). The default value is `0.5`.
```entities``` | Optional | List | Input custom entities which can be detected in conversation using [Entities API](/docs/conversation-api/entities).
```detectEntities``` | Optional | Boolean | Default value is `false`. If not set the [Entities API](/docs/conversation-api/entities) will not return any entities from the conversation.
```messages``` | Mandatory | list |  Input Messages to look for insights. [See the messages section below for more details.](#messages)
```trackers```<font color="orange"> BETA </font> | Optional | List | A `tracker` entity containing `name` and `vocabulary` (a list of key words and/or phrases to be tracked). Read more in the [Tracker API](/docs/management-api/trackers/overview) section. 
```enableAllTrackers```<font color="orange"> BETA </font> | Optional | Boolean | Default value is `false`. Setting this parameter to `true` will enable detection of all the Trackers maintained for your account by the Management API. This will allow Symbl to detect all the available Trackers in a specific Conversation.  Learn about this parameter [here](/docs/management-api/trackers/overview#step-2-submit-files-using-async-api-with-enablealltrackers-flag). 
```enableSummary```<font color="blue"> ALPHA </font> | Optional | Boolean | Setting this parameter to `true` allows you to generate Summaries using [Summary API](/conversation-api/summary). Ensure that you use `https://api.symbl.ai/` as the base URL.
```webhookUrl``` | Optional | String | Webhook URL on which job updates to be sent. This should be after making the API request. See the [Webhook section](/docs/async-api/overview/text/post-text#webhookurl) for more. 
#### messages

Field | Required | Type | Description
---------- | ------- | ------- |  -------
```payload``` | Yes | Object | Input Messages to look for insights. [See the payload section below for more details.](#payload)
```from``` | No | Object | Information about the User information produced the content of this message.
```duration``` | No | Object | Duration object containing `startTime` and `endTime` for the transcript.

```js
{ 
  "messages": [{
    "payload": {
      "content": "Hi Mike, Natalia here. Hope you don’t mind me reaching out. Who would be the best possible person to discuss internships and student recruitment at ABC Corp? Would you mind pointing me toward the right person and the best way to reach them? Thanks in advance for your help, I really appreciate it!"
    },
    "from": {
      "userId": "natalia@example.com",
      "name": "Natalia"
    },
    "duration":{
      "startTime":"2020-07-21T16:02:19.01Z",
      "endTime":"2020-07-21T16:04:19.99Z"
    }
  }, {
    "payload": {
      "content": "Hey Natalia, thanks for reaching out. I am connecting you with Steve who handles recruitments for us."
    },
    "from": {
      "userId": "mike@abccorp.com",
      "name": "Mike"
    },
    "duration":{
      "startTime":"2020-07-21T16:04:19.99Z",
      "endTime":"2020-07-21T16:04:20.99Z"
    }
  }]
}
```

#### payload

Field | Required | Type | Default | Description
---------- | ------- | ------- |  ------- | -------
```content``` | Mandatory | String | | The text content that you want the API to parse.

```js
{
  "payload": {
    "content": "Hi Mike, Natalia here. Hope you don’t mind me reaching out. Who would be the best possible person to discuss internships and student recruitment at ABC Corp? Would you mind pointing me toward the right person and the best way to reach them? Thanks in advance for your help, I really appreciate it!"
  }
}
```

#### from(user)

Field | Required | Type | Description
---------- | ------- | ------- |  -------
```name``` | Optional | String | Name of the user.
```userId``` | Optional | String | A unique identifier of the user. E-mail ID is usually a preferred identifier for the user.

```js
{
  "from": {
    "userId": "mike@abccorp.com",
    "name": "Mike"
  }
}
```

#### duration

Field | Required | Type | Description
---------- | ------- | ------- |  -------
```startTime``` | Optional | DateTime | The start time for the particular text content.
```endTime``` | Optional | DateTime | The end time for the particular text content.

```js
{
  "duration": {
    "startTime":"2020-07-21T16:04:19.99Z",
    "endTime":"2020-07-21T16:04:20.99Z"
  }
}
```

#### webhookUrl

WebhookUrl will be used to send the status of job created. Every time the status of the job changes it will be notified on the WebhookUrl.

```js
{
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "status": "in_progress"
}
```

Field | Description
---------- | ------- |
```jobId``` | ID to be used with Job API.
```status``` | Current status of the job. Valid statuses: [ `scheduled`, `in_progress`, `completed` ].

### Response

```js
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

Field | Description
---------- | ------- |
```conversationId``` | ID to be used with [Conversation API](/docs/conversation-api/introduction).
```jobId``` | ID to be used with [Job API](/docs/async-api/overview/jobs-api).

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