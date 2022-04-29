---
id: delete-conversation-groups
title: Delete Conversation Groups
sidebar_label: DELETE Conversation Groups 
slug: /management-api/conversation-groups/delete-conversation-groups/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to delete an existing Conversation Group. 

### API Endpoint

Make a DELETE call to the following API:

**<font color="orange">DELETE</font> `https://api.symbl.ai/v1/manage/group/{groupId}`**

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

The Group object of the deleted group is returned in the response body.

```json
{
  "id": "4931769134481408",
  "type": "group",
  "deleted": true
}
```