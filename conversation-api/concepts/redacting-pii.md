---
id: redaction-pii
title: Identifying and Redacting PII 
sidebar_label: PII Identification and Redaction
slug: /concepts/redaction-pii
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Personally Identifiable Information (PII) is any information about an individual that can be used to distinguish or trace the individual's identity, such as name, social security number, email address, phone number, etc.

Although, sensitive, they can appear in conversations such as account verification by customer care agents that requires the customer to share their name, email address or other confidential information. 

Symbl provides the capability to identify and redact PII data from conversations and insights it processes. Redaction of PII is a process of concealing confidential information in messages and insights.

This feature will allow you to:

- **Identify** any PII such as Social Security Number, Phone Number, etc. from messages and insights. See the complete list of supported PII entities [here](#supported-pii-entities). 
- **Redact** PII in the messages and transcripts with a default masking redaction indicator "****". 
- **Mask with custom string** instead of the default redaction indicator. 

A list of supported PII data that Symbl can identify and redact are given in [Supported PII Entities](#supported-pii-entities) section.

:::info 
Currently, the PII identification and redaction is supported with Streaming APIs for the following functionalities: 

- [Live speech-to-text and AI insights on browser](/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser)
- [Live speech-to-text and AI insights on the local server](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer)

:::


## Identifying and Redacting PII 

To enable PII support for messages objects, provide additional payload in the request body for Streaming API. 

### Live speech-to-text and insights on browser

For WebSocket request using browser, add the payload to enable PII feature while starting the connection to the Streaming API.

```js

// Fired when the connection succeeds.
{
  "type": "start_request",
  ...
  config: {
    ...,
    "redaction": {
      "identifyContent": true, // By default false
      "redactContent": true, // By default false
      "redactionString": "[PII_ENTITY]" // By default ****
    }
    
  },
  ...
}
```

### Live speech-to-text and insights on local server

For SDK client, add payload in the `sdk.startRealtimeRequest` method. 

```js

 const connection = await sdk.startRealtimeRequest({
            id,
            insightTypes: ['action_item', 'question'],
          // @This is additional request attributes enables PII feature
            redaction: {
                identifyContent: true, // By default false
                redactContent: true, // By default false
                redactionString: "ALL_REPLACE" // By default ****
            },
            config: {
                meetingTitle: 'My Test Meeting test',
                confidenceThreshold: 0.1,
                timezoneOffset: 480, // Offset in minutes from UTC
                languageCode: 'en-US',
                sampleRateHertz
            },
   
            speaker: {
                // Optional, if not specified, will simply not send an email in the end.
                userId: emailAddress, // Update with valid email
                name: myName
            },
            handlers: {
                /**
                 * This will return live speech-to-text transcription of the call.
                 */
                onSpeechDetected: (data) => {
                    if (data) {
                        const {punctuated} = data
                        console.log('Live: ', punctuated && punctuated.transcript)
                        console.log('');
                    }
                    console.log('onSpeechDetected ', JSON.stringify(data, null, 2));
                },
                /**
                 * When processed messages are available, this callback will be called.
                 */
                onMessageResponse: (data) => {
                    console.log('onMessageResponse', JSON.stringify(data, null, 2))
                },
                /**
                 * When Symbl detects an insight, this callback will be called.
                 */
                onInsightResponse: (data) => {
                    console.log('onInsightResponse', JSON.stringify(data, null, 2))
                },
                /**
                 * When Symbl detects a topic, this callback will be called.
                 */
                onTopicResponse: (data) => {
                    console.log('onTopicResponse', JSON.stringify(data, null, 2))
                }
            }
        });

```
Field Name  | Data Type | Description | Required | Default vaule | Allowed values
---------- | ------- | ------ | ----- | ------ | -----
`identifyContent` | Boolean | Specifies that the PII or sensitive content should be identified. | Mandatory |`false` | `true` or `false`. 
`redactContent` | Boolean | Specifies that the PII or sensitive content should be redacted in the transcript and insights. | Mandatory | `false` | `true` or `false`. 
`redactionString` | String | Specifies any specific string to be used to replace redacted entities. | Optional |`****` | Min length 1 character, Max length 16 characters. 

## Response Body Samples

The response returned for PII Identification and Redaction will be any of the following 3 Scenarios depending on how you have set up the two mandatory parameters `identifyContent` and `redactContent`.

<Tabs
  defaultValue="identifyContent=true and redactContent=false"
  values={[
    { label: 'Scenario 1', value: 'identifyContent=true and redactContent=false', },
    { label: 'Scenario 2', value: 'identifyContent=false and redactContent=true', },
    { label: 'Scenario 3', value: 'identifyContent=true and redactContent=true', },
  ]
}>
<TabItem value="identifyContent=true and redactContent=false">

<br/> When, <br/> 

`identifyContent=true` and `redactContent=false`. 

PII or sensitive content will be identified and will be made available in the message and insight objects, but the content of transcript and insight with not be redacted, and will still show the sensitive content.

```json
 {
  "id": "6412283618000896",
  "text": "Sure, my social security number is 22-44-5555 and I was born on 3rd of October 1982.",
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
      "text": "3rd of October 1982".
      "offset": 65
    }
  ]
}
```
</TabItem>

<TabItem value="identifyContent=false and redactContent=true">

<br/> When, <br/> 

`identifyContent=false` and `redactContent=true`. 

PII or sensitive content will not be made available in the message and insight objects, but the content of transcript and insight with be redacted, and will be replaced with the redaction indicator.

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
```
</TabItem>

<TabItem value="identifyContent=true and redactContent=true">

<br/> When, <br/> 

`identifyContent=true` and `redactContent=true`. 

PII or sensitive content will be identified and will be made available in the message and insight objects. And the content of transcript and insight with also be redacted, and will be replaced with the redaction indicator.

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
      "text": "3rd of October 1982".
      "offset": 59
    }
  ]
}
```
</TabItem>

</Tabs>


### Supported PII Entities

When you enable the PII identification and redaction feature, the following PII data will be supported: 

Category  | PII Entity | Description 
---------- | ------- | ------ |
Finance | Credit/Debit Card Number. | A credit card number is 12 to 19 digits long. They are used for payment transactions globally.
Finance | Credit/Debit Card CVV Number. | A 3-digit or 4-digit security code on each credit card.
Finance | Credit/Debit Card Expiration Date. | The month and year a card expires.
Finance | Credit/Debit Card PIN. | A security code issued by a bank or credit union. This number is used for bank accounts and payment cards.
Finance | IBAN Code | An International Bank Account Number (IBAN) is an internationally agreed-upon method for identifying bank accounts defined by the International Standard of Organization (ISO) 13616:2007 standard. The European Committee for Banking Standards (ECBS) created ISO 13616:2007. An IBAN consists of up to 34 alphanumeric characters, including elements such as a country code or account number. 
Finance | SWIFT Code | A SWIFT code is the same as a Bank Identifier Code (BIC). It's a unique identification code for a particular bank. These codes are used when transferring money between banks, particularly for international wire transfers. Banks also use the codes for exchanging other messages.
Finance | US Bank Routing Number | The American Bankers Association (ABA) Routing Number (also called the transit number) is a nine-digit code. It is used to identify the financial institution that's responsible to credit or entitled to receive credit for a check or electronic transaction.
Finance | US Bank Account Number | US Bank Account Number.
Personal | Name | A person's full name, which can include first names, middle names or initials, and last names. 
Personal | Email | An email address identifies the mailbox that emails are sent to or from. The maximum length of the domain name is 255 characters, and the maximum length of the local-part is 64 characters.
Personal | Age | Age measured in months or years.
Personal | Phone Number, Address, Date of Birth. | Phone number, address and date of birth. 
National ID | Social Security Number | A United States Social Security number (SSN) is a 9-digit number issued to US citizens, permanent residents, and temporary residents. This detector will not match against numbers with all zeroes in any digit group (that is, 000-##-####, ###-00-####, or ###-##-0000), against numbers with 666 in the first digit group, or against numbers whose first digit is 9.
National ID | Passport Number | A passport number that matches passport numbers for the following countries: Australia, Canada, China, France, Germany, Japan, Korea, Mexico, The Netherlands, Poland, Singapore, Spain, Sweden, Taiwan, United Kingdom, and the United States.
National ID | US Drivers License Number | A driver's license number for the United States. Format can vary depending on the issuing state.
General | Date | Most date formats, including the names of common world holidays.
General | Domain Name | A domain name as defined by the DNS standard.
