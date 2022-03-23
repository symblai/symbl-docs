---
id: speakers
title: PUT Speaker Events
sidebar_label: PUT Speaker Events
slug: /conversation-api/speaker-events/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Speaker Events API provides the functionality to update Speakers who spoke in the conversation after it has been processed.

This is achieved by sending the API the list of Speaker Events for that conversation which the API then uses for associating it with the content of the same.
This API can be used when you have access to these events for a recorded conversation.

For real-time speaker events integration take a look at [Active Speaker Events](/docs/javascript-sdk/code-snippets/active-speaker-events).

Once the API completes the processing the results are reflected for the Messages and Insights in the conversation.

###  Speaker Events from Zoom Timeline

We have an open-source utility written in JS to convert the Timeline file from Zoom APIs to Speaker Events API request format
[available.](https://github.com/symblai/speaker-events-converter)

This utility also does pre-processing on the events to ensure less noise while associating these with a conversation.

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`PUT https://api.symbl.ai/v1/conversations/{conversationId}/speakers`


### Example API Call

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python', }
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request PUT "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/speakers" \
--header "Authorization: Bearer $AUTH_TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{
    "speakerEvents": [
        {
            "type": "started_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead1064",
                "name": "Derek",
                "email": "Derek@example.com"
            },
            "offset": {
                "seconds": 0,
                "nanos": 5000000000
            }
        },
        {
            "type": "stopped_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead1064",
                "name": "Derek",
                "email": "Derek@example.com"
            },
            "offset": {
                "seconds": 15,
                "nanos": 5000000000
            }
        },
        {
            "type": "started_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead2104",
                "name": "Richard",
                "email": "Richard@example.com"
            },
            "offset": {
                "seconds": 10,
                "nanos": 5000000000
            }
        },
        {
            "type": "stopped_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead2104",
                "name": "Richard",
                "email": "Richard@example.com"
            },
            "offset": {
                "seconds": 20,
                "nanos": 5000000000
            }
        }
    ]
}'
```
</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.put({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/speakers`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    body: {

          "speakerEvents": [
              {
                  "type": "started_speaking",
                  "user": {
                      "id": "4194eb50-357d-4712-a02d-94215ead1064",
                      "name": "Derek",
                      "email": "Derek@example.com"
                  },
                  "offset": {
                      "seconds": 0,
                      "nanos": 5000000000
                  }
              },
              {
                  "type": "stopped_speaking",
                  "user": {
                      "id": "4194eb50-357d-4712-a02d-94215ead1064",
                      "name": "Derek",
                      "email": "Derek@example.com"
                  },
                  "offset": {
                      "seconds": 15,
                      "nanos": 5000000000
                  }
              },
              {
                  "type": "started_speaking",
                  "user": {
                      "id": "4194eb50-357d-4712-a02d-94215ead2104",
                      "name": "Richard",
                      "email": "Richard@example.com"
                  },
                  "offset": {
                      "seconds": 10,
                      "nanos": 5000000000
                  }
              },
              {
                  "type": "stopped_speaking",
                  "user": {
                      "id": "4194eb50-357d-4712-a02d-94215ead2104",
                      "name": "Richard",
                      "email": "Richard@example.com"
                  },
                  "offset": {
                      "seconds": 20,
                      "nanos": 5000000000
                  }
              }
          ]
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/speakers/"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'speakerEvents': [
        {
            "type": "started_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead1064",
                "name": "Derek",
                "email": "Derek@example.com"
            },
            "offset": {
                "seconds": 0,
                "nanos": 5000000000
            }
        },
        {
            "type": "stopped_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead1064",
                "name": "Derek",
                "email": "Derek@example.com"
            },
            "offset": {
                "seconds": 15,
                "nanos": 5000000000
            }
        },
        {
            "type": "started_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead2104",
                "name": "Richard",
                "email": "Richard@example.com"
            },
            "offset": {
                "seconds": 10,
                "nanos": 5000000000
            }
        },
        {
            "type": "stopped_speaking",
            "user": {
                "id": "4194eb50-357d-4712-a02d-94215ead2104",
                "name": "Richard",
                "email": "Richard@example.com"
            },
            "offset": {
                "seconds": 20,
                "nanos": 5000000000
            }
        }
    ]
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


### Response


```javascript
{
    "message": "Speaker events associated for conversationId: {conversationId} successfully! The update should be reflected in all messages and insights along with this conversation"
}
```

### Speaker Event Object

```js
"speakerEvents": [

{
    "type": "started_speaking",
    "user": {
        "id": "4194eb50-357d-4712-a02d-94215ead1064",
        "name": "Derek",
        "email": "Derek@example.com"
    },
    "offset": {
        "seconds": 0,
        "nanos": 5000000000
    }
},
{
    "type": "stopped_speaking",
    "user": {
        "id": "4194eb50-357d-4712-a02d-94215ead1064",
        "name": "Derek",
        "email": "Derek@example.com"
    },
    "offset": {
        "seconds": 15,
        "nanos": 5000000000
    }
}]
```


Parameter | Value | Description|
--------- | ------- | -------
```type```|started_speaking, stopped_speaking| Refers to when a speaker starts speaking and stops.
```user``` | JSON | Contains user details.
```offset```| JSON | Contains the seconds and nanos at which this speaker event occurred.

##### user

Parameter | Value | Description|
--------- | ------- | -------
```id``` |  string| Uniquely identifies the speaker within the conversation.
```name``` | string | Name of the speaker.
```email```| string | Email id of the speaker.
