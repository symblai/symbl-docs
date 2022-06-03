---
id: adding-speaker-info
title: Provide Speaker Information to generate Summary
sidebar_label: Provide Speaker Information to generate Summary 
slug: /tutorials/summarization/adding-speaker-info/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Beta
This feature is in [Beta](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

Summaries are more meaningful when they include the context of Speaker information captured in the conversation. Symbl recommendeds providing speaker information.

Provide speaker information using one of the following methods:


## Async Text API

To send the speaker information, use the [POST Async Text API](/docs/async-api/overview/text/post-text/) with field `from` identified as the speaker’s name for each `message` submitted. For details see the [Async Text API Messages](/docs/async-api/overview/text/post-text/#messages) section.

You can use an email conversation as the input of the transcript content in the Async Text API. You can submit the email content in the request for the Async text API.


## Async Audio or Async Video API

You can choose one of these three options to provide speaker separation based on your scenario:

* **You have an audio recording and each speaker was recorded in a separate channel in the same audio file.** 

   If you are using the Summary API for the first time, the Async Text API is the simplest way to get started and work your way to creating a Summary for recorded Audio and Video files.  

   Use the [Async Audio API](/docs/async-api/overview/audio/post-audio/) with the query parameters `enableSeparateRecognitionPerChannel` and `channelMetadata` to provide the speaker details per channel. This is the recommended method for speaker separation even if the speaker’s conversation overlap since each has its own channel.  

* **You have a recorded file and speaker timeline events like Zoom are available.**

   Send a PUT request to [Speaker Events API](/docs/conversation-api/speaker-events/). This method is accurate for speaker separation as long as the speakers did not talk on top of each other.  
   

* **You have recorded a mono file and no speaker timeline events are available.**

   Use the Speaker Diarization flags in the [How to implement speaker separation with Async Audio or Video Files](/docs/async-api/tutorials/get-speaker-separation-audio-video/). In this case, you need to give the exact number of speakers in the meeting.
