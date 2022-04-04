---
id: create-conversation-groups
title: Create Conversation Groups
sidebar_label: POST Conversation Groups 
slug: /management-api/conversation-groups/create-conversation-groups/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to create a Conversation Group. 

To create multiple Conversation Groups at the same time, see the [Create Multiple Conversation Groups](#create-multiple-conversation-groups) section. 


### API Endpoint

Make a POST request to the following API:

**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/group`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json` 
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

```json
{
  "name": "Calls made by John",
  "description": "All the conversations made by the agent John Doe are captured in this Group.",
  "criteria": "conversation.metadata.agentId==johndoe"
}
```
:::note Using multiple Criteria
Given below is another sample request containing more than one `criteria`. You can add upto 2 parameters per criteria, however, there are no restrictions on the number of criterions you can use. Here, we use `agentId` and `customerId`:

```json
{
  "id": "4931769134481408",
  "name": "Calls made by John to Acme Corp",
  "description": "All the conversations by the agent John Doe with customer Acme Corp are captured in this Group.",
  "criteria": "conversation.metadata.agentId==johndoe and conversation.metadata.customerId==88338833"
}
```
:::

### Request Parameters

| Parameter | Data Type | Description | Required | Values Accepted | 
|--------|----------|---- | --- | ------| 
`name` | String | Name of the group. | Mandatory | String with no special characters allowed, except `-`, `_`, and `”`. The maximum length of string allowed 128 characters.
`description` | String | Description to capture any additional details of the group and its purpose. | Optional | The maximum length of string allowed 512 characters.
`criteria` | String / RSQL format | Criteria in RSQL format that should be applied to group conversations under this group. | Mandatory | Valid RSQL string. For more information on how to write RSQL queries, click [here](https://github.com/jirutka/rsql-parser).

### Response Body

The newly created Group object is returned in the response body.

```json
{
    "group": {
        "id": "4931769134481408",
        "name": "Calls made by John",
        "description": "All the conversations made by the agent John Doe are captured in this Group.",
        "criteria": "conversation.metadata.agentId==johndoe"
    }
}
```
The `id` returned in the Response is the Group ID which is a unique identifier of the Conversation Group created.

## Create Multiple Conversation Groups

This API creates multiple Conversation Groups at the same time. 

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/groups`**

:::info 
While working with multiple Conversation Groups, notice the use of plural `groups` versus `group` used in singular Conversation Group operations.
:::

### Request Body

```json
[
  {
    "name": "Group for all Internal calls",
    "description": "Group for sales team meetings",
    "criteria": "conversation.metadata.label==Internal"
  },
  {
    "name": "Group for all conversations with Acme Corp company",
    "description": "Group for Acme Corp conversations",
    "criteria": "conversation.metadata.label==External"
  }
]
```