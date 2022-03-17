---
title: Pre-built Trackers (Beta)
id: pre-built-trackers
sidebar_label: Pre-built Trackers (Beta)
slug: /guides/pre-built-trackers
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

A **Pre-built Tracker** is a pre-configured or pre-trained tracker that will allow you to track certain characteristics of a conversation without the need to gather, test, maintain and develop a custom vocabulary.
The Pre-built Trackers are provided with a robust library of terms organized by industry and use case so that you can easily find and apply the tracking functionality with no or minimal code changes.

### Tone Analysis

Tone detection identifies and analyses the overall tone of a conversation such as empathy, satisfaction, politeness, confusion, dissatisfaction, etc.

The following tones are detected with the Pre-built Trackers:

- Empathy
- Confusion
- Politeness
- Satisfaction
- Dissatisfaction
- Understanding

### Sales Coaching

Sales Coaching is a Pre-built Tracker that helps you improve the quality of your sales calls by allowing you to track important mentions in a conversation.

The Pre-trackers available for sales coaching are as follows:

- Pricing Mention
- Provide Recommendation
- Objection Language

### Beep Detection

Beep detection is the ability of the system to recognize several types of beeps from the audio content. It detects beeps from answering machines, fax machines, or phone calls that are produced at the beginning, end, or in the middle of the call. Beep detection in the context of video or audio conferencing where depending on the type of beep and status of the call they can mean different things such as - network busy, incoming call, etc.

:::note
The Beep detection feature is only provided with Realtime API for now and not with Async APIs.<br/>
Beep detection is currently detected only at 8K sample rate.
:::

### Name Detection

Name Detection allows you to detect human names from a phone call such as the person who’s calling, analyze or scrape names of people from the ongoing meetings or call, etc., to utilize it in your own application or use case.

## Using Pre-built Trackers with Streaming API

---

The [Streaming API](/docs/streaming-api/api-reference#request-parameters) accepts a list of Pre-built Trackers in a field `prebuiltTrackers` as part of the `start_request` message payload.

`prebuiltTrackers` is an array of objects where every object contains the unique name of a Pre-built Tracker. See sample below.

After the connection is successfully established, as the trackers are detected in real-time, you will receive the `tracker_response` in the WebSocket connection. The following details are sent in the `tracker_response`:

- A unique tracker name,
- The matched text and
- Offset of it.

### Sample Request

Given below is the `start_request` payload sent to Streaming API with Pre-built Trackers for audio content:

```js
{
    "type": "start_request",
    "trackers": [
      { ... },
      { ... }
    ],
    "prebuiltTrackers": [
      {
        "name": "Symbl.Empathy"
      },
      {
        "name": "Symbl.Confusion"
      },
      {
        "name": "Symbl.Satisfaction"
      },
      },
      {
        "name": "Symbl.Beep"
      },
       {
        "name": "Symbl.PersonName"
      },
    ],
    "config": {
        ...
    }
}
```

Parameters  | Description
---------- | -------                                                                                                              
| `prebuiltTrackers` | An array of objects containing names of Pre-built Trackers.                                                                                                                                                                                    |
| `name`             | Name of the Pre-built Trackers. The following are supported: <br/> <br/> **Tone Analysis Trackers** <br/>`Symbl.Empathy`,<br/> `Symbl.Confusion`, <br/>`Symbl.Politeness`, <br/>`Symbl.Satisfaction`, <br/> `Symbl.Dissatisfaction`, <br/> `Symbl.Understanding`<br/><br/> **Sales Coaching Trackers** <br/> `Symbl.PricingMention`, <br/> `Symbl.ProvideRecommendation`, <br/> `Symbl.ObjectionLanguage` <br/><br/> **Beep Detection Trackers** <br/> `Symbl.Beep`<br/> <br/> **Name Detection Trackers** <br/> `Symbl.PersonName`|

### Sample Response

```js
[
  {
    // Prebuilt Audio Tracker Detected
    type: "tracker_response",
    prebuilt: true,
    trackers: [
      {
        name: "Symbl.PersonName",
        matches: [
          {
            audioOffset: 9375, // in millis
          },
        ],
        
      },
    ],
    matches: [
      {
        audioRefs: [
          {
            audioOffset: 9375, // in millis
          },
        ],
        type: "audio",
      },
    ],
  },
];
```

| Fields              | Description                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `name`              | The name of the prebuilt audio tracker.                                                                                  |
| `prebuilt`          | A boolean flag to indicate if there was a match.                                                                         |
| `matches.type`      | The type of match found. Here is it `audio`.                                                                             |
| `matches.audioRefs` | An array of object containing `audioOffset` to indicate the time offset from the begining of the stream in milliseconds. |

To see the full sample code, go to [How to use Pre-built Trackers with Streaming API](/docs/streamingapi/code-snippets/receive-trackers-in-spanish). 