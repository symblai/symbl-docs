---
id: summarization
title: Summarization (Alpha)
description: Use Symbl.ai’s summarization API to capture key points in a conversation and create succinct summaries. Learn more.
sidebar_label: Introduction
pagination_label: Summarization
slug: /concepts/summarization/
---

<head>
    <title>Summarization API- Capturing Key Points (Alpha)</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Alpha
This feature is in [Alpha](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

Symbl distills important messages and creates succinct Summaries for long conversations. You can get these Summaries using the [Summary API](/docs/conversation-api/summary).

Summaries help you save time by analyzing the contents of a conversation that might have several pages of transcripts.

:::note Note
Real-time Summaries are not currently supported.
:::

### Example

The following sample is a multi-line transcript and its corresponding Summary created by the Summary API:

![Transcript](/img/summary_labs_final.png)

:::note

- The Summary API generates high-quality Summaries for longer meetings so it is recommended that you use longer meetings with Summary API. <br/>
  If the number of words in a conversation is below 50 or the number of sentences below 3, the Summary will not be created.
:::

### Where can I find the Summary API?

You can enable the Summary API for Async APIs using the following endpoints: <br/>

API  | Summary Endpoint
---------- | -------
[Async Text API (POST/PUT)](/docs/async-api/overview/text/post-text)| ```https://api.symbl.ai/v1/process/text?enableSummary=true ```
[Async Audio API (POST/PUT)](/docs/async-api/overview/audio/post-audio)| ```https://api.symbl.ai/v1/process/audio?enableSummary=true```
[Async Audio URL API (POST/PUT)](/docs/async-api/overview/audio/post-audio-url)| ```https://api.symbl.ai/v1/process/audio/url?enableSummary=true```
[Async Video API (POST/PUT)](/docs/async-api/overview/video/post-video)| ```https://api.symbl.ai/v1/process/video?enableSummary=true```
[Async Video URL API (POST/PUT)](/docs/async-api/overview/video/post-video-url)| ```https://api.symbl.ai/v1/process/video/url?enableSummary=true```

Once the above API job is complete, the corresponding Summary can be obtained by sending a GET request to the Summary API. See the [**Summary API Documentation**](/docs/conversation-api/summary) for details.

**Note**: The PUT operations for the above mentioned Async APIs are also supported.

## Tutorials

- [How to get a Summary using Async APIs](/docs/tutorials/summarization/getting-summary)
- [How to Refresh a Summary](/docs/tutorials/summarization/refreshing-summary)
- [Providing Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info)
