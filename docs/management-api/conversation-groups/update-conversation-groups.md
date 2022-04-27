---
id: update-conversation-groups
title: Update Conversation Groups
sidebar_label: PUT Conversation Groups 
slug: /management-api/conversation-groups/put-conversation-groups/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to update an existing Conversation Group. 

### API Endpoint

Make a PUT request to the following API:

**<font color="orange">PUT</font> `https://api.symbl.ai/v1/manage/group/{groupId}`**

### Request Headers

Header Name |  Description
---------- | ------- |
```Authorization``` | mandatory <br/><br/> `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | mandatory <br/><br/> `application/json` 
```x-api-key``` | optional <br/><br/>  DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

#### Path Parameters

Parameter |  Description
---------- | ------- |
```groupId``` | String, mandatory <br/><br/> Unique ID of the group created using Management API’s Create Group API endpoint.

### Request Body

```json
{
  "id": "4931769134481408",
  "name": "Calls made by John",
  "description": "All the conversations made by the agent John Doe are captured under this Group.",
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

Parameter |  Description
---------- | ------- |
```id``` | String, mandatory <br/><br/> `id` is the unique identifier of the Conversation Group you are tying to update.
```name``` | String, mandatory <br/><br/> Name of the group. String with no special characters is allowed, except `-`, `_`, and `”`. The maximum length of string allowed 128 characters.
```description``` | String, optional <br/><br/> Description to capture any additional details of the group and its purpose. The maximum length of string allowed `512` characters.
```criteria``` | String / RSQL format, mandatory <br/><br/> Criteria in RSQL format that should be applied to group conversations under this group. For more information on how to write RSQL queries, click [here](https://github.com/jirutka/rsql-parser).

### Response Body

The updated Group object is returned in the response body.

```json
{
    "group": {
       "id": "4931769134481408",
       "name": "Calls made by John",
       "description": "All the conversations made by the agent John Doe are captured under this Group.",
       "criteria": "conversation.metadata.agentId==johndoe"
    }
}
```

