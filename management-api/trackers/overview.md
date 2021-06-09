---
id: trackers-overview
title: Using Trackers API (Beta)
sidebar_label: Introduction
slug: /management-api/trackers/overview
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This section contains step-by-step instructions on how to get started with using the Trackers API. For details on API descriptions, see [API Documentation](#supported-api-operations-and-endpoints).

### Step 1: Create Trackers using `POST` Request

The first step is to create a Tracker with a set of phrases and keywords. Create a Tracker by sending a `POST` request to the [Create Trackers API endpoint](/management-api/trackers/create-tracker):

```shell
POST "https://api.symbl.ai/v1/manage/tracker"
```

You can define the phrases and keywords in the **vocabulary** of the request body as shown below:

```json
{
   "name":"Promotion Mention",
   "vocabulary":[
      "We have a special promotion going on if you book this before",
      "I can offer you a discount of 10 20 percent you being a new customer for us",
      "We have our month special this month",
      "We have a sale right now on",
   ]
}
```
This POST request creates a Tracker and returns the following response. Note that every Tracker has a unique `id`. 
```json
{
    "tracker": {
        "id": "4476908732794496",
        "name": "Promotion Mention",
        "vocabulary": [
           ...
        ]
    }
}
```
After creating the Tracker, you can: 

👉 &nbsp; [Verify that all the trackers has been added by making a `GET` request.](/docs/management-api/trackers/get-tracker)

👉 &nbsp; [If any Trackers need to be updated, send a `PUT` request.](/docs/management-api/trackers/update-tracker) 

### Step 2: Process files using Async API with `enableAllTrackers` flag
When you send a recorded audio, video or text file using [Async API](http://localhost:3000/docs/async-api/introduction), set **enableAllTrackers=True** and **POST** the file to Symbl.

Given below is an example of a POST request to Async Audio API for processing an audio recording with `enableAllTrackers` set to `true`

```shell
POST "https://api.symbl.ai/v1/process/audio?enableAllTrackers=true"
```
👉 &nbsp; [Next, you can check the job status using the `GET` Job Status request.](/docs/async-api/overview/jobs-api/#get-job-status)

:::note Specifying the "enableAllTrackers" field in the request

The `enableAllTrackers` parameter will enable detection of all the Trackers maintained for a Symbl’s account by the [Management API](#tracker-consumption-with-management-api). 

`enableAllTrackers` accepts a boolean value which must be passed in the Async APIs as the following:

 |
---------- | ------- 
As a query-param | Async Audio File API, Async Video File API. 
In Request Body | Async Audio URL API, Async Video URL API, Async Text API. 

:::

### Step 3: Get the detected Tracker with Conversation ID

You can now get the Trackers for the conversation using the `conversation_id` with a `GET` request:

```shell
GET "https://api.symbl.ai/v1/conversations/{{conversation_id}}/trackers"
```
#### Response Body

```json
[
    {
        "id": "4527907378937856",
        "name": "Promotion Mention",
        "matches": [
            {
                "messageRefs": [
                    {
                        "id": "4670860273123328",
                        "text": "We're running a sale right now",
                        "offset": -1
                    }
                ],
                "type": "vocabulary",
                "value": "run sale",
                "insightRefs": []
            }
        ]
    },
    ...
]
```

### Tracker consumption with Management API 

The Trackers APIs can be consumed via the [Management API](/docs/management-api/introduction), which takes the onus of maintaining these entities from the developer and shifts it to Symbl’s backend. The Management API provides an easy-to-consume REST interface for managing these entities. 

Click [here](/docs/management-api/introduction) to read about the capabilities of Management APIs. 

### Supported API Operations and Endpoints 

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker#bulk-create-trackers-api)
Get Tracker with ID| [`GET`v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)