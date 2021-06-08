---
id: action-items
title: GET Action Items
sidebar_label: GET Action Items
slug: /conversation-api/action-items
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This API returns a list of all the action items generated from the conversation.

An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to act in the future.

These actions can be definitive in nature and owned with a commitment to working on a presentation, sharing a file, completing a task, etc.
Or they can be non-definitive like an idea, suggestion or an opinion that could be worked upon.

All action items are generated with action phrases, assignees and due dates so that you can build workflow automation with your own tools.



### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/action-items`


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


### Response

```javascript
{
    "actionItems": [
        {
            "id": "5707174000984064",
            "text": "Roger is going to work with the TV lab and make sure that test is also included, so we are checking to make sure not only with our complaints.",
            "type": "action_item",
            "score": 0.9999962500210938,
            "messageIds": [
                "6531517035527344"
            ],
            "phrases": [
                {
                    "type":"action_phrase",
                    "text":"Roger is going to work with the TV lab"
                }
            ],
            "definitive": true,
            "entities": [],
            "assignee": {
                "name": "Roger",
                "email": "Roger@example.com"
            }
        },
        {
            "id": "5633940379402240",
            "text": "Mary thinks we need to go ahead with the TV in Bangalore.",
            "type": "action_item",
            "score": 0.8659442937321238,
            "messageIds": [
                "4972726972317696"
            ],
            "phrases": [],
            "definitive": false,
            "entities": [],
            "assignee": {
                "name": "Mary",
                "email": "Mary@example.com"
            }
        },
        {
            "id": "5690029162627072",
            "text": "Checking the nodes with Eisner to make sure we covered everything so that will be finished.",
            "type": "action_item",
            "score": 0.8657734634985154,
            "messageIds": [
                "6531517035577244"
            ],
            "phrases": [
                {
                    "type": "action_phrase",
                    "text": "Checking the nodes with Eisner to make sure we covered everything"
                }
            ],
            "definitive": true,
            "entities": [],
            "assignee": {
                "name": "Eisner",
                "email": "Eisner@example.com"
            }
        },
        {
            "id": "5757280188366848",
            "text": "Mary thinks it really needs to kick start this week which means the call with UV team and our us team needs to happen the next couple of days.",
            "type": "action_item",
            "score": 0.9999992500008438,
            "messageIds": [
                "6521517035577344"
            ],
            "phrases": [],
            "definitive": false,
            "entities": [],
            "assignee": {
                "name": "Mary",
                "email": "Mary@example.com"
            },
            "dueBy": "2020-02-10T07:00:00.000Z"
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
