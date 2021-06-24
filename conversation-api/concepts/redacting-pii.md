---
id: redaction-pii
title: Identifying and Redacting PII (Labs)
sidebar_label: PII Identification and Redaction (Labs)
slug: /concepts/redaction-pii
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App ID and Secret.  If you don't already have it, sign up on our [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

**Personally Identifiable Information (PII)** is any information about an individual that can be used to distinguish or trace the individual's identity, such as name, social security number, email address, phone number, etc.

Although, sensitive, they can appear in conversations such as account verification by customer care agents that requires the customer to share their name, email address or other confidential information. 

Symbl provides the capability to identify and redact PII data from conversations and insights it processes. Redaction of PII is a process of concealing confidential information in messages and insights.

This feature will allow you to:

- **Identify** any PII such as Social Security Number, Phone Number, etc. from messages and insights. See the complete list of supported PII entities [here](#supported-pii-entities). 
- **Redact** PII in the messages and transcripts with a default masking redaction indicator "****". 
- **Mask with custom string** instead of the default redaction indicator. 

A list of supported PII data that Symbl can identify and redact are given in [Supported PII Entities](#supported-pii-entities) section.

:::note 
Currently, the PII identification and redaction is only supported for English for the [Streaming API](/docs/streamingapi/introduction).
:::


## Identifying and Redacting PII 

To enable PII support for messages objects, provide additional payload in the request body for Streaming API.

For WebSocket request using Streaming API, add the `redaction` object in the `start_request` message to begin 
the real-time PII identification and redaction while starting the connection to the Streaming API.

```json
// sample payload of start_request message
{
  "type": "start_request",
  "config": {
    "languageCode": "en-US"
  },
  "redaction": {
  // Enable identification of PII information
  "identifyContent": true, // By default false
  // Enable redaction of PII information
  "redactContent": true, // By default false
  // Use custom string "[PII_ENTITY]" to replace PII information with
  "redactionString": "[PII_ENTITY]" // By default ****
  },
}
```

### Live speech-to-text and insights on local server

For SDK client, add payload in the `sdk.startRealtimeRequest` method. 

```js
const uuid = require('uuid').v4;
const connection = await sdk.startRealtimeRequest({
          id: uuid(),
        // @This is additional request attributes enables PII feature
          redaction: {
              // Enable identification of PII information
              identifyContent: true, // By default false
              // Enable redaction of PII information
              redactContent: true, // By default false
              // Use custom string "[PII_ENTITY]" to replace PII information with 
              redactionString: "[PII_ENTITY]" // By default ****
          },
          config: {
              meetingTitle: 'My Redaction Test meeting',
              timezoneOffset: 480, // Offset in minutes from UTC
              languageCode: 'en-US'
          },
          speaker: {
              name: "John Doe"
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
                  // Identified Entities and Redacted Text can be obtained here.
                  console.log('onMessageResponse', JSON.stringify(data, null, 2));
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
    { label: 'Identify Only', value: 'identifyContent=true and redactContent=false', },
    { label: 'Redact Only', value: 'identifyContent=false and redactContent=true', },
    { label: 'Identify and Redact', value: 'identifyContent=true and redactContent=true', },
  ]
}>
<TabItem value="identifyContent=true and redactContent=false">

<br/> When, <br/> 

`identifyContent=true` and `redactContent=false`. 

PII or sensitive content will be identified and will be made available in the message and insight objects, but the content of transcript and insight with not be redacted, and will still show the sensitive content.

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
}
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
      "text": "3rd of October 1982",
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
Finance | Credit/Debit Card Number. | A credit or debit card number is 12 to 19 digits long, used for payment transactions.
Finance | Credit/Debit Card CVV Number. | A 3-digit or 4-digit security code of a credit or debit card.
Finance | Credit/Debit Card Expiration Date. | The month and year a card expires.
Finance | Credit/Debit Card PIN. | A security code issued by a bank or credit union for authenticating the transaction. Not to be confused with CVV code.
Finance | IBAN Code | An [International Bank Account Number (IBAN)](https://en.wikipedia.org/wiki/International_Bank_Account_Number) is an international system for identifying bank accounts across national borders. It defined under the ISO-13616:2007 standard. An IBAN consists of up to 34 alphanumeric characters. 
Finance | SWIFT Code | A [SWIFT code](https://en.wikipedia.org/wiki/Society_for_Worldwide_Interbank_Financial_Telecommunication) is a unique identification code for a particular bank. These codes are used when transferring money between banks, particularly for international wire transfers.
Finance | US Bank Routing Number | The American Bankers Association (ABA) [Routing Number](https://en.wikipedia.org/wiki/ABA_routing_transit_number) (also called the transit number) is a nine-digit code. It is used to identify the financial institution that's responsible to credit or entitled to receive credit for a check or electronic transaction.
Finance | US Bank Account Number | US Bank Account Number.
Personal | Name | A person's full name, which can include first names, middle names or initials, and last names. 
Personal | Email | An email address to a mailbox.
Personal | Age | Age measured in months or years.
Personal | Phone Number, Address, Date of Birth. | Phone number, address and date of birth. 
National ID | Social Security Number | A United States [Social Security number (SSN)](https://en.wikipedia.org/wiki/Social_Security_number) is a 9-digit number issued to US citizens, permanent residents, and temporary residents.
National ID | Passport Number | A passport number.
National ID | US Drivers License Number | A driver's license number for the United States. Format can vary depending on the issuing state.
General | Date | Detects date mentions, including the names of common world holidays.
General | Domain Name | A domain name as defined by [DNS standard](https://datatracker.ietf.org/doc/html/rfc1035).
