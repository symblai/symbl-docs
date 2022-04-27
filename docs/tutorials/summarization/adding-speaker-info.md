---
id: adding-speaker-info
title: Providing Speaker Information to generate Summary
sidebar_label: Providing Speaker Information to generate Summary 
slug: /tutorials/summarization/adding-speaker-info/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Alpha Phase
This feature is in the [Alpha](/docs/product-releases) phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Summaries are generated best when used with Speaker information captured in the conversation. It is highly recommended that you send us the speaker information to use this feature effectively.

You can provide speaker information in one of the following ways:

- #### Async Text API

To send the speaker information, you can use the [POST Async Text API](/docs/async-api/overview/text/post-text/) (field `from` with speaker’s name for each `message` submitted). Learn more in the [Async Text API Messages](/docs/async-api/overview/text/post-text/#messages) section.

You can use an email conversation as the input of the transcript content in the Async Text API. You can submit the email content in the request for the Async text API. 

- #### Async Audio/Async Video API

You can choose from any of the following ways to provide speaker separation based on your scenario:

 - **You have an audio recording where each speaker was recorded in a separate channel in the same audio file.** <br/>
 
Please ensure that the email has at least 60-70 lines due to the conversation size limitation in this version.

:::tip
If you are using the Summary API for the first time, the Async Text API is the simplest way to get started and work your way to creating Summarization for recorded Audio and Video files. 
:::

Use the [Async Audio API](/docs/async-api/overview/audio/post-audio/) with the query parameters `enableSeparateRecognitionPerChannel` and `channelMetadata` to provide the speaker details per channel. This is the most recommended method for speaker separation even if the speaker’s conversation is on top of each other since each has its own channel.

- **You have a recorded file and speaker timeline events like Zoom are available.** <br/>
Send a PUT request to [Speaker Events API](/docs/conversation-api/speaker-events/). This method is accurate for speaker separation as long as the speakers did not talk on top of each other.

- **You have recorded a mono file and no speaker timeline events are available.**<br/>
Use the Speaker Diarization flags in the [Async Audio/Video API](/docs/async-api/tutorials/get-speaker-separation-audio-video/). In this case, you need to give the exact number of speakers in the meeting.
