---
id: stop-realtime-connection
title: Stopping Realtime Connection (Beta)
sidebar_label: Stopping Realtime Connection (Beta)
slug: /web-sdk/stop-realtime-connection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

In order to end the connection to the realtime WebSocket you'll need to use the following command with your connection object:

```js
symbl.stopRequest(connection);
```

If you do not sever the connection you could use more minutes of time than intended, so it is recommended to always end the connection programmatically.