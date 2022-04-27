---
id: processing-data-from-audio-file
title: Processing Data from Audio File
slug: /web-sdk/code-snippets/processing-data-from-audio-file/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can process audio from an audio file using the [`attachAudioSourceElement`](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#attachaudiosourceelementaudiosourcedomelement) method on the [AudioStream](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#audiostream-class).

:::info Authentication

Your Symbl API Credentials, that is, your App ID and App Secret are required for authentication. Learn how to get them in the [Authentication](/docs/developer-tools/authentication) section. 
:::

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

      // Create your audio element
      const myAudioElement = new Audio();
      myAudioElement.type = "audio/mp3";
      myAudioElement.src = "link-to-file.mp3";

      // Attach audio element to AudioStream
      const audioStream = new LINEAR16AudioStream();
      await audioStream.attachAudioSourceElement(myAudioElement);

      // Create connection and start processing audio
      const connection = await symbl.createConnection("abc123", audioStream);

      await connection.startProcessing({
        insightTypes: ["question", "action_item", "follow_up"],
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