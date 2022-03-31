---
id: get-live-transcription
title: Live Transcription From A Phone Call
slug: /telephony/tutorials/connect-to-phone-call/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Get a live transcription in your Node.js application by making a call to a valid phone number. In this guide, we will walk you through how to get a live transcription and real-time AI insights, such as [follow-ups](/docs/concepts/follow-ups), [action items](/docs/concepts/action-items), [topics](/docs/concepts/topics) and [questions](/docs/conversation-api/questions) of a phone call using a PSTN or SIP connection.

This application uses the Symbl Javascript SDK which requires the `symbl-node` node package. 

Making a phone call is also the quickest way to test [Symbl’s Telephony API](/docs/telephony/introduction). It can make an outbound call to a phone number using a traditional public switched telephony network [(PSTN)](https://en.wikipedia.org/wiki/Public_switched_telephone_network), any [SIP trunks](https://en.wikipedia.org/wiki/SIP_trunking), or SIP endpoints that can be accessed over the internet using a SIP URI.

### Contents

* [Getting started](#getting-started)
* [Set up Symbl SDK](#sdk-setup)
* [Make a call](#make-call)
* [Code Sample](#code-sample)
* [What's next](#whats-next)

## <a name="getting-started"></a>Getting Started

In this example we use the following variables which you must replace in the code examples for the code to work:

Key  | Type | Description
---------- | -------
```APP_ID``` | String | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | String | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | String | The JWT you get from our [authentication process](/docs/developer-tools/authentication)
```PHONE_NUMBER``` | String | A phone number that you want the API to connect to. Be sure to include the country code.

## <a name="sdk-setup"></a>Set up Symbl SDK
To get started, you’ll need [your account credentials](https://platform.symbl.ai/#/login) and [Node.js](https://nodejs.org/en/download/) installed (> v8.x) on your machine.

We’ll use the [Symbl module for Node.js](https://www.npmjs.com/package/symbl-node) in this guide. Make sure you have a Node project set up. If you don’t have one, you can set one up using [npm init](https://docs.npmjs.com/cli/init).

From the root directory of your project, run the following command to add `symbl-node` in your project dependencies.

```bash
$ npm i --save symbl-node
```
### Authentication
Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### <a name="retrieve-credentials"></a>Retrieve your credentials

Your credentials include your appId and appSecret. You can find them on the home page of the platform.
![credentials page](/img/credentials.png)

### <a name="init-sdk"></a>Initialize SDK

Create a new file named index.js in your project and add the following lines to initialize the Symbl SDK:

```javascript
const {sdk, SpeakerEvent} = require("symbl-node");
const appId = APP_ID;
const appSecret = APP_SECRET;

sdk.init({
  appId: appId,
  appSecret: appSecret,
}).then(async() => {
  console.log('SDK initialized.');
  try {
    // You code goes here.
  } catch (e) {
    console.error(e);
  }
}).catch(err => console.error('Error in SDK initialization.', err));
```


## Make a call
The quickest way to test the Telephony API is to make a call to any valid phone number. The Telephony API only works with phone numbers in the U.S. and Canada.

![tutorial phone integration](/img/tutorial_phone_integration.png)

* Your application uses the SDK to:
  * make a REST call to the Telephony API with the phone number details

  * subscribe to live results over a WebSocket connection

* Once the call is accepted on the phone, the Telephony API starts receiving audio from the call.

* Live transcription is streamed back to your application using the WebSocket connection.

<Tabs
  defaultValue="sip"
  values={[
    { label: 'SIP', value: 'sip', },
    { label: 'PSTN', value: 'pstn', }
  ]
}>
<TabItem value="sip">

```js
const connection = await sdk.startEndpoint({
    endpoint: {
        type: 'sip', // when dialing in to SIP UAS or making a call to SIP Phone
        // Replace this with a real SIP URI
        uri: 'sip:bob@sip.example.com'
    }
});
const {connectionId} = connection;
console.log('Successfully connected. Connection Id: ', connectionId);
```

</TabItem>
<TabItem value="pstn">

```js
const connection = await sdk.startEndpoint({
    endpoint: {
        type: 'pstn', // when making a regular phone call
        phoneNumber: PHONE_NUMBER
    }
});
const {connectionId} = connection;
console.log('Successfully connected. Connection Id: ', connectionId);
```

</TabItem>
</Tabs>

To make a phone call, call the `startEndpoint` with `type` set to `pstn` and a valid U.S./Canadian phone number `phoneNumber`. The connection will return a `connectionId` value.


### Subscribe to the Live AI Insights

To get real-time AI insights, you must subscribe to the connection. You need to call the `subscribeToConnection` method in the SDK and pass the `connectionId` and a callback method which will be called on for every new event including the live transcription.

```javascript
// Subscribe to connection using connectionId.
sdk.subscribeToConnection(connectionId, (data) => {
  const {type} = data;
  if (type === 'transcript_response') {
      const {payload} = data;

      // You get live transcription here!!
      process.stdout.write('Live: ' + payload && payload.content + '\r');

  } else if (type === 'message_response') {
      const {messages} = data;

      // You get processed messages in the transcript here!!! Real-time but not live! :)
      messages.forEach(message => {
          process.stdout.write('Message: ' + message.payload.content + '\n');
      });
  } else if (type === 'insight_response') {
      const {insights} = data;
      // You get any insights here!!!
      insights.forEach(insight => {
          process.stdout.write(`Insight: ${insight.type} - ${insight.text} \n\n`);
      });
  }
});
```

When you use this API, you can use a callback function within the `subscribeToConnection` function. You pass an object and declare the type of response you want in the type field.

* `transcript_response` type is used for low latency live transcription results

* `message_response` type is used for processed transcription results in real-time. These are not the same as `transcript_response` which are low latency but typically generate a few seconds after the processing and contain messages split by sentence boundaries.

* `insight_response` is used for any [insights](https://docs.symbl.ai/#get-insights-from-a-conversation) detected in real-time


### End the Call

To end the call, you should make a `stopEndpoint` call. The following code stops the call after 60 seconds. Your business logic should determine when the call should end.

```javascript
// Stop call after 60 seconds to automatically.
setTimeout(async () => {
  const connection = await sdk.stopEndpoint({ connectionId });
  console.log('Stopped the connection');
  console.log('Conversation ID:', connection.conversationId);
}, 60000); // Change the 60000 with higher value if you want this to continue for more time.
```

The `stopEndpoint` will return an updated `connection` object which will have the `conversationId` in the response. You can use `conversationId` to fetch the results even after the call using the [Conversation API](/docs/conversation-api/introduction).


## Code Example
You can find the complete code used in this guide [here](https://github.com/symblai/getting-started-samples/tree/master/tutorials/node/live-transcript-phone-call).


### Test

To verify and check if the code is working:

1. Run your code:

```bash
$ node index.js
```

2. You should receive a phone call to the number you used in the `startEndpoint` call. Accept the call.

3. Start speaking in English (default language) and you should see the live transcription added to the console in real-time.

4. The call should automatically end after 60 seconds. If you end it sooner and don’t invoke `stopEndpoint`, you will not receive the `conversationId`. If you need to access the results generated in the call, you should  invoke `stopEndpoint` even if it was ended without explicitly invoking `stopEndpoint` before this point.

:::info
The example above invokes `stopEndpoint` after a fixed timeout of 60 seconds. This is for demonstrating the stop functionality and it is not the recommended method of implementation for your application. In a real implementation, you should invoke `startEndpoint` and `stopEndpoint` as needed by the business logic of your application, i.e when you would like Symbl to start processing and stop processing.
:::

## What's next
Congratulations! You finished your integration with Symbl’s Telephony API using PSTN. Next, you can learn more about the [Conversation API](/docs/conversation-api/introduction), SIP Integration, Post-Meeting Summary, and Active Speaker Events.

:::info Termination due to elongated silence
If the meeting is silent for more than 30 minutes, it will be automatically terminated. The charges towards the silent minutes apply. 
:::
