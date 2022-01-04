---
id: transcribing-live-audio-through-microphone
title: Transcribing Live Audio through Microphone (Beta)
sidebar_label: Transcribing Live Audio through Microphone
slug: /web-sdk/transcribing-live-audio-through-microphone
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

As a simple test of the Streaming API you can simply setup a live microphone and push the audio stream using the browser APIs to access the microphone.
 
Initialize the SDK and connect via the built-in websocket connector. This will output the live transcription to the console.
 
### Initialize the SDK
 
```js
symbl.init({
   appId: '<your App ID>',
   appSecret: '<your App Secret>',
   // accessToken: '<your Access Token>', // can be used instead of appId and appSecret
   // basePath: '<your custom base path (optional)>',
});
```
 
You can get the `appId` and `appSecret` from the [Symbl Platform](https://platform.symbl.ai).
See the steps to get your API Credentials in the [Authentication](/docs/developer-tools/authentication) section.
 
### Start the Connection and pass Configuration Options
 
:::note Using createStream to start a realtime request
Creating a stream using `symbl.startRealtimeRequest(config)` has been deprecated in favor of `symbl.createStream(config)`. For createStream, the WebSocket is started in a non processing state. You must send the start request before processing any audio.

After the stream is created, you need to call `symbl.start(stream)` to start the stream.
:::
 
```js
symbl.init({
	appId: '<your App ID>',
	appSecret: '<your App Secret>',
	// accessToken: '<your Access Token>', // can be used instead of appId and appSecret
	basePath: 'https://api-labs.symbl.ai',
});

const id = btoa("symbl-ai-is-the-best");

const connectionConfig = {
	id,
	insightTypes: ['action_item', 'question'],
	config: {
		meetingTitle: 'My Test Meeting ' + id,
		confidenceThreshold: 0.7,
		timezoneOffset: 480, // Offset in minutes from UTC
		languageCode: 'en-US',
		sampleRateHertz: 48000
	},
	speaker: {
		// Optional, if not specified, will simply not send an email in the end.
		userId: '', // Update with valid email
		name: ''
	},
	handlers: {
		/**
		 * This will return live speech-to-text transcription of the call.
		 */
		onSpeechDetected: (data) => {
		  if (data) {
		    const {punctuated} = data
		    console.log('Live: ', punctuated && punctuated.transcript)
		    console.log('');
		  }
		  // console.log('onSpeechDetected ', JSON.stringify(data, null, 2));
		},
		/**
		 * When processed messages are available, this callback will be called.
		 */
		onMessageResponse: (data) => {
		  // console.log('onMessageResponse', JSON.stringify(data, null, 2))
		},
		/**
		 * When Symbl detects an insight, this callback will be called.
		 */
		onInsightResponse: (data) => {
		  // console.log('onInsightResponse', JSON.stringify(data, null, 2))
		},
		/**
		 * When Symbl detects a topic, this callback will be called.
		 */
		onTopicResponse: (data) => {
		  // console.log('onTopicResponse', JSON.stringify(data, null, 2))
		}
	}
};

(async () => {
	// Creates the WebSocket in a non-processing state
	const stream = await symbl.createStream(connectionConfig);

	// Send the start request
	await stream.start(stream);
})();
```
 
Read more about the supported Event Handlers:
 
&nbsp; &nbsp; 👉 &nbsp; [onSpeechDetected](/docs/web-sdk/web-sdk-reference#onspeechdetected) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onMessageResponse](/docs/web-sdk/web-sdk-reference#onmessageresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onInsightResponse](/docs/web-sdk/web-sdk-reference#oninsightresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onTopicResponse](/docs/web-sdk/web-sdk-reference#ontopicresponse)