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
- `Linear16` - At sample rates of 8000 Hertz, 16000 Hertz, 24000 Hertz, 41000 Hertz, 48000 Hertz.
- `Opus` - At sample rates of 8000 Hertz, 16000 Hertz, 24000 Hertz, and 48000 Hertz.
If you mention the `AudioStream` without specifying the sample rate, then the default sample rate of 48000 Hertz is considered. 
:::

:::tip Authentication

Your Symbl API Credentials, that is, your App ID and App Secret are required for authentication. Learn how to get them in the [Authentication](/docs/developer-tools/authentication) section. 
:::

Use the code given below to send custom audio stream externally:

:::note
View the [Importing](/web-sdk/overview/#importing) section for the various ways to import the Web SDK.
:::


```js
/* ES6 Import */
// import { Symbl, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";
/* ES5 Import */
// const { Symbl, LINEAR16AudioStream } = require("@symblai/symbl-web-sdk");
/* Browser Import */
// const { Symbl, LINEAR16AudioStream } = window;

(async () => {

  try {

      // We recommend to remove appId and appSecret authentication for production applications.
      // See authentication section for more details
      const symbl = new Symbl({
          appId: '<your App ID>',
          appSecret: '<your App Secret>',
          // accessToken: '<your Access Toknen>'
      });

      // Boilerplate code for creating a new AudioContext and MediaStreamAudioSourceNode
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      const sampleRate = stream.getAudioTracks()[0].getSettings().sampleRate;
      const context = new AudioContext({ sampleRate });
      const sourceNode = context.createMediaStreamSource(stream);

      // Creating a new AudioStream
      const audioStream = new LINEAR16AudioStream(sourceNode);
      
      // Open a Symbl Streaming API WebSocket Connection.
      const connection = await symbl.createAndStartNewConnection({
        insightTypes: ["question", "action_item", "follow_up"],
        config: {
          encoding: "LINEAR16",
          sampleRateHertz: sampleRate
        }
      }, audioStream);

      // Retrieve real-time transcription from the conversation
      connection.on("speech_recognition", (speechData) => {
        const { punctuated } = speechData;
        const name = speechData.user ? speechData.user.name : "User";
        console.log(`${name}: `, punctuated.transcript);
      });
      
      // This is just a helper method meant for testing purposes.
      // Waits 60 seconds before continuing to the next API call.
      await Symbl.wait(60000);
      
      // Stops processing audio, but keeps the WebSocket connection open.
      await connection.stopProcessing();
      
      // Closes the WebSocket connection.
      connection.disconnect();
  } catch(e) {
      // Handle errors here.
  }
})();

```

 
#### Using AudioContext
The `AudioStream` creates a new instance of [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) to create the audio processing. The `AudioContext` interface represents an audio-processing graph built from audio modules linked together, each represented by an [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode). The `AudioContext` initializes the `AudioStream` to use an externally maintained or initialized `AudioContext` in the browser.

 

