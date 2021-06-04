---
id: conversation
title: GET Conversation Data
sidebar_label: GET Conversation Data
slug: /conversation-api/conversation-data
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This API returns the conversation meta-data like meeting name, member name and email, start and end time of the meeting, meeting type and meeting id.


### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}`


### Example API Call

:::info
Before using the Conversation API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
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
    "id": "5179649407582208",
    "type": "meeting",
    "name": "Project Meeting #2",
    "startTime": "2020-02-12T11:32:08.000Z",
    "endTime": "2020-02-12T11:37:31.134Z",
    "members": [
        {
            "name": "John",
            "email": "John@example.com"
        },
        {
            "name": "Mary",
            "email": "Mary@example.com"
        },
        {
            "name": "Roger",
            "email": "Roger@example.com"
        }
    ]
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | unique conversation identifier
```type``` | conversation type. default is `meeting`
```name``` | name of the conversation
```startTime``` | DateTime value
```endTime``` | DateTime value
```members``` | list of member objects containing name and email if detected
