---
id: web-sdk-sending-external-audio-streams
title: Sending external Audio Streams
sidebar_label: Sending external Audio Streams
slug: /web-sdk/web-sdk-sending-external-audio-streams/
pagination_label: Sending external Audio Streams
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can send a custom external audio source or audio stream using the `AudioStream` interface. The `AudioStream` represents a stream of audio that performs various operations depending on the Audio Stream’s configuration provided. 

:::info 
The Web SDK supports the following Audio codecs with the sample rates as mentioned below:
- `Linear16` - At sample rates of 8000 Hertz, 16000 Hertz, 24000 Hertz, 441000 Hertz, 48000 Hertz.
- `Opus` - At sample rates of 8000 Hertz, 16000 Hertz, 24000 Hertz, and 48000 Hertz.
If you mention the `AudioStream` without specifying the sample rate, then the default sample rate of 48000 Hertz is considered. 
:::

Use the code given below to send custom audio stream externally:

```js
import { OpusAudioStream, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";
 
const stream = await navigator.mediaDevices.getUserMedia({
audio: true,
video: false,
});
const context = new AudioContext();
const sourceNode = context.createMediaStreamSource(stream);
const audioStream = new OpusAudioStream(sourceNode);
// const audioStream = new LINEAR16AudioStream(sourceNode); // For LINEAR16 encoding
 
const connection = await symbl.createAndStartNewConnection(config, audioStream);
```
 
#### Using AudioContext
The `AudioStream` creates a new instance of [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) to create the audio processing. The `AudioContext` interface represents an audio-processing graph built from audio modules linked together, each represented by an [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). The `AudioContext` initializes the `AudioStream` to use an externally maintained or initialized `AudioContext` in the browser.

 
