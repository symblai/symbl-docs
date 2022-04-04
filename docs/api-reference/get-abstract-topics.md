---
id: get-abstract-topics
title: GET Abstract Topics (Labs)
sidebar_label: GET Abstract Topics (Labs)
slug: /api-reference/abstract-topics/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

This API returns a high level abstract topics from a conversation.

The Abstract Topics are suitable for scenarios where you want to determine recurrent themes in a conversation at a glance. 

:::note
Currently, Abstract Topics are not supported in real-time. 
:::

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api-labs.symbl.ai/v1/conversations/{conversationId}/abstract-topics`


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
curl "https://api-labs.symbl.ai/v1/conversations/{conversationId}/abstract-topics" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api-labs.symbl.ai/v1/conversations/{conversationId}/abstract-topics`,
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

baseUrl = "https://api-labs.symbl.ai/v1/conversations/{conversationId}/abstract-topics"
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
    print("abstractTopics => " + str(response.json()['abstractTopics']))  
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
    "abstractTopics": [
        {
            "id": "5631989198618624",
            "text": "engineering research",
            "type": "abstract_topic",
            "score": 0.2639832934784889,
            "messageIds": [],
        },
        {
            "id": "5264144644177920",
            "text": "deformation expansion",
            "type": "abstract_topic",
            "score": 0.2692850312948227,
            "messageIds": [],
        },
        {
            "id": "4734540816842752",
            "text": "low thermal expansion",
            "type": "abstract_topic",
            "score": 0.7286796541154384,
            "messageIds": [],
        },
        {
            "id": "5911449097469952",
            "text": "bipropellant rocket engine",
            "type": "abstract_topic",
            "score": 0.44802574345469476,
            "messageIds": [],
        },
        {
            "id": "5363486969298944",
            "text": "isentropic expansion factor",
            "type": "abstract_topic",
            "score": 0.2692850312948227,
            "messageIds": [],
        },
        {
            "id": "6538251268521984",
            "text": "expansion ratio",
            "type": "abstract_topic",
            "score": 0.4461310263156891,
            "messageIds": [
                "6151847678050304"
            ],
        }
    ]
}
```

### Response Parameters

Field  | Description
---------- | ------- |
```id``` | Unique conversation identifier.
```text``` | The text of the Abstract Topic.
```type``` | Response type. Default is `abstract_topic`.
```score``` | Shows the abstraction % or coverage of the theme in the conversation.
```messageIds``` | Unique message identifiers of the corresponding messages.