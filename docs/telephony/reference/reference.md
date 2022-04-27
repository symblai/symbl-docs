---
id: api-reference
title: Telephony API Reference
slug: /telephony-api/api-reference/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP REQUEST

`POST https://api.symbl.ai/v1/endpoint:connect`

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
curl -k -X POST "https://api.symbl.ai/v1/endpoint:connect" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: $AUTH_TOKEN" \
     -d $'{F
      "operation": "start",
      "endpoint": {
        "type" : "pstn",
        "phoneNumber": "'$PHONE_NUMBER'" # 
        "dtmf": ",,$DTMF_MEETING_ID\#,,$MEETING_PASSCODE\#"
      },
      "actions": [{
        "invokeOn": "stop",
        "name": "sendSummaryEmail",
        "parameters": {
          "emails": [
            "'$EMAIL_ADDRESS'"
          ]
        }
      }],
      "data" : {
        "session": {
           "name" : "My Meeting"
        }
      }
    }'
```
</TabItem>

<TabItem value="nodejs">

```js
const phoneNumber = PHONE_NUMBER;
const emailAddress = EMAIL_ADDRESS;
const authToken = AUTH_TOKEN;

const payload = {
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber,
    "dtmf": `,,${DTMF_MEETING_ID}#,,${MEETING_PASSCODE}#`
  },
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        emailAddress
      ]
    }
  }],
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}

let request = new XMLHttpRequest();
request.onload = function() {
    // handle the successful call here
}

request.open('POST', 'https://api.symbl.ai/v1/endpoint:connect', true);

request.setRequestHeader('X-API-KEY', `${authToken}`);
request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify(payload));

```

</TabItem>
<TabItem value="python">

```py
import json
import requests

url = "https://api.symbl.ai/v1/endpoint:connect"

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

payload = {
    "operation": "start",  # enum([start, stop]) - Start or Stop connection
    "endpoint": {
        # Object containing Type of the session - either pstn or sip, phoneNumber which is the meeting number symbl should call with country code prepended and dtmf which is the conference passcode.
        "type": "pstn",
        "phoneNumber": phoneNumber,  # Phone number including country code
        "dtmf": ",," + DTMF_MEETING_ID + "#,," + MEETING_PASSCODE + "#"
    },
    "actions": [{
        # actions that should be performed while this connection is active. Currently only one action is supported - sendSummaryEmail
        "invokeOn": "stop",
        "name": "sendSummaryEmail",
        "parameters": {
            "emails": [
                emailAddress
            ]
        }
    }],
    "data": {  # Object containing a session object which has a field name corresponding to the name of the meeting
        "session": {
            "name": "My Meeting"
        }
    }
}

headers = {
    'X-API-KEY': access_token,
    'Content-Type': 'application/json'
}

responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload))

if response.status_code == 201:
    # Successful API execution
    print("conversationId => " + response.json()['conversationId'])  # ID to be used with Conversation API.
    print("connectionId => " + response.json()['connectionId'])
    # Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the connectionId is no longer valid
    print("resultWebSocketUrl => " + response.json()['resultWebSocketUrl'])
    # objSame as eventUrl but over WebSocket. The latency of events is lower with a dedicated WebSocket connection.ct
    print("eventUrl => " + response.json()['eventUrl'])
    # REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events
elif response.status_code in responses.keys():
    print(responses[response.status_code] + ", Debug Message => " + str(response.text))  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


## Request Parameters

Here is a breakdown of the request options for the Telephony API endpoint:

#### Main Request Body

