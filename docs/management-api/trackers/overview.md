---
id: trackers-overview
title: Using Trackers API (Beta)
sidebar_label: Overview
slug: /management-api/trackers/overview
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This section contains step-by-step instructions on how to create and use Trackers.<br/>

This page provides information about:

- [Consuming Trackers with Management APIs](#consuming-trackers-with-management-api)
- [Consuming Trackers with Async APIs](#consuming-trackers-with-async-apis)
- [Consuming Trackers with Streaming API](#consuming-trackers-with-streaming-api)

:::info Create Trackers with Management API
While you can create Trackers with Async or Streaming APIs, it is recommended that you create Trackers using Management API because Trackers created with Management APIs are saved and can be reused while the same is not possible with Async or Streaming APIs. 
:::

## Consuming Trackers with Management API 
---

Trackers can be consumed via the Management API, which takes the onus of maintaining these entities from the developer and shifts it to Symbl’s backend. The Management API provides an easy-to-consume REST interface for managing these entities. 

All Trackers created using Management API are saved and can be reused for other operations such as PUT, UPDATE and DELETE. 
To read about the capabilities of the Management API, see the [Management API](/docs/management-api/introduction) page. 

:::note Trackers Management UI
You can also create, view, edit and delete Trackers via the Trackers Management UI. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)

- **Using punctuations**: You can only pass periods `.`, apostrophes `'` and dashes `-` in the trackers vocabulary. Other punctuations like `?`, `,`, `!`, `:`are not allowed.
- **Vocabulary terms**: You must add atleast 5 and a maximum of 50 vocabulary terms per Tracker.
- **Trackers limitation**: You can create up to 500 trackers per account. 
:::

### Step 1: Create Trackers
---

 Create Trackers by sending a `POST` request to the Trackers Management API endpoint given below:

```shell
POST "https://api.symbl.ai/v1/manage/tracker"
```

:::note Using Punctuations in Trackers Vocabulary 
You can only pass the following punctuations in trackers vocabulary:
- Periods `.` 
- Apostrophes `'` 

Using any other punctuation mark such as `?`, `,`, `!`, `:` is not allowed. 
:::
You can define the phrases and keywords in the **vocabulary** of the request body as shown below:

```json
{
   "name":"Promotion Mention",
   "vocabulary":[
      "We have a special promotion going on if you book this before",
      "I can offer you a discount of 10 20 percent you being a new customer for us",
      "We have our month special this month",
      "We have a sale right now on"
   ]
}
```
This creates a Tracker and returns the following response. Note that every Tracker has a unique `id`. 

```json
{
    "tracker": {
        "id": "4476908732794496",
        "name": "Promotion Mention",
        "vocabulary": [
          "We have a special promotion going on if you book this before",
          "I can offer you a discount of 10 20 percent you being a new customer for us",
          "We have our month special this month",
          "We have a sale right now on"
        ]
    }
}
```
### Step 2: Submit files using Async API with `enableAllTrackers` flag
---
When you send a recorded audio, video or text using [Async API](http://localhost:3000/docs/async-api/introduction), set **enableAllTrackers=True** and **POST** the file to Symbl.

Given below is an example of a POST request to Async Audio API for processing an audio recording with `enableAllTrackers` set to `true`. By default this is set to `false`.

```shell
POST "https://api.symbl.ai/v1/process/audio?enableAllTrackers=true"
```
:::note Specifying the "enableAllTrackers" parameter in the request

The `enableAllTrackers` parameter must be sent mandatorily in the Async API to detect Trackers. The purpose of this flag is to enable detection of all the Trackers created with the [Management API](#tracker-consumption-with-management-api) that maintains your entities with Symbl at the account level.  

`enableAllTrackers` accepts a boolean value which must be passed in the Async APIs either as a query param or in the request body depending on which Async API you are using. See the complete list of Async APIs and how each accepts this parameter:

 |  
---------- | ------- 
As a query-param | Async Audio File API, Async Video File API. 
In Request Body | Async Audio URL API, Async Video URL API, Async Text API. 
:::

On successful processing by the above mentioned API, you will get the `conversationId` and the `jobId` as shown below:

#### Response 
```json
{
    "conversationId": "6186250391257088",
    "jobId": "78422976-e461-41cf-ba35-20397d16619e"
}
```
You can use the `jobId` to get the job status using the [Job Status API.](/docs/async-api/overview/jobs-api/#get-job-status)

:::note
Ensure that you wait for the job to complete before proceeding to Step 3. 
:::

### Step 3: Get detected messages containing Trackers
---

Using the `conversationId` from Step 2, you can `GET` the Trackers for the conversation.

```shell
GET "https://api.symbl.ai/v1/conversations/{{conversation_id}}/trackers-detected"
```
#### Response 

```json
{
    "type": "vocabulary",
    "value": "Can you reiterate that one more time",
    "messageRefs": [
        {
            "id": "6428676305453056",
            "text": "So I am not showing that here but you can have that, you know, for particular sentence and, you know, then aggregate based on the whole conversation.",
            "offset": -1
        },
        {
            "id": "6035928066818048",
            "text": "Give that intent and name and that's it.",
            "offset": -1
        }
    ],
    "insightRefs": [
        {
            "text": "Yeah, and you So from sentiment analysis perspective, right?",
            "offset": -1,
            "type": "question",
            "id": "5794360651153408"
        }
    ]
}
```
:::caution Important
If the `conversationId` used in this Step is not processed with `enableAllTrackers=true` in the Async API, Trackers will not be detected. Using this flag as illustrated in Step 2 is mandatory. 
:::

### Supported API Operations with Management API

Operation  | Endpoint
---------- | -------
Create Tracker | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Create Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker/#create-trackers-in-bulk)
Get Tracker with ID| [`GET`v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Get Tracker with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Update Tracker| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Delete Tracker| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)


## Consuming Trackers with Async APIs

### Step 1: Create a Tracker
---

The first step is to create a Tracker with a set of phrases and keywords using Async APIs.

:::tip
If you want to create multiple trackers in bulk, use [Trackers Management API for bulk creation](/docs/management-api/trackers/create-tracker#create-trackers-in-bulk). The Trackers Management API handles Trackers at your account level and is recommended for usecases where where you want to use multiple Trackers.
:::

Given below is an example of an [Async Audio URL API](/docs/management-api/trackers/create-tracker#async-audio-url-api):

#### API Endpoint

```shell
POST https://api.symbl.ai/v1/process/audio/url
```

#### Request Body
```json
{
    "url": "<PUBLIC_AUDIO_FILE_URL>",
    "confidenceThreshold": 0.6,
    "timezoneOffset": 0,
    "trackers": [
        {
            "name": "Promotion Mention",
            "vocabulary": [
                "We have a special promotion going on if you book this before",
                "I can offer you a discount of 10 20 percent you being a new customer for us",
                "We have our month special this month",
                "We have a sale right now on"
            ]
        }
    ]
}
```

#### Response

This creates a Tracker and returns the following response. Note that every Tracker has a unique `id`.

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```
:::note
To create Trackers with Async APIs, see detailed documentation in the links given below. 
- [Create Trackers- Async Audio File API](/docs/management-api/trackers/create-tracker#async-audio-file-api)
- [Create Trackers- Async Audio URL API](/docs/management-api/trackers/create-tracker#async-audio-url-api)
- [Create Trackers- Async Video File API](/docs/management-api/trackers/create-tracker#async-video-file-api)
- [Create Tracker- Async Video URL API](/docs/management-api/trackers/create-tracker#async-video-url-api)
- [Create Trackers- Async Text API](/docs/management-api/trackers/create-tracker#async-text-api)
:::

After creating the Tracker, you can: 

👉 &nbsp; [Verify that all the trackers has been added by making a `GET` request.](/docs/management-api/trackers/get-tracker)

👉 &nbsp; [If any Trackers need to be updated, send a `PUT` request.](/docs/management-api/trackers/update-tracker) 

### Step 2: Get the detected messages containing Trackers
---

Using the `conversation_id` you get from Step 1, you can `GET` the Trackers for the conversation.

```shell
GET "https://api.symbl.ai/v1/conversations/{{conversation_id}}/trackers-detected"
```
#### Response 

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

### Detecting Trackers with Async API

You can also use the Async API to detect Trackers by sending a list of Tracker IDs of previously created trackers (from the Management API). The Trackers will be searched in the submitted Async API request containing the conversation.  

#### Example 
In the example given below, we will send the following trackers IDs in the Async API request assuming they were already created:
```shell
"trackers": [
    {
      "id": "5123033831841280"
    },
    {
      "id": "6174043823841420"  
    },
```
#### Full Request Sample
Given below is an example of an Async Text API call sent with Tracker IDs:

```shell
curl --location --request POST 'https://api.symbl.ai/v1/process/text' \
--header "Authorization: Bearer $AUTH_TOKEN" \
# Set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Afternoon Business Meeting",
  "detectPhrases": true,
  "confidenceThreshold": 0.6,
  "entities": [
    {
      "customType": "Company Executives",
      "value": "Marketing director",
      "text": "Marketing director"
    }
  ],
  "detectEntities": true,
  "messages": [],
  "trackers": [
    {
      "id": "5123033831841280"
    },
    {
      "id": "6174043823841420"  
    },
  ]
}'
```

## Consuming Trackers with Streaming API 
---

Below is an example that shows how to pass Trackers in the config object for the `startRealtimeRequest` of the Symbl’s JS SDK. This example also shows how to consume the results of the detected Trackers in real-time.

```js
const connection = await sdk.startRealtimeRequest({
    id,
    insightTypes: ['action_item', 'question'],
    trackers: [
        {
            name: "Promotion Mention",
            vocabulary: [
                "We have a special promotion going on if you book this before",
                "I can offer you a discount of 10 20 percent you being a new customer for us",
                "We have our month special this month",
                "We have a sale right now on"
            ]
        }
    ],
    config: {
        meetingTitle: "My Meeting",
        confidenceThreshold: 0.7,
        languageCode: "en-US",
        sampleRateHertz: 48000,
        trackers: {
            "interimResults": true
        }
    },
    speaker: {
        // Optional, if not specified, will simply not send an email in the end.
        userId: "john@example.com", // Update with valid email
        name: "John",
    },
    handlers: {
        onTrackerResponse: (data) => {
            // When a tracker is detected in real-time
            console.log('onTrackerResponse', JSON.stringify(data, null, 2));
            if (!!data) {
                data.forEach((tracker) => {
                    console.log(`Detected Tracker Name: ${tracker.name}`);
                    console.log(`Detected Matches`);
                    tracker.matches.forEach((match) => {
                        console.log(`Tracker Value: ${match.value}`);
                        console.log(`Messages detected against this Tracker`);
                        match.messageRefs.forEach((messageRef) => {
                            console.log(`Message ID: ${messageRef.id}`);
                            console.log(`Message text for which the match was detected: ${messageRef.text}`);
                            console.log(`\n`);
                        });
                        console.log(`\n\n`);
                        
                        console.log(`Insights detected against this Tracker`);
                        match.messageRefs.forEach((insightRef) => {
                            console.log(`Insight ID: ${insightRef.id}`);
                            console.log(`Insight text for which the match was detected: ${insightRef.text}`);
                            console.log(`Insight Type: ${insightRef.type}`);
                            console.log(`\n`);
                        });
                        console.log(`\n\n`);
                    });
                });
            }
        },
    },
})
```
For detailed description of the parameters, see [Streaming API for Trackers](/docs/streaming-api/code-snippets/consume-trackers-with-streaming-api) documentation. 

:::caution Old Endpoint
The old endpoint for fetching Trackers (given below) is deprecated and not recommended to be used
`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`
:::