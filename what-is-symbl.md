---
id: what-is-symbl
title: What is Symbl?
sidebar_label: What is Symbl?
slug: /what-is-symbl
---

---

[Symbl](https://symbl.ai/) is an AI-powered, API first, Conversation Intelligence Platform that provides a suite of **APIs and SDKs** that works with REST interface for recorded files, URLs, or even streaming audio using Websockets. 

With Symbl, you will be able to:

- Generate **Conversation Intelligence** like Sentiment Analysis, Action Items, Topics, Trackers, Summary and much more in your applications.
- Generate **Speech-to-text capabilities** like Transcription, Speaker Separation and Speaker Diarization. 
- Works with **multi-channel data**: Video, Audio, Text and Streaming. 

## How Symbl Works
---
Symbl ingests conversation data from different sources: **text**, **audio** and **video** and processes them in **real-time** as well as **asynchronously** with Symbl's APIs. 

You can send your conversation data to Symbl in real-time via **Streaming APIs** or **Telephony APIs** or after the conversation has ended via **Async APIs**. 

Once the conversation is ingested by Symbl, you can use the [**Conversation APIs**](/docs/python-sdk/conversation-api/) to get Conversation Intelligence such as **Speech-to-Text (Transcript)**, **Action Items**, **Topics**, **Action Items**, and also generate a **Customizable Pre-built UI**.

![how-symbl-works](/img/how-symbl-works-1.png)

:::caution
You must wait for the processing job to complete before making a GET request to the Conversation API. 
:::

## Symbl’s Key Capabilities
---

### ❇️ Speech-to-Text (Transcripts)

Symbl provides access to a searchable transcript with timecodes and speaker information. The transcript is a refined output of the speech-to-text conversion. 

The transcript is one of the easiest ways to navigate through the entire conversation. It can be sorted using speaker-specific or topic-specific filters. Additionally, each insight or action item can also lead to related parts of the transcript.

Transcripts can be generated in real-time for voice and video conversations or using a recorded file. They can also be accessed through the post-conversation summary UI. The post-conversation summary page enables editing, copying and sharing of transcripts from the conversation.

<div><h4><a href="/docs/concepts/speech-to-text"> Learn more about Transcripts ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Topics

Topics provide a quick overview of the key things that were talked about in the conversation. 
They are not detected based on the frequency of their occurrences in the conversation, they are instead detected contextually, and each Topic is an indication of one or more important topics of discussion in the conversation.

Each Topic has a score that indicates the importance of that topic in the context of the entire meeting. It is not that rare that even less frequently mentioned things are of higher importance in the conversation, and this will be reflected in a higher score for those topics, even if other Topics have a high number of mentions in the overall conversation.

<div><h4><a href="/docs/concepts/topics">Learn more about Topics ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Sentiment Analysis

Sentiment Analysis is the interpretation of the general thought, feeling, or sense of an object or a situation.

Symbl's Sentiment API works over Speech-to-Text sentences and Topics (or aspect). With Symbl's Sentiment Analysis feature, you can get the intensity of the sentiment and suggest sentiment type as negative, neutral or positive.

<div><h4><a href="/docs/concepts/sentiment-analysis">Learn more about Sentiment Analysis ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Action Items
An action item is a specific outcome recognized in the conversation that requires one or more people in the conversation to take a specific action showing a clear commitment. 

Examples:

*“This was a great conversation, I will summarize this meeting and send a follow-up to all the stakeholders”*

<div><h4><a href="/docs/concepts/action-items"> Learn more about Action Items ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Comprehensive Action Items (Labs)
The Comprehensive Action Items API is similar to the Action Items API except that the Comprehensive Action Items API returns a rephrased form of the original action item message that's enriched with its corresponding context.

While both are equally powerful in providing Action Items that relate to a discussion, the Comprehensive Action Items API is designed to provide more details such as references to speaker names, context in which the action item was mentioned and an overall comprehensive description of the action items.

<div><h4><a href="/docs/concepts/comprehensive-action-items"> Learn more about Comprehensive Action Items ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Follow-Ups
Symbl can recognize if an action item has a connotation, which requires following up in general or by someone in particular - which usually includes setting up a calendar invite. Follow-ups have details of assignee, datetime ranges entities and is regenerated with speaker context with reference to the transcription or message. The Summary UI comes with an out-of-the-box calendar integration for this follow-up insight type. 

Example: 

*“John, let’s set a time to discuss the board updates tomorrow evening”*

<div><h4><a href="/docs/concepts/follow-ups"> Learn more about Follow-Ups ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Questions
Any explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question. 

Examples:

*“What features are most relevant for our use case?” “How are we planning to design the systems?”*

<div><h4><a href="/docs/concepts/questions"> Learn more about Questions ➡️ &nbsp;</a></h4></div>
<br/>


### ❇️ Trackers (Beta)
When it comes to detecting specific or “contextually similar” occurrences of a particular context in any conversation, the most commonly faced challenge is when the speakers talk about the context in general but do not speak the exact phrases. The Trackers API will however detect both exact and similar phrases.

For example “I don’t have any money” is contextually similar to “I ran out of budget” as both represent similar inherent meaning.

However, after listening/hearing the conversation, it is understood that it indeed has the context that was meant to be detected.

The Trackers solve the above problem by providing the API with the capability to “track” the exact or “contextually similar” occurrences in a conversation.

<div><h4><a href="/docs/concepts/trackers"> Learn more about Trackers ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Conversation Analytics

Conversation Analytics are the important parts of the conversation that enables users to get to the right places in the transcription or trigger actions based on the aspects of the insight items. Today insights are categorized as question, action item and follow-up.  

Some of the other characteristics of insights include: 

- Recognition of the assignee and speaker

- Recognition of the datetime specified

- Use of the speaker context to enhance the quality of the insights

- Ability to accept the timezone to calculate the accurate date and time references

- Ability to control the confidence threshold for the insights

- Built-in punctuation and sentence boundary detection.

<div><h4><a href="/docs/concepts/conversational-analytics"> Learn more about Conversation Analytics ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Summarization (Labs)

Symbl's Conversational Intelligence distills important conversation messages and creates succinct Summaries.

Summaries help you save time required to grasp the contents of a conversation. Using Summary API, you can create Summaries in real-time or after the conversation has ended. You can also create Summaries for chat or email messages.

<div><h4><a href="/docs/concepts/summarization"> Learn more about Summary ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Topic Hierarchy (Beta)
In any conversation, there can be multiple related topics that get discussed and it is possible to organize them in a hierarchy for better insights and consumption. Symbl's Topic Hierarchy algorithm finds a pattern in the conversation and creates parent (global) topics with each parent topic having multiple child topics nested within it.

<div><h4><a href="/docs/concepts/topic-hierarchy"> Learn more about Topic Hierarchy ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Entities

A word or phrase that provides information necessary to fulfill a particular intent. Each entity belongs to a category specified by the entity's associated type.  The platform generates entities related to the insight types for datetime and person.

<div><h4><a href="/docs/conversation-api/entities"> Learn more about Entities ➡️ &nbsp;</a></h4></div>
<br/>

### ❇️ Summary Page UI

At the end of each conversation, a summary of the conversation is generated and the page URL is shared via email to all (or selected) participants. This URL is auto-generated as part of the SDK and Real-Time APIs. 

The Summary page UI includes the following components:

- Title and details of the conversation including date, number of participants, etc.

- Names of all the participants

- Topics covered in the conversation in the order of importance

- Full, searchable transcript of the conversation. Transcripts can be edited, copied and shared.

- Any Insights, action items or questions from the transcript. Insights can also be edited, shared or dismissed, date/assignee for action item to be modified.

- Calendar integration to set a follow-up meeting with Outlook, iCal and Google. 

- Email Integration to share the link of the page with other meeting participants. The email is auto-populated and can be customized on request. 

- The post conversation summary page is also fully customizable, as per the use case or product requirement. This customization is on request only, please connect with to enable this for your account. 

- Trackers and Analytics UI that provides details on the Trackers you have defined for the conversation.

<div><h4><a href="/docs/pre-built-ui/summary-ui"> Learn more about Pre-built UI ➡️ &nbsp;</a></h4></div>
