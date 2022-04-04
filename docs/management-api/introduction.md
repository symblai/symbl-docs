---
id: introduction
title: Management API (Beta)
sidebar_label: Introduction
slug: /management-api/introduction/
pagination_label: Management API
---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The Management API allows you to access and manage various resources against your Symbl account. The resources created and managed by this API is maintained at the account level.

While the Conversation API is used for managing the data associated with the conversations (generated via the real-time or Async APIs), the Management API is used for managing the data consumed via the Symbl’s APIs. 

### Supported Entities

The following entities are currently supported with Management API:

- **Trackers**: Trackers allow you to get “contextually similar” occurrences in a conversation so you can identify emerging trends and gauge the nature of the interactions. Read about Trackers and its capabilities, in the [**Trackers**](/concepts/trackers) section. 

- **Conversation Groups**: You can create and manage conversations by logically grouping them by defining a criteria that suits your business need such as grouping based on speaker agent, company name, labels such as internal, external, sales, etc. Read more in the [**Conversation Groups**](/concepts/conversation-groups). 

### Tracker Management APIs

Following are the API endpoints supported for managing Trackers entity:

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker/#create-trackers-in-bulk)
Get Tracker with ID| [`GET`v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

:::info Trackers Management UI
You can create, view, edit and delete Trackers via the Trackers Management UI as well. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)
:::

### Conversation Groups Management APIs

Following are the API endpoints supported for managing Conversation Groups entity:

| Operation | Endpoint | 
|--------|----------|
Create Conversation Group | [`POST` /v1/manage/group](/docs/management-api/conversation-groups/create-conversation-groups) |
Create Multiple Conversation Groups | [`POST` /v1/manage/groups](/docs/management-api/conversation-groups/create-conversation-groups#creating-multiple-conversation-groups) |
Get Conversation Group with ID | [`GET` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/get-conversation-groups) | 
Get Multiple Conversation Groups | [`GET` /v1/manage/groups](/docs/management-api/conversation-groups/get-conversation-groups#get-multiple-conversation-groups) |
Update Conversation Group | [`PUT` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/put-conversation-groups) | 
Delete Group | [`DELETE` /v1/manage/group/{groupId}](/docs/management-api/conversation-groups/delete-conversation-groups) |
