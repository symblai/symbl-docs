---
id: consuming-trackers-streaming-api
title: Consuming Trackers with Streaming API
sidebar_label: Consuming Trackers with Streaming API
slug: /tutorials/trackers/consuming-trackers-streaming-api/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::


To pass a Tracker in the Streaming API, utilize the `config` object. 

Given below is an example that shows how to pass Trackers in the `config` object for the `startRealtimeRequest` of the Symbl’s JS SDK. This example also shows how to consume the results of the detected Trackers in real-time.

:::info Using Enable All Trackers functionality
Additionally, you can pass the parameter `enableAllTrackers` in the `config` object for `trackers` to use all the Trackers linked to your Symbl account. See the sample below to understand how to pass this.
:::

:::tip Best Practises
Before creating the Trackers, go through the [Best Practices](/docs/best-practices/best-practices-trackers/) document to learn about the dos and don'ts of the Tracker vocabulary creation.
:::

#### Authentication 

Before using the API, ensure that you have your Authentication Token (`AUTH_TOKEN`) handy. To learn about how to get your auth token, see the step-by-step instructions on the [Authentication](/docs/developer-tools/authentication) page.

### Sample Request

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
            "interimResults": true,
            "enableAllTrackers": true
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
### Parameter Description

Let’s go over all the parameters passed in the configuration object in the above function:

Field | Required | 
---------- | ------- | 
`id` | A unique UUID that represents this WebSocket API Session.
`insightType` | The types of Insights to be detected for this Conversation.
`trackers`| The Trackers to be detected in real-time for that Conversation. Follows the same structure as described in the [Trackers section](/docs/management-api/trackers/create-tracker#sample-request-body).
`config`| The config object encapsulates the metadata for the WebSocket API’s session.
`meetingTitle`| The title for this conversation/meeting.
`confidenceThreshold` | The insights having confidence scores greater than this threshold will be the ones detected for the Conversation.
`languageCode` | The language-code in BCP-47 format. 
`sampleRateHertz`| The sample-rate of the incoming audio data which is being pushed to Symbl.
`trackers.interimResults`| The `interimResults` flag tells Symbl to send the tracker results as soon as they are detected. If `false`, the tracker results are detected for the finalized transcription responses.
`trackers.enableAllTrackers`| The `enableAllTrackers` parameter must be sent to detect all the Trackers. The purpose of this flag is to enable detection of all the Trackers created with the Management API that maintains your entities with Symbl at the account level.
`speaker` | The details of the speaker in this Conversation
`userId`| Unique identifier to represent the User.
`name` | The name of the User.
`handlers` | The object encapsulating the call-back functions to be invoked on detection of those specific entities. For more information on various such handlers, check out this [link](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer/).
`onTrackerResponse`| This function is invoked when Symbl detects a Tracker in real-time. The structure of the Tracker object is shown in the above code snippet.

## Response

```js
"trackers":[
      {
         "name":"Testing Tracker Dev User 75",
         "matches":[
            {
               "type":"vocabulary",
               "value":"Documents",
               "messageRefs":[
                  {
                     "id":"53867534-0459-4d22-b590-984ee82166aa",
                     "text":"Anyways, so I will submit documents tomorrow.",
                     "offset":26
                  },
                  {
                     "id":"4d20d90c-50a7-4594-bb10-2995dcd4bbd1",
                     "text":"I will submit documents tomorrow.",
                     "offset":14
                  }
               ],
               "insightRefs":[
                  {
                     "id":"4d20d90c-50a7-4594-bb10-2995dcd4bbd1",
                     "text":"James needs to submit documents tomorrow.",
                     "type":"action_item",
                     "offset":22
                  }
               ]
            }
```
Field Name  | Description 
---------- | ------- |  
`name` | The name of the Tracker detected | 
`matches` | Array of match objects which contain the references to messages and insights detected in that conversation. |
`type` | The match type for the text. In the above example, the match is of type vocabulary. |
`value` | The textual value of the vocabulary for which this match was detected. |
`messageRefs` | Array of messages for which this Tracker was detected. |
`messageRefs.id`| The unique identifier of the message. |
`messageRefs.text` | The text body of the message. |
`messageRefs.offset`| The closest match of the text in the message. Offset of -1 means that an exact match for that specific vocabulary wasn’t found and this was the similar match. An offset greater than 0 indicates an exact match for the tracker in the payload of the message.

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

 
* [How to create and use Trackers- Trackers Management API](/docs/tutorials/trackers/consuming-trackers-management-api/)
* [Creating Trackers with Async APIs](/docs/tutorials/trackers/create-trackers-async-api/)
* [Creating Trackers with Streaming API](/docs/tutorials/trackers/create-trackers-streaming-api/)
* [Using Trackers with Async API](/docs/tutorials/trackers/consuming-trackers-async-api/)
 

  </div>
  </div>
  
<br/>
<br/>
<br/>
 
</div>
<br/>
