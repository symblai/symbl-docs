---
id: push-speakerevents-get-summary-url
title: Using Symbl Javascript SDK To Push Speaker Events
slug: /javascript-sdk/tutorials/push-speakerevents-get-summary-url/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

In this example, it establishes a connection using a phone number through PSTN,
to send speaker events, generate insights, and display a summary URL with the
output. You can see how to initialize the Voice SDK, connect to the endpoint,
push speaker events and get the summary URL.

Throughout the documentation you'll find various references to these variable names, which you will have to replace with your values:

Key  | Description
---------- | -------
```APP_ID``` | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Sybml.
```DEFAULT_PHONE_NUMBER``` | A phone number that you want the API to connect to. Be sure to include the country code.
```EMAIL_ADDRESS``` | The email address you wish to send the summary email to.

[View on Github](https://github.com/symblai/getting-started-samples/tree/master/examples/voice-sdk/telephony-speaker-events)

## Getting started

This example runs on a Node server, so we will use `@symblai/symbl-js` package.


### Initialize the SDK


```js
await sdk.init({
  appId: APP_ID,
  appSecret: APP_SECRET,
  basePath: 'https://api.symbl.ai'
});
```

### Connect to Endpoint


```js
const connection = await sdk.startEndpoint(endpointConfig);
```

### Set Up Configuration Options

First of all let's provide phone number and endpoint type:


```javascript
endpoint: {
  type: 'pstn',
  phoneNumber: DEFAULT_PHONE_NUMBER
}
```

In case you want to use a `sip` connection, you can use `type: sip` and provide
SIP URI to dial in to. This should be unique for an active call/meeting in your
system. You can also provide a `dtmf` code if you have one. You can find this code
on the meeting platform invite. You can leave it blank if not connecting to the meeting
platform


```javascript
{
  dtmf: "<code>",
  type: 'sip',
  uri: 'sip:124@domain.com'
}
```

You can also pass a custom `audioConfig` configuration object. If not provided, it uses PCMU with an 800
sample rate. If you want to provide it, you can do it like so:


```js
audioConfig: {
  encoding: 'OPUS',
  sampleRate: 48000
}
```

### Getting The Connection ID

To send speaker events we will need `connectionId` unique to each active
connection. to get it you can simply retrieve it from connection response:


```js
const connectionId = connection.connectionId;
```

### Sending The Speaker Event

We can send different speaker events to our connection indicating that different
speakers started speaking. That will give us more personalized insights and get a
better meeting summary

In our example, we will do it by calling helper function `getScheduleEvent`, which
we will review in a bit. We pass SpeakerEvent type to it by using
`SpeakerEvent.types` enum from `@symblai/symbl-js`, passing user data and timestamp


```javascript
const scheduleEvent = getScheduleEvent(sdk, connectionId);

setTimeout(() => {
  // Schedule all the events to be sent.
  scheduleEvent(SpeakerEvent.types.startedSpeaking, users.john, 0);
  scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.john, 5);
}, 1000);
```

We retrieve users just from the global array of users but in real-world example
that might be user's data retrieved from the database.


```js
const users = {
  john: {
    userId: 'john@example.com',
    name: 'John'
  },
  mary: {
    userId: 'mary@example.com',
    name: 'Mary'
  }
};
```

In order to push event to our connection we will create an event like so:


```js
const speakerEvent = new SpeakerEvent({
  type: eventType,
  user
});

speakerEvent.timestamp = new Date().toISOString();
```

And push it using the `pushEventOnConnection` function provided by SDK:


```js
sdk.pushEventOnConnection(connectionId, speakerEvent.toJSON(), (err) => {
  if (err) {
    console.error('Error during push event.', err);
  } else {
    console.log('Event pushed!');
  }
});
```


## Full Code Example

```js
const {sdk, SpeakerEvent} = require('@symblai/symbl-js')

const APP_ID = "<Your App ID>";
const APP_SECRET = "<Your App Secret>";
const DEFAULT_PHONE_NUMBER = "<Your Phone Number>";
const EMAIL_ADDRESS = "<Your Email Address>";

sdk
  .init({
    appId: APP_ID,
    appSecret: APP_SECRET,
    basePath: 'https://api.symbl.ai',
  })
  .then(() => {
    console.log('SDK Initialized')

    sdk
      .startEndpoint({
        endpoint: {
          // type: 'sip',         // Use this if you're trying to dial in to a SIP trunk.
          // uri: 'sip:username@domain.com',
          type: 'pstn',
          phoneNumber: DEFAULT_PHONE_NUMBER,
          //dtmf: '', // you can find this on the meeting platform invite. Omit or leave blank if not connecting to a meeting platform
        },
        actions: [
          {
            invokeOn: 'stop',
            name: 'sendSummaryEmail',
            parameters: {
              emails: [EMAIL_ADDRESS], // Add valid email addresses to received email
            },
          },
        ],
      })
      .then((connection) => {
        const connectionId = connection.connectionId
        console.log('Successfully connected.', connectionId)

        const speakerEvent = new SpeakerEvent({
          type: SpeakerEvent.types.startedSpeaking,
          user: {
            userId: 'john@example.com',
            name: 'John',
          },
        })

        setTimeout(() => {
          speakerEvent.timestamp = new Date().toISOString()
          sdk.pushEventOnConnection(
            connectionId,
            speakerEvent.toJSON(),
            (err) => {
              if (err) {
                console.error('Error during push event.', err)
              } else {
                console.log('Event pushed!')
              }
            },
          )
        }, 1000)

        setTimeout(() => {
          speakerEvent.type = SpeakerEvent.types.stoppedSpeaking
          speakerEvent.timestamp = new Date().toISOString()

          sdk.pushEventOnConnection(
            connectionId,
            speakerEvent.toJSON(),
            (err) => {
              if (err) {
                console.error('Error during push event.', err)
              } else {
                console.log('Event pushed!')
              }
            },
          )
        }, 12000)

        // Scheduling stop endpoint call after 60 seconds
        setTimeout(() => {
          sdk
            .stopEndpoint({
              connectionId: connection.connectionId,
            })
            .then(() => {
              console.log('Stopped the connection')
              console.log('Summary Info:', connection.summaryInfo)
              console.log('Conversation ID:', connection.conversationId)
            })
            .catch((err) =>
              console.error('Error while stopping the connection.', err),
            )
        }, 10000)
      })
      .catch((err) => console.error('Error while starting the connection', err))
  })
  .catch((err) => console.error('Error in SDK initialization.', err))
```

## Running The Example

Create a javascript file named app.js and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: npm install @symblai/symbl-js. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::
