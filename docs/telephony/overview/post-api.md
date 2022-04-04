---
id: post-api
title: Submit Telephony API
sidebar_label: Submit Telephony API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';

<Redirect to="/docs/telephony-api/api-reference#endpoint" />


The Telephony API allows you to connect to a conference call to analyze and transcribe the conversation using our Language Insights capabilities. We support connections to Zoom, Chime, Twilio or any conference call service with a valid phone number. Symbl will connect to your SIP or PSTN exposed endpoints. The Audio stream will be fetched from the SIP or PSTN connection once connected.

What you will learn:

 - [Getting Started](#getting-started)
 - [Connect to a phone call](#connect-to-phone)
 - [Connect to conference calls](#connect-to-conference)
 - [Supported languages](#supported-languages)
 - [Timezones](#timezones)
 - [API Reference](#reference)

## <a name="getting-started"></a>Getting Started

In this example we use the following variables which you must replace in the code examples in order for the code to work:

Key  | Description
---------- | -------
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Symbl.
```PHONE_NUMBER``` | A phone number that you want the API to connect to. Be sure to include the country code.
```EMAIL_ADDRESS``` | The email address you wish to send the summary email to.
```DTMF_MEETING_ID``` | The meeting ID. For example, if using Zoom this would be the numerical meeting ID used to connect.
```MEETING_PASSCODE``` | The numerical Zoom passcode, if present.


## <a name="connect-to-phone"></a>Connect to a phone number

The following code example shows how you can connect the Telephony API to your cell phone (or any other type of phone number). Making a phone call is also the quickest way to test Symbl’s Telephony API. It can make an outbound call to a phone number using a traditional public switched telephony network [(PSTN)](https://en.wikipedia.org/wiki/Public_switched_telephone_network), any [SIP trunks](https://en.wikipedia.org/wiki/SIP_trunking), or SIP endpoints that can be accessed over the internet using a SIP URI. For this example we will be connecting using PSTN:

### <a name="code-example-main"></a>Code Example

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
     -H "Authorization: Bearer $AUTH_TOKEN" \
     -d $'{
      "operation": "start",
      "endpoint": {
        "type" : "pstn",
        "phoneNumber": "'$PHONE_NUMBER'" # 
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

let request = new XMLHttpRequest();
request.onload = function() {
    // handle the successful call here
}

request.open('POST', 'https://api.symbl.ai/v1/endpoint:connect', true);

request.setRequestHeader('Authorization', `Bearer ${authToken}`);
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
    'Authorization': `Bearer ${authToken}`,
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

Running this code should connect our API to your phone call. Once the call is completed you will receive an email which details the conversation and provides you with a transcription and Insights about the call.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::

## <a name="connect-to-conference"></a>Connect to conference calls

While calling your telephone and transcribing a single-person conversation is neat, it's not very useful for business needs. After you get this example running we can modify it easily to connect to various conference call services including Zoom, Chime and Twilio. For this example, we will be using Zoom

To connect to a Zoom call you need something called a DTMF Sequence. In simple terms a DTMF sequence are the keys you press to connect to the conference call once you've dialed in. They consist of any key you find on a telephone keypad and commas (`,`), which add a bit of artificial delay between key presses; with one comma being 500ms. Typically we add a bit of artificial delay after the pound key is pressed to give the conference call time to process which keys were pressed.

For Zoom, the DTMF consists of the Meeting Code and the Meeting Passcode (if there is one).

:::info
If your Zoom call has a passcode you must set it to be all numerical digits.
:::

### Code Example

Modify the [prevoius code example](#code-example-main) and use this as the payload. If your meeting has no passcode you can remove everything after the first pound sign (`#`):

```js
{
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber, // Should be the Zoom phone number this time.
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
```

Running the code using this payload will add Symbl to your Zoom call. Once the Zoom call is over it will provide you with the same summary email as the previous example.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::

## <a name="supported-languages"></a>Supported Languages

Language is specified by passing an array of language codes to the language parameter when making a call to the Telephony API endpoint.

:::info
Currently, transcription punctuation is not supported for French (`fr-CA`) or Dutch (`nl-NL`) languages.
:::

The following list of languages(with their [BCP-47](https://en.wikipedia.org/wiki/IETF_language_tag) language-codes) are currently supported:

 | Supported Languages          | Code    |
 |------------------------------|---------|
 | English (United States)      | `en-US` |
 | English (United Kingdom)     | `en-GB` |
 | English (Australia)          | `en-AU` |
 | English (Ireland)            | `en-IE` |
 | English (India)              | `en-IN` |
 | English (South Africa)       | `en-ZA` |
 | Russian (Russian Federation) | `ru-RU` |
 | French (Canada)              | `fr-CA` |
 | French (France)              | `fr-FR` |
 | German (Germany)             | `de-DE` |
 | Italian (Italy)              | `it-IT` |
 | Dutch (Netherlands)          | `nl-NL` |
 | Japanese (Japan)             | `ja-JP` |
 | Spanish (United States)      | `es-US` |
 | Spanish (Spain)              | `es-ES` |
 | Arabic (Saudi Arabia)        | `ar-SA` |
 | Hindi (India)                | `hi-IN` |
 | Portuguese (Brazil)          | `pt-BR` |
 | Portuguese (Portugal)        | `pt-PT` |
 | Persian (Iran)               | `fa-IR` |   


:::caution
 1. If the language is not specified then `en-US`(English - United States) is used as the default language.
 2. Insights like Action items, follow-ups, topics, etc  are detected for English language only.
:::


### Code Example

Below is an example of a request payload specifying that the meeting’s language should be in Spanish. You can use this payload in the [first code example above](#code-example-main):

```js
{
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber, // Should be the Zoom phone number this time.
    "dtmf": `,,${DTMF_MEETING_ID}#,,${MEETING_PASSCODE}#`
  },
  "languages": ['es-US'],
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
If a language is not specified, it will currently fall back to English (en-US).
:::

## <a name="timezones"></a>Timezones
Specifying a timezone when initiating a session will result in the Summary UI displaying the meeting start time for that given region.

<aside class="notice">
The timezone must be specified using the values specified in the IANA TZ database. For a list of timezones, refer <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank"> here </a>.</aside>

### Code Example
Below is an example of setting the timezone to the Pacific Timezone by passing the TZ database
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

## <a name="reference"></a>API Reference

### Request Parameters

Field  | Type | Description
---------- | ------- | -------
```operation``` | string | enum([start, stop]) - Start or Stop connection
```endpoint``` | object | Object containing Type of the session - either pstn or sip, phoneNumber which is the meeting number symbl should call with country code prepended and dtmf which is the conference passcode.
```actions``` | array | actions that should be performed while this connection is active. Currently only one action is supported - sendSummaryEmail
```data``` | object | Object containing a session object which has a field name corresponding to the name of the meeting
```languages```| array | The first language code in the array is used to specify the session’s language.
```timezone``` | string | The timezone name which comes from the [IANA TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).



### Response Parameters

Field | Description
---------- | ------- |
```eventUrl``` | REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events
```resultWebSocketUrl``` | Same as eventUrl but over WebSocket. The latency of events is lower with a dedicated WebSocket connection.ct
```connectionId``` | Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the connectionId is no longer valid
```conversationId``` | Represents the conversation - this is the ID that needs to be used in conversation api to access the conversation
