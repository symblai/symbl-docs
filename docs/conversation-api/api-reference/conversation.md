---
id: conversation
title: GET Conversation Data
sidebar_label: GET Conversation Data
slug: /conversation-api/conversation-data/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns the conversation meta-data like meeting name, member name and email, start and end time of the meeting, meeting type and meeting ID.

It returns data for a specific conversation (using `conversationId`). If you wish to get all the conversations, see [GET All Conversations](/docs/conversation-api/all-conversations) page. 

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}`

### Example API Call

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/"
conversationId = 'your_conversation_id'  # Generated using Submit end point

url = baseUrl + conversationId

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
    print("id => " + response.json()['id'])  # conversationId.
    print("type => " + response.json()['type'])  # <string> type of conversation, default is meeting
    print("name => " + response.json()['name'])  # <string> name of conversation
    print("startTime => " + response.json()['startTime'])  # <datetime value> start time of conversation
    print("endTime => " + response.json()['endTime'])  # <datetime value> end time of conversation
    print("members => " + str(response.json()['members']))  # <list of member objects containing name and email if detected> members who were part of conversation
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


### Response


```javascript

{
  "id": "4549300882243584",
  "type": "meeting",
  "name": "4549300882243584",
  "startTime": "2021-07-23T16:31:29.798Z",
  "endTime": "2021-07-23T16:32:20.826Z",
  "members": [

      {
          "id": "5118221462011904",
          "name": "John",
          "email": "John@example.com"
      },
      {
          "id": "50123212234535645",
          "name": "Mary",
          "email": "Mary@example.com"
      },
      {
          "id": "63475698234689238",
          "name": "Roger",
          "email": "Roger@example.com"
      }
  ],
  "metadata": {
      "label": "Business"
  }
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | The unique conversation identifier.
```type``` | The conversation type. Default value is `meeting`.
```name``` | The name of the conversation.
```startTime``` | DateTime value of when the conversation started.
```endTime``` | DateTime value of when the conversation ended. 
```members``` | A list of member objects containing ID, name and email (if detected).
```metadata``` | Contains user-defined metadata key values which are used for labelling conversations.


