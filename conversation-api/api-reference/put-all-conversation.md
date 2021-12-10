---
id: put-all-conversations
title: PUT Conversations
sidebar_label: PUT Conversations
slug: /conversation-api/put-all-conversations
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API updates an existing Conversation object with any metadata you would like to maintain. 

### API Request

`PUT https://api.symbl.ai/v1/conversations/{conversationId}`

### Example API Call

:::info
Before using the Conversation API, you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
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
curl "https://api.symbl.ai/v1/conversations/{conversationId}" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;

request.get({
    url: `https://api.symbl.ai/v1/conversations/{conversationId}`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}"

url = baseUrl 

# Set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
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

:::note
The following fields cannot be updated/deleted:

- `id`

- `type`
:::

### Request Body

Given below is an example of the request along with optional query parameters. For a complete list of query parameters and their description, see the [table](#query-parameters) below.

```json
{
  "type": "meeting",
  "name": "My Test Meeting",
  "startTime": "2021-02-24T15:53:05.594Z",
  "endTime": "2021-02-24T16:18:05.048Z",
  "members": [
    {
      "name": "John",
      "email": "john@example.com"
    },
    {
      "name": "Mary",
      "email": "mary@example.com"
    }
  ],
  "metadata": {
    "key": "value", 
    "agentId": "johndoe"
  }
}
```
### Response
The updated Conversation object is returned in the response body.

```javascript
{
  "id": "4931769134481408",
  "type": "meeting",
  "name": "My Test Meeting",
  "startTime": "2021-02-24T15:53:05.594Z",
  "endTime": "2021-02-24T16:18:05.048Z",
  "members": [
    {
      "name": "John",
      "email": "john@example.com"
    },
    {
      "name": "Mary",
      "email": "mary@example.com"
    }
  ],
  "metadata": {
    "key": "value", 
    "agentId": "johndoe"
  }
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | The unique conversation identifier. This field cannot be updated. 
```type``` | The conversation type. Default value is `meeting`. This field cannot be updated. 
```name``` | The name of the conversation.
```startTime``` | DateTime value of when the conversation started.
```endTime``` | DateTime value of when the conversation ended. 
```members``` | A list of member objects containing ID, name and email (if detected).


