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

<table>
    <thead>
        <tr>
            <th>
                Recorded Transcript
            </th>
            <th>
                Summary Created by Summary API
            </th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                <p>
                    <em>Sunita:</em> You're breaking up a lot.
                </p>
                <p>
                    <em>Liam:</em> Yeah, I know at least hopefully you guys can
                    see the transcription that's going on with what I am saying.
                </p>
                <p>
                    <em>Liam:</em> But yeah, we totally need to shift our focus
                    more into our Dev, you know, in the field of Advocates who
                    can really help us grow within their own circles.
                </p>
                <p>
                    <em>Sunita:</em> Yeah.
                </p>
                <p>
                    <em>Liam:</em> So I will go ahead and I will set up a
                    discussion with the product.
                </p>
                <p>
                    <em>Liam:</em> And the dev team.
                </p>
                <p>
                    <em>Sunita:</em> Okay, that works.
                </p>
                <p>
                    <em>Sunita:</em> Perfect.
                </p>
                <p>
                    <em>Sunita:</em> What else Anh I know you had a couple of
                    other things on the agenda, so we can totally talk about
                    that right now.
                </p>
                <p>
                    <em>Anh:</em> Okay.
                </p>
                <p>
                    <em>Anh:</em> Yeah, so the only other thing was as we're
                    talking about employee growth I wanted to basically touch
                    base with you and understand how we can or in which
                    geographies we need to focus on the sales hires first
                    because what and what would be the most important would it
                    be industry or would it be unreasonable understanding
                    because for example in a region like Europe there is there
                    are multiple languages and Regional influences.
                </p>
                <p>
                    <em>Anh:</em> No influences, so should we focus on that or
                    focus more on the industry and grow that way, so they're
                    both strategies?
                </p>
            </td>
            <td>
                <p>
                    Sunita, Liam, and Anh need to focus more on the Dev team and
                    on the product. In order to focus on the sales hire, Anh
                    needs to know which geographies they should focus on.
                </p>
            </td>
        </tr>
    </tbody>
</table>

You can enable the Summary API for Async APIs by setting the parameter `enableSummary=true` when processing a conversation via Async API </docs/async-api/introduction/>.

When one of the Async API jobs is complete, you can retrieve the Summary by sending a GET request to the Summary API. For details, see the [GET Summary (Beta) API Reference](/docs/conversation-api/summary).

## Tutorials

- [How to get a Summary using Async APIs](/docs/tutorials/summarization/getting-summary)
- [How to Refresh a Summary](/docs/tutorials/summarization/refreshing-summary)
- [Providing Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info)
