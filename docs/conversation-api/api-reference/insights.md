---
id: insights
title: GET Insights
sidebar_label: GET Insights
slug: /conversation-api/insights/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Returns all the insights in a conversation including Topics, Questions and Action Items

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/insights`

### Response Object

Field  | Description
---------- | ------- |
```id``` | unique conversation identifier
```text``` | conversation text
```type``` | type of insight. values could be [question, action_item]
```score``` | confidence score of the generated insight. value from 0 - 1
```messageIds``` | unique message identifiers of the corresponding messages
```entities``` | list of detected entities in the insight
```assignee``` | if an action item is generated, this field contains the name and email of the person assigned to it

### Example API Call

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="cURL">

```js
curl "https://api.symbl.ai/v1/conversations/{conversationId}/insights" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = '<your_auth_token>';

request.get({
    url: 'https://api.symbl.ai/v1/conversations/{conversationId}/insights',
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
</Tabs>

> The above request returns a response structured like this:

```json
{
    "insights": [
         {
             "id": "5802630861291520",
             "text": "We need to meet tomorrow for renewing your Insurance policy.",
             "type": "action_item",
             "score": 0.9999992500008438,
             "messageIds": [
                 "5603838367105024"
             ],
             "entities": [
                 {
                     "type": "date",
                     "text": "tomorrow",
                     "offset": 16,
                     "value": "2020-07-11"
                 }
             ],
             "from": {
                 "name": "Salesman",
                 "userId": "sales@email.com"
             },
             "assignee": {
                 "name": "Salesman",
                 "email": "sales@email.com"
             },
             "dueBy": "2020-07-11T07:00:00.000Z"
        },
        {
           "id": "6687421370466304",
           "text": "Mark will handle the process of filling up the forms,
           call Customer after it's completed.",
           "type": "action_item",
           "score": 1,
           "messageIds": [
               "6342943141003264"
           ],
           "entities": [
               {
                   "type": "person",
                   "text": "Mark",
                   "offset": 0,
                   "value": {
                       "assignee": true,
                       "name": "Mark"
                   }
               }
           ],
           "from": {
               "name": "Customer",
               "userId": "customer@email.com"
           },
           "assignee": {
               "name": "Mark"
           }
       },
       {
            "id": "5642466493464576",
            "text": "I think what is the Bahamas?",
            "type": "question",
            "score": 0.9119608386876195,
            "messageIds": [
                "5114878444437504"
            ],
            "entities": []
      },
      {
            "id": "4504448541917184",
            "text": "We need to have a call with David after this.",
            "type": "follow_up",
            "score": 0.9999100121510935,
            "messageIds": [
                "4696021397405696"
            ],
            "entities": [
                {
                    "type": "person",
                    "text": "David",
                    "offset": 34,
                    "value": {
                        "name": "David"
                    }
                }
            ],
            "from": {
                "name": "Customer",
                "userId": "customer@email.com"
            },
            "assignee": {
                "name": "Customer",
                "email": "customer@email.com"
            }
        },
        }
    ]
}
```
