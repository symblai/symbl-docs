---
id: transcribing-live-audio-through-microphone
title: Transcribing Live Audio through Microphone (Beta)
sidebar_label: Transcribing Live Audio through Microphone

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

To get transcriptions live setup a live microphone and push the audio stream using the browser APIs to access the microphone.

On this page, the following capabilities are explained:

- Connecting, 
- Stopping, 
- Muting, 
- Unmuting and 
- Subscribing. 

:::note 
To see the code for Reconnecting function, go to [Reconnect to existing realtime Connection](/docs/web-sdk/reconnecting-real-time) page. 
:::

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

:::note 
The `symbl.startRealtimeRequest` function creates a new AudioContext, so the call must be made on user interaction, such as a button click.
:::

#### HTML Sample

```html
<html>
<head>
	<script src="https://storage.googleapis.com/symbl-web-sdk/latest/symbl.min.js"></script>
	<style>
​
	</style>
</head>
​
<body>
	<button id="start-connection" onclick="connect()" style="background: yellow;">Connect</button>
	<button id="start-subscription" onclick="subscribe()">Subscribe</button>
	<button id="stopRequest" onclick="stopRequest()">Stop Request</button>
​
	<button id="mute" onclick="mute()">Mute</button>
​
	<button id="unmute" onclick="unmute()">UnMute</button>
	<div>
		<h2>Live transcription: </h2>
		<p id="transcript"></p>
	</div>
​
	<script>
​
		const AudioContext = window.AudioContext || window.webkitAudioContext; <! --- converts the audio of mic to required context ---> 
		const context = new AudioContext();
		const id = btoa("symbl-ai-is-the-best"); <! --- Connection ID, use a unique string value here ---> 
		symbl.logger.setDefaultLevel("debug");
		symbl.init({
			appId: '70584754353278334659563057386b7a58384e336d4c366b31634b4658437a78',
			appSecret: '4f61336d676968455854697a455061325144754b325670314931474a357952664e5541333743626843305f516c6b7765753838324d6350444b74794270537068',
			basePath: 'https://api.symbl.ai' <! --- You can utilize this for Labs API base path ---> 
		});
​
		const transcriptDiv = document.getElementById("transcript");
​
		let stopRequest = () => {return;};
​
		function mute() {
			symbl.mute();
		}
​
		function unmute() {
			symbl.unmute();
		}
​
		async function connect() { <! --- Connect function uses Streaming API parameters ---> 
			console.log('connecting');
			const connectionConfig = {
		      id,
		      insightTypes: ['action_item', 'question'],
		      config: {
		        meetingTitle: 'My Test Meeting',
		        confidenceThreshold: 0.7,
		        timezoneOffset: 480, <! --- Offset in minutes from UTC ---> 
		        languageCode: 'en-US',
				sampleRateHertz: context.sampleRate
		      },
		      speaker: {
		        <! --- Optional, if not specified, will simply not send an email in the end. --->
		        userId: 'john.doe@example.com', <! --- Update with valid email --->
		        name: 'John Doe'
		      },
		      handlers: {
		        <! --- This will return live speech-to-text transcription of the call. --->
		        onSpeechDetected: (data) => {
		          if (data) {
		            const {punctuated} = data
					transcriptDiv.innerText = punctuated && punctuated.transcript;
					console.log("Live: ", punctuated && punctuated.transcript)
		          }
		          // console.log('onSpeechDetected ', JSON.stringify(data, null, 2));
		        },
		        <! --- When processed messages are available, this callback will be called. --->
		        onMessageResponse: (data) => {
		          // console.log('onMessageResponse', JSON.stringify(data, null, 2))
		        },
		        <! --- When Symbl detects an insight, this callback will be called. --->
		        onInsightResponse: (data) => {
		          // console.log('onInsightResponse', JSON.stringify(data, null, 2))
		        },
		       <! --- When Symbl detects a topic, this callback will be called. --->
		        onTopicResponse: (data) => {
		          // console.log('onTopicResponse', JSON.stringify(data, null, 2))
		        }
		      }
		    };
​
		    context.close();
​
			const connection = await symbl.startRealtimeRequest(connectionConfig, true);
​
			const connectionButton = document.getElementById("start-connection")
			connectionButton.innerText = "Connected";
			connectionButton.style.backgroundColor = "green";
​
​        <! --- Send stop request --->

			stopRequest = async () => {
				await symbl.stopRequest(connection);
				connectionButton.innerText = "Connect";
				connectionButton.style.backgroundColor = "yellow";
			}
​
        <! --- Schedule the stop of the client after 2 minutes (120 sec) --->

			setTimeout(()=> {
				stopRequest()
			}, 60000)
		}

<! --- Subscribe allows to connect to a conversation or a meeting in listen-only mode. --->​

		async function subscribe () {
			await symbl.subscribeToStream(id, (data) => {
				console.log('data:', data);
			})
​
			const subscribeButton = document.getElementById("start-subscription");
			subscribeButton.innerText = "Subscribed";
			subscribeButton.style.backgroundColor = "green";
		}
​
	</script>
</body>
</html>
```

### Reference

Read about the Streaming API parameters:

&nbsp; &nbsp; 👉 &nbsp; [insightTypes](/docs/streaming-api/api-reference#main-message-body) <br/>
&nbsp; &nbsp; 👉 &nbsp; [config](/docs/streaming-api/api-reference#config) <br/>
&nbsp; &nbsp; 👉 &nbsp; [meetingTitle](/docs/streaming-api/api-reference#config) <br/>
&nbsp; &nbsp; 👉 &nbsp; [confidenceThreshold](/docs/streaming-api/api-reference#config) <br/>
&nbsp; &nbsp; 👉 &nbsp; [timezoneOffset](/docs/streaming-api/api-reference#config) <br/>
&nbsp; &nbsp; 👉 &nbsp; [languageCode](/docs/streaming-api/api-reference#config) <br/>
&nbsp; &nbsp; 👉 &nbsp; [sampleRateHertz](/docs/streaming-api/api-reference#speech-recognition) <br/>
&nbsp; &nbsp; 👉 &nbsp; [speaker](/docs/streaming-api/api-reference#speaker) <br/>
&nbsp; &nbsp; 👉 &nbsp; [userId](/docs/streaming-api/api-reference#speaker) <br/>
&nbsp; &nbsp; 👉 &nbsp; [name](/docs/streaming-api/api-reference#speaker) <br/>
&nbsp; &nbsp; 👉 &nbsp; [startRealtimeRequest](/docs/web-sdk/web-sdk-reference#startrealtimerequest) <br/>
&nbsp; &nbsp; 👉 &nbsp; [subscribeToStream](/docs/web-sdk/web-sdk-reference#subscribetostream) <br/>


Read more about the supported [Event Handlers](/docs/web-sdk/web-sdk-reference#event-handlers):

&nbsp; &nbsp; 👉 &nbsp; [onSpeechDetected](/docs/web-sdk/web-sdk-reference#onspeechdetected) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onMessageResponse](/docs/web-sdk/web-sdk-reference#onmessageresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onInsightResponse](/docs/web-sdk/web-sdk-reference#oninsightresponse) <br/>
&nbsp; &nbsp; 👉 &nbsp; [onTopicResponse](/docs/web-sdk/web-sdk-reference#ontopicresponse)

 