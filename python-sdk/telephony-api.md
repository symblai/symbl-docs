---
id: python-sdk-telephony-api
title: Using Python SDK with Telephony API on PSTN 
sidebar_label: Using PSTN 
slug: /python-sdk/python-sdk-telephony-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial provides code snippets and instructions on how to utilize Python SDK to call Symbl's Telephony API using PSTN. To view the source code, go to the [open-source repository](https://github.com/symblai/symbl-python) in GitHub. 

The Python SDK provides the following capabilities:

- [Dialing in using PSTN](#dial-in-using-pstn)<br/>

- [Subscribing to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>

- [Receiving Analytics on Email](#receive-insights-on-email).


## Dial in using PSTN

The code snippet below allows you to start a Telephony connection with Symbl via PSTN: 
```py
import symbl

cconnection = symbl.Telephony.start_pstn(
    phone_number="+19663600xxxx"
    dtmf = ",,9950361741#,,645641#") #",,{}#,,{}#".format(meetingId, password)
print(connection)
```
To establish a successful connection, the `phone_number` is mandatory. While connecting from a conference tool, you can use the DTMF details provided by the tool. 

Parameter  | Required | Description | Value
----------- | ------- |  ------- | ------- | 
`phone_number` | Mandatory | Phone number including country code. If you are dailing in via phone to a conference tool, e.g., Zoom, Google hangouts, use the dail-in numbers provided. | `"+11234567890"`
`dtmf`| Optional | The DTMF details for dailing into your conference tool in the format `",,{}#,,{}#".format(meetingId, password)` | `meetingId`- Your meeting ID of your conference tool. Example`"12345"`. &nbsp; &nbsp; `password` - Your meeting password of your conference tool. Example: `"A1B2C3D4"`.&nbsp;&nbsp;`emailId`- Your email ID you wish to receive the analytics on. Example: `"john@example.com"`|

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

After the call has ended, you can trigger an email containing the URL to view the transcription, insights and topics in a single page Web Application- [Symbl's Prebuilt Summary UI](/docs/pre-built-ui/summary-ui). 

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

:::info Stop Connection
You can also utilize `connection.stop()` function to stop a live Telephony connection after a specific time. 
:::

### Additional Resources on GitHub

- [Telephony Class](https://github.com/symblai/symbl-python/blob/main/symbl/readme.md#telephony-class)<br/>
- [Connection Object](https://github.com/symblai/symbl-python/blob/main/symbl/readme.md#connection-object)
