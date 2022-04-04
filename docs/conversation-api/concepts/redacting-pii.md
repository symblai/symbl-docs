---
id: redaction-pii
title: Identifying and Redacting PII and PCI Data
sidebar_label: PII and PCI Identification and Redaction 
slug: /concepts/redaction-pii/
pagination_label: PII and PCI Identification and Redaction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

**Personally Identifiable Information (PII)** is any information about an individual that can be used to distinguish or trace the individual's identity, such as name, social security number, email address, phone number, etc.

**Payment Card Industry data (PCI)** includes sensitive information such as credit card/ debit card number, bank account details, etc.

Although, sensitive, they can appear in conversations such as account verification by customer care agents that requires the customer to share their name, email address or other confidential information. 

Symbl provides the capability to identify and redact PII and PCI data from conversations and insights it processes. Redaction of PII and PCI data is a process of concealing confidential information in messages and insights.

This feature will allow you to:

- **Identify** any PII/ PCI data such as Social Security Number, Phone Number, etc. from messages and insights. See the complete list of supported PII/ PCI entities [here](#supported-piipci-entities). 
- **Redact** PII/PCI data in the messages and transcripts with a default masking redaction indicator "****". 
- **Mask with custom string** instead of the default redaction indicator. 

A list of supported PII data that Symbl can identify and redact are given in [Supported PII/ PCI Entities](#supported-piipci-entities) section.

:::info
Currently, the PII and PCI data identification and redaction is only supported for English for the [Streaming API](/docs/streamingapi/introduction).
:::


## Identifying and Redacting PII and PCI data

To enable PII/PCI support for messages objects, provide additional payload in the request body for Streaming API.

For WebSocket request using Streaming API, add the `redaction` object in the `start_request` message to begin 
the real-time PII/PCI identification and redaction while starting the connection to the Streaming API.

```json
// sample payload of start_request message
{
    "type": "start_request",
    "config": {
        "languageCode": "en-US",
        "redaction": {
            // Enable identification of PII/PCI information
            "identifyContent": true, // By default false
            // Enable redaction of PII/PCI information
            "redactContent": true, // By default false
            // Use custom string "[PII_PCI_ENTITY]" to replace PII/PCI information with
            "redactionString": "[PII_PCI_ENTITY]" // By default ****
        }
    },
}
```

### Live speech-to-text and insights on local server

For SDK client, add payload in the `sdk.startRealtimeRequest` method. 

```js
/**
 * To Test this script - start speaking when you run the script.
 */
const WebSocketClient = require('websocket').client;

const mic = require('mic');

const micInstance = mic({
    rate: '16000',
    channels: '2',
    debug: false,
    exitOnSilence: 6
});

const micInputStream = micInstance.getAudioStream();

let connection = undefined;

const ws = new WebSocketClient();
ws.on('connectFailed', (e) => {
    console.error('Connection Failed.', e);
});
ws.on('connect', (conn) => {

    connection = conn;
    connection.on('close', () => {
        console.log('WebSocket closed.')
    });
    connection.on('error', (err) => {
        console.log('WebSocket error.', err)
    });
    connection.on('message', (data) => {
        let response = JSON.stringify(data);
        let utf8Data = JSON.parse(data["utf8Data"]);
        //console.log(utf8Data);
        if (utf8Data && utf8Data.type === "message_response") {
            console.log("Payload ====");
            console.log(utf8Data.messages[0].payload);
            console.log("Entities ====");
            console.log("metadata ====");
            console.log(utf8Data.messages[0].metadata);
            if (utf8Data.messages[0].entities) {
                console.log("Entities found ");
                console.log(utf8Data.messages[0].entities);
            } else {
                console.log("No entities found ");
            }
        }

        // console.log('data: ', data);
    });
    console.log('Connection established.');

    connection.send(JSON.stringify({
        type: "start_request",
        insightTypes: ["action_item", "question", "follow_up", "topic"],
        config: {
            confidenceThreshold: 0.1,
            timezoneOffset: 480, // Offset in minutes from UTC
            languageCode: 'en-US',
            speechRecognition: {
                engine: "google",
                encoding: "LINEAR16",
                sampleRateHertz: 44100,
            },
            // this option enables redaction PII/PCI feature. This is optional
            redaction: {
                identifyContent: true, // By default false
                redactContent: true, // By default false
                redactionString: '*****' // By default ****
            },
        },
        speaker: {
            userId: "john@example.com",
            name: "John"
        },
        trackers: [{
            name: 'Budget',
            vocabulary: [
                'a budget conversation',
                'budget', 'budgeted', 'budgeting decision', 'budgeting decisions',
                'money',
                'budgets', 'funding', 'funds', 'I have the budget', 'my budget', 'our budget', 'your budget',
                "we don't have budget for this", "don't think I have budget", "I think we have budget",
                "not sure if I have budget"
            ]
        },
            {
                name: 'Approval',
                vocabulary: ['sounds great', 'yes', 'okay, sounds good', "agree", "yeah"],
            },
            {
                name: 'Denial',
                vocabulary: ['No', 'Not necessary', 'Not a good idea', "don't agree"],
            }

        ]

    }));

    micInputStream.on('data', function(data) {
        connection.send(data);
    });

    // below action can stop meeting
    setTimeout(() => {
        micInstance.stop();
        connection.sendUTF(JSON.stringify({
            "type": "stop_recognition"
        }));
    }, 4 * 40 * 1000);

    micInstance.start();

});
// Use auth token here and point to correct server
ws.connect('wss://api-labs.symbl.ai/v1/realtime/insights/MeetingID', null, null, {
    'x-api-key': ""
});

```
Field Name  | Data Type | Description | Required | Default vaule | Allowed values
---------- | ------- | ------ | ----- | ------ | -----
`identifyContent` | Boolean | Specifies that the PII/PCI data or sensitive content should be identified. | Mandatory |`false` | `true` or `false`. 
`redactContent` | Boolean | Specifies that the PII/PCI data or sensitive content should be redacted in the transcript and insights. | Mandatory | `false` | `true` or `false`. 
`redactionString` | String | Specifies any specific string to be used to replace redacted entities. | Optional |`****` | Min length 1 character, Max length 16 characters. 

## Response Body Samples

The response returned for PII/PCI data Identification and Redaction will be any of the following 3 Scenarios depending on how you have set up the two mandatory parameters `identifyContent` and `redactContent`.

<Tabs
  defaultValue="identifyContent=true and redactContent=false"
  values={[
    { label: 'Identify Only', value: 'identifyContent=true and redactContent=false', },
    { label: 'Redact Only', value: 'identifyContent=false and redactContent=true', },
    { label: 'Identify and Redact', value: 'identifyContent=true and redactContent=true', },
  ]
}>
<TabItem value="identifyContent=true and redactContent=false">

<br/> When, <br/> 

`identifyContent=true` and `redactContent=false`. 

PII/PCI data or sensitive content will be identified and will be made available in the message and insight objects, but the content of transcript and insight with not be redacted, and will still show the sensitive content.

```json
{
  "id": "6412283618000896",
  "text": "Sure, my social security number is 222-44-5555 and I was born on 3rd of October 1982.",
  "from": {
      "name": "Roger",
      "email": "Roger@example.com"
  },
  "startTime": "2020-07-10T11:16:21.024Z",
  "endTime": "2020-07-10T11:16:26.724Z",
  "conversationId": "6749556955938816",
  "entities": [
    {
      "type": "SSN",
      "value": "22-44-5555",
      "text": "22-44-5555",
      "offset": 35
    },
    {
      "type": "DATE_OF_BIRTH",
      "value": "1989-10-03",
      "text": "3rd of October 1982",
      "offset": 65
    }
  ]
}
```
</TabItem>

<TabItem value="identifyContent=false and redactContent=true">

<br/> When, <br/> 

`identifyContent=false` and `redactContent=true`. 

PII/PCI data or sensitive content will not be made available in the message and insight objects, but the content of transcript and insight with be redacted, and will be replaced with the redaction indicator.

```json
 {
  "id": "6412283618000896",
  "text": "Sure, my social security number is **** and I was born on ****.",
  "from": {
    "name": "Roger",
    "email": "Roger@example.com"
  },
  "startTime": "2020-07-10T11:16:21.024Z",
  "endTime": "2020-07-10T11:16:26.724Z",
  "conversationId": "6749556955938816"
}
```
</TabItem>

<TabItem value="identifyContent=true and redactContent=true">

<br/> When, <br/> 

`identifyContent=true` and `redactContent=true`. 

PII/PCI data or sensitive content will be identified and will be made available in the message and insight objects. And the content of transcript and insight with also be redacted, and will be replaced with the redaction indicator.

```json
 {
  "id": "6412283618000896",
  "text": "Sure, my social security number is **** and I was born on ****.",
  "from": {
      "name": "Roger",
      "email": "Roger@example.com"
  },
  "startTime": "2020-07-10T11:16:21.024Z",
  "endTime": "2020-07-10T11:16:26.724Z",
  "conversationId": "6749556955938816",
  "entities": [
    {
      "type": "SSN",
      "value": "22-44-5555",
      "text": "22-44-5555",
      "offset": 35
    },
    {
      "type": "DATE_OF_BIRTH",
      "value": "1989-10-03",
      "text": "3rd of October 1982",
      "offset": 59
    }
  ]
}
```
</TabItem>

</Tabs>

## Sample with Conversation Response

Given below is a sample of using PII/PCI data Identification and Redaction with Get Conversation Insights call for `questions`. 

`GET https://api.symbl.ai/v1/conversations/CONVERSATION_ID/questions`

Response with enable redaction configuration:

```json
{
    "questions": [
        {
            "id": "5845327161589760",
            "text": "What would that be in  ***** ?",
            "type": "question",
            "score": 0.97763958889475,
            "messageIds": [
                "6371692449366016"
            ],
            "from": {
                "id": "6af1e59a-4824-476a-b2ad-2908cb38c2f4",
                "name": "john",
                "userId": "john@example.com"
            }
        },
        {
            "id": "6228200813232128",
            "text": "But, how did you know, I was  ***** ?",
            "type": "question",
            "score": 0.9919246735147544,
            "messageIds": [
                "4505288909520896"
            ],
            "from": {
                "id": "6af1e59a-4824-476a-b2ad-2908cb38c2f4",
                "name": "john",
                "userId": "john@example.com"
            }
        }
    ]
}
```
#### Getting Conversation Insights without Redaction configuration

`GET https://api.symbl.ai/v1/conversations/CONVERSATION_ID/questions`

Response with disable redaction configuration:

```json
{
    "questions": [
        {
            "id": "5216057812844544",
            "text": "But, how did you know, I was English?",
            "type": "question",
            "score": 0.9919246735147544,
            "messageIds": [
                "4913495486234624"
            ],
            "from": {
                "id": "8081de20-b855-46ad-b2d7-fb04774d9d67",
                "name": "john",
                "userId": "john@example.com"
            }
        },
        {
            "id": "5912470251110400",
            "text": "What would that be in England?",
            "type": "question",
            "score": 0.97763958889475,
            "messageIds": [
                "6334186244800512"
            ],
            "from": {
                "id": "8081de20-b855-46ad-b2d7-fb04774d9d67",
                "name": "john",
                "userId": "john@example.com"
            }
        }
    ]
}
```

### Supported PII/PCI Entities

When you enable the PII/PCI data identification and redaction feature, the following PII/PCI data are supported: 

PII/PCI Entity  | Category | Description 
---------- | ------- | ------ |
Credit/Debit Card Number | Finance | A credit or debit card number is 12 to 19 digits long, used for payment transactions.
Credit/Debit Card CVV Number | Finance | A 3-digit or 4-digit security code of a credit or debit card.
Credit/Debit Card Expiration Date | Finance  | The month and year a card expires.
Credit/Debit Card PIN. | Finance | A security code issued by a bank or credit union for authenticating the transaction. Not to be confused with CVV code.
IBAN Code | Finance | An [International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number) is an international system for identifying bank accounts across national borders. It defined under the ISO-13616:2007 standard. An IBAN consists of up to 34 alphanumeric characters. 
SWIFT Code | Finance | A [SWIFT code](https://en.wikipedia.org/wiki/Society_for_Worldwide_Interbank_Financial_Telecommunication) is a unique identification code for a particular bank. These codes are used when transferring money between banks, particularly for international wire transfers.
US Bank Routing Number | Finance | The American Bankers Association (ABA) [Routing Number](https://en.wikipedia.org/wiki/ABA_routing_transit_number) (also called the transit number) is a nine-digit code. It is used to identify the financial institution that's responsible to credit or entitled to receive credit for a check or electronic transaction.
US Bank Account Number | Finance |  US Bank Account Number.
Name | Personal | A person's full name, which can include first names, middle names or initials, and last names. 
Email | Personal | An email address to a mailbox.
Age | Personal |Age measured in months or years.
Phone Number, Address, Date of Birth | Personal | Phone number, address and date of birth. 
Social Security Number | National ID | A United States [Social Security number (SSN)](https://en.wikipedia.org/wiki/Social_Security_number) is a 9-digit number issued to US citizens, permanent residents, and temporary residents.
Passport Number | National ID | A passport number.
US Drivers License Number | National ID | A driver's license number for the United States. Format can vary depending on the issuing state.
Date | General | Detects date mentions, including the names of common world holidays.
Domain Name | General | A domain name as defined by [DNS standard](https://datatracker.ietf.org/doc/html/rfc1035).
