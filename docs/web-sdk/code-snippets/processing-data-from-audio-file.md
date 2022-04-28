---
id: processing-data-from-audio-file
title: Processing Data from Audio File
slug: /web-sdk/code-snippets/processing-data-from-audio-file/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

You can process audio from an audio file using the [`attachAudioSourceElement`](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#attachaudiosourceelementaudiosourcedomelement) method on the [AudioStream](/docs/web-sdk/web-sdk-reference/web-sdk-reference/#audiostream-class).

All audio requests in the browser must be made by user-interaction so we included a basic HTML application to help get this running.

:::info Authentication

Your Symbl API Credentials, that is, your App ID and App Secret are required for authentication. Learn how to get them in the [Authentication](/docs/developer-tools/authentication) section. 
:::

:::note
View the [Importing](/web-sdk/overview/#importing) section for the various ways to import the Web SDK.
:::

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Symbl Web SDK example</title>
  <script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/latest/symbl.min.js"></script>
  <script>
    const { Symbl, LINEAR16AudioStream } = window;

    const start = async () => {

      try {

          // We recommend to remove appId and appSecret authentication for production applications.
          // See authentication section for more details
          const symbl = new Symbl({
              appId: '506a3248387971546a547936496666486a4c376236574e4272494572416f3734',
              appSecret: '5a76566b6e5335776e6a4455695a6a4e3347336750764250534e78394557656e39614748447a5f6b49302d397a4a4c65487572323870386b6e6b743048455245',
              // accessToken: '<your Access Toknen>'
          });

          // Create your audio element
          const myAudioElement = new Audio();
          myAudioElement.type = "audio/mp3";
          myAudioElement.src = "https://symbltestdata.s3.us-east-2.amazonaws.com/newPhonecall.mp3";

          // Attach audio element to AudioStream
          const audioStream = new LINEAR16AudioStream();
          await audioStream.attachAudioSourceElement(myAudioElement);

          // Create connection and start processing audio
          const connection = await symbl.createConnection("abc123" + btoa(Math.random(0)), audioStream);

          await connection.startProcessing();

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
    }
  </script>
</head>

<body>

<div>
  <p>Start</p>
  <div>
    <button onclick="javascript: start()">Start Processing Audio Element</button>
  </div>
</div>

</body>

</html>
```