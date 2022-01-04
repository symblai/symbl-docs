---
id: web-sdk-reference
title: Web SDK Reference
slug: /web-sdk/web-sdk-reference
sidebar_label: Web SDK Reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Public Methods
 
### init
 
```init (String appId, String appSecret)```
 
Authenticates with the Symbl API using the provided authentication credentials.
 
#### Parameters
 
Name | Description
-----|------------
`appId` | The Symbl Application ID you get from the [Symbl Platform](https://platform.symbl.ai)
`appSecret` | The Symbl Application Secret Token you get from the [Symbl Platform](https://platform.symbl.ai)
`basePath` | The base path of the endpoint. By default it is `https://api.symbl.ai`.
`accessToken` | The Symbl authentication Token you get from your `appId` and `appSecret`. This is an optional parameter you can use to authenticate using auth Token rather than the App ID and App Secret. See sample code [here](/docs/javascript-sdk/introduction#authenticate-using-token). 
 
#### Returns
 
A Promise which is resolved once the API is connected and authenticated with Symbl.
 
#### Code Example
 
```js
sdk.init({
 // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
 appId: APP_ID,
 appSecret: APP_SECRET,
 basePath: 'https://api.symbl.ai'
})
.then(() => console.log('SDK Initialized.'))
.catch(err => console.error('Error in initialization.', err));
```
### startRealtimeRequest
 
```startRealtimeRequest (<Streaming API Configuration Object> options)```
 
Connects to a [Streaming API](/docs/streamingapi/overview/introduction) Web Socket endpoint using the provided configuration options.
 
#### Parameters
 
Name | Description
-----|------------
`options` | Options specified for the [Streaming API Configuration Object](https://docs.symbl.ai/docs/streaming-api/api-reference#request-parameters).
 
#### Returns
 
A Promise which is resolved once real-time request has been established.
 
## Event Handlers
 
When connecting using [`startRealtimeRequest`](#startRealtimeRequest), you can pass various handlers in the configuration options which be called if the specific event attached to the handler is fired.
 
#### Code Example
 
```js
handlers: {
 /**
  * This will return live speech-to-text transcription of the call.
  */
 onSpeechDetected: (data) => {
   console.log(JSON.stringify(data))
   if (data) {
     const {punctuated} = data
     console.log('Live: ', punctuated && punctuated.transcript)
   }
 },
 /**
  * When processed messages are available, this callback will be called.
  */
 onMessageResponse: (data) => {
   console.log('onMessageResponse', JSON.stringify(data, null, 2))
 },
 /**
  * When Symbl detects an insight, this callback will be called.
  */
 onInsightResponse: (data) => {
   console.log('onInsightResponse', JSON.stringify(data, null, 2))
 },
 /**
  * When Symbl detects a topic, this callback will be called.
  */
 onTopicResponse: (data) => {
   console.log('onTopicResponse', JSON.stringify(data, null, 2))
 }
}
```
 
### onSpeechDetected
 
To retrieve the real-time transcription results as soon as they are detected. You can use this callback to render live transcription which is specific to the speaker of this audio stream.
 
#### onSpeechDetected JSON Response Example
 
```js
{
 "type": "recognition_result",
 "isFinal": true,
 "payload": {
   "raw": {
     "alternatives": [{
       "words": [{
         "word": "Hello",
         "startTime": {
           "seconds": "3",
           "nanos": "800000000"
         },
         "endTime": {
           "seconds": "4",
           "nanos": "200000000"
         }
       }, {
         "word": "world.",
         "startTime": {
           "seconds": "4",
           "nanos": "200000000"
         },
         "endTime": {
           "seconds": "4",
           "nanos": "800000000"
         }
       }],
       "transcript": "Hello world.",
       "confidence": 0.9128385782241821
     }]
   }
 },
 "punctuated": {
   "transcript": "Hello world."
 },
 "user": {
   "userId": "emailAddress",
   "name": "John Doe",
   "id": "23681108-355b-4fc3-9d94-ed47dd39fa56"
 }
}
```
 
### onMessageResponse
 
This callback function contains the "finalized" transcription data for this speaker and if used with multiple streams with other speakers this callback would also provide their messages.
 
The "finalized" messages mean that the automatic speech recognition has finalized the state of this part of transcription and has declared it "final". Therefore, this transcription will be more accurate than [`onSpeechDetected`](#onspeechdetected).
 
#### onMessageResponse JSON Response Example
 
```js
[{
 "from": {
   "id": "0a7a36b1-047d-4d8c-8958-910317ed9edc",
   "name": "John Doe",
   "userId": "emailAddress"
 },
 "payload": {
   "content": "Hello world.",
   "contentType": "text/plain"
 },
 "id": "59c224c2-54c5-4762-9582-961bf250b478",
 "channel": {
   "id": "realtime-api"
 },
 "metadata": {
   "disablePunctuation": true,
   "timezoneOffset": 480,
   "originalContent": "Hello world.",
   "words": "[{\"word\":\"Hello\",\"startTime\":\"2021-02-04T20:34:59.029Z\",\"endTime\":\"2021-02-04T20:34:59.429Z\"},{\"word\":\"world.\",\"startTime\":\"2021-02-04T20:34:59.429Z\",\"endTime\":\"2021-02-04T20:35:00.029Z\"}]",
   "originalMessageId": "59c224c2-54c5-4762-9582-961bf250b478"
 },
 "dismissed": false,
 "duration": {
   "startTime": "2021-02-04T20:34:59.029Z",
   "endTime": "2021-02-04T20:35:00.029Z"
 }
}]
```
 
### onInsightResponse
 
This callback provides you with any of the detected insights in real-time as they are detected. As with the [`onMessageCallback`](#onmessagecallback) this would also return every speaker's insights in case of multiple streams.
 
#### onInsightResponse JSON Response Example
 
```json
[{
 "id": "94020eb9-b688-4d56-945c-a7e5282258cc",
 "confidence": 0.9909798145016999,
 "messageReference": {
   "id": "94020eb9-b688-4d56-945c-a7e5282258cc"
 },
 "hints": [{
   "key": "informationScore",
   "value": "0.9782608695652174"
 }, {
   "key": "confidenceScore",
   "value": "0.9999962500210938"
 }, {
   "key": "comprehensionScore",
   "value": "0.9983848333358765"
 }],
 "type": "action_item",
 "assignee": {
   "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
   "name": "John Doe",
   "userId": "emailAddress"
 },
 "dueBy": {
   "value": "2021-02-05T00:00:00-07:00"
 },
 "tags": [{
   "type": "date",
   "text": "today",
   "beginOffset": 39,
   "value": {
     "value": {
       "datetime": "2021-02-05"
     }
   }
 }, {
   "type": "person",
   "text": "John Doe",
   "beginOffset": 8,
   "value": {
     "value": {
       "name": "John Doe",
       "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
       "assignee": true,
       "userId": "emailAddress"
     }
   }
 }],
 "dismissed": false,
 "payload": {
   "content": "Perhaps John Doe can submit the report today.",
   "contentType": "text/plain"
 },
 "from": {
   "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
   "name": "John Doe",
   "userId": "emailAddress"
 }
}]
```
 
### onTopicResponse
 
This callback provides you with any of the detected topics in real-time as they are detected.  As with the [`onMessageCallback`](#onmessagecallback) this would also return every topic in case of multiple streams.
 
#### onTopicResponse JSON Response Example
 
```json
[{
 "id": "e69a5556-6729-11eb-ab14-2aee2deabb1b",
 "messageReferences": [{
   "id": "0df44422-0248-47e9-8814-e87f63404f2c",
   "relation": "text instance"
 }],
 "phrases": "auto insurance",
 "rootWords": [{
   "text": "auto"
 }],
 "score": 0.9,
 "type": "topic"
}]
```

### onTrackerResponse (trackers)

This callback provides you with any of the detected trackers in real-time as they are detected. As with the onMessageCallback this would also return every tracker in case of multiple streams. 

#### onTopicResponse JSON Response Example

```json
{
  "type": "tracker_response",
  "isFinal": true,
  "trackers": [
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "This is awesome",
          "messageRefs": [
            {
              "id": "fa93aa64-0e8d-4697-bb52-e2916ca63192",
              "text": "This is awesome.",
              "offset": 0
            }
          ],
          "insightRefs": []
        },
        {
          "type": "vocabulary",
          "value": "Hello world",
          "messageRefs": [
            {
              "id": "8e720656-fed7-4b11-b359-3931c53bbcec",
              "text": "Hello world.",
              "offset": 0
            }
          ],
          "insightRefs": []
        }
      ]
    },
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "I like it",
          "messageRefs": [
            {
              "id": "193dc144-2b55-4214-b211-ab83bd3e4a2e",
              "text": "I love it.",
              "offset": -1
            }
          ],
          "insightRefs": []
        }
      ]
    }
  ],
  "sequenceNumber": 1
}
```
### onRequestError(err)

Fires when the WebSocket has an error.

### onConversationCompleted(message)	

Fires when the `conversation_completed` event is recieved from the WebSocket.

### onReconnectFail(err)	

Fires when the reconnection attempt fails. Related to the `reconnectOnError` config.

### onStartedListening(message)	

Fires when the `started_listening` event is received from the WebSocket.

### onRequestStart(message)	

Fires when the `recognition_started` event is received from the WebSocket. 

### onRequestStop(message)	

Fires when the `recognition_stopped` event is received from the WebSocket.

### onClose(event)	

Fires when the WebSocket connection closes for any reason.


