---
id: summarization
title: Summarization (Labs)
sidebar_label: Summarization (Labs)
slug: /concepts/summarization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

Symbl's Conversational Intelligence distills important conversation messages and creates succinct Summaries. 

Summaries helps you save time required to grasp the contents of a conversation. Using Summary API, you can create Summaries in real-time or after the conversation has ended. You can also create Summaries for chat or email messages. 


#### Example

**Note:** The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

Please contact labs@symbl.ai if you wish to access these features. 
:::

**Summarization** is capturing key discussion points in a conversation that helps you shorten the time to grasp the contents of the conversation. 
Using Summary API, you can create Summaries that are succinct and context-based. 

Symbl's Conversational Intelligence identifies important conversation messages and creates Summaries even for long conversations that might have multiple speakers. 

### Example

Given below is an example of a multi-line transcript and its corresponding Summary created by the Summary API:

![Transcript](/img/summary_labs_final.png)


:::info Points to Note
- The Summary API is capable of generating Summaries for short meetings. However, the quality of Summaries created for longer meetings is of much higher quality so it is recommended that you use longer meetings with Summary API. 
- If you are using the [Speaker Separation](/docs/async-api/tutorials/get-speaker-separation-audio-video/) feature, the Summary will use temporary labels to assign speakers. For example, it will assign the speakers with labels such as "Speaker 1", "Speaker 2" and so on. In this case, we recommend you to update the labels with actual names using [Speaker Events API](/docs/conversation-api/speaker-events) so you can get a more personalized summary. 
- Currently, Summarization can be enabled directly with Async APIs only. Support for Summarization in real-time will be added soon. However, for Telephony API or Streaming API, it can be generated after the conversation has ended. 
:::

### Summary API

👉 [Async APIs](/docs/async-api/overview/text/post-text)

You must first enable Summarization while invoking the Async APIs for text, video and audio conversation using the parameter `enableSummary=true`. The Async API call will return the `conversationId`. After this, you can get the corresponding Summary by making a GET request to the Summary API. 

👉 [Summary API](/docs/conversation-api/summary)


:::info
- Currently, the Summary is designed to be generated on the recorded audio/video files or textual conversations. For Telephony API or Streaming API, it can be generated after the conversation has ended.
- If you are using the [Speaker Separation](/docs/async-api/tutorials/get-speaker-separation-audio-video/) feature, the Summary will use temporary labels to assign speakers. For example, it will assign the speakers with labels such as "Speaker 1", "Speaker 2" and so on. In this case, we recommend you to update the labels with actual names using [Speaker Events API](/docs/conversation-api/speaker-events) so you can get a more personalized summary. 
- Currently, Summarization can be enabled directly with Async APIs only. Support for Summarization in real-time will be added soon. However, if you are using Streaming or Telephony API, you can set the query param `refresh=true` in the [Summary API](/docs/conversation-api/summary) and generate the Summary after the conversation has ended. 
:::

### Where can I find the Summary API?

#### Async APIs

You can enable the Summary API for Async APIs using the following endpoints: <br/> 

Note that the base URL for Symbl Labs is always `https://api-labs.symbl.ai`

API  | Summary Endpoint
---------- | -------
[Async Text API (POST)](/docs/async-api/overview/text/post-text)| ```https://api-labs.symbl.ai/v1/process/text?enableSummary=true ```
[Async Audio API (POST)](/docs/async-api/overview/audio/post-audio)| ```https://api-labs.symbl.ai/v1/process/audio?enableSummary=true```
[Async Audio URL API (POST)](/docs/async-api/overview/audio/post-audio-url)| ```https://api-labs.symbl.ai/v1/process/audio/url?enableSummary=true```
[Async Video API (POST)](/docs/async-api/overview/video/post-video)| ```https://api-labs.symbl.ai/v1/process/video?enableSummary=true```
[Async Video URL API (POST)](/docs/async-api/overview/video/post-video-url)| ```https://api.symbl.ai/v1/process/video/url?enableSummary=true```

Once the above API job is complete, the corresponding Summary can be obtained by sending a GET request to the Summary API. See the [**Summary API Documentation**](/docs/conversation-api/summary) for details.

**Note**: The PUT operations for the above mentioned Async APIs are also supported. 

#### Real-time APIs

### Providing Speaker Information to generate Summary

Summaries are generated best when used with Speaker information captured in the conversation. It is highly recommended that you send us the speaker information to use this feature effectively.

You can provide speaker information in one of the following ways:

- #### Async Text API

To send the speaker information, you can use the [POST Async Text API](/docs/async-api/overview/text/post-text/) (field `from` with speaker’s name for each `message` submitted). Learn more in the [Async Text API Messages](/docs/async-api/overview/text/post-text/#messages) section.

You can use an email conversation as the input of the transcript content in the Async Text API. You can submit the email content in the request for the Async text API. 


> **Beginner Tip** <br/>
If you are using the Summary API for the first time, the Async Text API is the simplest way to get started and work your way up to creating Summarization for recorded Audio and Video files. 

- #### Async Audio/Async Video API

You can choose from any of the following ways to provide speaker separation based on your scenario:

 - **You have an audio recording where each speaker was recorded in a separate channel in the same audio file.** <br/>
 
Please ensure that the email has at least 60-70 lines due to the conversation size limitation in this version.

:::tip
If you are using the Summary API for the first time, the Async Text API is the simplest way to get started and work your way to creating Summarization for recorded Audio and Video files. 
:::

#### Async Audio/Async Video API

You can choose from any of the following ways to provide speaker separation based on your scenario:

- **You have an audio recording where each speaker was recorded in a separate channel in the same audio file.** <br/>

Use the [Async Audio API](/docs/async-api/overview/audio/post-audio/) with the query parameters `enableSeparateRecognitionPerChannel` and `channelMetadata` to provide the speaker details per channel. This is the most recommended method for speaker separation even if the speaker’s conversation is on top of each other since each has its own channel.

- **You have a recorded file and speaker timeline events like Zoom are available.** <br/>
Send a PUT request to [Speaker Events API](/docs/conversation-api/speaker-events/). This method is accurate for speaker separation as long as the speakers did not talk on top of each other.

- **You have recorded a mono file and no speaker timeline events are available.**<br/>
Use the Speaker Diarization flags in the [Async Audio/Video API](/docs/async-api/tutorials/get-speaker-separation-audio-video/). In this case, you need to give the exact number of speakers in the meeting.