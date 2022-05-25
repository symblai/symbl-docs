---
id: summarization
title: Summarization (Beta)
description: Use Symbl.ai’s Summarization API to capture key points in a conversation and create succinct summaries.
sidebar_label: Introduction
pagination_label: Summarization (Beta)
slug: /concepts/summarization/
---

<head>
    <title>Summarization API - Capturing Key Points (Beta)</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Beta
This feature is in [Beta](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

Symbl distills important messages and creates succinct Summaries for long conversations. You can get these Summaries using the [Summary API](/docs/conversation-api/summary).

Summaries help you save time by analyzing the contents of a conversation that might have several pages of transcripts.

:::note Note
Real-time Summaries are not currently supported.
:::

### Example

The following sample is a multi-line transcript and its corresponding Summary created by the Summary API:

![Recorded Transcript and Summary created by the API](/img/summary_labs_final.png)

The Summary API generates high-quality Summaries for longer meetings. Current best practice is to use the Summary API for longer meetings.

If the number of words in a conversation is below 50 or the number of sentences below 3, the Summary is not created.

### Where can I find the Summary API?

You can enable the Summary API for Async APIs using the following endpoints:

| API | Summary Endpoint |
| --- | --- |
| [Async Text API (POST/PUT)](/docs/async-api/overview/text/post-text) | `https://api.symbl.ai/v1/process/text?enableSummary=true` |
| [Async Audio API (POST/PUT)](/docs/async-api/overview/audio/post-audio) | `https://api.symbl.ai/v1/process/audio?enableSummary=true` |
| [Async Audio URL API (POST/PUT)](/docs/async-api/overview/audio/post-audio-url) | `https://api.symbl.ai/v1/process/audio/url?enableSummary=true` |
| [Async Video API (POST/PUT)](/docs/async-api/overview/video/post-video) | `https://api.symbl.ai/v1/process/video?enableSummary=true` |
| [Async Video URL API (POST/PUT)](/docs/async-api/overview/video/post-video-url) | `https://api.symbl.ai/v1/process/video/url?enableSummary=true` |

When one of the preceding API jobs is complete, the corresponding Summary can be obtained by sending a GET request to the Summary API. See the [Summary API Documentation](/docs/conversation-api/summary).

## Tutorials

- [How to get a Summary using Async APIs](/docs/tutorials/summarization/getting-summary)
- [How to Refresh a Summary](/docs/tutorials/summarization/refreshing-summary)
- [Providing Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info)
