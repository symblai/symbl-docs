---
id: transcribing-live-audio-through-microphone
title: Transcribing Live Audio Input through Microphone (Beta)
sidebar_label: Transcribing Live Audio Input through Microphone

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

As a simple test of the Streaming API you can simply setup a live microphone and push the audio stream using the browser APIs to access the microphone.

Initialize the SDK and connect via the built-in websocket connector. This will output the live transcription to the console.

:::note 
The `symbl.startRealtimeRequest` function creates a new AudioContext, so the call must be made on user interaction, such as a button click.
:::

```js
symbl.init({
	appId: '<your App ID>',
	appSecret: '<your App Secret>',
	// accessToken: '<your Access Token>', // can be used instead of appId and appSecret
	// basePath: '<your custom base path (optional)>',
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
		// sampleRateHertz: 48000
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
	const connection = await symbl.startRealtimeRequest(connectionConfig, true);
})();
```

Read more about the supported Event Handlers:

&nbsp; &nbsp; 👉 &nbsp; [onSpeechDetected](/docs/javascript-sdk/reference#onspeechdetected) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onMessageResponse](/docs/javascript-sdk/reference#onmessageresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onInsightResponse](/docs/javascript-sdk/reference#oninsightresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onTopicResponse](/docs/javascript-sdk/reference#ontopicresponse)

