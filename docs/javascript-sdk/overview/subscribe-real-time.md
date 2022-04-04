---
id: subscribe-real-time
title: Subscribe to real-time Events
sidebar_label: Subscribe to real-time Events
slug: /javascript-sdk/code-snippets/subscribe-real-time/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Symbl Javascript SDK also lets you subscribe to real-time events when you connect to one of the Endpoints specified in the above sections. These include:

* Real-Time Transcription
* Real-Time Insights
* Real-Time Messages
* Real-Time Intents

The below example shows how to achieve this:

### Initialize SDK

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const {sdk, SpeakerEvent} = require("@symblai/symbl-js");

sdk.init({
    // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
    appId: APP_ID,
    appSecret: APP_SECRET
}).then(async () => {
    console.log('SDK initialized.');
    try {
      // You code goes here.
    } catch (e) {
        console.error(e);
    }
}).catch(err => console.error('Error in SDK initialization.', err));
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

Add the above lines to import and initialize the SDK. Replace the `APP_ID` and `APP_SECRET` in the code.
You can find the them by signing up on the [Symbl Developer Platform](https://platform.symbl.ai)

### Make a phone call

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const connection = await sdk.startEndpoint({
    endpoint: {
        type: 'pstn', // when making a regular phone call
        phoneNumber: 'PHONE_NUMBER' // include country code
    }
});
const {connectionId} = connection;
console.log('Successfully connected. Connection Id: ', connectionId);

```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>


The above snippet makes a phone call, by calling the `startEndpoint` with type set to `pstn` and a valid US/Canada Phone Number.
You can also call in via type `sip` as well with the steps below remaining the same.

### Subscribe to the Live Events

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
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
      // See <link here> for more details on Insights
      // You get any insights here!!!
      insights.forEach(insight => {
          process.stdout.write(`Insight: ${insight.type} - ${insight.text} \n\n`);
      });
  }
});
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

The above snippet calls the `subscribeToConnection` which requires the `connectionId` of the call and a callback function to be passed as the second argument which will be invoked when any of the above events are available to be consumed.
The `data` received will contain `type` of the event. It can be one of `transcript_response`, `message_response`, `insight_response`.

Lets go over them one by one:

1. `transcript_response` : This contains the real-time transcription data which is availabe as soon as its detected.

2. `message_response` : This will contain the array of the transcripts of all the speakers which will be logically separated by punctuations or the speakers if [Active Speaker Events](/docs/javascript-sdk/code-snippets/active-speaker-events) are pushed.

3. `insight_response` : This will contain the array of all the insights detected in real-time. These can be [Action Items](/docs/conversation-api/action-items) or questions.

There is also a 4th type of event which is `intent_response` covered in a separate example:

### End the call

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
// Stop call after 60 seconds to automatically.
setTimeout(async () => {
  const connection = await sdk.stopEndpoint({ connectionId });
  console.log('Stopped the connection');
  console.log('Conversation ID:', connection.conversationId);
}, 60000); // Change the 60000 with higher value if you want this to continue for more time.
```
</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

To end the call gracefully, we call the `stopEndpoint` call to stop the call.
The code snippet above simply stops the call after 60 seconds.

And we're done! That's how you can consume real-time events using Javascript SDK!

The complete code for the example above can be found [here](https://github.com/symblai/getting-started-samples/tree/master/tutorials/node/live-transcript-phone-call).

### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::
