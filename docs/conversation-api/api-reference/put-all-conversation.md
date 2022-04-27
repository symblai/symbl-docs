---
id: put-all-conversations
title: PUT Conversations
sidebar_label: PUT Conversations
slug: /conversation-api/put-all-conversations/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API updates an existing Conversation object with any metadata you would like to maintain. 

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### API Request

`PUT https://api.symbl.ai/v1/conversations/{conversationId}`

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
The following field can be updated/deleted:
 
- `metadata` 

 To update the `metadata` read about the requirements [here](/docs/management-api/conversation-groups/conversation-groups-intro/#step-2-add-metadata-to-conversation)

The following fields cannot be updated/deleted:

- `id`

- `type`
:::

### Request Body

Given below is an example of the request body:

```json
{
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
   "id":"4931769134481408",
   "metadata":{
      "key":"value",
      "agentId":"johndoe"
   }
}
```
Metadata contains user-defined metadata key values which are used for labelling conversations. `agentid` is example for `key/value` pair. You can define the key/value pairs based on what you want to store in the metadata field.