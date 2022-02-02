---
id: trackers
title: Trackers (Beta)
sidebar_label: Introduction
slug: /concepts/trackers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

## What is a Tracker?

Trackers are user-defined entities that allow you to track the occurrences of any characteristics or events in a conversation with just a few examples. You can track critical moments in a conversation across several use cases in both real-time as the conversation is in-progress as well as asynchronously after the conversation is over from recordings. Some use cases for Trackers are when a customer is unhappy, when someone is rude, potential sales opportunity so you can identify emerging trends and gauge the nature of interactions. 

## How Trackers Work

It is important to note that the Trackers don't simply look for keywords or phrases you provide, but rather uses the examples you use to define tracker to generalize the "meaning" of those samples. These could be anything from a single word keyword, phrases or even complete sentences depending on what you'd like to track in a conversation. Symbl will generalize the meaning of those samples you provide and create a fully fledged tracking context, which means even if you have not specified similar or alternative samples, they will be tracked. 

For example, “I don’t have any money” is contextually similar to “I ran out of budget” as both represent similar inherent meaning, but Symbl can generalize this scope of meaning and contextually evaluate occurrences of whenever there's a mention of running out of money to give you tracking mechanism that's easy to use and lightning fast in [real-time with Streaming API](/streaming-api/api-reference#using-trackers).

Using Trackers you can introduce various capabilities such as triggering workflow on tracker event in real-time or asynchronously, help users communicate in real-time, or learn from the characteristics of conversations and so on. The possibilities are really limitless and can be very tailored to specific needs of your application.

#### For example,

Note: The Tracker names used in the example below are only for explanatory purposes. You can create any tracker for your use case and assign any name you like.

- *Sandra is the training head of the Sales team in her company. She uses the insights from the **Intro Tracker** to look at how great sales agents start conversations and **Pricing Tracker** to understand how they share the pricing details. She then uses these insights to train other agents.* 
*The **Intro Tracker** Sandra uses tracks contextually similar phrases such as:*<br/>
&nbsp; &nbsp; &nbsp;*"Thank you for taking some time to speak with me"*,<br/>
&nbsp; &nbsp; &nbsp;*"Have you ever noticed”*,<br/>
&nbsp; &nbsp; &nbsp;*“Have you ever considered”*.<br/>


- *Tom is the Chief Quality Assurance Manager and wants to see how many agents are using negative phrases on the customer calls. He gets insights from the **Negative Phrases Tracker** by tracking the following contextually similar phases:*<br/>
&nbsp; &nbsp; &nbsp;*“I am not interested”*,<br/>
&nbsp; &nbsp; &nbsp;*“This makes me uncomfortable”*,<br/>
&nbsp; &nbsp; &nbsp;*“Not so good”*,<br/>
&nbsp; &nbsp; &nbsp;*“I am skeptical”*,<br/>
&nbsp; &nbsp; &nbsp;*“My only problem is”*,<br/>
&nbsp; &nbsp; &nbsp;*“My only issue is”*,<br/>
&nbsp; &nbsp; &nbsp;*“This does not fit”*.<br/>


- *Samuel uses insights from **Leads Tracker** for all the dial out calls at his car insurance company. By tracking phrases that show buying intent, enquiry about policy options, quotes, discounts, etc., he generates more leads for his business. The **Leads Tracker** tracks the following contextually similar phrases:*<br/>
&nbsp; &nbsp; &nbsp; *“I need”*,<br/>
&nbsp; &nbsp; &nbsp;*“Policy options”*,<br/>
&nbsp; &nbsp; &nbsp;*“Require”*,<br/>
&nbsp; &nbsp; &nbsp;*“Use case”*,<br/>
&nbsp; &nbsp; &nbsp;*“Fits our requirement”*,<br/>
&nbsp; &nbsp; &nbsp;*“Quotes”*,<br/>
&nbsp; &nbsp; &nbsp;*“Discounts”*.

## Key Features

- Ability to create Trackers for commonly used terms or phrases without worrying about the contextual relevancy.
- Bulk creation of Trackers in a single operation.
- Updating or deleting Trackers.
- Ability to get Trackers (using `trackerId` or `name`) which can then be consumed in the Symbl APIs.
- Ability to track a Conversation that contains keywords or phrases of the Tracker. 
- Ability to define the extent to which the keywords match in a message. 
- Easy management (POST/PUT/GET/DELETE) of Trackers using Management API.

## Trackers API 

### Tracker consumption with Management API 

The Trackers APIs can be consumed via the [Management API](/docs/management-api/introduction), which takes the onus of maintaining these entities from the developer and shifts it to Symbl’s backend. The Management API provides an easy-to-consume REST interface for managing these entities. 

Click [here](/docs/management-api/introduction) to read about the capabilities of Management APIs. 

For step-by-step instructions on how to use Trackers API see the [Using Trackers API](/docs/management-api/trackers/overview) page. The Tracker API endpoints are given below:

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker#bulk-create-trackers-api)
Get Tracker with ID| [`GET`v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

:::info
Currently, Trackers is supported with Symbl’s Async APIs and Streaming APIs.
:::

### Trackers Management UI 

You can create, view, edit, and delete Trackers via the Trackers Management UI. To access this feature, log in to the [Symbl Platform](https://platform.symbl.ai/#/login). 

The following capabilities are supported in the Trackers Management UI:

- Create Trackers
- View Trackers
- Edit Trackers
- Delete Trackers

![img-tracker-ui](/img/tracker-management-ui.png)

:::note
**Using punctuations**: You can only pass periods `.`, apostrophes `'` and dashes `-` in the trackers vocabulary. Other punctuations like `?`, `,`, `!`, `:`are not allowed.
**Vocabulary terms**: You must add atleast 5 and a maximum of 50 vocabulary terms per Tracker.
**Trackers limitation**: You can create upto 200 trackers per account. 
:::

## Tutorials

- [How to create a Tracker](/docs/management-api/trackers/overview#consuming-trackers-with-management-api)
- [How to create Trackers with Async API](/docs/management-api/trackers/overview#consuming-trackers-with-async-apis)
- [How to create Trackers with Streaming API](/docs/management-api/trackers/overview#consuming-trackers-with-streaming-api)
- [Viewing detected Trackers with Async API](/docs/async-api/code-snippets/track-phrases-in-a-conversation/#view-detected-trackers)
- [Detect Key Phrases with Streaming API](/docs/streamingapi/code-snippets/detect-key-phrases/#ontrackerresponse-json-response-example)
- [How to create Trackers in Bulk](/docs/management-api/trackers/create-tracker#create-trackers-in-bulk)
- [How to receive Trackers in Spanish with Streaming API](/docs/streamingapi/code-snippets/receive-trackers-in-spanish)