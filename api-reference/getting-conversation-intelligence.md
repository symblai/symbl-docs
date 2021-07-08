---
id: getting-conversation-intelligence
title: Get Conversation Intelligence
sidebar_label: Get Conversation Intelligence
slug: /api-reference/getting-conversation-intelligence
---
---

### Conversation ID
#### What is a Conversation ID?
A Conversation ID is a 16-digit numeric value that is a unique identifier of a conversation. It is very important to have the `conversationId` handy as you need it while getting the Conversation Intelligence. The `conversationId` has to be passed in the Conversation API to fetch Transcripts, Topics, Action Items etc. 

When you process any conversation through Symbl using Async, Telephony or Streaming APIs and SDKs, you will always receive a unique `conversationId` specific to that request. 

#### Why do I need it?
Use the Conversation ID for:

- Getting Conversation Intelligence (using Conversation API) such as Transcripts, Topics, Action Items and others. 

- Appending already processed data. For example, if you wish to append the transcript of a conversation, you have to send the `conversationId`. 

- While in most cases, the `conversationId` is used for non-real-time data gathering, it is also useful when you want to extract the conversation insights of real-time conversations again.

![conversation_id](/img/conversation_id.png)


### Real-time vs Asynchronous

You can connect Symbl live on your on-going call and get Conversation Intelligence in real-time. 
Alternatively, you can get insights after the conversation has ended (as long as you have your unique `conversationId`.).
<br/>

![async-realtime](/img/async-realtime-flow-diagram1.png)
#### Real-time APIs
- Streaming API: Symbl's Streaming API is based on WebSocket protocol and can be used for real-time use-cases where both the audio and its results from Symbl's back-end need to be available in real-time. It can be integrated directly via the browser or server.
- Telephony API: Based on PSTN and SIP protocols, the Telephony API provides an interface for the developers to have Symbl bridge/join VoIP calls and get the results back in real-time as well. 

#### Async APIs
The Async API provides a REST interface that helps you submit any recorded or saved conversations to Symbl. Its is supported for all data sources:

- Text
- Audio
- Video


---
