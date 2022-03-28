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

<div class="card-container">
  <a href="/docs/api-reference/getting-started" class="intro-card">
    <h3>API Reference</h3>
    <p>Browse through our APIs, learn how they work and get detailed descriptions and sample codes for each endpoint.</p>
  </a>
  <a href="/docs/sdk-intro" class="intro-card">
    <h3>SDK</h3>
    <p>Add Symbl capabilities directly to your web and mobile applications with our robust SDKs available in popular languages.</p>
  </a>
  <a href="/docs/tutorials" class="intro-card">
    <h3>Tutorials</h3>
    <p>Find step-by-step instructions on how to implement Symbl with your native video, audio and text conversation tools and applications.</p>
  </a>
  <a href="/guides" class="intro-card">
    <h3>Guides</h3>
    <p>Learn about Symbl's capabilities, understand business use-cases and discover Conversation Intelligence applications across industries.</p>
  </a>
</div>

## Getting Started with Symbl
### Step 1. Get API Credentials
---

Sign up on the [Symbl Platform](https://platform.symbl.ai/#/login) and grab your API Credentials. <br/>
Using the Symbl credentials, you can [generate the authentication token](/docs/developer-tools/authentication) that you can use everytime you make Symbl API calls. 
&nbsp;

### Step 2. Send Recorded Conversation OR Connect Live
---

Using the APIs given below, send conversation data in real-time or after the conversation has taken place (async) i.e., with recorded data. 

&nbsp; &nbsp; 👉 &nbsp; [Async APIs](/docs/async-api/introduction) allow you to send text, audio, or video conversations in recorded format. <br/>
&nbsp; &nbsp; 👉 &nbsp; [Streaming APIs](/docs/streamingapi/introduction) allow you to connect Symbl on a live call via WebSocket protocol.<br/>
&nbsp; &nbsp; 👉 &nbsp; [Telephony APIs](/docs/telephony/introduction) allow you to connect Symbl on a live audio conversation via SIP and PSTN.<br/>

### Step 3. Get Conversation Intelligence
---

In Step 2, the `conversationId` is returned. Use the Conversation ID in the **Conversation API** to generate Symbl's Conversation Intelligence and insights:

&nbsp; &nbsp;👉 &nbsp; [Get Speech-to-Text (Transcripts)](/docs/concepts/speech-to-text)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Topics](/docs/concepts/topics) <br/>
&nbsp; &nbsp;👉 &nbsp; [Get Sentiment Analysis](/docs/concepts/sentiment-analysis) <br/>
&nbsp; &nbsp;👉 &nbsp; [Get Action Items](/docs/concepts/action-items)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Follow-Ups](/docs/concepts/follow-ups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Questions](/docs/concepts/questions)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Trackers](/docs/concepts/trackers)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Conversation Groups](/docs/concepts/conversation-groups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Conversation Analytics](/docs/concepts/conversational-analytics)<br/>
&nbsp; &nbsp;👉 &nbsp; [Get Topic Hierarchy](/docs/concepts/topic-hierarchy)<br/>

 ... and more.

Also, check out our features in the [Labs section](/docs/labs) that are currently being . Symbl Labs is an experimental wing that intends to apply and explore AI research on human conversations. 

<div class="row">
  <div class="column">
  <div class="card2">
  <h3>Try it in Postman</h3>
  <p>Our public collection in Postman has pre-configured API requests that gets you up-and-running in a jiffy. Try it now!</p>

  [![Run in Postman](https://run.pstmn.io/button.svg)](https://god.gw.postman.com/run-collection/13497402-108cafc3-da45-4b00-97fe-4819894f58bb?action=collection%2Ffork&collection-url=entityId%3D13497402-108cafc3-da45-4b00-97fe-4819894f58bb%26entityType%3Dcollection%26workspaceId%3D5f563cfe-42ef-4344-a98a-eae13183fb7c)

  <b><i>If you're new to Postman, watch this <a href="/docs/developer-tools/postman#how-to-use-symbl-postman-collection"> video tutorial </a> to learn how</i></b>
  </div>
  </div>    
</div>


