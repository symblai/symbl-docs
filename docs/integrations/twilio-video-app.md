---
id: twilio-video-app
title: Twilio Video App
slug: /integrations/twilio-video-app
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This document provides information about how to build and use the multi-party video-conferencing application that demonstrates Symbl's Real-time APIs.

## Introduction
This is a multi-party video-conferencing application that demonstrates [Symbl's Real-time APIs](/docs/streamingapi/overview/introduction). This application is inspired by [Twilio's video app](https://github.com/twilio/twilio-video-app-react) and is built using [Twilio-video.js](https://github.com/twilio/twilio-video-app-react) and [Create React App](https://github.com/facebook/create-react-app).

## Features
---
This extension provides the following out-of-the-box conversational intelligence features:

- **Live Closed Captioning**: Live closed captioning is enabled by default and provides a real-time transcription of your audio content. 
- **Real-time Transcription**: Symbl offers state-of-the-art Speech-to-Text capability (also called transcription). You can get audio and video conversations transcriptions in real-time.
- **Video conferencing with real-time video and audio**: This allows you to use this for real-time use cases where both the video, audio, and its results from Symbl's back-end need to be available in real-time. It can be integrated directly via the browser or server.
- **Enable/Disable camera**: After connecting your camera you can enable or disable the camera when you want.
- **Mute/unmute mic**: After you connect to your device's microphone you can mute or unmute when you want.
- **Screen sharing**: This can be used to capture the screen directly from the web app.
- **Dominant Speaker indicator**: The Dominant Speaker refers to the Participant having the highest audio activity at a given time.   
- **Network Quality Indicator**: It highlights the call panel which displays the current network conditions of the user and if it is Strong, Weak, or Poor.

## Supported Platforms
---
This application is supported only on Google Chrome.

## Integration 
---
### Overview
This section describes how to Enable Symbl into your Twilio Video Conference App. The code samples are written in cURL.

### Prerequisites
Following are some of the pre-requisites of integrating Symbl-Twilio Conference:

- JS ES6+ - Make sure to use the latest version.
- [Node.js v10+](https://nodejs.org/en/download/)- Make sure to use the current latest version; 10.
- NPM v6+ -  Node versions v6 or latest is required.
- Twilio account - You will require a [Twilio account](https://www.twilio.com/try-twilio), you’ll also need your account SID, available on your [Twilio dashboard](https://www.twilio.com/console), and an API key and secret, which you can [generate in your console](https://www.twilio.com/console/video/runtime/api-keys).

### Integration Steps
---

This section walks you through the steps necessary to enable Symbl for Twilio Video Conference App.

#### Step 1: Setup and Deploy 
The first step to getting set up is to [sign up](https://platform.symbl.ai/?_ga=2.63499307.526040298.1609788827-1505817196.1609788827).
Gather your Symbl credentials:
1. Your App Id that you can get from [Platform](https://platform.symbl.ai/).
2. Your App Secret that you can get from [Platform](https://platform.symbl.ai/).

This application offers two options for authorizing your Symbl account, in the application, or via the included token server. Your Twilio account will be authorized via the token server.

The default behavior is for your Symbl account to authorize in-app. A dialog box will be shown automatically if you're opening the app for the first time. In the [config.js](https://github.com/symblai/symbl-twilio-video-react/blob/a42d0394ae7ff7c67cdf35df0bd3b013a3cdcfb5/src/config.js#L5) file, you will find `enableInAppCredentials` set to `true`. For this option, you are not required to update the [.env](https://github.com/symblai/symbl-twilio-video-react/blob/master/.env) file with Symbl credentials.

![Symbl Credentials](/img/symbl-credentials.png)

If you are planning to use the included token server for generating your Symbl token you may disable the in-app App ID/App Secret configuration. You can disable it by setting `enableInAppCredentials` to `false` in the [config.js](https://github.com/symblai/symbl-twilio-video-react/blob/a42d0394ae7ff7c67cdf35df0bd3b013a3cdcfb5/src/config.js#L5).

#### Step 2: Store your Symbl credentials in the .env file. 
To store your Symbl credentials in the [.env](https://github.com/symblai/symbl-twilio-video-react/blob/master/.env) file, do the following:

`SYMBL_APP_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
`SYMBL_APP_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

#### Step 3: Store your Twilio credentials in the .env file:
In your Twilio console click on 'Settings' and take note of your Account SID. Navigate to Settings/API Keys to generate a new Key SID and Secret

`TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
`TWILIO_API_KEY_SID=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
`TWILIO_API_KEY_SECRET=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

The local token server is managed by [server.js](https://github.com/symblai/symbl-video-react/blob/master/server.js).

#### Step 4: Run the app locally 

With this command: `$ npm start`

This will start the local token server and run the app in development mode. Open [http://localhost:3000](http://localhost:3000/) to see the application in the browser. The page will reload if you make changes to the source code in `src/`. You will also see any linting errors in the console. 

Start the token server locally with: `$ npm run server`

The token server runs on port 8081 exposes two `GET` endpoints. One to generate an access token for Symbl and one for generating an access token for Twilio.

Symbl token endpoint expects to `GET` request at `/symbl-token` route with no parameters. The response will be a JSON response with `accessToken` and `expiresIn` values with Symbl access token and expiry of the token.

#### Step 5: Try it out with this sample curl command:

```shell
curl 'localhost:8081/symbl-token'
```

Twilio token endpoint expects to `GET` request at `/twilio-token` route with the following query parameters:

`identity: string,  // the user's identity`

`roomName: string   // the room name`
 
The response will be a token that can be used to connect to a room. Try it out with this sample `curl` command:

```shell
curl 'localhost:8081/twilio-token?identity=TestName&roomName=TestRoom'
```

When implemented this application will allow you to join a demo Twilio video conference, and Symbl transcripts will be displayed on screen in real-time.

### Adding Multiple Participants in a Room

If you want to see how the application behaves with multiple participants, you can simply open `localhost:3000` in multiple tabs in your browser and connect to the same room using different user names.

Additionally, if you would like to invite other participants to a room, each participant would need to have their own installation of this application and use the same room name and Account SID (the API Key and Secret can be different).

### Dependencies

```shell
 "dependencies": {
    "@material-ui/core": "^4.11.0",
    "@material-ui/icons": "^4.9.1",
    "@material-ui/styles": "^4.10.0",
    "@primer/octicons-react": "^10.0.0",
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.5.0",
    "@testing-library/user-event": "^7.2.1",
    "clsx": "^1.1.1",
    "concurrently": "^5.1.0",
    "d3-timer": "^1.0.10",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "fscreen": "^1.0.2",
    "is-plain-object": "^4.1.1",
    "lodash-es": "^4.17.15",
    "lodash.throttle": "^4.1.1",
    "moment": "^2.27.0",
    "node-fetch": "^2.6.0",
    "react": "^16.13.1",
    "react-copy-to-clipboard": "^5.0.2",
    "react-dom": "^16.13.1",
    "react-router-dom": "^5.2.0",
    "react-scripts": "3.4.1",
    "twilio": "^3.48.1",
    "twilio-video": "^2.7.1"
  }
```
### API Reference​
---

Find comprehensive information about our REST APIs in the [API Reference](/docs/api-reference/getting-started) section.
 
### Next Steps
---

To learn more about different Integrations offered at Symbl, go to the [Integrations](/docs/integrations/integrations-intro) section.