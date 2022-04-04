---
id: action-items
title: GET Action Items
sidebar_label: GET Action Items
slug: /conversation-api/action-items/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns a list of all the action items generated from the conversation.

An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to act in the future. These actions can be definitive in nature and owned with a commitment to working on a task such as creating the presentation, sharing a file, completing a task, etc. Or they can be non-definitive like an idea, suggestion or an opinion that could be worked upon.

All action items are generated with action phrases, assignees and due dates so that you can build workflow automation with your own tools.

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/action-items`


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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/action-items" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/action-items`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/action-items"
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
    print("actionItems => " + str(response.json()['actionItems']))  # actionsItems object containing actionItem id, text, type, score, messageIds, phrases, definitive, entities, assignee
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

### Response

```javascript
{
    "actionItems": [
        {
            "id": "4567077831573504",
            "text": "Vikram you need to work on figuring out a plan in which we can make this hackathon work for our customers first, and then Kunal then can go out and implement it for the rest of the world.",
            "type": "action_item",
            "score": 0.9456050585275944,
            "messageIds": [
                "4854542482014208"
            ],
            "entities": [
                {
                    "type": "person",
                    "text": "Vikram",
                    "offset": 0,
                    "value": {
                        "assignee": true,
                        "name": "Vikram"
                    }
                },
                {
                    "type": "person",
                    "text": "Kunal",
                    "offset": 122,
                    "value": {
                        "assignee": true,
                        "name": "Kunal"
                    }
                }
            ],
            "phrases": [
                {
                    "type": "action_phrase",
                    "text": "make this hackathon work for our customers first"
                }
            ],
            "from": {
                "id": "c99e7baf-8d9c-4668-ae08-6bd3384bc642",
                "name": "Lucy",
                "userId": "lucy@example.com"
            },
            "definitive": true,
            "assignee": {
                "name": "Vikram"
            }
        }
]
```

### Response Parameters

Field  | Description
---------- | ------- |
```id``` | Unique conversation identifier.
```text``` | The text of the Action Item.
```type``` | Response type. The default value is `action_item`.
```score``` | Confidence score of the action item. Value from 0 - 1.
```messageIds``` | Unique message identifiers of the corresponding messages.
```entities``` | List of detected entity objects in the insight with `type` - entity type and `text` - corresponding text.
```definitive``` | Boolean indicating if the action item is definitive or not. Implies that the action item is conclusive and not open-ended. For e.g, ‘I will complete this task today’ is a definitive sentence.
```phrases``` | List of detected phrases with `type` - phrase type and `text` - corresponding text. The `action_phrase` type represents the actionable part of an insight.
```assignee``` | This field contains the name and email of the person assigned to the Action Item.


:::info Comprehensive Action Items

You can also explore our Comprehensive Action Items API that is currently offered as a part of the Symbl Labs. Click [here](/docs/conversation-api/comprehensive-action-items) to read more. 

:::
