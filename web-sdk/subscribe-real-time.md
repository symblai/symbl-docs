---
id: web-subscribe-real-time
title: Subscribing to an Existing Real-time Connection 
sidebar_label: Subscribe to an Existing Real-time Connection
slug: /web-sdk/subscribe-real-time
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Symbl Web Javascript SDK lets you subscribe to real-time events when you connect to one of the Endpoints specified in the above sections. 
You must open this example in a different browser while the realtime transcription example is running.

These include:

* Real-Time Transcription
* Real-Time Insights
* Real-Time Messages
* Real-Time Intents

The below example shows how to achieve this:

```js
symbl.init({
	appId: '<your App ID>',
	appSecret: '<your App Secret>',
	// accessToken: '<your Access Token>', // can be used instead of appId and appSecret
	// basePath: '<your custom base path (optional)>',
});

const id = btoa("symbl-ai-is-the-best");

symbl.subscribeToStream(id, (data) => {
	console.log('data:', data);
})
```