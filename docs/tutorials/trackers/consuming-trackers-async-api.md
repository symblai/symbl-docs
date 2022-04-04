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

This tutorial covers step-by-step information on how to use Trackers with Async API. We have used the example of the [Async Audio URL API](/docs/management-api/trackers/create-tracker#async-audio-url-api) here. However, you can follow the same steps with other Async APIs as well. 

### Step 1: Create a Tracker
---

The first step is to create a Tracker vocabulary with a set of phrases and keywords that you wish to track and pass the same in the Async API payload.

:::tip
- Before creating the Trackers, go through the [Best Practices](/docs/best-practices/best-practices-trackers/) document to learn about the dos and don'ts of the Tracker vocabulary creation.

- If you want to create multiple trackers, use [Trackers Management API for bulk creation](/docs/management-api/trackers/create-tracker#create-trackers-in-bulk). The Trackers Management API handles all the Trackers you have created at your account level and makes it easy to maintain them.
:::

#### Authentication 

Before using the API, ensure that you have your Authentication Token (`AUTH_TOKEN`) handy. To learn about how to get your auth token, see the step-by-step instructions on the [Authentication](/docs/developer-tools/authentication) page.

#### API Endpoint

```shell
POST https://api.symbl.ai/v1/process/audio/url
```

#### Request Body

```shell
{
    "url": "<PUBLIC_AUDIO_FILE_URL>", # The URL must be publicly accessible. 
    "confidenceThreshold": 0.6, # Minimum confidence score to consider an insight - action items, follow-ups, topics, and questions as valid.
    "timezoneOffset": 0, #  Specifies the actual timezoneOffset used for detecting the time/date-related entities.
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

This creates a Tracker and returns the following response. Note the conversation ID for the next step.

```shell
{
  "conversationId": "5815170693595136", # This is the unique identifier of the conversation. Use this to topics, action items, etc. 
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d" # Use the Job ID to know the status of the job. 
}
```
:::note
See detailed documentation in the links given below: 
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

Using the `conversation_id` you got from Step 1, make a `GET` request to the Trackers API endpoint given below:

#### API Endpoint

```shell
GET "https://api.symbl.ai/v1/conversations/{{conversation_id}}/trackers-detected"
```
#### Response 

```json
[
    {
        "id": "4527907378937856", // this is the ID of the Tracker
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

### Get Trackers by ID

You can also use the Async API to get Trackers by sending a list of Tracker IDs of previously created trackers. The Trackers will be searched in the submitted Async API request containing the conversation.  

#### Example 
In the example given below, we will send the following trackers IDs in the Async API request body:

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

Given below is an example of an Async Text API request body containing Tracker IDs:

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
