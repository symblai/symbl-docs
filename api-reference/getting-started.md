---
id: api-getting-started
title: Symbl APIs
sidebar_label: Getting Started
slug: /api-reference/getting-started
---

 
Symbl APIs accepts HTTPS REST that supports CURD operations.
While the main API that Symbl provides to get the Conversation insights is the Conversation APIs, the Channel APIs provide a host of functionalities. You can view them below:
 
 
<div class="card"><h3></h3> 
 
### Async API
The Async API provides a REST interface to allow you to run a job asynchronously in order to process insights out of audio and video files and textual conversations (Transcripts, Chats, Emails etc.).
 
The primary reasons for using the Async APIs are:
 
- Send and update text conversations
- Send and update recorded audio/video conversation
- Get your data processed by Symbl
- Return `conversationId`
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>
 
<div class="card"><h3></h3> 
 
### Streaming API
Streaming API is a WebSocket based real-time API by Symbl that provides the direct, fastest and most accurate of all other interfaces to push the audio stream in real-time, and get the results back as soon as they're available.
 
- Connect Symbl with live video conversation via WebSocket protocol
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
 
</div>
 
 
<div class="card"><h3></h3> 
 
### Telephony API
 
- Connect Symbl with live audio conversation via SIP/PSTN protocol.
 
- Use the Start Connection endpoint to start a connection with Symbl either over a phone call or conference over PSTN or a SIP using a Dial-in Phone Number or SIP URI with support for DTMF.
 
- Use the Stop Connection endpoint to end the call and close the connection. This will send you an email with all the generated insights from your conversation.
 
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>
 
 
<div class="card"><h3></h3> 
 
### Conversation API
 
- Get Conversation data such as speaker participants,
- Get `conversationId` using which you can then get all the conversation insights.
 
[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)
 
</div>

