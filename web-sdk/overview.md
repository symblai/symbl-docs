---
id: web-sdk
title: Symbl Web SDK (Beta)
sidebar_label: Introduction
slug: /web-sdk/overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

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
 
Include it via script tags in your HTML file:
 
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
 
 
:::note Web SDK in Labs
The Web SDK is available as a part of [Symbl Labs](/docs/labs) with select features. You can find the Web SDK Labs Readme here: [https://github.com/symblai/symbl-web-sdk/blob/labs/README.md](https://github.com/symblai/symbl-web-sdk/blob/labs/README.md) and the source code here: [https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs).
:::

## Streaming API config options

The full details of the Streaming API config options can be seen [here](https://docs.symbl.ai/docs/streaming-api/api-reference/#request-parameters).

### Additional Web SDK configs
These are configs that have been added that are specific to the Web SDK.

| Name | Default | Description | 
| -------| ---------- | ------- | 
| `sourceNode` | `null` | For passing in an external [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode/MediaStreamAudioSourceNode) object. By default the Web SDK will handle audio context and source nodes on it's own, though if you wish to handle that externally we've provided that option. |
| `reconnectOnError` | `true` | If true the Web SDK will attempt to reconnect to the WebSocket in case of error. You can also make sure of our `onReconnectFail` callback which will fire in case the reconnection attempt fails. |

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
 
* [Transcribing Live Audio Input through Microphone](/docs/web-sdk/transcribing-live-audio-through-microphone)
 
### Web SDK Reference
---
The supported Handlers and Callbacks for the Web SDK are listed below:
 
* [Event Handlers](/docs/javascript-sdk/reference#event-handlers-1)
   * [onSpeechDetected](/docs/javascript-sdk/reference#onspeechdetected)
   * [onMessageResponse](/docs/javascript-sdk/reference#onmessageresponse)
   * [onInsightResponse](/docs/javascript-sdk/reference#oninsightresponse)
   * [onTopicResponse](/docs/javascript-sdk/reference#ontopicresponse)