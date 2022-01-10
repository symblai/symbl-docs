---
id: action-items
title: GET Action Items
sidebar_label: GET Action Items
slug: /conversation-api/action-items
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns a list of all the action items generated from the conversation.

An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to act in the future.

These actions can be definitive in nature and owned with a commitment to working on a presentation, sharing a file, completing a task, etc.
Or they can be non-definitive like an idea, suggestion or an opinion that could be worked upon.

All action items are generated with action phrases, assignees and due dates so that you can build workflow automation with your own tools.



### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/action-items`


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
      "id": "6603306467065856",
      "text": "Surbhi Rathore can schedule a visit from one of our technicians for tomorrow afternoon at 1:00 PM.",
      "type": "action_item",
      "score": 0.9602078494794586,
      "messageIds": [
        "5175845967626240"
      ],
      "entities": [
        {
          "type": "datetime",
          "text": "tomorrow afternoon at 1:00 pm",
          "offset": 68,
          "value": "2021-10-31 13:00:00"
        },
        {
          "type": "person",
          "text": "Surbhi Rathore",
          "offset": 0,
          "value": {
            "assignee": true,
            "id": "4f6de4aa-05e5-4697-b8ea-7a962eecfd77",
            "name": "Surbhi Rathore",
            "userId": "surbhi@example.com"
          }
        }
      ],
      "phrases": [],
      "from": {
        "id": "4f6de4aa-05e5-4697-b8ea-7a962eecfd77",
        "name": "Surbhi Rathore",
        "userId": "surbhi@example.com"
      },
      "definitive": false,
      "assignee": {
        "id": "4f6de4aa-05e5-4697-b8ea-7a962eecfd77",
        "name": "Surbhi Rathore",
        "email": "surbhi@example.com"
      },
      "dueBy": "2021-10-31T20:00:00.000Z"
    }
  ]
}
```

### Response Parameters

Field  | Description
---------- | ------- |
```id``` | Unique conversation identifier.
```text``` | The text of the Action Item.
```type``` | Response type. Default is `action_item`.
```score``` | Confidence score of the action item. Value from 0 - 1.
```messageIds``` | Unique message identifiers of the corresponding messages.
```entities``` | List of detected entity objects in the insight with `type` - entity type and `text` - corresponding text.
```definitive``` | Boolean indicating if the action-item is definitive or not.
```phrases``` | List of detected phrases with `type` - phrase type and `text` - corresponding text. The `action_phrase` type represents the actionable part of an insight.
```assignee``` | This field contains the name and email of the person assigned to the Action Item.


:::info Comprehensive Action Items

You can also explore our Comprehensive Action Items API that is currently offered as a part of the Symbl Labs. Click [here](/docs/conversation-api/comprehensive-action-items) to read more. 

:::
