---
id: subscribe-to-realtime
title: Subscribing to an existing realtime connection with Subscribe API (Beta)
sidebar_label: Subscribing to an existing realtime connection with Subscribe API (Beta)
slug: /web-sdk/subscribe-to-realtime
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

With the Subscribe API you can connect to an existing connection via the connection ID. You'll want to open this example in a different browser while the realtime transcription example is running.

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

| Name | Description |
| -------| ---------- | 
| `reconnectOnError` | `true` | If true the Web SDK will attempt to reconnect to the WebSocket in case of error. You can also make sure of our `onReconnectFail` callback which will fire in case the reconnection attempt fails.) | 

## Subscribe API Handlers

| Name | Default value | Description |
| -------| ---------- | ------- | 
| `onMessage(message)` | Fired any time a message is received. | If true the Web SDK will attempt to reconnect to the WebSocket in case of error. You can also make sure of our `onReconnectFail` callback which will fire in case the reconnection attempt fails.) | 
| `onSubscribe()` | Fired when the connection intially subscribes. 
| `onClose()` | Fired when the connection is closed.
| `onReconnectFail(err)` | Fires when the reconnection attempt fails. Related to the `reconnectOnError` config. |


