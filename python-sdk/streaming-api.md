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

- [Subscribing to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>


## Start Connection

The code snippet below allows you to start a Telephony connection with Symbl via SIP. It can make an outbound call to a phone number using SIP endpoints that can be accessed over the internet using a SIP URI:
```py
import symbl
connection = symbl.Telephony.start_sip(uri="sip:8002@sip.example.com") # A valid SIP URI to dial in

```
The `uri` is the SIP addressing scheme that communicates who to call via the SIP.   

## Stop Connection

To stop an active Telephony connection, use the code given below:

```py
import symbl

stop(connectionId)
```

Add the `connectionId` of the connection you want to terminate.<br/>
Optionally, you can also use parameters supported with [Telephony API](/docs/telephony-api/api-reference/#request-parameters). This returns an updated connection object which will have the `conversationId` in the response.

## Subscribe to Events

Once the WebSocket connection is established, you can get live updates on conversation events such as generation of transcript, action items or questions, etc.

The `connection.subscribe` is a function of the `connection` object that listens to the events of a live call and let's you subscribe to them in real-time. It takes a dictionary parameter, where the key can be an event and its value can be a callback function that should be executed on the occurrence of that event.

### Supported Events 

Following are the functions for different events you can subscribe to: 

Event  | Description 
----------- |------- |
`message_response` | Generates an event whenever transcription is available.
`insight_response` | Generates an event whenever an `action_item` or `question` is identified in the message. 
`tracker_response`| Generates an event whenever a tracker is identified in the transcription.
`transcript_response` | Also generates transcription values, however these will include an `isFinal` property which will be False initially meaning the transcription are not finalized.
`topic_response` | Generates an event whenever a topic is identified in any transcription.

### Usage of Subscribe Event

```py
connection.subscribe({
    'transcript_response': lambda response: print('printing the first response ' + str(response)), 
    'insight_response': lambda response: print('printing the first response ' + str(response))
    }
    )
print(connection)
```
## Send Audio from Mic

This allows you to send data to WebSocket directly via your mic. It is a recommended function for first time users sending audio to Symbl.   

To receive the insights via email, use the code given below:

```py
import symbl

connection = symbl.Streaming.start_connection()

connection.subscribe({'message_response': lambda response: print('got this response from callback', response)})

connection.send_audio_from_mic()
```

`send_audio_from_mic` function can be used with Streaming class only.

## Stop Connection

To stop an active WebSocket connection, use the code given below:

```py
import symbl

stop(connectionId)
```

## Complete Sample Code

The sample code given below shows the usage of subscribe function and email action explained above:

```py
import symbl

emailId = "john@example.com" #Your registered email ID on the conference tool. 

connection = symbl.Telephony.start_sip(uri="sip:8002@sip.example.com",
  actions = [
        {
          "invokeOn": "stop",
          "name": "sendSummaryEmail",
          "parameters": {
            "emails": [
              emailId
            ],
          },
        },
      ]
)
connection.subscribe({'transcript_response': lambda response: print('printing the first response ' + str(response)), 'insight_response': lambda response: print('printing the first response ' + str(response))})
```


### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Telephony API in the following sections:

- [Telephony Class](/docs/python-sdk/python-sdk-reference#telephony-class)<br/>
- [Connection Object](/docs/python-sdk/python-sdk-reference#connection-object)
