---
id: web-sdk
title: Symbl Web SDK (Beta)
description: Symbl Web SDK provides conversation intelligence for web apps and browser-based applications.
sidebar_label: Introduction
slug: /web-sdk/overview/
pagination_label: Web SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

::: In Beta
This feature is in Beta. If you have questions or comments, email [mailto:devrelations@symbl.ai](devrelations@symbl.ai).
:::

Symbl Web SDK is a TypeScript application that enables you to add Symbl’s Conversation Intelligence into your JavaScript application directly in the browser. It provides a set of classes you can use to access Symbl’s [Streaming API](/docs/streamingapi/introduction/) and [Subscribe APIs](/docs/subscribe-api/). 

Web SDK source code is available at [https://github.com/symblai/symbl-web-sdk](https://github.com/symblai/symbl-web-sdk).

## Supported Browsers
Web SDK works with the following web browsers: 

Operating System | Chrome | Edge | Firefox | Safari |
---------- | ------- | ------- | ------ | ------ |
macOS | ✅ | - | ✅ | ✅ | 
Windows | ✅ | ✅ | ✅ | ✅ |
Linux| ✅ | - | ✅ | ✅ | 


## Before you begin

Before using Web SDK [sign up with Symbl.ai](https://platform.symbl.ai) to generate your own App ID and App Secret values for authentication.

Install the latest version of [`npm` package manager (Version 6.0.0 +)](https://www.npmjs.com/package/npm).


## Install or import Web SDK


### Install using npm

Install Web SDK using the following 'npm' command:

```shell
npm i @symblai/symbl-web-sdk
```

### Import via CDN

You can also import the file into your HTML application using Symbl's CDN. For production environments, Symbl recommends using the Versioned CDN.

#### Versioned CDN

```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/v1.0.3/symbl.min.js"></script>
```

#### Latest CDN


```html
<script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/latest/symbl.min.js"></script>
```

Then call the `Symbl` class using the `window` method:

```js
const Symbl = window.Symbl;
const symbl = new Symbl({
  accessToken: "< YOUR ACCESS TOKEN >"
});
```


### Import via browser

You can import the Web SDK in a browser using ES5, ES6, or Native JavaScript:

<Tabs
  defaultValue="es6"
  values={[
    { label: 'ES6', value: 'es6', },
    { label: 'ES5', value: 'es5', },
    { label: 'Native JavaScript', value: 'js', },
  ]
}>

<TabItem value="es6">

```js
import {Symbl} from '@symblai/symbl-web-sdk';
```
</TabItem>

<TabItem value="es5">

```js
const {Symbl} = require('@symblai/symbl-web-sdk');
```

 </TabItem>

<TabItem value="js">

```js
const {Symbl} = window;
```
</TabItem>
</Tabs>


## Authentication

To initialize Symbl's Web SDK, you can pass in an access token generated using [Symbl’s Authentication method](https://docs.symbl.ai/docs/developer-tools/authentication/).

For testing purposes, you can use your App ID and App Secret from the [Symbl Platform](https://platform.symbl.ai). Do not use the App ID and App Secret in production applications.


To initialize the Web SDK in your application, use the following JavaScript snippet:

```js
const symbl = new Symbl({
    accessToken: '<your Access Token>'
    // appId: '<your App ID>', // Should only be used for development environment
    // appSecret: '<your App Secret>', // Should only be used for development environment
    // basePath: '<your custom base path>',// optional
    // logLevel: 'debug' // Sets which log level you want to view
});
```


## Get Started

To get started with the Symbl Web SDK, use this HTML and JavaScript audio processing example.

### Example 

The following example opens a WebSocket connection with the Symbl Streaming API and starts processing audio data from the default input device (microphone). After 60 seconds this sample code stops audio processing and closes the WebSocket connection.


```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Symbl Web SDK example</title>
  <script src="https://sdk.symbl.ai/js/beta/symbl-web-sdk/latest/symbl.min.js"></script>
  <script>
    const start = async () => {


      try {

          // Symbl recommends replacing the App ID and App Secret with an Access Token for authentication in production applications.
          // For more information about authentication see https://docs.symbl.ai/docs/developer-tools/authentication/.
          const symbl = new Symbl({
              appId: '<your App ID>',
              appSecret: '<your App Secret>',
              // accessToken: '<your Access Token>' // for production use
          });
          
          // Open a Streaming API WebSocket Connection and start processing audio from your input device.
          const connection = await symbl.createAndStartNewConnection();

          // Retrieve real-time transcription from the conversation.
          connection.on("speech_recognition", (speechData) => {
            const name = speechData.user ? speechData.user.name : "User";
            const transcript = speechData.punctuated.transcript;
            console.log(`${name}: `, transcript);
            document.querySelector("#speechRecognition").innerHTML = `${name}: ${transcript}`;
          });
          
          // This is a helper method for testing purposes.
          // It waits 60 seconds before continuing to the next API call.
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

  <button onclick="javascript: start()">Start Processing</button>

  <p id="speechRecognition">Click <b>Start Processing</b> and begin speaking to see transcription. If prompted, allow access to your microphone. <br> <br> If nothing happens, check your <a href="https://platform.symbl.ai/#/home">Symbl App ID and App Secret</a> in this HTML file on lines 16 and 17 respectively.</p>

</body>

</html>
```

The current version of the Web SDK includes a few [Known Issues](/docs/changelog/#known-issues).

## Tutorial

Learn how to use Web SDK with the Streaming API in [Getting Live Transcripts and Conversation Intelligence](/docs/web-sdk/web-sdk-getting-live-transcripts/).


## Code Snippets

### Streaming API Code Snippets

* [Sending external Audio Streams](/docs/web-sdk/web-sdk-sending-external-audio-streams)
* [Handing Device Change](/docs/web-sdk/code-snippets/handling-device-change)
* [Processing Data from Audio File](/docs/web-sdk/code-snippets/processing-data-from-audio-file/)

### Subscribe API Code Snippets

* [Subscribing to an Existing Connection](/docs/web-sdk/code-snippets/subscribing-to-existing-connection)

### SDK Reference

Supported methods and events for Web SDK:

* [Web SDK Reference](/docs/web-sdk/web-sdk-reference/web-sdk-reference/)
* [Events and Callbacks](/docs/web-sdk/web-sdk-reference/events-and-callbacks/)
    * [Connection Events](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#connection-events)
    * [Audio Stream Events](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#audiostream-events)
    * [Global Events](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#global-events)
    * [Speech Recognition Object](/docs/javascript-sdk/reference#ontopicresponse)
    * [Message Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#message-response-object)
    * [Topics Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#topic-response-object)
    * [Action Items Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#action-item-response-object)
    * [Follow-ups Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#follow-up-response-object)
    * [Questions Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#question-response-object)
    * [Trackers Response Object](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#tracker-response-object)
* [Configuration Reference](/docs/web-sdk/web-sdk-reference/configuration-reference)

