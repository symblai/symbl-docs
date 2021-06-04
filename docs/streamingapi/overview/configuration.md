---
id: configuration
title: Configuration
sidebar_label: Configuration
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';


<Redirect to="/docs/streaming-api/api-reference#config" />

### Contents

* [Config](#config)
* [Main Message Body](#message-body)
* [Speech Recognition](#speech-recognition)
* [Speaker](#speaker)
* [Code Example](#code-example)

### <a name="config"></a>Config

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | false  | 0.0 - 1.0 | 0.5 | Minimum Confidence score that should be met for API to consider it as valid insight, if not provided defaults to 0.5 i.e. 50% or more
```languageCode``` | false | | en-US | The language code as per the BCP 47 specification
```speechRecognition``` | false | | | Speaker identity to use for audio in this WebSocket connection. If omitted, no speaker identification will be used for processing. See below.
```meetingTitle``` | false | | | The name of the meeting.


### <a name="message-body"></a>Main Message Body

Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
```type``` | true | start_request, stop_request | Type of message
```insightTypes``` | false | action_item, question | Types of insights to return. If not provided, no insights will be returned.
```config``` | false | | Configuration for this request. See the config section below for more details.
```speaker``` | false  | | Speaker identity to use for audio in this WebSocket connection. If omitted, no speaker identification will be used for processing. See below.



###  <a name="speech-recognition"></a>Speech Recognition

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  -------
```encoding``` | false  | LINEAR16, FLAC, MULAW | LINEAR16 | Audio Encoding in which the audio will be sent over the WebSocket.
```sampleRateHertz	``` | false  |  | 16000 | The rate of the incoming audio stream.


###  <a name="speaker"></a>Speaker

Field  | Required | Supported Value
---------- | ------- |  -------
```userId``` | false | Any user identifier for the user.
```name``` | false | Display name of the user.



###  <a name="code-example"></a>Code Example


Create a websocket client instance

<Tabs
  defaultValue="javascript"
  values={[
    { label: 'Javascript', value: 'javascript', }
  ]
}>

<TabItem value="javascript">

```js
const ws = new WebSocketClient();

ws.on('connectFailed', (err) => {
  console.error('Connection Failed.', err);
});

ws.on('connect', (connection) => {

  // Start the microphone
  micInstance.start();

  connection.on('close', () => {
    console.log('WebSocket closed.')
  });

  connection.on('error', (err) => {
    console.log('WebSocket error.', err)
  });

  connection.on('message', (data) => {
    if (data.type === 'utf8') {
      const {
        utf8Data
      } = data;
    console.log(utf8Data);  // Print the data for illustration purposes
    }
  });

  console.log('Connection established.');

  connection.send(JSON.stringify({
    "type": "start_request",
    "insightTypes": ["question", "action_item"],
    "config": {
      "confidenceThreshold": 0.9,
      // "timezoneOffset": 480, // Your timezone offset from UTC in minutes
      "languageCode": "en-US",
      "speechRecognition": {
        "encoding": "LINEAR16",
        "sampleRateHertz": 44100 // Make sure the correct sample rate is provided for best results
      },
      "meetingTitle": "Client Meeting"
    },
    "speaker": {
      "userId": "jane.doe@example.com",
      "name": "Jane"
    }
  }));

  micInputStream.on('data', (data) => {
    connection.send(data);
  });
});

```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>


For this example, we timeout our call after 2 minutes but in most scenarios you most likely want to make the `stop_request` call when your WebSoccket connection ends:


<Tabs
  defaultValue="javascript"
  values={[
    { label: 'Javascript', value: 'javascript', }
  ]
}>

<TabItem value="javascript">

```js
// Schedule the stop of the client after 2 minutes (120 sec)

  setTimeout(() => {
    micInstance.stop();
    // Send stop request
    connection.sendUTF(JSON.stringify({
      "type": "stop_request"
    }));
    connection.close();
  }, 120000);
```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>
