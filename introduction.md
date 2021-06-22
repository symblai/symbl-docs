---
id: introduction
title: Documentation
sidebar_label: Guides
slug: /
---
---

👋 Welcome to Symbl documentation! 

Whether you're looking to understand Symbl's capabilities or get started with 
our APIs, we have you covered!

<div class="row">
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started"><h4>API Reference</h4>Browse through our APIs, learn how they work and get detailed descriptions of each API endpoint. </a></div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started"><h4>SDK</h4>Add Symbl capabilities directly to your web and mobile applications with our robust Python and JavaScript SDKs. </a>
  </div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started"><h4>Tutorials</h4>Find step-by-step instructions on how to implement Symbl with your native video, audio and text conversation tools. </a></div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started"><h4>Guides</h4>Learn about our capabilities, understand business use-case and discover applicabilities across industries.</a></div>
  </div>
</div>
<br/>

## What is Symbl.ai?
---

[Symbl.ai](https://symbl.ai/) is an AI-powered Conversational Intelligence Platform that offers a suite of comprehensive APIs for analysing natural human conversations without the use of upfront training data, wake words or custom classifiers. 

## How does it work?
---
Symbl ingests conversation data from different sources: **text**, **audio** and **video** and processes them in real-time as well as asynchronously to return Conversational Intelligence. 
The **Channel APIs** makes it easy to send your conversation data to Symbl in real-time via **Streaming APIs** or **Telephony APIs** or after the conversation has ended via **Async APIs**. 

Using the **Conversation APIs** you can then get any Conversation Intelligence such as **Speech-to-Text (Transcript)**, **Action Items**, **Topics**, **Action Items**, or generate a pre-built UI with insights for your conversations. 

![symblflow](/img/how-symbl.png)
## Getting Started 
### Step 1: Get Symbl API Credentials
---

Sign up on [Symbl Platform](https://platform.symbl.ai/#/login) and grab your API Credentials. <br/>
Using the Symbl credentials, you can [generate the authentication token](/docs/developer-tools/authentication) that you can use everytime you make an API call to Symbl. 
&nbsp;

### Step 2: Send Recorded Conversation OR Connect Live
---

Using Channel APIs send conversation data in real-time or asynchronously. 

 &nbsp; &nbsp; 👉 &nbsp; [Async APIs](/docs/getting-started-with-streaming-api) allow you to send text, audio or video conversations after it has taken place. <br/>
&nbsp; &nbsp; 👉 &nbsp; [Streaming APIs](/docs/getting-started-with-streaming-api) allow you to connect Symbl on a live video call.<br/>
&nbsp; &nbsp; 👉 &nbsp; [Telephony APIs](/docs/getting-started-with-streaming-api) allow you to connect Symbl on a audio conversation.<br/>

### Step 3: Get Conversation Intelligence
---

The Channel APIs return a `conversationID`. Use this in the **Conversation API** to generate any of the following Conversation Intelligence:

&nbsp; &nbsp;👉 &nbsp; [Speech-to-Text](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topics](/docs/getting-started-with-async-api) <br/>
&nbsp; &nbsp;👉 &nbsp; [Action Items](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Follow Ups](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Sentiment Analysis](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Trackers](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Questions](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Summary](/docs/getting-started-with-async-api)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topic Hierarchy](/docs/getting-started-with-async-api)<br/>
<br/>

<div class="row">
  <div class="column">
    <div class="card1"> <h4><br/>Try it on Postman</h4> Our public collection in Postman is available with pre-configured parameters so you can be up and running with you first API call to Symbl in a jiffy! <br/>
<br/>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13497402-108cafc3-da45-4b00-97fe-4819894f58bb?action=collection%2Ffork&collection-url=entityId%3D13497402-108cafc3-da45-4b00-97fe-4819894f58bb%26entityType%3Dcollection%26workspaceId%3D5f563cfe-42ef-4344-a98a-eae13183fb7c)

   </div>
  </div>
  </div>

