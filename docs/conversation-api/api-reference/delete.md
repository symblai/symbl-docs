---
id: delete
title: DELETE Conversation
slug: /conversation-api/delete-conversation/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API permanently deletes conversation and all related entities such as messages, insights, topics etc. associated with the Conversation ID.

:::caution
NOTE: Once delete operation is successful, all information associated with the Conversation ID is permanently lost and cannot be recovered later.
:::

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`DELETE https://api.symbl.ai/v1/conversations/{conversationId}`

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
curl --location --request DELETE "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.delete({
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
conversationId = 'your_conversation_id'  # Generated using Submit text end point

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

response = requests.request("DELETE", url, headers=headers)

if response.status_code == 200:
    # Successful API execution
    print(response.json()['message'])  # response message
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Response

> When Conversation ID is valid.

```javascript
{
    "message": "successfully deleted the conversation"
}
```

> When Conversation ID is invalid.

```javascript
{
    "message": "The conversationId is either invalid or does not exist."
}
```
