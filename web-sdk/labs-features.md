---
id: web-sdk-labs
title: Web SDK (Labs)
sidebar_label: Labs Features

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---


You can use labs features by setting your basePath in the init call to `https://api-labs.symbl.ai`.

## New Configurations

| Parameter | Required | Description |
| -------| ---------- | --------- |
|`disconnectonOnStopRequest` | Optional, default: true | If set to `false` the WebSocket will be set to a non-processing state if the `stop_request` event is set. In this state, the connection can be re-opened if the `start_request` event is sent. If `true` the WebSocket connection will close as normal.
|`disconnectOnStopRequestTimeout` | Optional | Accepts a value of 0 to 1800 seconds. Indicates how long this connection will remain in a non-processing state before timing out. |
|`noConnectionTimeout` | Optional | Accepts a value of 0 to 1800 seconds. Indicates how long a connection will remain active even when no one is connected. By using the same connectionId anyone can reconnect to this WebSocket before it times out completely.|
|`sourceNode` | Optional, default: null | For passing in an external `MediaStreamAudioSourceNode` object. By default the Web SDK will handle audio context and source nodes on it's own, though if you wish to handle that externally we've provided that option.|
|`config.encoding` | Optional, default: 'linear16' | Accepts either 'opus' or 'linear16'. For linear16, you must set the sampleRateHertz option. For opus the sampleRateHertz should always be 48000. |
| `handlers.ondevicechange` | Optional | By default Symbl Web SDK will provide the ondevicehandler logic, which just takes the new device and sends the sample rate over to our servers. If you wish to override this logic you can do so by passing an ondevicechange function into the handlers section of the config. You can assign a function to symbl.deviceChanged as a callback to when the event is fired.
| `reconnectOnError` | Optional, default: true | If true the Web SDK will attempt to reconnect to the WebSocket in case of error.

### Example

```js
const id = btoa("symbl-ai-is-the-best");

const connectionConfig = {
	id,
	insightTypes: ['action_item', 'question'],
	disonnectOnStopRequest: false,
	disconnectOnStopRequestTimeout: 300,
	noConnectionTimeout: 300,
	sourceNode: sourceNode,
	reconnectOnError: true,
	config {
		encoding: 'opus',
		sampleRateHertz: 48000
	},
	handlers: {
		ondevicechange: () => {
			alert('device changed!');
		},
		...
	}
	...
}

...

// Creates the WebSocket in a non-processing state
const stream = await symbl.createStream(connectionConfig);

// Send the start request
await symbl.unmute(stream);
```

### Using createStream to start a Realtime Request
Creating a stream using `symbl.startRealtimeRequest(config)` has been deprecated in favor of `symbl.createStream(config)`. For `createStream`, the WebSocket is started in a non processing state. You must send the start request before processing any audio.

The `createStream` function returns a stream object. In order to start the connection you can call `symbl.unmute(stream)`. Unmute will send the start request and start the audio streaming.

### Using Mute/Unmute to Pause a Connection
If you set the `disconnectOnStopRequest` flag to false you can use `symbl.mute(stream)` and `symbl.unmute(stream)` to suspend and resume the connection. Muting the connection makes it so you're not being billed during times of silence.

#### unmute(stream)
Receive the stream received from createStream as argument. Unmutes the audio by setting gain value to 1. If disconnectOnStopRequest config is set to false the start request will be sent to the Websocket and the audio context will start.

##### mute(stream)
Receive the stream received from createStream as argument. Mutes the audio by setting gain value to 0. If disconnectOnStopRequest config is set to false the stop will be sent to the Websocket and the audio context will be suspended.

### Use disconnectOnStopRequest to Pause and Resume a Stream
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
	disconnectOnStopRequest: false,
	disconnectOnStopRequestTimeout: 300,
	noConnectionTimeout: 300,
	config: {
		meetingTitle: 'My Test Meeting ' + id,
		confidenceThreshold: 0.7,
		timezoneOffset: 480, // Offset in minutes from UTC
		languageCode: 'en-US',
		encoding: 'opus',
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
	await symbl.unmute(stream);

	// Suspend the stream after 10 seconds
	window.setTimeout(() => {
		await symbl.mute(stream);
	}, 10000)

	// Re-send the start request to resume the stream after another 10 seconds
	window.setTimeout(() => {
		await symbl.unmute(stream);
	}, 10000)
})();

```