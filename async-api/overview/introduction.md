---
id: introduction
title: Introduction to Async API
sidebar_label: Introduction
---
 
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Async API provides a REST interface which helps you to submit any recorded or saved conversations to Symbl.

When you submit a conversation, you'll receive a Conversation ID (`conversationId`), which is unique to your conversation.

![Async API Diagram](/img/asyncDiagram.png)

:::caution
You must wait for the job to complete processing before you proceed with getting the Conversation Intelligence. If you immediately make a GET request to Conversation API, it is possible that you'll receive incomplete insights. Therefore, ensure that you wait for the job to complete.
:::

### `conversationId` allows you to:

1. Manipulate an existing conversation by adding messages.  
2. Setting the confidence threshold, entities, trackers, summary, etc.


:::info
You have Async `POST` REST API to submit any conversation and Async `PUT` REST API to add/append more transcript to an existing conversationId.
:::


### Types of Async API's:

#### Async Text
It can process chats, emails , tweets, phone messages, etc.
1. [Async text](/docs/async-api/overview/text/post-text): Helps you submit textual **files**.

#### Async Audio
It can process calls from sales, telemedicine, lead generation, customer care, etc.

1. [Async Audio](/docs/async-api/overview/audio/post-audio): Helps you submit audio **files**.  
2. [Async Audio URL](/docs/async-api/overview/audio/post-audio-url): Helps you submit audio file **URLs**.

#### Async Video
It can process video calls from sales, telemedicine, lead generation, customer care, interviews etc.

1. [Async Video](/docs/async-api/overview/video/post-video): Helps you submit video **files**.
2. [Async Video URL](/docs/async-api/overview/video/post-video-url): Helps you submit video file **URLs**.
