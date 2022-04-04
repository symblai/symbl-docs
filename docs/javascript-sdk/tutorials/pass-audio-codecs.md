---
id: pass-audio-codecs
title: How To Pass Different Audio Codecs To Symbl Endpoint
slug: /javascript-sdk/tutorials/pass-audio-codecs/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Sometimes you need to pass different audio codecs when passing the audio. This
example shows how to pass them. The codecs currently supported are:

    [OPUS](https://opus-codec.org/):
      - Supported Sample Rates -- 16000Hz, 24000Hz,48000Hz
      - Both CBR (Constant Bitrate) and VBR (Variable Bitrate) are supported
      - Support for in-band FEC

    [SPEEX](https://www.speex.org/):
      - Supported Sample Rates -- 16000Hz
      - VBR is not supported

    [LINEAR16](https://tools.ietf.org/html/rfc2586)
      - Supported Sample Rates -- 44100Hz

    [MULAW](https://en.wikipedia.org/wiki/G.711#%CE%BC-law)
      - Supported Sample Rates -- 8000Hz

:::info
We recommend using OPUS as compared to other codecs because it provides
the most flexibility in terms of audio transportation and also has packet
retransmission mechanisms like FEC which work well, especially in low-bandwidth
scenarios.
:::


Throughout the documentation you'll find various references to these variable names, which you will have to replace with your values:

Key  | Description
---------- | -------
```APP_ID``` | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Sybml.
```DEFAULT_PHONE_NUMBER``` | A phone number that you want the API to connect to. Be sure to include the country code.
```EMAIL_ADDRESS``` | The email address you wish to send the summary email to.

[View on Github](https://github.com/symblai/getting-started-samples/tree/master/examples/voice-sdk/telephony-custom-audio-config)

## Getting started

This example runs on node server, so we will use `@symblai/symbl-js` package.


```javascript
const {sdk} = require('@symblai/symbl-js');
```

### Initialize the SDK

Let's start by initialising `@symblai/symbl-js` sdk


```javascript
await sdk.init({
  appId: APP_ID,
  appSecret: APP_SECRET,
  basePath: 'https://api.symbl.ai'
});
```

### Connect to Endpoint

Now after we initialized, we need to start the connection by running


```javascript
const connection = await sdk.startEndpoint(endpointConfig);
```

### Set Up Configuration Options


So how do you pass custom codecs? It's as simple as passing custom audio config


```javascript
endpoint: {
  //*****************Custom Audio Config******************
  audioConfig: {
    encoding: 'OPUS',
    sampleRate: 16000,
  },
  //******************************************************
  type: 'pstn',
  phoneNumber: DEFAULT_PHONE_NUMBER,
},
```

If you have a requirement to use a codec not included in the ones above or have any other queries, please drop an e-mail to support@symbl.ai.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::

## Full Code Example

```js
/*
 * This example shows how to pass in different Audio Codecs. The ones currently supported are
 *   OPUS:
 *     * Supported Sample Rates -- 16000Hz, 24000Hz, 48000Hz
 *     * Both CBR (Constant Bitrate) and VBR (Variable Bitrate) are supported
 *     * Support for in-band FEC
 *
 *   SPEEX:
 *     * Supported Sample Rates -- 16000Hz
 *     * VBR is not supported
 *
 *   LINEAR16:
 *     * Supported Sample Rates -- 44100Hz
 *
 *   MULAW:
 *     * Supported Sample Rates -- 8000Hz
 *
 *   NOTE: We recommend using OPUS as compared to other codecs because it provides the most flexibility in terms of
 *         audio transportation and also has packet retransmission mechanisms like FEC which work well especially
 *         in low-bandwidth scenarios.
 *
 *   If you have a requirement to use a codec not included in the ones above or have any other queries,
 *   please drop an e-mail to support@symbl.ai
 */
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
    userId: 'John@example.com',
    name: 'John',
  },
  mary: {
    userId: 'mary@example.com',
    name: 'Mary',
  },
  tim: {
    userId: 'tim@example.com',
    name: 'Tim',
  },
  jennifer: {
    userId: 'jennifer@example.com',
    name: 'Jennifer',
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

    const connection = await sdk.startEndpoint({
      endpoint: {
        //*****************Custom Audio Config******************
        audioConfig: {
          encoding: 'OPUS',
          sampleRate: 16000,
        },
        //******************************************************
        type: 'pstn',
        phoneNumber: DEFAULT_PHONE_NUMBER,
      },
      actions: [
        {
          invokeOn: 'stop',
          name: 'sendSummaryEmail',
          parameters: {
            emails: ['vladimir.novick@symbl.ai'],
          },
        },
      ],
      data: {
        session: {
          name: 'Ship-wide nanomachines, to the center.',
        },
      },
    })
    const connectionId = connection.connectionId
    console.log('Successfully connected.', connectionId)

    const scheduleEvent = getScheduleEvent(sdk, connectionId)

    setTimeout(() => {
      // This is just for interactive purpose was to show the elapsed time.

      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.john, 0)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.john, 4)

      scheduleEvent(SpeakerEvent.types.startedSpeaking, users.mary, 4)
      scheduleEvent(SpeakerEvent.types.stoppedSpeaking, users.mary, 9)

      // Scheduling stop endpoint call after 60 seconds
      setTimeout(() => {
        console.log('stopping connection ' + connection.connectionId)
        sdk
          .stopEndpoint({
            connectionId,
          })
          .then(() => {
            console.log('Stopped the connection')
          })
          .catch((err) =>
            console.error('Error while stopping the connection.', err),
          )
      }, 10000)
    }, 1000)
  } catch (err) {
    console.error('Error in SDK initialization.', err)
  }
})()
```

## Running The Example

Create a JavaScript file named `app.js` and copy this code into the file. Fill in the placeholder values with the proper values. Use npm to install the required libraries: npm install @symblai/symbl-js. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

:::info
If you have any questions or concerns about our API, you can join our [Support Slack](https://join.slack.com/t/symbldotai/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA) or send us an email at [developer@symbl.ai](mailto:developer@symbl.ai)
:::
