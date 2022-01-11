---
id: passing-custom-ondevicechange-handler
title: Passing a Custom Device Change Handler (Beta)
sidebar_label: Passing a Custom Device Change Handler (Beta)
slug: /web-sdk/passing-custom-ondevicechange-handler
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::


By default, the Symbl Web SDK will handle the `ondevicechange` event and send a `modify_request` event to modify the sample rate with the new device's sample rate. If you wish to override this logic, you can pass in your own `ondevicechange` handler in the handlers config.

```js
symbl.init({
	appId: '<your App ID>',
	appSecret: '<your App Secret>',
	// accessToken: '<your Access Token>', // can be used instead of appId and appSecret
	basePath: 'https://api.symbl.ai',
});
const id = btoa("my-first-symbl-ai-code");
// pass in the MediaStreamAudioSourceNode as sourceNode
const connectionConfig = {
	id,
	insightTypes: ['action_item', 'question'],
	config: {
		languageCode: 'en-US',
		sampleRateHertz: 48000
	},
	handlers: {
		ondevicechange: () => {
		  // add your logic here.
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
### Using the deviceChanged callback

You can also make use of our callback using our `deviceChanged` callback:

```js
symbl.deviceChanged = () => {
	// Add your logic here
}
```