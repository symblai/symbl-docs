---
id: introduction
title: Management API (Beta)
sidebar_label: Introduction
slug: /management-api/introduction
---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The Management API allows you to access and manage various resources against your Symbl account. The resources created and managed by this API is maintained at the account level.

While the Conversation API is used for managing the data associated with the conversations (generated via the real-time or Async APIs), the Management API is used for managing the data consumed via the Symbl’s APIs. 

### Supported Entities

At the moment, we provide Management API support for the Trackers entities only. We will be adding support for more entities soon: 

- **Trackers**: Trackers allow you to get “contextually similar” occurrences in a conversation so you can identify emerging trends and gauge the nature of the interactions. Read about Trackers and its capabilities, in the [**Trackers**](/concepts/trackers) section. 

### Tracker Management APIs

Following are the API endpoints supported for managing Trackers entity:

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker/#create-trackers-in-bulk)
Get Tracker with ID| [`GET`v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)
