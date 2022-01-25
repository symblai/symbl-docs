---
id: messages
title: Streaming API Reference
sidebar_label: Messages
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';

<Redirect to="/docs/streaming-api/api-reference#messages" />


## Messages

### Start Request


```js
{
  "type": "start_request",
  "insightTypes": ["question", "action_item"],
  "config": {
    "confidenceThreshold": 0.9,
    "languageCode": "en-US",
    "speechRecognition": {
      "encoding": "LINEAR16",
      "sampleRateHertz": 16000
    }
  },
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
}
```
This is a request to start the processing after the connection is established. Right after this message has been sent, the audio should be streamed, any binary audio streamed before the receipt of this message will be ignored.


To get direct access to the mic, we're going to use an API in the WebRTC specification called `getUserMedia()`.

Once the code is running, start speaking and you should see the message_response and insight_response messages getting printed on the console.



<Tabs
  defaultValue="javascript"
  values={[
    { label: 'Javascript', value: 'javascript', }
  ]
}>

<TabItem value="javascript">

```js
const handleSuccess = function(stream) {
  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const processor = context.createScriptProcessor(1024, 1, 1);
  source.connect(processor);
  processor.connect(context.destination);
  processor.onaudioprocess = function(e) {
    // convert to 16-bit payload
    const inputData = e.inputBuffer.getChannelData(0) || new Float32Array(this.options.bufferSize);
    const targetBuffer = new Int16Array(inputData.length);
    for (let index = inputData.length; index > 0; index--)
        targetBuffer[index] = 32767 * Math.min(1, inputData[index]);
    // Send to websocket
    if(ws.readyState === WebSocket.OPEN){
        ws.send(targetBuffer.buffer);
    }
  };
};

navigator.mediaDevices.getUserMedia({ audio: true, video: false })
  .then(handleSuccess);

// Schedule the stop of the client after 2 minutes (120 sec)
setTimeout(() => {
  // Send stop request
  ws.send(JSON.stringify({
    "type": "stop_request"
  }));
  ws.close();
}, 120000);
```

</TabItem>
<TabItem value="curl">
</TabItem>
</Tabs>

### Stop Message
```js
{
  "type": "stop_request"
}
```


This is a request to stop the processing. After the receipt of this message, the service will stop any processing and close the WebSocket connection.

### Sending Binary Messages with Audio
The client needs to send the audio to Service by converting the audio stream into a series of audio chunks. Each chunk of audio carries a segment of audio that needs to be processed. The maximum size of a single audio chunk is 8,192 bytes.

### Service Messages
This section describes the messages that originate in Service and are sent to the client.

Service sends mainly two types of messages (`message_response`, `insight_response`) to the client as soon as they're available.

### Message Response
The `message_response` contains the processed messages as soon as they're ready and available, in the processing of continuous audio stream. This message does not contain any insights.

### Insight Response
The `insight_response` contains the insights from the ongoing conversation as soon as they are available. This message does not contain any messages.



Example of the `message_response` object


```js
{
  "type": "message_response",
  "messages": [
    {
      "from": {
        "name": "Jane",
        "userId": "jane.doe@example.com"
      },
      "payload": {
        "content": "I was very impressed by your profile, and I am excited to know more about you.",
        "contentType": "text/plain"
      }
    },
    {
      "from": {
        "name": "Jane",
        "userId": "jane.doe@example.com"
      },
      "payload": {
        "content": "So tell me, what is the most important quality that you acquired over all of your professional career?",
        "contentType": "text/plain"
      }
    }
  ]
}
```



Example of the `insight_response` object

```js
{
  "type": "insight_response",
  "insights": [
    {
      "type": "question",
      "text": "So tell me, what is the most important quality that you acquired over all of your professional career?",
      "confidence": 0.9997962117195129,
      "hints": [],
      "tags": []
    },
    {
      "type": "action_item",
      "text": "Jane will look into the requirements on the hiring for coming financial year.",
      "confidence": 0.9972074778643447,
      "hints": [],
      "tags": [
        {
          "type": "person",
          "text": "Jane",
          "beginOffset": 0,
          "value": {
            "value": {
              "name": "Jane",
              "alias": "Jane",
              "userId": "jane.doe@symbl.ai"
            }
          }
        }
      ]
    }
  ]
}
```
