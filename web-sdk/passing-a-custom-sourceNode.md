---
id: passing-custom-sourcenode
title: Passing a custom sourceNode (Beta)
sidebar_label: Passing a custom sourceNode (Beta)
slug: /web-sdk/passing-custom-sourcenode
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

If you wish you can pass in a custom `MediaStreamAudioSourceNode` object to the Web SDK. By default the Web SDK will create the AudioContext and the `MediaStreamAudioSourceNode` object automatically but using this will give you more control over those.

Once you create the `MediaStreamAudioSourceNode` object you can pass it via the `connectionConfig` as sourceNode

```js

// create the MediaStreamAudioSourceNode
const AudioContext = window.AudioContext || window.webkitAudioContext;
stream = await navigator.mediaDevices.getUserMedia({
	audio: true,
	video: false
});
context = new AudioContext();
const sourceNode = context.createMediaStreamSource(stream);

symbl.init({
	appId: '<your App ID>',
	appSecret: '<your App Secret>',
	// accessToken: '<your Access Token>', // can be used instead of appId and appSecret
	basePath: 'https://api-labs.symbl.ai',
});

const id = btoa("my-first-symbl-ai-code");
// pass in the MediaStreamAudioSourceNode as sourceNode
const connectionConfig = {
	id,
	sourceNode,
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

### Updating your external source node

If you wish to update your external source node you can do se by using the `symbl.updateSourceNode` function:

```js
symbl.updateSourceNode(stream, sourceNode);
```


