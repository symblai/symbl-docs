---
id: conversation-groups-intro
title: Conversation Groups (Beta)
sidebar_label: Introduction 
slug: /management-api/conversation-groups/conversation-groups-intro/
pagination_label: Conversation Groups
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Conversation Groups allow you to create logical groups of conversations by setting the grouping criteria that suit your business requirement.

The criteria of the group can be applied to Conversation Metadata that can be any important information such as unique identifiers like agentId, customerId, userId, etc., or custom tags such as sales call, support call, internal discussion, etc. 

## Quick Start Guide

This section provides step-by-step instructions on how to creating and use Conversation Groups.

### Step 1: Create a Conversation Group 

---

To create a conversation group, make a POST request to Symbl using the following Conversation Group Management API:

`POST https://api.symbl.ai/v1/manage/group`

#### Request Body

```json
{
  "name": "Calls made by John",
  "description": "All the conversations of agent John Doe are captured in this Group.",
   "criteria": "conversation.metadata.agentId==johndoe"
}
```

#### Request Body Parameters

| Parameter | Data Type | Description | Required | Values Accepted | 
|--------|----------|---- | --- | ------| 
`name` | String | Name of the group. | Mandatory | String with no special characters allowed, except `-`, `_`, and `”`. The maximum length of string allowed 128 characters.
`description` | String | Description to capture any additional details of the group and its purpose. | Optional | The maximum length of string allowed 512 characters.
`criteria` | String / RSQL format | Criteria in RSQL format that should be applied to group conversations under this group. | Mandatory | Valid RSQL string. For more information on how to write RSQL queries, click [here](https://github.com/jirutka/rsql-parser).

#### Response Body

```json
{
  "group": {
    "id": 4931769134481408,
    "name": "Calls made by John",
    "description": "All the conversations made by agent John Doe are captured in this Group.",
    "criteria": "conversation.metadata.agentId==johndoe"
  }
}
```

The `id` returned is the Group ID which is a unique identifier of the Conversation Group.

### Step 2: Add metadata to Conversation

---

The Conversation metadata is what defines the grouping criteria. Metadata can be important information such as the unique identifiers of internal entities like agentId, customerId, userId, etc., or custom tags such as sales call, support call, internal discussion, etc. that you’d like to maintain on a conversation.

:::note  Metadata Key-value Pairs Requirement
- The value of the metadata field must be of type string.
- The maximum length of the string value allowed is 128 characters.
- Duplicate fields are not allowed in metadata.
:::

To add metadata, modify an already processed conversation using Conversation API PUT request given below: 

`PUT https://api.symbl.ai/v1/conversations/{conversationId}`

#### Request Body

```json
{
  "metadata": {
    "key": "value", 
    "agentId": "johndoe"
  }
}
```

#### Response Body

```json
{
   "id":"4931769134481408",
   "metadata":{
      "key":"value",
      "agentId":"johndoe"
   }
}
```

The `id` returned in the Response is the Group ID which is a unique identifier of the Conversation Group.

### Step 3: Fetch Grouped Results

---

Now that your groups are created, you can fetch the data associated with the Conversations that match the criteria of any Conversation Group. 

Additional operations like filtering, sorting, or aggregate can be performed while fetching this data.

`GET https://api.symbl.ai/v1/groups/{groupId}/conversations`

#### Path Parameters

| Parameter | Required | Description |
|--------|----------|---- |
`groupId` | Mandatory | Unique ID of the group created using Management API’s Create Group API endpoint. |

#### Query Parameters

| Parameter | Data Type | Description | Required | Default Value | 
|--------|--------|---------------|-----|---|
`limit` | Integer (int16) | Specifies a non-negative integer `count`, to indicate that no more than `count` items in the result will be returned. `limit` set to `0` returns 0 items in the result. | Optional | 20.<br/>Value accepted is between `0` to `65536` | 
`offset` | Integer (int16) | Specifies a non-negative number of items to skip before applying `limit`. | Optional | 0 | 
`order` | String / enum | Specifies the order in which the results should be sorted. The `order` is applied on the `startTime` field of the associated Conversation entity. | Optional | `asc`. Values accepted are `asc` and `desc`.
`startTime` | String / [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format | Specifies the start of the datetime range for the results to be returned. This `startTime` is associated with the `startTime` field of the associated Conversation entity. If `startTime` is not mentioned, then `startTime` is calculated as - `startTime = endTime - duration('7 days')`.| Optional | `startTime = endTime - duration('7 days')`. Values accepted are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted strings with value less than current timestamp and less than `endTime`. |
`endTime` | String / [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format | Specifies the end of the date time range for the results to be returned. This `endTime` is associated with the `endTime` field of the associated Conversation entity. If `endTime` is not mentioned, then the current timestamp is considered as `endTime` automatically. | Optional | `endTime = currentDatetime()`. Values accepted are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted strings with value less than current timestamp and greater than `startTime`.|
`sort` | String | Specifies one or more fields to be used to sort the results. | Optional | `conversation.startTime` | |
`filter` | String / RSQL format | Specifies a filter string in RSQL format to filter the results. <br/> - Filter parameter should be a valid RSQL string however it can't have OR logical Operator. <br/> - Filter parameter can not have more than 2 parameters in it's filters. There is no limit on filters though, so user can add any number of filters using maximum of two parameters.| Optional | `conversation.startDate <= {currentTimestamp - 7 days}`.

:::note
When no filter is provided, it falls back to the default criteria of `startTime` and `endTime`. 
:::

#### Response

The list of conversation objects is returned in the response body.

```json
{
  "conversations": [
    {
      "id": "4866329603473408",
      "type": "meeting",
      "name": "John / Mary Brainstorming",
      "startTime": "2021-02-27T15:53:05.594Z",
      "endTime": "2021-02-27T16:18:05.048Z",
      "members": [
        {
          "name": "John",
          "email": "john@example.com"
        },
        {
          "name": "Mary",
          "email": "mary@example.com"
        }
      ],
      "metadata": {
        "key": "value", 
        "agentId": "johndoe"
      }
    },
    {
      "id": "4931769134481408",
      "type": "meeting",
      "name": "John / Mary Catch up",
      "startTime": "2021-02-24T15:53:05.594Z",
      "endTime": "2021-02-24T16:18:05.048Z",
      "members": [],
      "metadata": {
        "agentId": "johndoe"
      }
    },
    {
      "id": "6866329803473407",
      "type": "meeting",
      "name": "John / Acme Corp Meeting",
      "startTime": "2021-02-27T15:53:05.594Z",
      "endTime": "2021-02-27T16:18:05.048Z",
      "members": [],
      "metadata": {
        "customerId": "889988999", 
        "agentId": "johndoe"
      }
    },
    ...
  ]
}
```

### Managing Conversation Groups

You can perform CRUD operations on the Conversation Groups using the Management APIs. 

For more details on these operations, go to the [Conversation Groups API](/docs/management-api/conversation-groups/create-conversation-groups) section.  

Following are the operations you can perform with Management API for Conversation Groups:

| Operation | Endpoint | 
|--------|----------|
Create Conversation Group | [`POST` /v1/manage/group](/docs/management-api/conversation-groups/create-conversation-groups) |
Create Multiple Conversation Groups | [`POST` /v1/manage/groups](/docs/management-api/conversation-groups/create-conversation-groups#creating-multiple-conversation-groups) |
Get Conversation Group with ID | [`GET` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/get-conversation-groups) | 
Get Multiple Conversation Groups | [`GET` /v1/manage/groups](/docs/management-api/conversation-groups/get-conversation-groups#get-multiple-conversation-groups) |
Update Conversation Group | [`PUT` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/put-conversation-groups) | 
Delete Group | [`DELETE` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/delete-conversation-groups) |

:::info 
While working with multiple Conversation Groups, notice the use of plural `groups` versus `group` used in singular Conversation Group operations.
:::