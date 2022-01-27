---
id: stop-realtime-connection
title: Stopping Real-time Connection (Beta)
sidebar_label: Stopping Real-time Connection (Beta)
slug: /web-sdk/stop-realtime-connection
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note IN BETA PHASE
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

In order to end the real-time WebSocket connection, you'll need to use the following command with your connection object:

```js
symbl.stopRequest(connection);
```

If you do not sever the connection, you could use more minutes of time than intended, so it is recommended to always end the connection programmatically.