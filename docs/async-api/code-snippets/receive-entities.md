---
id: receive-entities
title: Receive Entities From Conversation
slug: /async-api/code-snippets/receive-entities/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Process video file

The first thing you need to do before getting your entities is to process your video file. This code is taken directly from our  [POST Video URL](/docs/async-api/overview/video/post-video-url) page. If you want to use an audio or text file you can use the code from the  [POST Audio URL](/docs/async-api/overview/audio/post-audio-url) or [POST Text File](/docs/async-api/overview/text/post-text) pages.

While we provide you with a default video URL for the API to process, which can be downloaded [here](https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4), you can replace that with any other video URL.

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
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```shell
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/entities" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/entities`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/entities"
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
    print("entities => " + str(response.json()['entities']))  # List of entity object containing type, value, text, messageRefs, customType (if a custom entity)
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()

```

</TabItem>
</Tabs>

### Response Example

<Tabs
  defaultValue="Custom Entity"
  values={[
    { label: 'Custom Entity', value: 'Custom Entity', },
    { label: 'Person Entity', value: 'Person Entity', },
    { label: 'Organization Entity', value: 'Organization Entity', },
    { label: 'Date Entity', value: 'Date Entity', },
    { label: 'Number Entity', value: 'Number Entity', }
  ]
}>

<TabItem value="Custom Entity">

```js
{
  "type": "custom",
  "customType": "Company Executives",
  "value": "marketing director",
  "text": "marketing director",
  "messageRefs": [
    {
      "id": "5118221462011904",
      "text": "The marketing director is out-of-town due to some work.",
      "offset": 4
    }
  ]
}
```

</TabItem>

<TabItem value="Person Entity">

```js
{
  "type": "person",
  "value": "jamie smith",
  "text": "jamie smith",
  "messageRefs": [
    {
      "id": "5979280332816384",
      "text": "The name is Jamie Smith.",
      "offset": 12
    }
  ]
}

```

</TabItem>

<TabItem value="Organization Entity">

```js
{
  "type": "organization",
  "value": "Vodafone",
  "text": "Vodafone",
  "messageRefs": [
    {
      "id": "6141473464516608",
      "text": "Hello, this is Peter from Vodafone, I help you today.",
      "offset": 26
    }
  ]
}
```

</TabItem>

<TabItem value="Date Entity">

```js
{
  "type": "date",
  "value": "2020-07-15",
  "text": "today",
  "messageRefs": [
    {
      "id": "6141473464516608",
      "text": "Hello, this is Peter from Vodafone, I help you today.",
      "offset": 47
    },
    {
      "id": "4603163403354112",
      "text": "Being a loyal customer at the three types of plan options that I can offer you today.",
      "offset": 79
    },
    {
      "id": "5936512994639872",
      "text": "Is there anything else I may assist you with today?",
      "offset": 45
    }
  ]
}
```

</TabItem>

<TabItem value="Number Entity">

```js
{
  "type": "number",
  "value": "two",
  "text": "two",
  "messageRefs": [
    {
      "id": "6137109238775808",
      "text": "What do you two think of that?",
      "offset": 12
    }
  ]
}
```

</TabItem>
</Tabs>

For a full reference of the response fields here you can view them on the [GET Entities](/docs/conversation-api/entities) page.

## Receiving More AI Insights

Here's more data you can grab with our [Conversation API](/docs/conversation-api/introduction):

**[View conversation topics](/docs/conversation-api/get-topics)**<br />
Summary topics provide a quick overview of the key things that were talked about in the conversation.

**[View action items](/docs/conversation-api/action-items)**<br />
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action, e.g. set up a meeting, share a file, complete a task, etc.

**[View follow-ups](/docs/conversation-api/follow-ups)**<br />
This is a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.
