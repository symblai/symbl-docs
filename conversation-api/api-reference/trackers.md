---
id: trackers
title: GET Trackers (Beta)
sidebar_label: GET Trackers (Beta)
slug: /conversation-api/trackers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to get all the [Trackers](/docs/concepts/trackers) from your conversation. 

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`

### Request Headers

1.  `Authorization` (Recommended) - This header should contain a valid Bearer token generated using the `token:generate` API Endpoint by passing in the credentials. You can read more about authentication [here](/docs/developer-tools/authentication).
    
2.  `X-API-KEY` (Legacy) - Use the `Authorization` header. This has been deprecated. This header should contain a valid authentication token generated using the `token:generate` API Endpoint by passing in the credentials. These can be obtained by signing up on the [Platform](https://platform.symbl.ai/).
    
3.  `Content-Type` (Optional) - This header must contain the MIME Type `application/json`.


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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/trackers" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/trackers`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/trackers"
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

```json
[
    {
        "id": "4527907378937856",
        "name": "My Awesome Tracker",
        "matches": [
            {
                "messageRefs": [
                    {
                        "id": "4670860273123328",
                        "text": "Wearing mask is a good safety measure.",
                        "offset": -1
                    }
                ],
                "type": "vocabulary",
                "value": "wear mask",
                "insightRefs": []
            }
        ]
    }
]
```

Let’s go over the members of the response body which contains the detected tracker objects:

1.  `id`: The id of the _detected_ **Tracker**.
    
2.  `name`: The name of the **Tracker**.
    
3.  `matches`: Array of match objects which contain the references to messages and insights detected in that conversation.
    
    1.  `messageRefs`: Array of messages for which this **Tracker** was detected.
        
        1.  `id`: The unique identifier of the message. 
            
        2.  `text`: The text body of the message. 
            
        3.  `offset`: The closest match of the text in the `message`. Offset of `-1` means that an exact match for that specific vocabulary wasn’t found and this was the similar match. An offset greater than 0 indicates an exact match for the tracker in the payload of the `message`.
            
    2.  `type`: The `match` type for the text. In the above example, the match is of type `vocabulary`. 
        
    3.  `value`: The textual value of the `vocabulary` for which this match was detected.
        
    4.  `insightRefs`: Array of insights for which this `Tracker` was detected. This has the same structure that `messageRefs` array has.