Field  | Description
---------- | ------- 
```operation``` | string <br/><br/> enum([start, stop]) - Start or Stop connection <br/><br/> Example: `"operation": "start"`
```endpoint``` | object <br/><br/>  Object containing Type of the session - either pstn or sip, phoneNumber which is the meeting number symbl should call with country code prepended and dtmf which is the conference passcode. [See endpoint section below](#endpoint-config). <br/><br/> Example: `"endpoint": "type" : "pstn", "phoneNumber": phoneNumber, "dtmf": dtmfSequence`
```actions``` | array <br/><br/>  actions that should be performed while this connection is active. Currently only one action is supported - sendSummaryEmail. [See actions section below](#actions). <br/><br/> Example: `"actions": "invokeOn": "stop", "name": "sendSummaryEmail", "parameters": "emails": "user@example.com"`
```data``` | object <br/><br/>  Object containing a session object which has a field name corresponding to the name of the meeting. [See data section below](#data). <br/><br/> Example: `"data" : "session": "name" : "My Meeting"`
```timezone``` | string <br/><br/> The timezone name which comes from the [IANA TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). [See timezone section below](#timezone). <br/><br/> Example: `"timezone": "Asia/Tokyo"`

##### Code Example

```js
{
  "operation": "start",
  "endpoint": {}  // See endpoint config section below
  "actions": {}  // See actions section below
  "data": {}  // See data section below
  "timezone": {}  // See timezone section below.
}
```


#### Endpoint Config

Field  | Description
---------- | ------- 
`type` | enum(["sip", "pstn"], mandatory <br/><br/> Defines the type of connection. Only [SIP](/docs/concepts/pstn-and-sip#sip-session-initiation-protocol) and [PSTN](/docs/concepts/pstn-and-sip#pstn-public-switched-telephone-networks) supported. <br/><br/> Example: `"type" : "pstn"`
`phoneNumber` | String, mandatory <br/><br/> Phone number to be used to dial in to in E.164 format i.e. special characters like () or - and leading + or international access codes like 001 or 00 must be omitted. For e.g. - US number should look like 14082924837, whereas UK number should look like 447082924837. <br/><br/> Example: `"phoneNumber": phoneNumber`
`dtmf` | String, optional <br/><br/>DTMF sequence to be sent after call is received (ex: `939293#`) <br/><br/> Example: `"dtmf": dtmfSequence`

##### Code Example

```js
{
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber,
    "dtmf": dtmfSequence
  }
}
```

#### Actions

Field  | Description
---------- | ------- 
`invokeOn` | enum(["start", "stop"]) mandatory <br/><br/> Event type on which the action should be performed. <br/><br/> Example: `"invokeOn": "stop"`
`name` | String, mandatory <br/><br/>  Name of the action that needs to be invoked. Only `sendSummaryEmail` is currently supported. <br/><br/> Example: `"name": "sendSummaryEmail"`
`parameters` | Object, mandatory <br/><br/> Object with required input parameter data for invocation of the specified action. <br/><br/> Example: `"parameters": "emails": "user@example.com"`
`parameters.emails` | String[], mandatory <br/><br/> An array of emails. <br/><br/> Example: `"emails": "user@example.com"`


##### Code Example

```js
{
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        "user@example.com"
      ]
    }
  }]
}
```

#### Data

Field  | Description
---------- | ------- 
`session` | String, optional <br/><br/> Contains information about the meeting. <br/><br/> Example: `session": "name" : "My Meeting"`
`session.name` | String, optional <br/><br/> The name of the meeting. <br/><br/> Example: `"name" : "My Meeting"`

##### Code Example

```js
{
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}
```

#### Timezone


Field  | Description
---------- | ------- 
`timezone` | String, optional <br/><br/>  The timezone name which comes from the [IANA TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). <br/><br/> Example: `"timezone": "Asia/Tokyo"`
 
##### Code Example

```js
{
  "timezone": "Asia/Tokyo"
}
```

### Full Request Code Example

```js
{
  endpoint: {
    type: "pstn",
    phoneNumber: "",
    dtmf: ""
  },
  actions: [
    {
      invokeOn: "stop",
      name: "sendSummaryEmail",
      parameters: {
        emails: [
          "user@example.com"
        ],
      },
    },
  ],
  data: {
    session: {
      name: meetingName,
    },
  },
}
```


#### Telephony API Endpoint Object

## Response Parameters

Field | Description
---------- | ------- |
```eventUrl``` | REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events
```resultWebSocketUrl``` | Same as eventUrl but over WebSocket. The latency of events is lower with a dedicated WebSocket connection.ct
```connectionId``` | Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the connectionId is no longer valid
```conversationId``` | Represents the conversation - this is the ID that needs to be used in conversation api to access the conversation 

#### Code Example

```js
{
  "eventUrl": "https://api.symbl.ai/v1/event/771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "resultWebSocketUrl": "wss://api.symbl.ai/events/771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "connectionId": "771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "conversationId": "51356232423"
}
```

## Specifying Timezones
Specifying a timezone when initiating a session will result in the Summary UI displaying the meeting start time for that given region.

<aside class="notice">
The timezone must be specified using the values specified in the IANA TZ database. For a list of timezones, refer <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank"> here </a>.</aside>

### Code Example
Below is an example of a request payload which sets the timezone to the Pacific Timezone by passing the TZ database
name to the timezone parameter while initiating a session:

```js
{
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber, // Should be the Zoom phone number this time.
    "dtmf": `,,${DTMF_MEETING_ID}#,,${MEETING_PASSCODE}#`
  },
  "timezone": "US/Pacific",
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        emailAddress
      ]
    }
  }],
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}
```

:::info
If no timezone is specified it will fall back to UTC time zone.
:::

