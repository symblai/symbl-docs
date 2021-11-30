---
id: web-sdk
title: Symbl Web SDK (Beta)
sidebar_label: Introduction
slug: /web-sdk/overview
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Symbl Web SDK provides access to the Symbl APIs for applications in the browser directly. 

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
<script src="https://storage.googleapis.com/symbl-web-sdk/latest/symbl.min.js"></script>
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
The Web SDK is also available as a part of [Symbl Labs](/docs/labs) with select features. You can find the Web SDK Labs documentation here: [https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs) and the source code here: [https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs).

### Features in Labs

The following features are available in Labs for Web SDK. For more details, go to the [GitHub Readme]([https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs)):

| Parameter | Required | Description |
| -------| ---------- | --------- |
|`disconnectonOnStopRequest` | Optional, default: true | If set to `false` the WebSocket will be set to a non-processing state if the `stop_request` event is set. In this state, the connection can be re-opened if the `start_request` event is sent. If `true` the WebSocket connection will close as normal.
|`disconnectOnStopRequestTimeout` | Optional | Accepts a value of 0 to 1800 seconds. Indicates how long this connection will remain in a non-processing state before timing out. |
|`noConnectionTimeout` | Optional | Accepts a value of 0 to 1800 seconds. Indicates how long a connection will remain active even when no one is connected. By using the same connectionId anyone can reconnect to this WebSocket before it times out completely.|
|`sourceNode` | Optional, default: null | For passing in an external `MediaStreamAudioSourceNode` object. By default the Web SDK will handle audio context and source nodes on it's own, though if you wish to handle that externally we've provided that option.|
|`config.encoding` | Optional, default: 'linear16' | Accepts either 'opus' or 'linear16'. For linear16, you must set the sampleRateHertz option. For opus the sampleRateHertz should always be 48000. |
| `handlers.ondevicechange` | Optional | By default Symbl Web SDK will provide the ondevicehandler logic, which just takes the new device and sends the sample rate over to our servers. If you wish to override this logic you can do so by passing an ondevicechange function into the handlers section of the config. You can assign a function to symbl.deviceChanged as a callback to when the event is fired.
| `reconnectOnError` | Optional, default: true | If true the Web SDK will attempt to reconnect to the WebSocket in case of error.

:::

## Tutorials
---
We have prepared a list of tutorials to help you understand how to use the Web SDK.

* [Transcribing Live Audio Input through Microphone](/docs/web-sdk/transcribing-live-audio-through-microphone)


### Code Snippets
---

* [Subscribe to real-time Events](/docs/web-sdk/subscribe-real-time)
* [Reconnecting to an Existing Real-time Connection](/docs/web-sdk/reconnecting-real-time)
* [Muting and Unmuting the Connected Device](/docs/web-sdk/muting-and-unmuting-connected-device)
* [Stopping Real-time Connection](/docs/web-sdk/stopping-real-time)


### Web SDK Reference
---
The supported events for the Web SDK are listed below:

* [Event Handlers](/docs/javascript-sdk/reference#event-handlers-1)
    * [onSpeechDetected](/docs/javascript-sdk/reference#onspeechdetected)
    * [onMessageResponse](/docs/javascript-sdk/reference#onmessageresponse)
    * [onInsightResponse](/docs/javascript-sdk/reference#oninsightresponse)
    * [onTopicResponse](/docs/javascript-sdk/reference#ontopicresponse)
