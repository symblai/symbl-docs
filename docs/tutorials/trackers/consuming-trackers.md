---
id: consuming-trackers-management-api
title: Consuming Trackers with Trackers Management API
sidebar_label: Consuming Trackers with Trackers Management API
slug: /tutorials/trackers/consuming-trackers-management-api/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::


Trackers can be consumed via the Management API, which takes the onus of maintaining these entities from you and shifts it to Symbl’s backend. The Management API provides an easy-to-consume REST interface for managing these entities. 

All Trackers created using Management API are saved and can be reused for other operations such as PUT, UPDATE and DELETE. 
To read about the capabilities of the Management API, see the [Management API](/docs/management-api/introduction) page. 

:::note Trackers Management UI
You can also create, view, edit and delete Trackers via the Trackers Management UI. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)

- **Using punctuations**: You can only pass periods `.`, apostrophes `'` and dashes `-` in the trackers vocabulary. Other punctuations like `?`, `,`, `!`, `:`are not allowed.
- **Vocabulary terms**: You must add atleast 5 and a maximum of 50 vocabulary terms per Tracker.
- **Trackers limitation**: You can create up to 500 trackers per account. 
:::

:::tip
Before creating the Trackers, go through the [Best Practices](/docs/best-practices/best-practices-trackers/) document to learn about the dos and don'ts of the Tracker vocabulary creation.
:::

### Step 1: Create Trackers
---

Create Trackers by sending a `POST` request to the Trackers Management API endpoint:

#### Authentication 

Before using the API, ensure that you have your Authentication Token (`AUTH_TOKEN`) handy. To learn about how to get your auth token, see the step-by-step instructions on the [Authentication](/docs/developer-tools/authentication) page.

#### API Endpoint

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

#### API Endpoint

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

On successful processing of the job, you will get the `conversationId` and the `jobId` as shown below:

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

Using the `conversationId` from Step 2, you can `GET` the detected Trackers using the following endpoint:

#### API Endpoint

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


:::caution Old Endpoint
The old endpoint for fetching Trackers (given below) is deprecated and not recommended to be used
`GET https://api.symbl.ai/v1/conversations/{conversationId}/trackers`
:::

## Read more
---
<div class="row">
  <div class="column">
    <div class="card21"><a href="/docs/management-api/trackers/overview/"><h4>API Reference</h4></a>

* [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
* [`GET` v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
* [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
* [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
* [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

<br/></div>
  </div>
   <div class="column">
    <div class="card21"><a href="//docs/async-api/introduction"><h4>Tutorials</h4></a> 

 
* [Creating Trackers with Async APIs](/docs/tutorials/trackers/create-trackers-async-api/)
* [Creating Trackers with Streaming API](/docs/tutorials/trackers/create-trackers-streaming-api/)
* [Using Trackers with Async API](/docs/tutorials/trackers/consuming-trackers-async-api/)
* [Using Trackers with Streaming API](/docs/tutorials/trackers/consuming-trackers-streaming-api/)
 

  </div>
  </div>
  
<br/>
<br/>
<br/>
 
</div>
<br/>
