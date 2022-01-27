---
id: abstract-topics
title: Abstract Topics (Labs)
sidebar_label: Introduction
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

Abstract Topics are topics that at a glance help you determine recurrent themes in a conversation.

#### Example

- Conversation on topics such as pricing, negotiation, sales representative, etc., are abstracted to **Sales**.

- Conversation on coughing, cold, fever, chills, chest pain, etc., are abstracted to **Covid-19 Symptoms**.

:::note
Currently, Abstract Topics are not supported in real-time. 
:::

## Abstract Topics API

To get abstract topics, you must first process your conversation using [Async APIs](/docs/async-api/introduction). After you process the conversation, you will receive a Conversation ID which you must pass in the [Abstract Topics API](/docs/api-reference/abstract-topics). 

👉 [Abstract Topics API](/docs/api-reference/abstract-topics)

