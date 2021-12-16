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

We have added the following capabilities in the Web SDK:

- Connecting, 
- Stopping, 
- Muting, 
- Unmuting and 
- Subscribing. 

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

1. Include the following script tags in your HTML file:

```html
<script src="https://storage.googleapis.com/symbl-web-sdk/latest/symbl.min.js"></script>
```
2. In case of a front-end web application using a framework such as React, import it in the ES2015 style, as given below:

```bash
import symbl from "@symblai/symbl-web-sdk";
```
To view the technical reference for the Symbl Web SDK [go here](https://symblai.github.io/symbl-web-sdk/classes/core_SymblWebEngine.default.html)

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

You can view which Labs features are available in the Labs Web SDK on the [GitHub Readme]([https://github.com/symblai/symbl-web-sdk/tree/labs](https://github.com/symblai/symbl-web-sdk/tree/labs)) for the labs branch.
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
