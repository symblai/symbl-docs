---
id: api-getting-started
title: Symbl APIs
sidebar_label: Symbl APIs
slug: /api-reference/getting-started
---
---
 
Symbl APIs are built around [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) interface and are served over secure HTTPS protocol.

Our APIs support all HTTP verbs (or methods, as they are referred to in REST APIs): POST, GET, PUT, PATCH, and DELETE.


[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13497402-108cafc3-da45-4b00-97fe-4819894f58bb?action=collection%2Ffork&collection-url=entityId%3D13497402-108cafc3-da45-4b00-97fe-4819894f58bb%26entityType%3Dcollection%26workspaceId%3D5f563cfe-42ef-4344-a98a-eae13183fb7c)


### Base URL and Endpoints
---
All our APIs use the base URL definition give below for all our services:

```shell
`https://api.symbl.ai/` 
``` 
However, if you are accessing the Labs feature, you must replace the URL with 

Given below is a list of APIs endpoints we currently support based on the service you are accessing.

 |  |
---------- | ------- |  
`v1/process` | Processes all types of text, audio and video data.  
`v1/append` | Performs append function on a data that is already processed by Symbl.
`v1/conversation` | Returns the conversation resource.
`v1/job` | Returns the status of the ongoing job request. Read more about `jobId` below. 
`v1/endpoint:connect` | Connects Symbl via Telephony APIs over PSTN or SIP protocols. 
`v1/conversations/{conversationId}` |  Gets your processed Speech-to-Text data(also known as Transcripts) and Conversational Insights.
`v1/manage`  <font color="orange"> BETA</font> | Accessing and managing various resources against your Symbl account. 

### API Parameters
---

We provide a host of mandatory and optional parameters that you send in the request body or as a query param. Here's a list of how each of the type of APIs accept parameters:

In request body:

- Async Text API
- Async Audio URL API
- Async Video URL API

As query: 

- Async Text API
- Async Audio API- file
- Async Video API - file
- Conversation API for Speaker Diarization and other select features

### Request and Response Format
---
Symbl APIs use standard HTTPS requests and responses. Our reponses are returned in the standard [JSON](https://www.json.org/json-en.html) format. 

### 
### Using conversationId
(TO DO)
When you process any conversation through Symbl whether it's from Async API, Javascript SDK, Telephony or Streaming API, you'll always receive a unique Conversation ID (conversationId), which consists of numerical digits.

### JobId
(TO DO)
As soon as you upload one of your files, or send one of your text for processing to Symbl, You get a jobId (and a conversationId) in response. This jobId is a unique identifier for the job processing the payload you sent.
A job can have a particular status at a time wiz. IN_PROGRESS, SCHEDULED, COMPLETED or FAILED. You can only use a conversationId for the conversation_api class functions once, the job payload is completed.

