---
id: get-real-time-transcription-js-sdk
title: Real-time Output With PSTN Dialing Using Symbl's JavaScript SDK
slug: /javascript-sdk/tutorials/get-real-time-transcription-js-sdk/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

In this example let's walk through how to get the real-time transcription and insights events in a Telephone call.

Throughout the documentation you'll find various references to the following variable names, which you will have to replace with your values:

Key  | Description
---------- | -------
```APP_ID``` | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Sybml.
```YOUR_PHONE_NUMBER``` | A phone number that you want the API to connect to. Be sure to include the country code.
```EMAIL_ADDRESS``` | The email address you wish to send the summary email to.
```DTMF_MEETING_CODE``` | The meeting code provided by the meeting provider (Zoom, etc).

[View on Github](https://github.com/symblai/getting-started-samples/tree/master/examples/voice-sdk/telephony-real-time-insights-transcription)

## Getting started

To get started using this API, you need to sign up for the [Symbl Developer Platform](https://platform.symbl.ai/#/login) and receive your API credentials.

For this example, you will be using Node.js and the Symbl JavaScript SDK. You can install this using the Node Package Manager:

```js
npm install @symblai/symbl-js
```

You can then use the library within your project like this:

```js
const {sdk} = require('@symblai/symbl-js')
```

Initliaze the SDK:

```js
await sdk.init({
  appId: APP_ID,
  appSecret: APP_SECRET,
  basePath: 'https://api.symbl.ai',
});
```

Open up the connection and pass the configuration options:

```js
const connection = await sdk.startEndpoint({
  endpoint: {
    type: 'pstn',
    phoneNumber: YOUR_PHONE_NUMBER,
  },
  insightTypes: ['action_item', 'question'],
  actions: [
    {
      invokeOn: 'stop',
      name: 'sendSummaryEmail',
      parameters: {
        emails: [EMAIL_ADDRESS], // Add valid email addresses to received email
      },
    },
  ],
  data: {
    session: {
      name: 'My Test Meeting',
    },
  },
});
```

You'll notice various configuration options available such as `endpoint`, `insightTypes`, and `actions`.

### Endpoints

This example uses a PSTN connection but you can also connect via SIP:

```js
endpoint: {  
   dtmf: DTMF_MEETING_CODE,
   type: 'sip',
   uri: 'sip:124@domain.com'
}
```

### Insight Types

Symbl provides various insights from the call. The main insights categories are
`question` and `action_item`. To include insights in processing, you
need to specify them in the configuration as follows:


```js
{   
   insightTypes: ['action_item', 'question']
}
```

### Actions

You can specify different actions to happen during the call. You will define just
one, which defines an email which Symbl will use to send a summary email of the conversation to.


```js
actions: [
  {
    invokeOn: 'stop',
    name: 'sendSummaryEmail',
    parameters: {
      emails: [EMAIL_ADDRESS] // Add valid email addresses to received email
    }
  }
]
```

## Getting the Connection ID

For subscribing to the data, you will need to use `connectionId` unique to each
active connection. To get it you can simply retrieve it from connection
response:


```js
const connectionId = connection.connectionId;
```


## Real-time insights

For subscribing to the data, you will need to use `connectionId` unique to each
active connection. to get it you can simply retrieve it from connection
response:


```js
const connectionId = connection.connectionId;
```

After you have the connection ID you can use that to subscribe to our connection:

```js
sdk.subscribeToConnection(connectionId, (data) => {});
```

`data` is an object with a `type` field. Supported types are `transcript_response`,
`insight_response` and `message_response`.

For real-time trasncription you want to check for `transcript_response`.

```js
if (type === 'transcript_response') {
  const {payload} = data;
  process.stdout.write('Live: ' + payload && payload.content + '\r');
}
```

Transcripts are changing all the time, but once they are processed into reasonable message and not just words, you will get a `message_response` which you will want to handle:

```js
if (type === 'message_response') {
  const {messages} = data;
  messages.forEach((message) => {
    process.stdout.write('Message: ' + message.payload.content + '\n');
  })
}
```

And finally if there will be any question or action item during conversation, you will get `insight_response`:

```js
if (type === 'insight_response') {
  const {insights} = data;
  insights.forEach((insight) => {
    process.stdout.write(`Insight: ${insight.type} - ${insight.text} \n\n`);
  })
}
```


## Speaker separation

We can send different speaker events to our connection indicating that different
speakers started speaking. That will give us more personalized insights and get a
better meeting summary.

In our example, we will do it by calling the helper function `getScheduleEvent`, which we will review in a bit. We pass SpeakerEvent type to it by using
`SpeakerEvent.types` enum from `@symblai/symbl-js`, passing user data and timestamp:


```js
const scheduleEvent = getScheduleEvent(sdk, connectionId)

setTimeout(() => {
  // Schedule all the events to be sent.
  scheduleEvent(SpeakerEvent.types.startedSpeaking, users.john, 0)
  scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.john, 5)
}, 1000)
```

We retrieve users just from the global array of users but in real-world example
that might be users data retrieved from the database:


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
}
```

In order to push event to our connection we will create an event like so:


```js
const speakerEvent = new SpeakerEvent({
  type: eventType,
  user
});

speakerEvent.timestamp = new Date().toISOString();
```

And push it using `pushEventOnConnection` function provided by SDK:


```js
sdk.pushEventOnConnection(connectionId, speakerEvent.toJSON(), (err) => {
  if (err) {
    console.error('Error during push event.', err);
  } else {
    console.log('Event pushed!');
  }
});
```

This example just touches the surface of what you can do with our Streaming API. If you would like to learn more about it you can visit the [Streaming API documentation](/docs/streamingapi/introduction).

## Full Code Example

```js
const {sdk, SpeakerEvent} = require('@symblai/symbl-js')

const getScheduleEvent = (sdk, connectionId) => {
  return (eventType, user, time) => {
    setTimeout(() => {
      const speakerEvent = new SpeakerEvent({
        type: eventType,
        user,
      })
      speakerEvent.timestamp = new Date().toISOString()

      console.log(
        `Pushing event [${speakerEvent.timestamp}] ${speakerEvent.type} : ${speakerEvent.user.name}`,
      )

      sdk.pushEventOnConnection(connectionId, speakerEvent.toJSON(), (err) => {
        if (err) {
          console.error('Error during push event.', err)
        } else {
          console.log('Event pushed!')
        }
      })
    }, time * 1000)
  }
}

const users = {
  john: {
    userId: 'john@example.com',
    name: 'John',
  },
  mary: {
    userId: 'mary@example.com',
    name: 'Mary',
  },
}

;(async () => {
  try {
    // Initialize the SDK
    await sdk.init({
      appId: APP_ID,
      appSecret: APP_SECRET,
      basePath: 'https://api.symbl.ai',
    })

    console.log('SDK Initialized')

    const connection = await sdk.startEndpoint({
      endpoint: {
        type: 'pstn',
        phoneNumber: DEFAULT_PHONE_NUMBER,
      },
      insightTypes: ['action_item', 'question'],
      actions: [
        {
          invokeOn: 'stop',
          name: 'sendSummaryEmail',
          parameters: {
            emails: [EMAIL_ADDRESS], // Add valid email addresses to received email
          },
        },
      ],
      data: {
        session: {
          name: 'My Test Meeting',
        },
      },
    })

    const connectionId = connection.connectionId
    console.log('Successfully connected. Connection ID: ', connectionId)
    const scheduleEvent = getScheduleEvent(sdk, connectionId)

    setTimeout(() => {
      // Schedule all the events to be sent.
      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.john, 0)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.john, 5)

      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.mary, 5)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.mary, 15)

      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.john, 15)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.john, 45)

      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.mary, 45)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.mary, 60)
    }, 1000)

    console.log('Subscribing to the live events on the connection.')
    // Subscribe to connection using connectionId.
    // Multiple subscriptions to same connectionId are allowed. It can be useful to get the updates at multiple clients.
    sdk.subscribeToConnection(connectionId, (data) => {
      // console.log(data);
      const {type} = data
      if (type === 'transcript_response') {
        const {payload} = data
        process.stdout.write('Live: ' + payload && payload.content + '\r')
        // console.log('Live: ',payload && payload.content);
      } else if (type === 'message_response') {
        const {messages} = data
        messages.forEach((message) => {
          process.stdout.write('Message: ' + message.payload.content + '\n')
        })
      } else if (type === 'insight_response') {
        const {insights} = data
        insights.forEach((insight) => {
          process.stdout.write(
            `Insight: ${insight.type} - ${insight.text} \n\n`,
          )
        })
      }
    })

    // Scheduling stop endpoint call after 60 seconds
    setTimeout(async () => {
      console.log('Stopping the connection')
      try {
        await sdk.stopEndpoint({
          connectionId: connection.connectionId,
        })
        console.log('Connection stopped.')
        console.log('Summary Info:', connection.summaryInfo)
        console.log('Conversation ID:', connection.conversationId)
      } catch (err) {}
    }, 62 * 1000)
  } catch (e) {}
})()
```

## Running The Example

Create a JavaScript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js`. In the terminal, run the following command:

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::

