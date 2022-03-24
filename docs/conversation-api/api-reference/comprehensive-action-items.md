---
id: comprehensive-action-items
title: GET Comprehensive Action Items 
sidebar_label: GET Comprehensive Action Items 
slug: /conversation-api/comprehensive-action-items/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

This API returns all the action items that are enriched with corresponding contexts.

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api-labs.symbl.ai/v1/conversations/{conversationId}/comprehensive/action-items`


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
curl "https://api-labs.symbl.ai/v1/conversations/$CONVERSATION_ID/comprehensive/action-items" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api-labs.symbl.ai/v1/conversations/${conversationId}/comprehensive/action-items`,
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

baseUrl = "https://api-labs.symbl.ai/v1/conversations/{conversationId}/comprehensive/action-items"
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

### Response Body Sample
```js

{
    "actionItems": [
        {
            "id": "4875991597973504",
            "text": "Stella and John need to shift their focus more towards dev. John will go ahead and set up a discussion with product.",
            "type": "action_item",
            "score": 0.8735619108573252,
            "messageRefs": [
                {
                  "id": "5943054110294016"
                },
                {
                  "id": "4960777540730880"
                }
            ],
            "entities": [],
            "phrases": [],
            "from": {
                "id": "10aa881e-4c70-4060-8886-66a5e5c9b788",
                "name": "John",
                "userId": "john@example.com"
            },
            "definitive": true,
            "assignee": {
                "id": "10aa881e-4c70-4060-8886-66a5e5c9b788",

                "name": "John",
                "email": "john@example.com"
            }
        }
    ]
}
```

### Response Parameters

Field  | Description
---------- | ------- |
```id``` | Unique identifier of the comprehensive action item.
```text``` | Text of the comprehensive action item. 
```type``` | Response type. Default is `action_item`.
```score``` | Confidence score of the detected action item. Value from 0 - 1. The score shows the relevancy of the action item in the transcript. Higher the confidence score, the more relevant it is.
```messageRefs.id``` | Unique identifiers of the corresponding messages from where the action item was derived. You may get multiple message IDs here as Symbl identifies all the relevant messages in the conversation and generates the required action item accordingly.   
```entities``` | List of detected entity objects in the insight with `type` - entity type and `text` - corresponding text.
```definitive``` | Boolean indicating if the action item is definitive or not. Implies that the action item is conclusive and not open-ended. For e.g, ‘I will complete this task today’ is a definitive sentence. 
```phrases``` | List of detected phrases with `type` - phrase type and `text` - corresponding text. The `action_phrase` type represents the actionable part of an insight.
```assignee``` | This field contains the name and email of the person to whom the action item is assigned.
