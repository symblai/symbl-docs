---
id: python-streaming-api
title: Streaming API
sidebar_label: Streaming API
slug: /python-sdk/streaming-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Streaming API is based on WebSocket protocol and can be used for real-time use cases where both the audio and its results from Symbl need to be available in real-time.


The Python SDK provides the following capabilities: 

- [Start Connection](#start-connection)<br/>

- [Stop connection](#stop-connection)<br/>

- [Send audio from Mic](#send-audio-from-mic)<br/>

- [Send audio data](#send-audio-data)<br/>

- [Subscribing to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>


## Start Connection

The code snippet below allows you to a Streaming API connection with Symbl via WebSocket. This returns a connection object:
```py
import symbl
connection = symbl.Streaming.start_connection(
    insight_types=["question", "action_item"],
    speaker={"name": "John", "email": "john@example.com"},
)

```
Parameter | Required | Description |
`credentials`| Optional| Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`speaker` | Optional | Speaker object containing `name` and `email` field.
`insight_types` | Optional | The insights to be returned in the WebSocket connection.
`config` | Optional | Use this parameter to pass `confidenceThreshold`, `languageCode` For more details, see the Config parameter documentation [here](/docs/streaming-api/api-reference/#config). 

## Stop Connection

To stop an active WebSocket connection, use the code given below:

```py
import symbl

connection.stop()
```

Add the `connectionId` of the connection you want to terminate.<br/>
This returns an updated connection object which will have the `conversationId` in the response.

## Subscribe to Events

Once the WebSocket connection is established, you can get live updates on conversation events such as generation of transcript, action items or questions, etc.

```py
import symbl

connection.subscribe(
    {
        "message_response": lambda response: print(
            "got this response from callback", response
        ),
        "message": lambda response: print("got this response from callback", response),
        "topic_response": lambda response: print(
            "got this response from callback", response
        ),
    }
)
```

The `connection.subscribe` is a function of the `connection` object that listens to the events of a live call and let's you subscribe to them in real-time. It takes a dictionary parameter, where the key can be an event and its value can be a callback function that should be executed on the occurrence of that event.

### Supported Events 

Following are the functions for different events you can subscribe to: 

Event  | Description 
----------- |------- |
`message_response` | Generates an event whenever transcription is available.
`insight_response` | Generates an event whenever an `action_item` or `question` is identified in the message. 
`tracker_response`| Generates an event whenever a tracker is identified in the transcription.
`topic_response` | Generates an event whenever a topic is identified in any transcription.
`message`| It will generate an event for live transcriptions. It will include isFinal property which will be False initially, meaning the transcription is not finalized.

## Send Audio from Mic

This allows you to send data to WebSocket directly via your mic. It is a recommended function for first time users sending audio to Symbl.   

To receive the insights via email, use the code given below:

```py
import symbl

connection.send_audio_from_mic()
import sounddevice as sd

def callback(indata, *args):
    connection.send_audio(indata.copy().tobytes())
with sd.InputStream(
    blocksize=4096, samplerate=44100, channels=1, callback=callback, dtype="int16"
):
    while True:
        pass

```

`send_audio_from_mic` function can be used with Streaming class only.


Uses `sounddevice` library to take input from User's mic and send data to websocket directly. Recommended function for first time users.

The device parameter can take the deviceId (integer) as input, for more information see sd.query_devices() [here.](https://python-sounddevice.readthedocs.io/en/0.3.12/api.html#sounddevice.query_devices)

If this function is not running correctly, make sure the sounddevice library is installed correctly and has access to your microphone. For more details, see [Python Sounddevice Installation Guide](https://python-sounddevice.readthedocs.io/en/0.4.1/installation.html)

## Send Audio Data

You can send custom audio data from some other library using the following code. 

The `send_audio` function sends audio data to WebSockets in binary format.


```py
import symbl
connection.send_audio(data)

```

## Get Conversation Object

Connection object has a conversation parameter through which you can directly query the Conversation API with the provided `conversationId`.

```py
import symbl

connection = symbl.Streaming.start_connection()

...

connection.conversation.get_topics()
```

### Complete Sample Code

The sample code given below shows the usage of subscribe function and email action explained above:

```py
import symbl

events = {
    "message_response": lambda response: print(
        "Final Messages -> ",
        [message["payload"]["content"] for message in response["messages"]],
    ),
    "message": lambda response: print(
        "live transcription : {}".format(
            response["message"]["punctuated"]["transcript"]
        )
    )
    if "punctuated" in response["message"]
    else print(response),
    "insight_response": lambda response: [
        print(
            "Insights Item of type {} detected -> {}".format(
                insight["type"], insight["payload"]["content"]
            )
        )
        for insight in response["insights"]
    ],
    "topic_response": lambda response: [
        print(
            "Topic detected -> {} with root words, {}".format(
                topic["phrases"], topic["rootWords"]
            )
        )
        for topic in response["topics"]
    ],
}
connection = symbl.Streaming.start_connection(
    insight_types=["question", "action_item"],
    speaker={"name": "Rishabh", "email": "rishabh.chaturvedi@symbl.ai"},
)
connection.subscribe(events)
connection.send_audio_from_mic()
```

### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to the Streaming API in the following sections:

- [Streaming Class](/docs/python-sdk/python-sdk-reference#streaming-class)<br/>
- [Connection Object](/docs/python-sdk/python-sdk-reference#connection-object)

### Error Code

Error | Description
----- | -------- | 
`sounddevice.PortAudioError: Error opening InputStream: Internal PortAudio error [PaErrorCode -9986]`| PortAudio Errors on Mac Systems: If you're getting PortAudio Error, please consider updating the PortAudio library in your system. Running the following command can help. <br/> `brew install portaudio`.