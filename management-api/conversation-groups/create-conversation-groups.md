---
id: create-conversation-groups
title: Create Conversation Groups
sidebar_label: POST Conversation Groups 
slug: /management-api/conversation-groups/create-conversation-groups
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

## Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json` 
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

```json
{
  "name": "John's Calls",
  "description": "All the conversations done by the agent John Doe are captured under this Group.",
  "criteria": "conversation.metadata.agentId=='johndoe'"
}
```
### Request Parameters

| Parameter | Data Type | Description | Required | Values Accepted | 
|--------|----------|---- | --- | ------| 
`name` | String | Name of the group. | Mandatory | String with no special characters allowed, except `- -`, `_`, `'` and `”`. The maximum length of string allowed 128 characters.
`description` | String | Description to capture any additional details of the group and its purpose. | Optional | The maximum length of string allowed 512 characters.
`criteria` | String / RSQL format | Criteria in RSQL format that should be applied to group conversations under this group. | Mandatory | Valid RSQL string. For more information on how to write RSQL queries, click [here](https://github.com/jirutka/rsql-parser).

### Response Body

The newly created Group object is returned in the response body.

```json
{
  "id": "4931769134481408",
  "name": "John's Calls",
  "description": "All the conversations done by the agent John Doe are captured under this Group.",
  "criteria": "conversation.metadata.agentId=='johndoe'"
}
```
The `id` returned in the Response is the Group ID which is a unique identifier of the Conversation Group.

## Create Multiple Conversation Groups

This API creates multiple Conversation Groups at the same time. 

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/groups`**

:::info 
While working with multiple Conversation Groups, notice the use of plural `groups` versus `group` used in singular Conversation Group operations.
:::