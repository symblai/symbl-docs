---
id: analytics
title: GET Analytics
sidebar_label: GET Analytics
slug: /conversation-api/analytics/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Analytics API provides you with functionality like finding speaker ratio, talk time, silence, pace and overlap in
a conversation.

:::info
This is a Beta API - Undergoing further development.
If you have any suggestions, idea or questions about this API please reach us at devrelations@symbl.ai.
:::


:::info
If diarization is enabled and each individual speaker are identified in the conversation then
this API will shows speaker wise talktime, listentime, pace and overlap.
Incase of the speaker is absent, it will be marked as unknown speaker
:::



For each conversation it returns:

1. <strong>Speaker Ratio</strong> - Speaker’s talk and listen ratio and time.
2. <strong>Talk Time</strong> - Overall duration of the conversation.
3. <strong>Silence</strong> - Overall duration of silence.
4. <strong>Pace</strong> - Words per minute spoken in the conversation.
5. <strong>Overlap</strong> - When more than 1 speaker are speaking the same time, then conversation has overlap.

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/analytics`

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/analytics" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/analytics`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/analytics"
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
    print("metrics => " + str(response.json()['metrics']))  # metrics list containing followUp type, percent, seconds
    print("members => " + str(response.json()['members']))  # members list containing member id, name, pace, talkTime, listenTime, overlap object
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
    "metrics": [
        {
            "type": "total_silence",
            "percent": 29.061,
            "seconds": 23.432
        },
        {
            "type": "total_talk_time",
            "percent": 70.939,
            "seconds": 57.199
        },
        {
            "type": "total_overlap",
            "percent": 55.071,
            "seconds": 31.5
        }
    ],
    "members": [
        {
            "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
            "name": "Speaker 1",
            "userId": "abc@symbl.ai"
            "pace": {
                "wpm": 68
            },
            "talkTime": {
                "percentage": 40.912,
                "seconds": 23.401
            },
            "listenTime": {
                "percentage": 59.088,
                "seconds": 33.798
            },
            "overlap": {
                "overlapDuration": 31.5,
                "overlappingMembers": [
                    {
                        "id": "a52def45-be6e-484f-908b-9ac66eaecabb",
                        "name": "Speaker 2",
                        "userId": "abcd@symbl.ai"
                        "percent": 61.58,
                        "seconds": 24.94
                    },
                    {
                        "id": "a52def45-be6e-484f-908b-9ac66eaecacb",
                        "name": "Speaker 3",
                        "userId": "abcde@symbl.ai"
                        "percent": 7.51,
                        "seconds": 1.9
                    },
                    {
                        "id": "a52def45-be6e-484f-908b-9ac56eaecabb",
                        "name": "Speaker 4",
                        "userId": "abcdef@symbl.ai"
                        "percent": 12.199,
                        "seconds": 4.66
                    }
                ]
            }
        },
        {
            "id": "a52def45-be6e-484f-908b-9ac66eaecabb",
            "name": "Speaker 2",
            "userId": "abcd@symbl.ai"
            "pace": {
                "wpm": 132
            },
            "talkTime": {
                "percentage": 29.894,
                "seconds": 17.099
            },
            "listenTime": {
                "percentage": 70.106,
                "seconds": 40.1
            },
            "overlap": {
                "overlapDuration": 24.94,
                "overlappingMembers": [
                    {
                        "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
                        "name": "Speaker 1",
                        "userId": "abc@symbl.ai"
                        "percent": 61.58,
                        "seconds": 24.94
                    }
                ]
            }
        },
        {
            "id": "a52def45-be6e-484f-908b-9ac66eaecacb",
            "name": "Speaker 3",
            "userId": "abcde@symbl.ai"
            "pace": {
                "wpm": 189
            },
            "talkTime": {
                "percentage": 3.322,
                "seconds": 1.9
            },
            "listenTime": {
                "percentage": 96.678,
                "seconds": 55.299
            },
            "overlap": {
                "overlapDuration": 1.9,
                "overlappingMembers": [
                    {
                        "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
                        "name": "Speaker 1",
                        "userId": "abc@symbl.ai"
                        "percent": 7.51,
                        "seconds": 1.9
                    }
                ]
            }
        },
        {
            "id": "a52def45-be6e-484f-908b-9ac56eaecabb",
            "name": "Speaker 4",
            "userId": "abcdef@symbl.ai"
            "pace": {
                "wpm": 152
            },
            "talkTime": {
                "percentage": 25.873,
                "seconds": 14.799
            },
            "listenTime": {
                "percentage": 74.127,
                "seconds": 42.4
            },
            "overlap": {
                "overlapDuration": 4.66,
                "overlappingMembers": [
                    {
                        "id": "acc63fbe-c3cd-4daa-8ab0-b088142e5a0f",
                        "name": "Speaker 1",
                        "userId": "abc@symbl.ai"
                        "percent": 12.199,
                        "seconds": 4.66
                    }
                ]
            }
        }
    ]
}

```



:::info
Overlap percentage is calculated by dividing the overlap duration(sec) with respect to talkTime of both overlapping speakers.
Overlap would be empty when the processed conversationId is for Async API/Telephony API.
:::

### Response Object

| Fields     | Description                            |
|------------|----------------------------------------|
| `type`       | Metrics sub-type.                   |
| `id`         | Unique user identifier.                 |
| `name`       | User name.                              |
| `userID`     | The unique identifier of the Speaker. Email ID is usually the preferred user ID.|                             
| `email`      | User email.                             |
| `wpm`        | Words per minutes for each speaker.     |
| `talkTime`   | Individual speaker’s total talk time.   |
| `listenTime` | Individual speaker’s total listen time. |
| `overlap`    | Member wise talk overlap details.       |
