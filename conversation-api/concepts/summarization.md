---
id: summarization
title: Summarization API- Capturing Key Points 
description: Use Symbl.ai’s summarization API to capture key points in a conversation and create succinct summaries. Learn more.
sidebar_label: Introduction 
slug: /concepts/summarization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

Symbl distills important messages and creates succinct Summaries for long conversations. You can get these Summaries using the [Summary API](/docs/conversation-api/summary). 

Summaries help you save time required to grasp the contents of a conversation that has several pages of transcripts. 

:::info 
Currently, Summaries cannot be generated in real-time. 
:::

### Example

Given below is an example of a multi-line transcript and its corresponding Summary created by the Summary API:

![Transcript](/img/summary_labs_final.png)


:::note
- The Summary API generates high-quality Summaries for longer meetings so it is recommended that you use longer meetings with Summary API. <br/>
If the number of words in a conversation is below 50 or the number of sentences below 3, the Summary will not be created. 
:::

### Where can I find the Summary API?

You can enable the Summary API for Async APIs using the following endpoints: <br/> 

Note that the base URL for Symbl Labs is always `https://api-labs.symbl.ai`

API  | Summary Endpoint
---------- | -------
[Async Text API (POST/PUT)](/docs/async-api/overview/text/post-text)| ```https://api-labs.symbl.ai/v1/process/text?enableSummary=true ```
[Async Audio API (POST/PUT)](/docs/async-api/overview/audio/post-audio)| ```https://api-labs.symbl.ai/v1/process/audio?enableSummary=true```
[Async Audio URL API (POST/PUT)](/docs/async-api/overview/audio/post-audio-url)| ```https://api-labs.symbl.ai/v1/process/audio/url?enableSummary=true```
[Async Video API (POST/PUT)](/docs/async-api/overview/video/post-video)| ```https://api-labs.symbl.ai/v1/process/video?enableSummary=true```
[Async Video URL API (POST/PUT)](/docs/async-api/overview/video/post-video-url)| ```https://api-labs.symbl.ai/v1/process/video/url?enableSummary=true```

Once the above API job is complete, the corresponding Summary can be obtained by sending a GET request to the Summary API. See the [**Summary API Documentation**](/docs/conversation-api/summary) for details.

**Note**: The PUT operations for the above mentioned Async APIs are also supported. 

## Tutorials
- [How to get a Summary using Async APIs](/docs/tutorials/summarization/getting-summary) 
- [How to Refresh a Summary](/docs/tutorials/summarization/refreshing-summary)
- [Providing Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info)

