---
id: api-getting-started
title: Symbl APIs
sidebar_label: Symbl APIs
slug: /api-reference/getting-started
---
---

## Introduction
 
Symbl APIs are built around [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) interface and are served over secure HTTPS protocol.

Our APIs support all HTTP verbs (or methods, as they are referred to in REST APIs): POST, GET, PUT, and DELETE.

Our Streaming APIs are based on [WebSocket protocol](/docs/streamingapi/concepts) and supports two-way communication between client apps and Symbl's backend.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13497402-108cafc3-da45-4b00-97fe-4819894f58bb?action=collection%2Ffork&collection-url=entityId%3D13497402-108cafc3-da45-4b00-97fe-4819894f58bb%26entityType%3Dcollection%26workspaceId%3D5f563cfe-42ef-4344-a98a-eae13183fb7c)

---
### Base URL
All our APIs use the base URL as `https://api.symbl.ai/` and endpoint definition as given below for all our services:

```shell
https://api.symbl.ai/v1/
``` 
However, if you are accessing the Labs feature, you must use the base URL `https://api-labs.symbl.ai`. Read more about Symbl Labs [here](/docs/labs). 

---
### Endpoint Resources

Given below is a list of API resources and their corresponding services:

 | Resource  | Service
---------- | ------- |  
`v1/process` | Processes text, audio and video data.  
`v1/append` | Performs append function on a data that is already processed by Symbl.
`v1/conversation` | Returns the conversation resource that provides Conversation Intelligence like Topics, Action Items, Questions, etc. 
`v1/job` | Returns the status of the ongoing job request. Read more about `jobId` below. 
`v1/endpoint:connect` | Connects Symbl via Telephony APIs over PSTN or SIP protocols. 
`v1/conversations/{conversationId}` |  Gets your processed Speech-to-Text data(also known as Transcripts) and Conversation Insights.
`v1/manage`  <font color="orange"> BETA</font> | Accessing and managing various resources against your Symbl account. 

---
### API Parameters

We provide a host of mandatory and optional parameters that add robust capabilities to your conversation data. For example, passing the optional parameter `sentiment=true` in the API call returns the sentiment score of the conversation.
To standardize the structure of the requests, we allow parameters to be sent differently for different APIs. 

Here's a list of how each of the type of APIs accept parameters:

| In Request Body  | As Query Param
---------- | ------- |
- Async Text API <br/>- Async Audio URL API <br/>- Async Video URL API | - Async Text API<br/>- Async Audio API- file <br/>- Async Video API - file <br/> - Conversation API for Speaker Diarization and other select features.

A list of supported Response Body and Query Params for Symbl's APIs are available in the respective API description pages. 

---
### Request and Response Format

Symbl APIs use standard HTTPS requests and responses. Our reponses are returned in the standard [JSON](https://www.json.org/json-en.html) format. 

For Transcript generation, we return a formatted transcript in [Markdown](/docs/conversation-api/transcript/#create-transcript-in-markdown) and [SRT](/docs/conversation-api/transcript/#create-transcript-in-srt) format.

---

## Getting Conversation Intelligence
### Real time and Asynchronous Flow

You can connect Symbl live on your on-going call and get Conversation Intelligence in real-time. 
Alternatively, you can get insights after the conversation has ended (as long as you have processed your data and have your unique `conversationId`.)
<br/>

![async-realtime](/img/async-realtime-flow-diagram.png)

---

### Using Conversation ID
#### What is a Conversation ID?
When you process any conversation through Symbl whether it's from Async, Telephony, Streaming API, or SDKs you'll always receive a unique `conversationId` which consists of numerical digits. <br/>
For example: `4639962491256832`.

#### How do I use a Conversation ID?
The `conversationId` that is returned by default in the response for Async, Telephony, Streaming API and SDKs allow you to maintain a unique identification for a conversation and generate any insight supported by the Conversation API for the same. 
Having your Conversation ID handly can be useful in the following scenarios:

- While appending previously processed data. For example, if you wish to append the transcription of the previous conversation, you will add the extra data and make a PUT request. 

- While in most cases, the `conversationId` is used for non-real-time data gathering, it is also useful when you want to extract the conversation insights of real-time conversations again.

![conversation_id](/img/conversation_id.png)

---
### Using Job ID
#### What is a Job ID?
As soon as you upload one of your files, or send one of your text, audio or video file for processing to Symbl, you get a `jobId` (and a `conversationId`) in response. This `jobId` is a unique identifier for the job processing the payload you sent.

A job can have a particular status at a time 
 
 - `IN_PROGRESS` 
 - `SCHEDULED`
 - `COMPLETED`  
 - `FAILED` 
 
You can only use a `conversationId` with the Conversation API once the job payload is completed.
To learn about how to get the Job Status, go to the [Job Status](/docs/async-api/overview/jobs-api) page. 