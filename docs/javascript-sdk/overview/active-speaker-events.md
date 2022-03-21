---
id: active-speaker-events
title: Active Speaker Events
sidebar_label: Active Speaker Events
slug: /javascript-sdk/code-snippets/active-speaker-events/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note
Pushing events is optional. If you don't have audio to process, then you can skip this step.
:::

#### How to connect to a PSTN endpoint, create a speakerEvent instance and push events on connection.

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const {
  sdk,
  SpeakerEvent
} = require('@symblai/symbl-js');

sdk.init({
  appId: APP_ID,
  appSecret: APP_SECRET,
  basePath: 'https://api.symbl.ai'
}).then(() => {
  sdk.startEndpoint({
    endpoint: {
      type: 'pstn',
      phoneNumber: 'PHONE_NUMBER', // Use international code.
      dtmf: 'DTMF_MEETING_ID' // if password protected, use "dtmf": "<meeting_id>#,#<password>#"
    }
  }).then(connection => {
    const connectionId = connection.connectionId;
    console.log('Successfully connected.', connectionId);

    const speakerEvent = new SpeakerEvent();
    speakerEvent.type = SpeakerEvent.types.startedSpeaking;
    speakerEvent.user = {
      userId: 'john@example.com',
      name: 'John'
    };
    speakerEvent.timestamp = new Date().toISOString();

    sdk.pushEventOnConnection(
      connectionId,
      speakerEvent.toJSON(),
      (err) => {
        if (err) {
          console.error('Error during push event.', err);
        } else {
          console.log('Event pushed!');
        }
      }
    );

    // Scheduling stop endpoint call after 60 seconds for demonstration purposes
    // In real adoption, sdk.stopEndpoint() should be called when the meeting or call actually ends

    setTimeout(() => {
      sdk.stopEndpoint({
        connectionId: connection.connectionId,
      }).then(() => {
        console.log('Stopped the connection');
        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
      }).catch(err => console.error('Error while stopping the connection.', err));
    }, 60000);
  }).catch(err => console.error('Error while starting the connection', err));

}).catch(err => console.error('Error in SDK initialization.', err));
```

</TabItem>
</Tabs>

:::note
Setting the timestamp for `speakerEvent` is optional but it's recommended to provide accurate timestamps in the events when they occurred to get more precision.
:::

Events can be pushed to an on-going connection to have them processed. The code snippet to the right shows a simple example.

Every event must have a type to define the purpose of the event at a more granular level, usually to indicate different activities associated with the
event resource. For example - A "speaker" event can have type as `started_speaking`. An event may have additional fields specific to the event.

Currently, Symbl only supports the speaker event which is described below.

## Speaker Event

The speaker event is associated with different individual attendees in the meeting or session. An example of a speaker event is shown below.

In the code example the user needs to have a `userId` field to uniquely identify the user.

Speaker Event has the following types:


### started_speaking

This event contains the details of the user who started speaking with the timestamp in ISO 8601 format when he started speaking.

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="nodejs">

```js
const speakerEvent = new SpeakerEvent({
  type: SpeakerEvent.types.startedSpeaking,
  timestamp: new Date().toISOString(),
  user: {
    userId: 'john@example.com',
    name: 'John'
  }
});
```
</TabItem>
<TabItem value="cURL">
</TabItem>
</Tabs>


### stopped_speaking

This event contains the details of the user who stopped speaking with the timestamp in ISO 8601 format when he stopped speaking.
<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="nodejs">

```js

const speakerEvent = new SpeakerEvent({
  type: SpeakerEvent.types.stoppedSpeaking,
  timestamp: new Date().toISOString(),
  user: {
    userId: 'john@example.com',
    name: 'John'
  }
});
```
</TabItem>
<TabItem value="cURL">
</TabItem>
</Tabs>


As shown in the above examples, it's okay to reuse the same `speakerEvent` instance per user, by changing the event's type to optimize by reducing the number of instances for `SpeakerEvent`.

A `startedSpeaking` event is pushed on the on-going connection. You can use `pushEventOnConnection()` method from the SDK to push the events.
