---
id: conversation-groups
title: Conversation Groups (Beta)
sidebar_label: Introduction
slug: /concepts/conversation-groups/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Conversation Groups allow you to create groups of conversations by setting the grouping criteria that suits your business requirement.

The criteria of the group can be applied to the Conversation Metadata that can be any important information such as unique identifiers like agentId, customerId, userId, etc., or custom tags such as sales call, support call, internal discussion, etc. 

#### Examples

- *Dan is the Head of Sales in his company and wishes to group calls based on the type, such as internal and external. Using the metadata label: “Internal'' and “External”, Dan can group conversations and query all conversations using this criterion.*

- *Ashna manages the Customer Experience team and wants to manage conversations with vendor companies individually. Since there are over 10 vendor companies they work with, using Conversation Groups (that adds metadata with the company name), Ashna can separate out conversations for each vendor.*


- *Tom is the Chief Quality Assurance Manager and wants to see the customer conversations of his team member- John to analyze his discussions with the customers. He creates a metadata label with agent names (e.g., "agentId": "johndoe") that groups conversations based on the name of the agent and allows Tom to fetch all conversations made by John.*


## Conversation Groups API

You can perform CRUD operations on the Conversation Groups using the [Management APIs](/docs/management-api/introduction). 

For more details on these operations, go to the [Conversation Groups API](/docs/management-api/conversation-groups/create-conversation-groups) section.  

:::info Quick Start Guide
View step-by-step instruction on how to create and use Conversation Groups in the [Quick Start Guide](/docs/management-api/conversation-groups/conversation-groups-intro#quick-start-guide) for Conversation Groups. 
:::

Following are the operations you can perform with Management API for Conversation Groups:

| Operation | Endpoint | 
|--------|----------|
Create Conversation Group | [`POST` /v1/manage/group](/docs/management-api/conversation-groups/create-conversation-groups) |
Create Multiple Conversation Groups | [`POST` /v1/manage/groups](/docs/management-api/conversation-groups/create-conversation-groups#creating-multiple-conversation-groups) |
Get Conversation Group with ID | [`GET` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/get-conversation-groups) | 
Get Multiple Conversation Groups | [`GET` /v1/manage/groups](/docs/management-api/conversation-groups/get-conversation-groups#get-multiple-conversation-groups) |
Update Conversation Group | [`PUT` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/put-conversation-groups) | 
Delete Group | [`DELETE` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/delete-conversation-groups) |
