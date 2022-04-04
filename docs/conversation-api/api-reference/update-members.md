---
id: update-members
title: PUT Members Information
sidebar_label: PUT Members Information
slug: /conversation-api/update-members/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Update an existing member in an conversation. This API can be used for updating the unique speakers detected as members from diarization as well.

To diarize/separate speakers in a single audio/video stream refer to the How-To [Get Speaker Separated Transcripts - Diarization with Async API](/docs/async-api/tutorials/get-speaker-separation-audio-video)

For more details on identifying members by Speaker Events or Active Talker events in Real-time using Voice SDK - [here](/docs/javascript-sdk/tutorials/push-speakerevents-get-summary-url).

For more details on identifying members by independent audio stream integration using [Streaming API](/docs/streamingapi/overview/configuration).

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`PUT https://api.symbl.ai/v1/conversations/{conversationId}/members/{id}`

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
curl --location --request PUT "https://api.symbl.ai/v1/conversations/$CONVERATION_ID/members/$MEMBER_ID" --header 'Content-Type: application/json' --header "Authorization: Bearer $AUTH_TOKEN" --data-raw '{
    "id": "'$MEMBER_ID'",
    "email": "john@example.com",
    "name": "John"
}'
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;
const memberId = MEMBER_ID;

request.put({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/members/${memberId}`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    body: {
        id: memberId,
        name: 'John',
        email: 'john@example.com'
    },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import json
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/members/{memberId}"
conversationId = 'your_conversation_id'  # Generated using Submit text end point
memberId = 'your_member_id'  # MemberId of members fetched using fetchMember API

url = baseUrl.format(conversationId=conversationId, memberId=memberId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'id': "UUID_to_be_updated",  # Should be a valid UUID e.g. f170371e-d9db-4d55-9d49-a111a89cf078
    'email': "email_id_to_be_updated",  # Should be a valid emailId e.g. John@domain.com
    'name': "name_to_be_updated"  # Should be a valid string e.g. John
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("PUT", url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    # Successful API execution
    print(response.json()['message'])  # message containing status of response
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Request Body
Field | Required | Type | Supported Values | Default | Description
----- | -------  | ---- | -------- | ------- | --------- |
```id``` | Yes | *string* | | | The unique identifier of the member for this conversation. This can be retrieved from the [members](members) endpoint.
```name``` | Yes | *string* | | | The name of the member.
```email``` | No | *string* | | | The Email ID of the member. If specified, this can be used to correctly identify and merge the existing user in case the conversation is appended with a new diarized conversation which has one or more same speakers as the conversation its being appended to.

### Response

```json
{
    "message": "Member with id: <member-id> for conversationId: <conversationId> updated successfully! The update should be reflected in all messages and insights along with this conversation"
}
```

### Response Object

Field  | Description
---------- | ------- |
```message``` | A description of the update. This message indicates that the member details have now been updated across the conversation for all the [Messages](messages) and [Action Items](/docs/concepts/action-items), follow-ups and questions. You can also get the updated member from the [members](members) endpoint.
