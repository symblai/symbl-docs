---
id: subscribe-to-realtime
title: Subscribing to a Real-time Connection (Beta)
sidebar_label: Subscribing to a Real-time Connection (Beta)
slug: /web-sdk/subscribe-to-realtime
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

With the Subscribe API you can connect to an existing connection via the connection ID. You'll want to open this example in a different browser while the real-time transcription is running.

## Current call signature

```js
symbl.subscribeToStream(id, {
	reconnectOnError: true,
	handlers: {
		onMessage: (message) => { ... },
		onSubscribe: () => { ... },
		onClose: () => { ... },
		onReconnectFail: (err) => { ... },
	}
});
```

## Deprecated call signature

This way of using the `subscribeToSream` function has been deprecated. It will still work but might not in future versions. Please convert to the current call signature above. The function passed is equivalent to the `onMessage` handler in the new call signature.

```js
symbl.subscribeToStream(id, (data) => {
	console.log('data:', data);
})
```

| Name | Default | Description |
| -------| ---------- | --------- |
| `reconnectOnError` | `true` | If `true`, the Web SDK will attempt to reconnect to the WebSocket in case of an error. You can also make sure of our `onReconnectFail` callback which will fire in case the reconnection attempt fails.) | 

## Subscribe API Handlers

| Name | Description |
| -------| ---------- | 
| `onMessage(message)` | Fired any time a message is received. | If true the Web SDK will attempt to reconnect to the WebSocket in case of error. You can also make sure of our `onReconnectFail` callback which will fire in case the reconnection attempt fails.) | 
| `onSubscribe()` | Fired when the connection intially subscribes. 
| `onClose()` | Fired when the connection is closed.
| `onReconnectFail(err)` | Fires when the reconnection attempt fails. Related to the `reconnectOnError` config. |


