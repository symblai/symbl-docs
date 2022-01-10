---
id: receive-trackers-in-spanish
title: Receive Trackers in Spanish (Labs)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

This tutorial goes over how you can use the Streaming API to receive Trackers of a conversation in the Spanish language. This example uses native JavaScript.

:::note
Currently, we only support the English and Spanish language in Trackers for Streaming & Async API. Please feel free to reach out to us at support@symbl.ai for any queries.
:::

## Prerequisite
- **API Credentials**: You must have your Symbl API App ID and Secret. To grab your API Credentials, follow these steps given in the [Authentication](/docs/developer-tools/authentication) section. 

## Step 1: Define Spanish language in the Start Request Config
---

When you're connecting to the [WebSocket](/docs/concepts/websockets) with Streaming API, you can define which language you wish to use in the `start_request` configuration. 

For the Spanish language, we will set the `languageCode` key to Spanish (`es-ES`) in the `config` object as shown below:

### Config 

```js
config: {
        meetingTitle: "Spanish Trackers",
        confidenceThreshold: 0.8,
        timezoneOffset: 480,                        // Offset in minutes from UTC
        languageCode: "es-ES",                      //Spanish language code
        sampleRateHertz,
        trackers: {
            interimResults: true
        }
    },
``` 

You can view the complete list of all the supported parameters passed in the configuration object [here](/docs/streaming-api/code-snippets/consume-trackers-with-streaming-api#parameter-description).

## Step 2: Pass Tracker object in Spanish 
---

Now, define the keywords and phrases you wish to track in the `trackers` object as shown in the code snippet below. 

You must then pass these Spanish Trackers in the Streaming API request to receive tracked messages in Spanish. 

```js
// Spanish Trackers
   trackers: [
       {
           name: 'deseos',
           vocabulary: [
               "Hasta luego",
               "Muchas gracias y que eres increíble",
               "Gracias",
               "Bueno",
               "Realmente lindo",
               "Ese fue uno de los más",
               "De acuerdo, gracias",
               "Así que, a la inversa, gracias por estar presente",
           ],
       }, {
           name: 'dificil',
           vocabulary: [
               'Sí, no me amo por completo en este momento y creo que hay mucho trabajo por hacer y estoy luchando',
               'Sé que estás pasando por tu propia pequeña lucha',
               'He tenido otras luchas más grandes en la vida porque el módulo de ahí arriba, mantén la vida en la parte inferior del cuerpo',
               'Los problemas son luchas internas',
           ]
       }, {
           name: 'dinero',
           vocabulary: [
               "Si alguien te quita todo lo que quieres hoy, todo tu dinero, tu casa, y te pone en camino",
               "Ahora, sea lo que sea, poseo más de la mitad del dinero",
               "Tengo dinero",
           ]
       },
      ],
```

### Full Code Snippet
View the full-code snippet for getting Trackers in Spanish with Streaming API below: 

:::note 
In the sample below, we have generated the Spanish Trackers using our JavaScript SDK. 
:::

```js
const { sdk } = require('@symblai/symbl-js')
const uuid = require('uuid').v4
// In this example, we are using mic to get audio from the microphone and passing it on to the WebSocket connection.
const mic = require('mic')
const sampleRateHertz = 16000
const micInstance = mic({
   rate: sampleRateHertz,
   channels: '1',
   debug: false,
   exitOnSilence: 6,
});
(async () => {
   try {
       // Initialize the SDK
       await sdk.init({
           appId: appId,
           appSecret: appSecret,
           basePath: 'https://api-labs.symbl.ai',
       })
       // Add your unique ID here
       const id = uuid()
       const connection = await sdk.startRealtimeRequest({
           id,
           insightTypes: ['action_item', 'question'],
           customVocabulary: ['John', 'Symbl'],            // Custom Vocabulary
           noConnectionTimeout: 100,                       //No Connection Timeout
           // This shows the Spanish Trackers
           trackers: [
               {
                   name: 'deseos',
                   vocabulary: [
                       "Hasta luego",
                       "Muchas gracias y que eres increíble",
                       "Gracias",
                       "Bueno",
                       "Realmente lindo",
                       "Ese fue uno de los más",
                       "De acuerdo, gracias",
                       "Así que, a la inversa, gracias por estar presente",
                   ],
               }, {
                   name: 'dificil',
                   vocabulary: [
                       'Sí, no me amo por completo en este momento y creo que hay mucho trabajo por hacer y estoy luchando',
                       'Sé que estás pasando por tu propia pequeña lucha',
                       'He tenido otras luchas más grandes en la vida porque el módulo de ahí arriba, mantén la vida en la parte inferior del cuerpo',
                       'Los problemas son luchas internas',
                   ]
               }, {
                   name: 'dinero',
                   vocabulary: [
                       "Si alguien te quita todo lo que quieres hoy, todo tu dinero, tu casa, y te pone en camino",
                       "Ahora, sea lo que sea, poseo más de la mitad del dinero",
                       "Tengo dinero",
                   ]
               },
               {
                   name: "covid",
                   vocabulary: [
                       "wear mask",
                       "coughing",
                       "fever",
                       "cold",
                       "trouble breathing"
                   ]
               }
           ],
           config: {
               meetingTitle: "Spanish Trackers",
               confidenceThreshold: 0.8,
               timezoneOffset: 480,                        // Offset in minutes from UTC
               languageCode: "es-ES",                      //Spanish language code
               sampleRateHertz,
               trackers: {
                   interimResults: true
               }
           },
           speaker: {
               // Optional, if not specified, will simply not send an email in the end.
               userId: "john@example.com", // Update with valid email
               name: "John",
           },
           handlers: {
               onSpeechDetected: (data) => {
                   if (data) {
                       const { punctuated } = data
                       console.log('Live: ', punctuated && punctuated.transcript)
                       console.log('');
                   }
                   console.log('onSpeechDetected ', JSON.stringify(data, null, 2));
               },
               onMessageResponse: (data) => {
                   console.log('onMessageResponse', JSON.stringify(data, null, 2))
               },
               onInsightResponse: (data) => {
                   console.log('onInsightResponse', JSON.stringify(data, null, 2))
               },
               onTopicResponse: (data) => {
                   console.log('onTopicResponse', JSON.stringify(data, null, 2))
               },
               onTrackerResponse: (data) => {
                   console.log('onTrackerResponse', JSON.stringify(data, null, 2))
               },
               onTrackerResponse: (data) => {
                   // When a tracker is detected in real-time
                   console.log('onTrackerResponse', JSON.stringify(data, null, 2));
                   if (!!data) {
                       data.forEach((tracker) => {
                           console.log(`Detected Tracker Name: ${tracker.name}`);
                           console.log(`Detected Matches`);
                           tracker.matches.forEach((match) => {
                               console.log(`Tracker Value: ${match.value}`);
                               console.log(`Messages detected against this Tracker`);
                               match.messageRefs.forEach((messageRef) => {
                                   console.log(`Message ID: ${messageRef.id}`);
                                   console.log(`Message text for which the match was detected: ${messageRef.text}`);
                                   console.log(`\n`);
                               });
                               console.log(`\n\n`);
                               console.log(`Insights detected against this Tracker`);
                               match.messageRefs.forEach((insightRef) => {
                                   console.log(`Insight ID: ${insightRef.id}`);
                                   console.log(`Insight text for which the match was detected: ${insightRef.text}`);
                                   console.log(`Insight Type: ${insightRef.type}`);
                                   console.log(`\n`);
                               });
                               console.log(`\n\n`);
                           });
                       });
                   }
               },
           },
       });
       console.log('Successfully connected. Conversation ID: ', connection.conversationId);
       const micInputStream = micInstance.getAudioStream()
       /** Raw audio stream */
       micInputStream.on('data', (data) => {
           // Push audio from Microphone to websocket connection
           connection.sendAudio(data)
       })
       micInputStream.on('error', function (err) {
           console.log('Error in Input Stream: ' + err)
       })
       micInputStream.on('startComplete', function () {
           console.log('Started listening to Microphone.')
       })
       micInputStream.on('silence', function () {
           console.log('Got SIGNAL silence')
       })
       micInstance.start()
       setTimeout(async () => {
           // Stop listening to microphone
           micInstance.stop()
           console.log('Stopped listening to Microphone.')
           try {
               // Stop connection
               await connection.stop()
               console.log('Connection Stopped.')
           } catch (e) {
               console.error('Error while stopping the connection.', e)
           }
       }, 60 * 1000) // Stop connection after 1 minute i.e. 60 secs
   } catch (e) {
       console.error('Error: ', e)
   }
})();
```

### Connect Mic
After you connect, you want to connect to your device's microphone. This code is inserted after the `connection` and before the closing of the `try...catch`

```js
const micInputStream = micInstance.getAudioStream()
/** Raw audio stream */
micInputStream.on('data', (data) => {
  // Push audio from Microphone to websocket connection
  connection.sendAudio(data)
})

micInputStream.on('error', function (err) {
  console.log('Error in Input Stream: ' + err)
})

micInputStream.on('startComplete', function () {
  console.log('Started listening to Microphone.')
})

micInputStream.on('silence', function () {
  console.log('Got SIGNAL silence')
})

micInstance.start()

setTimeout(async () => {
  // Stop listening to microphone
  micInstance.stop()
  console.log('Stopped listening to Microphone.')
  try {
    // Stop connection
    await connection.stop()
    console.log('Connection Stopped.')
  } catch (e) {
    console.error('Error while stopping the connection.', e)
  }
}, 60 * 1000) // Stop connection after 1 minute i.e. 60 secs
```

### Testing

If you want to know that you have connected the mic, run the following commands:

1. Create a JavaScript file named `app.js`
2. Copy the above [code](#connect-mic) into the file.
3. Replace the placeholder values with the values that you must use. 
4. Use `npm` to install the required libraries

```bash
$ npm install symbl-node uuid
```
5. Now in the terminal run

```bash
$ node app.js
```

If successful you should receive a response in the console.

### Handlers Reference (Symbl SDK)

Read more about the supported Event Handlers in the following sections:

👉   [onSpeechDetected](/docs/javascript-sdk/reference/#onspeechdetected) <br/>
👉   [onMessageResponse](/docs/javascript-sdk/reference/#onmessageresponse) <br/>
👉   [onInsightResponse](/docs/javascript-sdk/reference/#oninsightresponse) <br/>
👉   [onTopicResponse](/docs/javascript-sdk/reference/#ontopicresponse) <br/>