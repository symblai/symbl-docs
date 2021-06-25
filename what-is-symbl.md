---
id: what-is-symbl
title: What is symbl.ai?
sidebar_label: What is Symbl.ai?
slug: /what-is-symbl
---

---

[Symbl.ai](https://symbl.ai/) is an AI-powered, API first, Conversational Intelligence platform for natural human conversations that works on audio, video, and textual content in real-time or recorded files. Symbl’s APIs let you generate real-time Topics, Action Items, Trackers, Sentiment Analysis and much more in your applications.

## How Symbl Works
---
Symbl ingests conversation data from different sources: **text**, **audio** and **video** and processes them in real-time as well as asynchronously to return Conversational Intelligence. 
The **Channel APIs** makes it easy to send your conversation data to Symbl in real-time via **Streaming APIs** or **Telephony APIs** or after the conversation has ended via **Async APIs**. 

Using the **Conversation APIs** you can then get any Conversation Intelligence such as **Speech-to-Text (Transcript)**, **Action Items**, **Topics**, **Action Items**, or generate a pre-built UI with insights for your conversations. 

![symblflow](/img/how-symbl.png)

## Symbl’s Key Capabilities
---
### ❇️ Topics

Summary topics provide a quick overview of the key things that were talked about in the conversation. 
They are not detected based on the frequency of their occurrences in the conversation, they are instead detected contextually, and each summary topic is an indication of one or more important topics of discussion in the conversation.

Each summary topic has a score that indicates the importance of that topic in the context of the entire meeting. It is not that rare that even less frequently mentioned things are of higher importance in the conversation, and this will be reflected in a higher score for those topics, even if other summary topics have a high number of mentions in the overall conversation.

<div><h4><a href="url">Learn more about Topics ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Action Items
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action showing a clear commitment. 

Examples:

*“This was a great conversation, I will summarize this meeting and send a follow-up to all the stakeholders”*

<div><h4><a href="url"> Learn more about Action Items ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Questions
Any explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question. 

Examples:

*“What features are most relevant for our use case?” “How are we planning to design the systems?”*

<div><h4><a href="url"> Learn more about Action Items ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Follow-Ups
The platform can recognize if an action item has a connotation, which requires following up in general or by someone in particular - which usually includes setting up a calendar invite. Follow ups have details of assignee, datetime ranges entities and is regenerated with speaker context with reference to the transcription or message. The Summary UI comes with an out of the box calendar integration for this follow-up insight type. 

Example: 

*“John, let’s set a time to discuss the board updates tomorrow evening”*

<div><h4><a href="url"> Learn more about Action Items ➡️ &nbsp;</a></h4></div>
<br/>


### ❇️ Transcripts

The platform provides access to a searchable transcript with timecodes and speaker information. The transcript is a refined output of the speech-to-text conversion. 

The transcript is one of the easiest ways to navigate through the entire conversation. It can be sorted using speaker-specific or topic-specific filters. Additionally, each insight or action item can also lead to related parts of the transcript.

Transcripts can be generated in real-time for voice and video conversations or using a recorded file. They can also be accessed through the post-conversation summary UI. The post-conversation summary page enables editing, copying and sharing of transcripts from the conversation.

<div><h4><a href="url"> Learn more about Action Items ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Insights

Insights are the important parts of the conversation that enables users to get to the right places in the transcription or trigger actions based on the aspects of the insight items. Today insights are categorized as question, action item and follow-up.  

Some of the other characteristics of insights include: 

- Recognition of the assignee and speaker

- Recognition of the datetime specified

- Use of the speaker context to enhance the quality of the insights

- Ability to accept the timezone to calculate the accurate date and time references

- Ability to control the confidence threshold for the insights

- Built-in punctuation and sentence boundary detection.

<div><h4><a href="url"> Learn more about Insights ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Entities

A word or phrase that provides information necessary to fulfill a particular intent. Each entity belongs to a category specified by the entity's associated type.  The platform generates entities related to the insight types for datetime and person.

<div><h4><a href="url"> Learn more about Entities ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Work Tool Integrations

The platform currently offers email and calendar as out-of-box integrations. The calendar integration is only available as part of the Summary UI. However, the conversation data can be extended to any work tool where the actionable insights need to be pushed to enhance productivity and reduce the time taken by users to manually enter information from conversations. This can be implemented by using the Websocket or Webhook in real time or asynchronous communication channels. 

Some of the examples of these work tools can be:

- Sales platforms such as Salesforce, Hubspot

- Task management solutions such as Trello, Google Tasks

- Calendars such as Outlook, Google

- Project Management Tools such as Monday, Asana

- Collaboration platforms such as Slack, Flock.

<div><h4><a href="url"> Learn more about Pre-built Summary UI ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Summary Page UI

At the end of each conversation, a summary of the conversation is generated and the page URL is shared via email to all (or selected) participants. This URL is auto-generated as part of the SDK and Real-Time APIs. 

The Summary page UI includes the following components:

- Title and details of the conversation including date, number of participants, etc.

- Names of all the participants

- Topics covered in the conversation in the order of importance

- Full, searchable transcript of the conversation. Transcripts can be edited, copied and shared.

- Any Insights, action items or questions from the transcript. Insights can also be edited, shared or dismissed, date/assignee for action item to be modified.

- Calendar integration to set a follow-up meeting with Outlook, iCal and Google 

- Email Integration to share the link of the page with other meeting participants. The email is auto-populated and can be customized on request. 

- The post conversation summary page is also fully customizable, as per the use case or product requirement. This customization is on request only, please connect with to enable this for your account. 

<div><h4><a href="url"> Learn more about Pre-built UI ➡️ &nbsp;</a></h4></div>
