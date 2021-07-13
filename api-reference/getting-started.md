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
### Endpoints

Given below is a list of API resources and their corresponding services:

 | Endpoint  | Description | 
---------- | ------- |  
`/v1/process` | Processes text, audio and video data.  
`/v1/append` | Performs append function on a data that is already processed by Symbl.
`/v1/conversation` | Returns the conversation resource that provides Conversation Intelligence like Topics, Action Items, Questions, etc. 
`/v1/job` | Returns the status of the ongoing job request. Read more about `jobId` below. 
`/v1/endpoint:connect` | Connects Symbl via Telephony APIs over PSTN or SIP protocols. 
`/v1/conversations/{conversationId}` |  Gets your processed Speech-to-Text data(also known as Transcripts) and Conversation Insights.
`/v1/manage`  <font color="orange"> BETA</font> | Accessing and managing various resources against your Symbl account. 

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
