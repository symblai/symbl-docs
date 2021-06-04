---
id: complete-example
title: Complete Example
sidebar_label: Complete Example
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';


<Redirect to="/docs/javascript-sdk/overview/introduction" />


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
} = require('symbl-node');

sdk.init({
  // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
  appId: 'APP_ID',
  appSecret: 'APP_SECRET',
  basePath: 'https://api.symbl.ai'
}).then(() => {

  console.log('SDK Initialized');
  sdk.startEndpoint({
    endpoint: {
      type: 'pstn',
      phoneNumber: 'PHONE_NUMBER',  // Use international code.
      dtmf: 'DTMF_MEETING_ID'  // if password protected, use "dtmf": "<meeting_id>#,#<password>#"
    }
  }).then(connection => {

    const connectionId = connection.connectionId;
    console.log('Successfully connected.', connectionId);
    const speakerEvent = new SpeakerEvent({
      type: SpeakerEvent.types.startedSpeaking,
      user: {
        userId: 'john@example.com',
        name: 'John'
      }
    });

    setTimeout(() => {
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
    }, 2000);

    setTimeout(() => {
      speakerEvent.type = SpeakerEvent.types.stoppedSpeaking;
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
    }, 12000);

    // Scheduling stop endpoint call after 60 seconds
    setTimeout(() => {
      sdk.stopEndpoint({
        connectionId: connection.connectionId
      }).then(() => {
        console.log('Stopped the connection');
        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
      }).catch(err => console.error('Error while stopping the connection.', err));
    }, 90000);

  }).catch(err => console.error('Error while starting the connection', err));

}).catch(err => console.error('Error in SDK initialization.', err));
```

</TabItem>
<TabItem value="cURL">
</TabItem>
</Tabs>

#### Below is a quick simulated speaker event example that:

1. Initializes the SDK.
2. Initiates a connection with an endpoint
3. Sends a speaker event of type `startedSpeaking` for user John
4. Sends a speaker event of type `stoppedSpeaking` for user John
5. Ends the connection with the endpoint

Strictly for illustration and understanding purposes, the code below pushes events by simply using `setTimeout()` method periodically, but
in real usage they should be pushed as they occur.

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
} = require('symbl-node');

sdk.init({
  // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
  appId: 'APP_ID',
  appSecret: 'APP_SECRET',
  basePath: 'https://api.symbl.ai'
}).then(() => {
  console.log('SDK Initialized');
  sdk.startEndpoint({
    endpoint: {
      type: 'pstn',
      phoneNumber: 'PHONE_NUMBER',  // Use international code.
      dtmf: 'DTMF_MEETING_ID'  // if password protected, use "dtmf": "<meeting_id>#,#<password>#"
    },
    actions: [{
      "invokeOn": "stop",
      "name": "sendSummaryEmail",
      "parameters": {
        "emails": [
          "EMAIL_ADDRESS"
        ]
      }
    }],
    data: {
      session: {
        name: 'My Meeting Name' // Title of the Meeting
      },
      users: [{
          user: {
            name: "John",
            userId: "john@example.com",
            role: "organizer"
          }
        },
        {
          user: {
            name: "Mary",
            userId: "mary@example.com"
          }
        },
        {
          user: {
            name: "John",
            userId: "jennifer@example.com"
          }
        }
      ]
    }
  }).then((connection) => {
    console.log('Successfully connected.');

    // Events pushed in between
    setTimeout(() => {
      // After successful stop endpoint, an email with summary will be sent to "john@example.com" and "jane@example.com"
      sdk.stopEndpoint({
        connectionId: connection.connectionId
      }).then(() => {
        console.log('Stopped the connection');
        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
      }).catch(err => console.error('Error while stopping the connection.', err));
    }, 30000);

  }).catch(err => console.error('Error while starting the connection', err));

}).catch(err => console.error('Error in SDK initialization.', err));
```
</TabItem>
<TabItem value="cURL">
</TabItem>
</Tabs>
