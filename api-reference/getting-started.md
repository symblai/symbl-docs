---
id: api-getting-started
title: Symbl APIs
sidebar_label: Symbl APIs
slug: /api-reference/getting-started
---
---
 
Symbl APIs accepts HTTPS REST that supports CURD operations.
While the main API that Symbl provides to get the Conversation insights is the Conversation APIs, the Channel APIs provide a host of functionalities. You can view them below:


## ❇️ Explore our APIs

### 💻  Streaming API
Streaming API is based on Web Socket protocol and is used for **real-time** use-cases where both the audio and its results are available in real-time. It can be integrated directly via the **browser or server**.<br/>
👉 &nbsp; [Process live speech-to-text from your computer's microphone](/docs/getting-started-with-streaming-api)

### 🎥  Async API
Async APIs provide the functionality for processing ** stored recordings audio/video** from files or public/signed URLs or textual content from a conversation.<br/>
👉 &nbsp; [Process an audio file using Async API](/docs/getting-started-with-async-api)

### 📞 Telephony API
Based on **PSTN and SIP protocols**, this API provides an interface for the developers to have **Symbl join VoIP calls** and get the results back in real-time as well. Optionally, the developer can also trigger an email at the end of the conversation containing the URL to view the transcription, insights, and topics in a single page web application.<br/>
👉 &nbsp; [Get a transcription from your Zoom call](/docs/getting-started-with-telephony-api)

### 📊 Pre-Built UI
Pre-Built UI is an **interface for the user to interact** with the Symbl's APIs output and understand the conversation better. You can interact with speech-to-text transcription, action items, follow-ups, topics and other APIs. You can generate these API with a simple API call using Experience API after you have processed a conversation using any above-mentioned APIs.

👉 &nbsp; [Experience API](/docs/pre-built-ui/experience-api)


### 🔌 Run on Postman
Easy **Graphic User Interface to run APIs**.

👉 &nbsp; [Postman](/docs/developer-tools/postman)


<div class="row">
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started">Async APIs</a> <br/><br/> The Async API provides a REST interface to allow you to run a job asynchronously in order to process insights out of audio and video files and textual conversations (Transcripts, Chats, Emails etc.).
    Use Async APIs to: <br/>
 
- Send and update text conversations
- Send and update recorded audio/video conversation
- Get your data processed by Symbl
- Return `conversationId`  </div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started">Streaming APIs</a><br/> Streaming API is a WebSocket based real-time API by Symbl that provides the direct, fastest and most accurate of all other interfaces to push the audio stream in real-time, and get the results back as soon as they're available.
 
- Connect Symbl with live video conversation via WebSocket protocol. [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
  </div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started">Conversation API</a><br/>
- Get Conversation data such as speaker participants,
- Get `conversationId` using which you can then get all the conversation insights. </div>
  </div>
  <div class="column">
    <div class="card"><a href="/docs/api-reference/getting-started">Guides</a><br/>Learn about our capabilities, understand business use-case and discover applicabilities across industries.</div>
  </div>
</div>

 
<div class="card.card1"><h3></h3> 
 <div class="row">
  <div class="column">
<h4>Async API</h4>
- The Async API provides a REST interface to allow you to run a job asynchronously in order to process insights out of audio and video files and textual conversations (Transcripts, Chats, Emails etc.).
 
The primary reasons for using the Async APIs are:
 
- Send and update text conversations
- Send and update recorded audio/video conversation
- Get your data processed by Symbl
- Return `conversationId`
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>
 </div>
 </div>
<div class="column">
<div class="card.card1"><h3></h3> 
 
### Streaming API
Streaming API is a WebSocket based real-time API by Symbl that provides the direct, fastest and most accurate of all other interfaces to push the audio stream in real-time, and get the results back as soon as they're available.
 
- Connect Symbl with live video conversation via WebSocket protocol
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
 </div>
</div>
 
<div class="column">
<div class="card.card1"><h3></h3> 
 
### Telephony API
 
- Connect Symbl with live audio conversation via SIP/PSTN protocol.
 
- Use the Start Connection endpoint to start a connection with Symbl either over a phone call or conference over PSTN or a SIP using a Dial-in Phone Number or SIP URI with support for DTMF.
 
- Use the Stop Connection endpoint to end the call and close the connection. This will send you an email with all the generated insights from your conversation.
 
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>
 
</div>

<div class="column">
<div class="card"><h3></h3> 
 
### Conversation API
 
- Get Conversation data such as speaker participants,
- Get `conversationId` using which you can then get all the conversation insights.
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>
</div>

