---
id: python-conversation-api
title: Conversation API
sidebar_label: Conversation API
slug: /python-sdk/conversation-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Conversation API provides a REST API interface for getting your processed Speech to Text data(also known as Transcripts) and conversational insights.

You can utilize different functions of Conversation APIs by directly utilizing `symbl.Conversations` if you have already have a `conversationId`. 

### Sample Code

```py
import symbl

parameters_object={'sentiment': True}

print(symbl.Conversations.get_messages(conversation_id='4650518950445056', parameters =parameters_object )
```

### Supported Functions

These APIs require a `conversationId`. When you process any conversation through Symbl whether it is from Async API, Javascript SDK, Telephony or Streaming API, you'll always receive a unique `conversationId`, which consists of numerical digits.

You can utilize different functions of Conversation APIs by directly utilizing `symbl.Conversations`.

  Function | Description 
----------- |------- |
`get_conversation_id()` | Returns a unique Conversation Id of the conversation which you are currently processing.
`get_job_id()` | Returns a Job Id of the conversation which you are currently processing.
`get_messages(conversation_id)` | `parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, click [here](/docs/conversation-api/messages#query-params). Returns a list of messages (sentences spoken by speakers) in a conversation. You can use this for providing transcription for video conference, meeting or telephone call. Example: 
`get_topics(conversation_id)` | `parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, click [here](/docs/conversation-api/get-topics#query-params). Returns the most relevant topics of discussion from the conversation that is generated based on the combination of the overall scope of the discussion.
`get_action_items(conversation_id)` | Returns Action Items which are some specific outcomes recognized in the conversation that requires one or more people in the conversation to act in the future.
`get_follow_ups(conversation_id)` | Returns a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.
`get_members(conversation_id)` | Returns a list of all the members in a conversation. A Member is referred to a participant in the conversation that is uniquely identified as a speaker. Identifying different participants in the meetings can be done by implementing speaker separation.
`get_questions(conversation_id)` | Returns explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question.
`get_conversation(conversation_id)` | Returns the conversation meta-data like meeting name, member name and email, start and end time of the meeting, meeting type and meeting id.
`get_entities(conversation_id)` | Extracts entities (such as custom entities, location, person, date, number, organization,datetime,daterange, etc.) from the conversation.
`get_trackers(conversation_id)` | Returns the occurrence of certain key words or phrases from the conversation.
`get_analytics(conversation_id)` | Returns the speaker ratio, talk time, silence, pace and overlap from the conversation.






