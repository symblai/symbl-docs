---
id: muting-and-unmuting-connected-device
title: Muting and Unmuting Connected Device (Beta)
sidebar_label: Muting and Unmuting Connected Devic (Beta)
slug: /web-sdk/muting-and-unmuting-connected-device
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can mute and unmute the connected device by simply calling `symbl.mute()` or `symbl.unmute()`.

### Muting
A quick snippet on how to use the mute method is given below: 

```js
(async () => {
	const connection = await symbl.startRealtimeRequest(connectionConfig);
	await symbl.mute(connection);
})();
```
### Unmuting
A quick snippet on how to use the unmute method is given below:

```js
(async () => {
	const connection = await symbl.startRealtimeRequest(connectionConfig);
	await symbl.unmute(connection);
})();
```




