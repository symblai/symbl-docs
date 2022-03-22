---
id: consuming-trackers-async-api
title: Consuming Trackers with Async API
sidebar_label: Consuming Trackers with Async API
slug: /tutorials/trackers/consuming-trackers-async-api/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

To use Trackers with Async API, follow the steps given below:

### Step 1: Create a Tracker
---

The first step is to create a Tracker with a set of phrases and keywords using Async APIs.

:::tip
If you want to create multiple trackers in bulk, use [Trackers Management API for bulk creation](/docs/management-api/trackers/create-tracker#create-trackers-in-bulk). The Trackers Management API handles Trackers at your account level and is recommended for usecases where where you want to use multiple Trackers.
:::

:::tip Best Practises
Before creating the Trackers, go through the [Best Practices](#best-practices) section to learn about how to create Trackers.
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
:::caution Old Endpoint
The old endpoint for fetching Trackers (given below) is deprecated and not recommended to be used
`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`
:::

### Best Practices

Following are the best practices to be followed while creating Trackers: 

Dos' and Don'ts | Example |
---------- | ------- |  
Densely pack your vocabulary with information | "What’s the price?" | 
Don't preface your information with lots of words that don’t convey meaning | "I was wondering if you could tell me about your pricing structure". |
Use simple sentences or phrases | Short sentence: "I want to understand your product". Phrase: "understand your product" | 
Avoid using complex sentence structure | "I want to make sure that I have a full understanding of your product".


## Read more
---
<div class="row">
  <div class="column">
    <div class="card21"><h4>API Reference</h4>

* [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
* [`GET` v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
* [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
* [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
* [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

<br/></div>
  </div>
   <div class="column">
    <div class="card21"><h4>Tutorials</h4>

 
* [How to create and use Trackers- Trackers Management API](/docs/tutorials/trackers/consuming-trackers-management-api/)
* [Creating Trackers with Async APIs](/docs/tutorials/trackers/create-trackers-async-api/)
* [Creating Trackers with Streaming API](/docs/tutorials/trackers/create-trackers-streaming-api/)
* [Using Trackers with Streaming API](/docs/tutorials/trackers/consuming-trackers-streaming-api/)
 

  </div>
  </div>
  
<br/>
<br/>
<br/>
 
</div>
<br/>