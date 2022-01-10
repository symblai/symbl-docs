---
id: web-sdk
title: Symbl Web SDK (Beta)
sidebar_label: Introduction
slug: /web-sdk/overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The Symbl Web SDK provides access to the Symbl APIs for applications directly in the browser. 
 
> **Source Code** <br/>
Find the source code here: [https://github.com/symblai/symbl-web-sdk](https://github.com/symblai/symbl-web-sdk). <br/>
 
 
## Supported Browsers
---
 
|-- | Chrome | Edge Firefox | Firefox | Safari |
| -------| ---------- | ------- | ----- | ------- |
| macOS | ![icon](/img/tick-mark.png)| ![icon](/img/tick-mark.png)| ![icon](/img/tick-mark.png) | ![icon](/img/tick-mark.png) |
| Windows | ![icon](/img/tick-mark.png) | ![icon](/img/tick-mark.png)| ![icon](/img/tick-mark.png) |  |
| Linux | ![icon](/img/tick-mark.png)|   | ![icon](/img/tick-mark.png) |
| iOS | ![icon](/img/tick-mark.png)|   | ![icon](/img/tick-mark.png) | ![icon](/img/tick-mark.png) |
| Android | ![icon](/img/tick-mark.png)|  | ![icon](/img/tick-mark.png) | ![icon](/img/tick-mark.png) |

## Setup
---
**To use the Symbl Web SDK,**
 
Include the following script tag in your HTML file:
 
```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/latest/symbl.min.js"></script>
```
or

```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/v0.8.2/symbl.min.js"></script>
```

In case of a front-end web application using a framework such as React, import it in the ES2015 style:
 
```bash
import symbl from "@symblai/symbl-web-sdk";
```
 
## Initialization
---
The `init` authenticates you to use the Symbl API using the provided authentication credentials. To get authentication credentials (App ID and Secret), follow the steps given in the [Authentication](/docs/developer-tools/authentication#step-1-get-your-api-credentials) page.
 
You can authenticate:
 
- [Using your API Credentials](#authenticate-using-api-credentials)
 
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; or
 
- [Using your Auth Token](#authenticate-using-token)
 
### Authenticate using API Credentials
 
Use the code given below to authenticate using your App ID and App Secret.
 
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
 
### Authenticate using Token
 
Use the code given below to authenticate using the Auth Token. To generate the Auth Token follow the Steps given in the [Authentication](/docs/developer-tools/authentication#step-2-generate-the-access-token) Page.
 
```js
sdk.init({
 accessToken: ACCESS_TOKEN_HERE,
 basePath: 'https://api.symbl.ai'
})
.then(() => console.log('SDK Initialized.'))
.catch(err => console.error('Error in initialization.', err));
```
 
 
:::info Web SDK in Labs
The Web SDK is also available as a part of the [Symbl Labs](/docs/labs) with select features. You can find the Web SDK Labs Readme here: [https://github.com/symblai/symbl-web-sdk/blob/labs/README.md](https://github.com/symblai/symbl-web-sdk/blob/labs/README.md) and the source code here: [https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs).
:::

## Streaming API config options

You can utilize the config options provided for our Streaming API. To read about the Streaming API config options, go to [Streaming API Reference](https://docs.symbl.ai/docs/streaming-api/api-reference/#request-parameters).

### Additional Web SDK configs
You can also pass the following configurations that are available specifically with the Web SDK: 

| Name | Default | Description | 
| -------| ---------- | ------- | 
| `sourceNode` | `null` | For passing in an external [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode/MediaStreamAudioSourceNode) object. Although the Web SDK will handle the audio context and source nodes on its own by default, you can pass this option if you wish to handle it externally. |
| `reconnectOnError` | `true` | If this option is set to `true`, the Web SDK will attempt to reconnect to the WebSocket in case of an error. You can also make use of our [onReconnectFail](/docs/web-sdk/web-sdk-reference#onreconnectfailerr) callback which will fire in case the reconnection attempt fails. |

### Usage Example

```js
const id = btoa("my-first-symbl-ai-code");

const connectionConfig = {
	id,
	insightTypes: ['action_item', 'question'],
	sourceNode: sourceNode,
	reconnectOnError: true,
	handlers: { // Read the handlers section for more
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
 
## Tutorials
---
We have prepared a list of tutorials to help you understand how to use the Web SDK.
 
* [How to Transcribe a Live Audio Input through Microphone](/docs/web-sdk/transcribing-live-audio-through-microphone)
* [How to pass a custom Node Source](/docs/web-sdk/passing-custom-sourcenode)
* [How to pass a custom Device Change Handler](/docs/web-sdk/passing-custom-ondevicechange-handler)
 
### Web SDK Reference
---
The supported Handlers and Callbacks for the Web SDK are listed below:
 
* [Event Handlers](/docs/javascript-sdk/reference#event-handlers-1)
   * [onSpeechDetected](/docs/javascript-sdk/reference#onspeechdetected)
   * [onMessageResponse](/docs/javascript-sdk/reference#onmessageresponse)
   * [onInsightResponse](/docs/javascript-sdk/reference#oninsightresponse)
   * [onTopicResponse](/docs/javascript-sdk/reference#ontopicresponse)<br/>

👉 See the complete Web SDK Reference [here](/docs/web-sdk/web-sdk-reference). 