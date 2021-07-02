---
id: comprehensive-action-items
title: Comprehensive Action Items (Labs)
sidebar_label: Comprehensive Action Items (Labs)
slug: /concepts/comprehensive-action-items
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Symbl Labs
This API is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. You can access the Labs features using your Symbl App Id and Secret. If you don't already have it, sign up on our platform to get your credentials. <br/><br/>
For any queries or feedback, please contact us at labs@symbl.ai.
:::

The **Comprehensive Action Items API** is similar to the Action Items API except that the Comprehensive Action Items API returns a rephrased form of the original action item message that's enriched with its corresponding context.

While both are equally powerful in providing Action Items that relate to a discussion, the Comprehensive Action Items API is designed to provide more details such as references to speaker names, context in which the action item was mentioned and an overall comprehensive description of the action items. 

You can use the Action Items API if you wish to relate a message one-to-one with an action item and use the exact sentence from a transcript or utilize the Comprehensive Action Items API if you require more context to be sent in the response in a comprehensive format.

#### Examples 
 |  | 
| --------- | --------- 
**Returned by Action Items API** | *"So I will go ahead and I will set up a discussion with product."*
**Returned by Comprehensive Action Items** | *"John and Kay need to shift their focus more towards dev. Kay will go ahead and set up a discussion with product."*| 

### Comprehensive Action Items API

Find the details of the Comprehensive Action Items API endpoint, parameters and its usage in the link given below:

👉[Comprehensive Action Items API](/docs/conversation-api/comprehensive-action-items)