---
id: create-trackers-streaming-api
title: Creating Trackers with Streaming API
sidebar_label: Creating Trackers with Streaming API
slug: /tutorials/trackers/create-trackers-streaming-api/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

You can create and consume Trackers in real-time using the Streaming APIs. 

Below is an example that shows how to pass Trackers in the `config` object for the `startRealtimeRequest` of the Symbl’s JS SDK. This example also shows how to consume the results of the detected Trackers in real-time.

:::info Creating Trackers with Management API
While you can create Trackers with Async or Streaming APIs, it is recommended that you create Trackers using Management API because Trackers created with Management APIs are saved and can be reused while the same is not possible with Async or Streaming APIs. 
:::

:::tip Best Practises
Before creating the Trackers, go through the [Best Practices](#best-practices) section to learn about how to create Trackers.
:::

```js

const connection = await sdk.startRealtimeRequest({
    id,
    insightTypes: ['action_item', 'question'],
    trackers: [
        {
            name: "COVID-19",
            vocabulary: [
                "social distancing",
                "cover your face with mask",
                "vaccination"
            ]
        }
    ],
    config: {
        meetingTitle: "My Awesome Meeting",
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
`insightTypes` | The types of Insights to be detected for this Conversation.
`trackers`| The Trackers to be detected in real-time for that Conversation. Follows the same structure as described in the [Trackers section](/docs/management-api/trackers/create-tracker#sample-request-body).
`config`| The config object encapsulates the metadata for the WebSocket API’s session.
`meetingTitle`| The title for this conversation/meeting.
`confidenceThreshold` | The insights having confidence scores greater than this threshold will be the ones detected for the Conversation.
`languageCode` | The language-code in BCP-47 format. 
`sampleRateHertz`| The sample-rate of the incoming audio data which is being pushed to Symbl.
`trackers.interimResults`| The interimResults flag tells Symbl to send the tracker results as soon as they are detected. If false, the tracker results are detected for the finalized transcription responses.
`trackers.enableAllTrackers`| The `enableAllTrackers` parameter must be sent to detect all the Trackers. The purpose of this flag is to enable detection of all the Trackers created with the Management API that maintains your entities with Symbl at the account level.
`speaker` | The details of the speaker in this Conversation
`userId`| Unique identifier to represent the User.
`name` | The name of the User.
`handlers` | The object encapsulating the call-back functions to be invoked on detection of those specific entities. For more information on various such handlers, check out this [link](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer/).
`onTrackerResponse`| This function is invoked when Symbl detects a Tracker in real-time. The structure of the Tracker object is shown in the above code snippet.

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
* [Using Trackers with Async API](/docs/tutorials/trackers/consuming-trackers-async-api/)
* [Using Trackers with Streaming API](/docs/tutorials/trackers/consuming-trackers-streaming-api/)
 

  </div>
  </div>
  
<br/>
<br/>
<br/>
 
</div>
<br/>
