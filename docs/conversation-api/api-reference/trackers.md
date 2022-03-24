---
id: trackers
title: GET Trackers-detected (Beta)
sidebar_label: GET Trackers-detected (Beta)
slug: /conversation-api/trackers/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to get all the [Trackers](/docs/concepts/trackers) from your conversation. 

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers-detected`

:::info Important
If you have not processed your conversation with the parameter `enableAllTracker=true` in the Async API, Trackers will not be detected. To learn why and understand how to use this parameter while processing your conversation, see [Consuming Trackers with Management API](/docs/management-api/trackers/overview#step-2-submit-files-using-async-api-with-enablealltrackers-flag) section. 
:::

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).


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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/trackers-detected" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/trackers-detected`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/trackers-detected"
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
    print("trackers => " + str(response.json()))  # trackers object containing tracker id, name, matches (array of object containing messageRefs, type, value, insightRefs)
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
        "id": "5237067555536896",
        "name": "PricingMention",
        "matches": [
            {
                "type": "vocabulary",
                "value": "What is the price",
                "messageRefs": [
                    {
                        "id": "4667009028587520",
                        "text": "How much does it cost?",
                        "offset": -1
                    }
                ],
                "insightRefs": [
                    {
                        "text": "How much does it cost?",
                        "offset": -1,
                        "type": "question",
                        "id": "5420651570528256"
                    }
                ]
            },
            {
                "type": "vocabulary",
                "value": "Subscription",
                "messageRefs": [
                    {
                        "id": "4527958187311104",
                        "text": "Our subscription plan which includes the premium suite of services is $500 per month.",
                        "offset": 4
                    }
                ],
                "insightRefs": []
            }
        ]
    },
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

:::caution Old Endpoint
The old endpoint for fetching Trackers (given below) is deprecated and not recommended to be used
`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`
:::