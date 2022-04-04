---
id: connect-to-pstn
title: Connect to a PSTN connection to get Speech to Text and AI Insights
slug: /telephony/code-snippets/connect-to-pstn/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Connect to a call with PSTN

The following code example shows how you can connect the Telephony API to your cell phone or any other type of phone number using PSTN (**Currently, only US phone numbers work**). Making a phone call is also the quickest way to test Symbl’s Telephony API. It can make an outbound call to a phone number using a traditional public switched telephony network ([PSTN](https://en.wikipedia.org/wiki/Public_switched_telephone_network)).

:::info
The <strong>Symbl SDK (Node.js)</strong> snippet must be run using Node.js, while the <strong>Native Javascript</strong> snippet can be run in your web browser.
:::

### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

#### <a name="code-example-1"></a>Code Example

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Symbl SDK (Node.js)', value: 'nodejs', },
    { label: 'Native Javascript', value: 'javascript' },
    { label: 'Python 3', value: 'python' }
  ]
}>
<TabItem value="cURL">

```shell
curl -k -X POST "https://api.symbl.ai/v1/endpoint:connect" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -H "X-API-KEY $AUTH_TOKEN" \
     -d $'{
      "operation": "start",
      "endpoint": {
        "type" : "pstn",
        "phoneNumber": "PHONE_NUMBER"
      },
      "actions": [{
        "invokeOn": "stop",
        "name": "sendSummaryEmail",
        "parameters": {
          "emails": [
            "john@example.com"
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

#### Testing

Open up your shell terminal and copy in the command. Replace the placeholder values with the proper values and hit enter.


If successful you should receive a response in the console.
</TabItem>

<TabItem value="nodejs">

```js
const {sdk, SpeakerEvent} = require("symbl-node");
const appId = appId;
const appSecret = appSecret;

sdk.init({
  appId: appId,
  appSecret: appSecret,
  basePath: "https://api.symbl.ai",
}).then(async() => {
  console.log('SDK initialized.');
  try {
    const phoneNumber = "PHONE_NUMBER";  // Telephony API currently only supports US phone numbers.

    sdk.startEndpoint({
      endpoint: {
        type: "pstn",
        phoneNumber: phoneNumber,
      },
      actions: [
        {
          invokeOn: "stop",
          name: "sendSummaryEmail",
          parameters: {
            emails: [
              "john@example.com"
            ],
          },
        },
      ],
      data: {
        session: {
          name: "Meeting name",
        },
      },
    }).then((connection) => {
      const connectionId = connection.connectionId;
      console.log("Successfully connected.", connectionId);
      console.log('Conversation ID', connection.conversationId);
      console.log('Full Conection Object', JSON.stringify(connection, null, 2));
    })
    .catch((err) => {
       console.error("Error while starting the connection", err);
    });
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));
```

#### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install symbl-node`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

</TabItem>

<TabItem value="javascript">

```js
const phoneNumber = PHONE_NUMBER; // Must include the international code, ex: "+16465588656"
const emailAddress = EMAIL_ADDRESS;
const authToken = AUTH_TOKEN;
const endpoint = 'https://api.symbl.ai/v1/endpoint:connect';

const payload = {
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber
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

const fetchData = {
  method: "POST",
  headers: {
    'X-API-KEY': `${authToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}

fetch(endpoint, fetchData).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Something went wrong on api server!');
  }
}).then(response => {
  console.log('response', response);
  console.log('conversation ID', response.conversationId);
  console.log('connection ID', response.connectionId);
}).catch(error => {
  console.error(error);
});

```

#### Testing

Open up your browser's development environment and copy this code into the console. Replace the placeholder values with the proper values.

If successful you should receive a response in the console.

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
    "languages": ['en-US'],  # The first language code in the array is used to specify the session’s language.
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

#### Testing

Create a python file named `app.py` and copy this code into the file. Fill in the placeholder values with the proper values. Use Python PIP ([learn how to install here](https://pip.pypa.io/en/stable/installing/)) to install [Python Requests](https://requests.readthedocs.io/en/master/) (`pip install requests`). 
In your terminal, now run:

```bash
$ python app.py
```


</TabItem>
</Tabs>

### Response

If successful, you will receive a response in the console as shown below:

```json
{
    "eventUrl": "https://api.symbl.ai/v1/event/f31ad3b9-341a-4950-a1c2-152f08da8aaa",
    "resultWebSocketUrl": "wss://api.symbl.ai/events/f31ad3b9-341a-4950-a1c2-152f08da8aaa",
    "conversationId": "5687907911204864",
    "connectionId": "f31ad3b9-341a-4950-a1c2-152f08da8aaa"
}
```
### Response Parameters

Field | Description
---------- | ------- |
```eventUrl``` | REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events.
```resultWebSocketUrl``` | Same as `eventUrl` but over WebSocket. The latency of events is lower with a dedicated WebSocket `connection.ct`.
```connectionId``` | Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the `connectionId` is no longer valid.
```conversationId``` | Represents the conversation - this is the ID that needs to be used in conversation API to access the conversation.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::
