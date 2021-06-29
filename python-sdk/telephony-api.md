---
id: python-sdk-telephony-api
title: Using Python SDK with Telephony API on PSTN 
sidebar_label: Using PSTN 
slug: /python-sdk/python-sdk-telephony-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial provides code snippets and instructions on how to utilize Python SDK to call Symbl's Telephony API using PSTN protocol. <br/>
To view the source code, go to the [open-source repository](https://github.com/symblai/symbl-python) in GitHub. 

The Python SDK provides the following capabilities:

- [Start connection using PSTN](#start-pstn-connection)<br/>

- [Stop connection](#stop-connection)

- [Get Conversation Intelligence and receive it on Email](#receive-insights-on-email).

- [Subscribe to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>


## Start PSTN Connection

The code snippet below allows you to start a Telephony connection with Symbl via PSTN protocol: 
```py
import symbl

connection = symbl.Telephony.start_pstn(
    phone_number="+19663600xxxx"
    dtmf = ",,9950361741#,,645641#") #",,{}#,,{}#".format(meetingId, password)
print(connection)
```
To establish a successful connection, the `phone_number` is mandatory. While connecting from a conference tool, you can use the DTMF details provided by the tool. 

Parameter  | Required | Description | Value
----------- | ------- |  ------- | ------- | 
`phone_number` | Mandatory | Phone number including country code. If you are dailing in via phone to a conference tool, e.g., Zoom, Google hangouts, use the dail-in numbers provided. | `"+11234567890"`
`dtmf`| Optional | The DTMF details for dailing into your conference tool in the format `",,{}#,,{}#".format(meetingId, password)` | `meetingId`- Your meeting ID of your conference tool. Example`"12345"`. &nbsp; &nbsp; `password` - Your meeting password of your conference tool. Example: `"A1B2C3D4"`.&nbsp;&nbsp;`emailId`- Your email ID you wish to receive the analytics on. Example: `"john@example.com"`|


## Stop Connection

To stop an active Telephony connection, use the code given below:

```py
import symbl

stop(connectionId)
```

Add the `connectionId` of the connection you want to terminate.<br/>
Optionally, you can also use parameters supported with [Telephony API](/docs/telephony-api/api-reference/#request-parameters). This returns an updated connection object which will have the `conversationId` in the response.

## Subscribe to Events

Once the PSTN connection is established, you can get live updates on conversation events such as generation of transcript, action items or questions, etc.

The `connection.subscribe` is a function of the `connection` object that listens to the events of a live call and let's you subscribe to them in real-time. It takes a dictionary parameter, where the key can be an event and it's value can be a callback function that should be executed on the occurrence of that event.

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
## Receive Insights on Email

After the call has ended, you can trigger an email containing the URL to view the Transcripts, Topics, Speaker analytics, Follow-ups, Action Items and meeting insights in a single page Web Application- [Symbl's Prebuilt Summary UI](/docs/pre-built-ui/summary-ui). 

To receive the insights via email, use the code given below:

```py
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
```

`emailId` is the email address where Symbl will send the Conversation Insights. 

A sample of the Insights email is given below:

![Summary UI Email](/img/python-sdk-email.png)

## Complete Sample Code

The sample code given below shows the usage of subscribe function and email action explained above:

```py
import symbl

phone_number = "+919663xxxxx" # Phone number for connecting on your conference call, e.g., Zoom, Google hangouts. 
meetingId = "8931167232" #Your meeting ID.
password = "447891" #Your meeting passcode.
emailId = "john@example.com" #Your registered email ID on the conference tool.

connection = symbl.Telephony.start_pstn(
    phone_number= phone_number,
    dtmf = ",,9950361741#,,645641#", #",,{}#,,{}#".format(meetingId, password)
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
connection.subscribe({
    'transcript_response': lambda response: print('printing the first response ' + str(response)), 
    'insight_response': lambda response: print('printing the first response ' + str(response))
    }
    )
print(connection)
```

### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Telephony API in the following sections:

- [Telephony Class](/docs/python-sdk/python-sdk-reference#telephony-class)<br/>
- [Connection Object](/docs/python-sdk/python-sdk-reference#connection-object)
