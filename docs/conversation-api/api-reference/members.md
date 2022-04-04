---
id: members
title: GET Member Information
sidebar_label:  GET Member Information
slug: /conversation-api/members/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns a list of all the members in a conversation. A Member is referred to a participant in the conversation that is uniquely identified as a speaker. Identifying different participants in the meetings can be done by implementing speaker separation.

For more details on identifying members by [Speaker Events or Active Talker events](/docs/javascript-sdk/tutorials/push-speakerevents-get-summary-url) in Real-time using Voice SDK.

For more details on identifying members by [independent audio stream integration using Websocket.](/docs/streamingapi/overview/configuration)

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/members`

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/members" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/members`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/members"
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
    print("members => " + str(response.json()['members']))  # list of member object containing fields id, name, email.
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
    "members": [
        {
            "id": "fc9b35cd-361f-41c6-9029-0944d21c7150",
            "name": "John",
            "email": "John@example.com"
        },
        {
            "id": "382362a2-eeec-46a3-8891-d50508293851",
            "name": "Mary",
            "email": "Mary@example.com"
        },
        {
            "id": "b7de3a33-a16c-4926-9d4d-a904c88271c2",
            "name": "Roger",
            "email": "Roger@example.com"
        }
    ]
}
```



### Response Object

Field  | Description
---------- | ------- |
```id``` | Member's unique identifier.
```name``` | Member's name.
```email``` | Member's email.
