---
id: summarization
title: Summary API (Beta)
description: Use Symbl.ai’s Summary API to capture key points in a conversation and create succinct summaries.
sidebar_label: Introduction
pagination_label: Summary (Beta)
slug: /concepts/summarization/
---

<head>
    <title>Summary API - Capturing Key Points (Beta)</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Beta
This feature is in [Beta](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

Symbl distills important messages and creates succinct Summaries for conversations. You can get these Summaries using the [Summary API](/docs/conversation-api/summary).

Summaries help you save time by analyzing the contents of a conversation that might have several pages of transcripts.

:::note Note
Real-time Summaries are not currently supported.
:::

### Example

The following sample is a multi-line transcript and its corresponding Summary created by the Summary API:

![Recorded Transcript and Summary created by the API](/img/summary_labs_final.png)

You can enable the Summary API for Async APIs by setting the parameter `enableSummary=true` when processing a conversation via Async API </docs/async-api/introduction/>.

When one of the Async API jobs is complete, you can retrieve the Summary by sending a GET request to the Summary API. For details, see the [GET Summary (Beta) API Reference](/docs/conversation-api/summary).

## Tutorials

- [How to get a Summary using Async APIs](/docs/tutorials/summarization/getting-summary)
- [How to Refresh a Summary](/docs/tutorials/summarization/refreshing-summary)
- [Providing Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info)
