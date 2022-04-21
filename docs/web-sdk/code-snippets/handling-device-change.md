---
id: handling-device-change
title:  Handing Device Change
sidebar_label:  Handing Device Change
slug: /web-sdk/code-snippets/web-sdk-updating-audio-streams/
pagination_label:  Handing Device Change
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

##  Handing Device Change
You can update an audio source during a live stream by using the `updateAudioDevice` method. This method allows you to change devices mid-stream (i.e., laptop microphone to the headset microphone) without stopping or closing the connection. Under normal circumstances would access the `audioStream` object from your [StreamingAPIConnection](/web-sdk/web-sdk-reference/web-sdk-reference/#streamingapiconnection-class) instance.

```js
connection.audioStream.updateAudioDevice(deviceId);
```

Check out the [SDK Reference](/web-sdk/web-sdk-reference/web-sdk-reference/#updateaudiodevicedeviceid-string-mediastream-mediastream) for more information about `updateAudioDevice`

