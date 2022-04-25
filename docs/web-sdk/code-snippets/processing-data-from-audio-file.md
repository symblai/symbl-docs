---
id: processing-data-from-audio-file
title: Processing Data from Audio File
slug: /web-sdk/code-snippets/processing-data-from-audio-file/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can process audio from an audio file using the [`attachAudioSourceElement`](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#attachaudiosourceelementaudiosourcedomelement) method on the [AudioStream](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#audiostream-class).

:::caution note 
Currently, only LINEAR16 encoding is supported for audio elements. Opus support will be addressed in a later update.
:::

:::info Authentication

Your Symbl API Credentials, that is, your App ID and App Secret are required for authentication. Learn how to get them in the [Authentication](/docs/developer-tools/authentication) section. 
:::

```js

import { Symbl, LINEAR16AudioStream } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });

    // Create your audio element
    const myAudioElement = new Audio();
    myAudioElement.type = "audio/mp3";
    myAudioElement.src = "link-to-file.mp3";

    // Attach audio element to AudioStream
    const audioStream = new LINEAR16AudioStream();
    audioStream.attachAudioSourceElement(myAudioElement);

    // Create connection and start processing audio
    const connection = symbl.createConnection("abc123", audioStream);
    connection.startProcessing({
      config: {
        encoding: "LINEAR16"
      }
    });

    // Play the element once audio is ready to be processed.
    connection.on("processing_started", () => {
      myAudioElement.play();
    });

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);
    
    // Stops processing audio, but keeps the WebSocket connection open.
    await connection.stopProcessing();
    
    // Closes the WebSocket connection.
    connection.disconnect();
} catch(e) {
    // Handle errors here.
}

```