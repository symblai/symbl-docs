---
id: muting-and-unmuting-connected-device
title: Muting and Unmuting Connected Device (Beta)
sidebar_label: Muting and Unmuting Connected Device (Beta)
slug: /web-sdk/muting-and-unmuting-connected-device
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

You can mute and unmute the connected device by simply calling `symbl.mute()` or `symbl.unmute()`.

### Muting Device
A quick snippet on how to use the mute method is given below: 

```js
(async () => {
 // Creates the WebSocket in a non-processing state
    const stream = await symbl.createStream(connectionConfig);
	await symbl.mute(stream);
})();
```
:::note Using createStream to start a realtime request
Creating a stream using `symbl.startRealtimeRequest(config)` has been deprecated in favor of `symbl.createStream(config)`. For `createStream`, the WebSocket is started in a non processing state. You must send the start request before processing any audio.

After the stream is created, you need to call `symbl.mute(stream)` to mute the device.
:::

### Unmuting Device
A quick snippet on how to use the unmute method is given below:

```js
(async () => {
 // Creates the WebSocket in a non-processing state
    const stream = await symbl.createStream(connectionConfig);
	await symbl.unmute(stream);
})();
```

:::note Using createStream to start a realtime request
Creating a stream using `symbl.startRealtimeRequest(config)` has been deprecated in favor of `symbl.createStream(config)`. For `createStream`, the WebSocket is started in a non processing state. You must send the start request before processing any audio.

After the stream is created, you need to call `symbl.unmute(stream)` to unmute the device.
:::


