---
id: get-conversation-groups
title: Get Conversation Groups 
sidebar_label: GET Conversation Groups
slug: /management-api/conversation-groups/get-conversation-groups/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Beta
This feature is in [Beta](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

This API allows you to fetch a Conversation Group. 

To fetch multiple Conversation Groups, go to [Get Multiple Conversation Groups](#get-multiple-conversation-groups) section below. 

### API Endpoint

Make a GET request to the following API:

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/group/{groupId}`**

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

### Response Body

The requested Group object is returned in the response body.

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

## Get Multiple Conversation Groups

To get multiple Conversation Groups in a single call, make a GET request to the following API endpoint:

### API Endpoint

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/groups`**

:::info 
While working with multiple Conversation Groups, notice the use of plural `groups` versus `group` used in singular Conversation Group operations.
:::