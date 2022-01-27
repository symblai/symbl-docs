---
id: introduction
title: Symbl Documentation
sidebar_label: Documentation
slug: /
---
---

👋 Welcome to Symbl documentation! 

Whether you're looking to understand Symbl's capabilities or get started with 
our APIs or SDKs, we've got you covered!

<div class="row">
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started"><h4>API Reference</h4>Browse through our APIs, learn how they work and get detailed descriptions and sample codes for each endpoint.</a></div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/sdk-intro"><h4>SDK</h4>Add Symbl capabilities directly to your web and mobile applications with our robust Python and JavaScript SDKs. </a>
  </div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/tutorials"><h4>Tutorials</h4>Find step-by-step instructions on how to implement Symbl with your native video, audio and text conversation tools and applications. </a></div>
  </div>
  <div class="column">
    <div class="card"><a href="/guides"><h4>Guides</h4>Learn about Symbl's capabilities, understand business use-cases and discover Conversation Intelligence applications across industries.</a></div>
  </div>
</div>
<br/>

## What is Symbl?
---

[Symbl](https://symbl.ai/) is an AI-powered, API first, Conversation Intelligence platform for natural human conversations that works on audio, video, and textual content in real-time or recorded files. Symbl’s APIs let you generate real-time Sentiment Analysis, Action Items, Topics, Trackers, Summary and much more in your applications.

<div><a href="/docs/what-is-symbl">Learn more ➡️ &nbsp;</a></div>

## Getting Started 
### Step 1: Get Symbl API Credentials
---

Sign up on the [Symbl Platform](https://platform.symbl.ai/#/login) and grab your API Credentials. <br/>
Using the Symbl credentials, you can [generate the authentication token](/docs/developer-tools/authentication) that you can use everytime you make Symbl API calls. 
&nbsp;

### Step 2: Send Recorded Conversation OR Connect Live
---

Using the following APIs, send conversation data in real-time or after the conversation has taken place (async). 

&nbsp; &nbsp; 👉 &nbsp; [Async APIs](/docs/async-api/introduction) allow you to send text, audio, or video conversations in recorded format. <br/>
&nbsp; &nbsp; 👉 &nbsp; [Streaming APIs](/docs/streamingapi/introduction) allow you to connect Symbl on a live call via WebSocket protocol.<br/>
&nbsp; &nbsp; 👉 &nbsp; [Telephony APIs](/docs/telephony/introduction) allow you to connect Symbl on a live audio conversation via SIP and PSTN.<br/>


Before getting the Conversation Intelligence, you must wait for the processing job to complete. 


### Step 3: Get Conversation Intelligence
---

Step 2 returns a `conversationId` by default. Use this in the **Conversation API** to generate any of the following Conversation Intelligence:

&nbsp; &nbsp;👉 &nbsp; [Speech-to-Text (Transcripts)](/docs/concepts/speech-to-text)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topics](/docs/concepts/topics) <br/>
&nbsp; &nbsp;👉 &nbsp; [Sentiment Analysis](/docs/concepts/sentiment-analysis) <br/>
&nbsp; &nbsp;👉 &nbsp; [Action Items](/docs/concepts/action-items)<br/>
&nbsp; &nbsp;👉 &nbsp; [Follow-Ups](/docs/concepts/follow-ups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Questions](/docs/concepts/questions)<br/>
&nbsp; &nbsp;👉 &nbsp; [Trackers](/docs/concepts/trackers)<br/>
&nbsp; &nbsp;👉 &nbsp; [Conversation Groups](/docs/concepts/conversation-groups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Conversation Analytics](/docs/concepts/conversational-analytics)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topic Hierarchy](/docs/concepts/topic-hierarchy)<br/>

 ... and more.

Also check out our features in Labs such as Summarization, Comprehensive Action Items, Identifying and Redacting PII in the [Labs section](/docs/labs). 


<div class="row">
  <div class="column">
    <div class="card2"> <h3><br/>Try it in Postman</h3> Our public collection in Postman has pre-configured API requests that gets you up-and-running in a jiffy. Try it now!<br/>
<br/>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13497402-108cafc3-da45-4b00-97fe-4819894f58bb?action=collection%2Ffork&collection-url=entityId%3D13497402-108cafc3-da45-4b00-97fe-4819894f58bb%26entityType%3Dcollection%26workspaceId%3D5f563cfe-42ef-4344-a98a-eae13183fb7c)

***If you're new to Postman, watch this [video tutorial](/docs/developer-tools/postman#how-to-use-symbl-postman-collection) to learn how***. 

   </div>
  </div>
  </div>

