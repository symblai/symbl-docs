---
id: connect-to-endpoints
title: Connect to Endpoints
sidebar_label: Connect to Endpoints
slug: /javascript-sdk/code-snippets/connect-to-endpoints/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The code snippet below dials in using PSTN and hangs up after 60 seconds.

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
const {
  sdk
} = require('@symblai/symbl-js');

sdk.init({
  // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
  appId:  APP_ID,
  appSecret: APP_SECRET,
  basePath: 'https://api.symbl.ai'
}).then(() => {
  sdk.startEndpoint({
    endpoint: {
      type: 'pstn', // This can be pstn or sip
      phoneNumber: PHONE_NUMBER,  // Use international code.
      dtmf: DTMF_MEETING_ID  // if password protected, use "dtmf": "<meeting_id>#,#<password>#"
    }
  }).then(connection => {
    console.log('Successfully connected.', connection.connectionId);

    // Scheduling stop endpoint call after 60 seconds for demonstration purposes
    // In real adoption, sdk.stopEndpoint() should be called when the meeting or call actually ends

    setTimeout(() => {
      sdk.stopEndpoint({
        connectionId: connection.connectionId
      }).then(() => {
        console.log('Stopped the connection');
        console.log('Summary Info:', connection.summaryInfo);
        console.log('Conversation ID:', connection.conversationId);
      }).catch(err => console.error('Error while stopping the connection', err));
    }, 60000);
  }).catch(err => console.error('Error while starting the connection', err));
}).catch(err => console.error('Error in SDK initialization.', err));
```
</TabItem>
</Tabs>

We recommend using SIP whenever possible instead of PSTN as it provides higher audio quality options as compared to PSTN. SIP endpoint provides an optional audio configuration as well.

### Testing

Create a javascript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: `npm install @symblai/symbl-js`. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::

