---
id: trackers-overview
title: Trackers API (Beta)
sidebar_label: Introduction
slug: /management-api/trackers/overview/
pagination_label: Trackers API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

You can use the Trackers API with the following:<br/>

- [Trackers with Management APIs](/docs/tutorials/trackers/consuming-trackers-management-api/)
- [Trackers with Async APIs](/docs/tutorials/trackers/consuming-trackers-async-api/)
- [Trackers with Streaming API](/docs/tutorials/trackers/consuming-trackers-streaming-api/)

:::info Create Trackers with Management API
While you can create Trackers with Async or Streaming APIs, it is recommended that you create Trackers using Management API because Trackers created with Management APIs are saved and can be reused while the same is not possible with Async or Streaming APIs. 
:::

## API Endpoints

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker#bulk-create-trackers-api)
Get Tracker with ID| [`GET` v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

