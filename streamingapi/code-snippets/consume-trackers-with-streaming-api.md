---
id: consume-trackers
title: Consume Trackers with Streaming API
sidebar_label: Consume Trackers with Streaming API
slug: /streaming-api/code-snippets/consume-trackers-with-streaming-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Below is an example that shows how to pass Trackers in the config object for the startRealtimeRequest of the Symbl’s JS SDK. This example also shows how to consume the results of the detected Trackers in real-time.

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
`trackers: { interimResults }`| The interimResults flag tells Symbl to send the tracker results as soon as they are detected. If false, the tracker results are detected for the finalized transcription responses.
`speaker` | The details of the speaker in this Conversation
`userId`| Unique identifier to represent the User.
`name` | The name of the User.
`handlers` | The object encapsulating the call-back functions to be invoked on detection of those specific entities. For more information on various such handlers, check out this [link](/docs/javascript-sdk/tutorials/receive-ai-insights-from-your-computer/).
`onTrackerResponse`| This function is invoked when Symbl detects a Tracker in real-time. The structure of the Tracker object is shown in the above code snippet.