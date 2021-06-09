---
id: python-sdk-telephony-sip
title: Using Python SDK with Telephony API on SIP 
sidebar_label: Using SIP
slug: /python-sdk/python-sdk-telephony-sips
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This tutorial provides code snippets and instructions on how to utilize Python SDK to call Symbl's Telephony API using SIP. To view the source code, browse the [open-source repository](https://github.com/symblai/symbl-python) in GitHub. 

The Python SDK provides the following capabilities: 

- [Dialing in using SIP](#dial-in-using-sip)<br/>

- [Subscribing to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>

- [Receiving Insights on Email](#receive-insights-on-email).


## Dial in using SIP

The code snippet below allows you to start a Telephony connection with Symbl via SIP. It can make an outbound call to a phone number using SIP endpoints that can be accessed over the internet using a SIP URI:
```py
import symbl
connection = symbl.Telephony.start_sip(uri="sip:8002@sip.example.com") # A valid SIP URI to dial in

```
The `uri` is the SIP addressing scheme that communicates who to call via the SIP.   

## Subscribe to Events

Once the SIP connection is established, you can get live updates on conversation events such as generation of transcript, action items or questions, etc.

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

:::info Stop Connection
You can also utilize `connection.stop()` function to stop a live Telephony connection after a specific time. 
:::

### Additional Resources on GitHub

- [Telephony Class](https://github.com/symblai/symbl-python/blob/main/symbl/readme.md#telephony-class)<br/>
- [Connection Object](https://github.com/symblai/symbl-python/blob/main/symbl/readme.md#connection-object)
