---
id: introduction
title: Introduction
sidebar-label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Conversation API provides a REST API interface for getting your processed Speech to Text data(also known as Transcripts) and Conversational Insights.

To view insights about a conversion, you must provide the API with a Conversation ID.

### What's a Conversation ID?
When you process any conversation through Symbl whether it's from [Async API](/docs/async-api/overview/introduction), [Javascript SDK](/docs/javascript-sdk/overview/introduction), [Telephony](/docs/telephony/introduction) or [Streaming API](/docs/streamingapi/overview/introduction), you'll always receive a unique Conversation ID (`conversationId`), which consists of numerical digits.


### Concepts

* [Speech to Text](/docs/concepts/speech-to-text)
* [Action Items](/docs/concepts/action-items)
* [Follow Ups](/docs/concepts/follow-ups)
* [Topics](/docs/concepts/topics)
* [Topic Hierarchy](/docs/concepts/topic-hierarchy)
* [Sentiment Analysis](/docs/concepts/sentiment-analysis)
* [Conversational Analytics](/docs/concepts/conversational-analytics)




### API Reference

If you have a Conversation ID the Conversation API can help you:
1. [Conversation](/docs/conversation-api/conversation-data):  Find the meeting name, member name and email, start and end time of the meeting, meeting type and meeting ID details.
2. [Delete Conversation](/docs/conversation-api/delete-conversation): Delete a conversation and all related entities.
3. [Members](/docs/conversation-api/members): Find all members/participants from a conversation.
4. [Update Members](/docs/conversation-api/update-members): Update the unique speakers detected as members/participants.
5. [Message](/docs/conversation-api/messages): Provide you with [Speech to Text](/docs/concepts/speech-to-text), Sentiments and [Action Items](/docs/concepts/action-items) in conversation.
6. [Topic](/docs/conversation-api/get-topics): Provide you with important topics from a conversation.
7. [Action Items](/docs/conversation-api/action-items): Provides you with important action items from a conversation.
8. [Questions](/docs/conversation-api/questions): Provides you with questions present in a conversation.
9. [Follow Ups](/docs/conversation-api/follow-ups): Provides you with follow-up requests said in a conversation.
10. [Analytics](/docs/conversation-api/analytics):  Find speaker ratio, talk time, silence, pace and overlap in a conversation.
11. [Entities](/docs/conversation-api/entities): Provides you with entities like location, person, date, number, organization, datetime, daterange, etc.
