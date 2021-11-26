---
id: stopping-real-time
title: Stopping Real-time Connection (Beta)
sidebar_label: Stopping Real-time Connection 
slug: /web-sdk/stopping-real-time
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

In order to end the connection to the realtime WebSocket you'll need to use the following command with your connection object:

```js
symbl.stopRequest(connection);
``` 

It is recommended to always end the connection programmatically if you do not sever the connection as you could end up using more minutes of time than intended.