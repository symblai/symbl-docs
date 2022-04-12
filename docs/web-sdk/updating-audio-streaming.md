---
id: web-sdk-updating-audio-streams
title: Updating Audio Source Mid-Stream
sidebar_label: Updating Audio Source Mid-Stream
slug: /web-sdk/web-sdk-updating-audio-streams/
pagination_label: Updating Audio Source Mid-Stream
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Updating Audio Source Mid-Stream
You can update an audio source during a live stream by using the `updateAudioDevice` method. This method allows you to change devices mid-stream (i.e., laptop microphone to the headset microphone) without stopping or closing the connection.
Use the code given below to achieve this: 

```js
audioStream.updateAudioDevice(deviceId);
```

