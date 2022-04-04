---
id: python-sdk-telephony-sip
title: Using Python SDK with Telephony API on SIP 
sidebar_label: Using SIP
slug: /python-sdk/python-sdk-telephony-sips/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This tutorial provides code snippets and instructions on how to utilize Python SDK to call Symbl's Telephony API using SIP. To view the source code, browse the [open-source repository](https://github.com/symblai/symbl-python) in GitHub. 

The Python SDK provides the following capabilities: 

- [Credential Handling](#credential-handling)<br/>

- [Start SIP Connection](#start-sip-connection)<br/>

- [Stop connection](#stop-connection) <br/>

- [Geting Conversation Intelligence and receive Insights on Email](#receive-insights-on-email).<br/>

- [Subscribing to Events (transcript, questions, action-items, etc.)](#subscribe-to-events)<br/>

## Credential Handling 

The Python SDK simplifies the credential handling by allowing you to either add your credentials directly to the connection method's calls or else through a separate file saved to your execution directory. 

To add your credentials directly to the connection method's calls, add the following line: 

```python
      credentials={app_id: <app_id>, app_secret: <app_secret>},
```

To handle credentials through a separate file saved your execution directory, add a file to your project called `symbl.conf` with the following configuration: 

```python 
[credentials]
app_id=
app_secret=
```

## Start SIP Connection

The code snippet below allows you to start a Telephony connection with Symbl via SIP. It can make an outbound call to a phone number using SIP endpoints that can be accessed over the internet using a SIP URI:

```py
import symbl
connection_object = symbl.Telephony.start_sip(uri="sip:8002@sip.example.com") # A valid SIP URI to dial in

```
The `uri` is the SIP addressing scheme that communicates who to call via the SIP.   

## Stop Connection

To stop an active Telephony connection, use the code given below:

```py
import symbl

connection_object.stop()
```

Add the `connectionId` of the connection you want to terminate.<br/>
Optionally, you can also use parameters supported with [Telephony API](/docs/telephony-api/api-reference/#request-parameters). This returns an updated connection object which will have the `conversationId` in the response.

## Subscribe to Events

Once the SIP connection is established, you can get live updates on conversation events such as generation of transcript, action items or questions, etc.

The `connection_object.subscribe` is a function of the `connection` object that listens to the events of a live call and let's you subscribe to them in real-time. It takes a dictionary parameter, where the key can be an event and it's value can be a callback function that should be executed on the occurrence of that event.

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
connection_object.subscribe({
    'transcript_response': lambda response: print('printing the first response ' + str(response)), 
    'insight_response': lambda response: print('printing the first response ' + str(response))
    }
    )
print(connection_object)
```
## Receive Insights on Email

After the call has ended, you can trigger an email containing the URL to view the Transcripts, Topics, Speaker analytics, Follow-ups, Action Items and meeting insights in a single page Web Application in a single page Web Application- [Symbl's Prebuilt Summary UI](/docs/pre-built-ui/summary-ui). 

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

connection_object = symbl.Telephony.start_sip(uri="sip:8002@sip.example.com",
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
connection_object.subscribe({'transcript_response': lambda response: print('printing the first response ' + str(response)), 'insight_response': lambda response: print('printing the first response ' + str(response))})
```


### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Telephony API in the following sections:

- [Telephony Class](/docs/python-sdk/python-sdk-reference#telephony-class)<br/>
- [Connection Object](/docs/python-sdk/python-sdk-reference#connection-object)
