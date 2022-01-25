---
id: reconnecting-real-time
title: Reconnecting to a Real-time Connection (Beta)
sidebar_label: Reconnecting to a Real-time Connection
slug: /web-sdk/reconnecting-real-time
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
 
:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

In case a user closes their browser or has an interruption in their WebSocket connection, you can use the `store` object to grab the Connection ID you last used.
 
```js
const id = symbl.store.get('connectionID');

const connectionConfig = {
	id,
	insightTypes: ['action_item', 'question'],
	config: {
		meetingTitle: 'My Test Meeting ' + id,
		confidenceThreshold: 0.7,
		timezoneOffset: 480, // Offset in minutes from UTC
		languageCode: 'en-US',
		sampleRateHertz: 44100
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
:::note Using createStream to start a realtime request
Creating a stream using `symbl.startRealtimeRequest(config)` has been deprecated in favor of `symbl.createStream(config)`. For createStream, the WebSocket is started in a non processing state. You must send the start request before processing any audio.

After the stream is created, you need to call `symbl.start(stream)` to start the stream.
:::

Read more about the supported Event Handlers:
 
&nbsp; &nbsp; 👉 &nbsp; [onSpeechDetected](/docs/web-sdk/web-sdk-reference#onspeechdetected) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onMessageResponse](/docs/web-sdk/web-sdk-reference#onmessageresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onInsightResponse](/docs/web-sdk/web-sdk-reference#oninsightresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onTopicResponse](/docs/web-sdk/web-sdk-reference#ontopicresponse)
