---
id: analytics
<<<<<<< HEAD:docs/conversation-api/concepts/analytics.md
title: Conversational Analytics
sidebar_label: Introduction
slug: /concepts/conversational-analytics/
pagination_label: Conversation Analytics
=======
title: Conversation Analytics
sidebar_label: Conversation Analytics
slug: /concepts/conversational-analytics
>>>>>>> a168d5a (New updates):conversation-api/concepts/analytics.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<<<<<<< HEAD:docs/conversation-api/concepts/analytics.md
---

Conversational Analytics is an understanding of a conversation between two or more people to gain insights on the customer behavior.
=======
Conversation Analytics is an understanding of a conversation between two or more people to gain insights on the customer behavior.
>>>>>>> a168d5a (New updates):conversation-api/concepts/analytics.md

#### Example

If John and Arya talked over the phone for 60 mins where John talked for 40 mins and Arya talked for 10 mins. And for 10 mins no one spoke since John kept Arya on hold, you can get analytics on speaker ratio, talk time per speaker, duration of silence, etc. for monitoring and insights.

### Key Features 

- **Speaker Ratio:** The speaker ratio is the total ratio of a speaker versus another. In the above example, the ratio will be 4:1 signifying that John spoke 4 times more than Arya.

- **Talk time:** Talk time per speaker. In the above example, it will be 40 mins for John and 10 mins for Arya.

- **Silence:** Indicates the time during which none of the speakers spoke anything. It will be shown as 10 mins in the above example.

- **Pace:** It signifies the speed at which the speaker spoke. If John was speaking 100 words per minute the pace would be 100 wpm.

- **Overlap in a Conversation:** Shows if a speaker spoke over another speaker while he/she was speaking. Symbl considers this as an overlap and shows the overlap percent of total conversation and overlap time in seconds.



## Conversation Analytics API

To see Conversation Analytics API in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID**.  A Conversation ID is the key to receiving conversation insights from any conversation. As an example, here's a simple API call which grabs the analytics from the conversation.

👉 [Conversation Analytics API](/docs/conversation-api/analytics)
