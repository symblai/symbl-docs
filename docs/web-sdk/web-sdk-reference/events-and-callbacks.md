---
id: events-and-callbacks
title: Events and Callbacks
slug: /web-sdk/web-sdk-reference/events-and-callbacks/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Both the connection and audio stream objects have an [`on`](/web-sdk/web-sdk-reference/web-sdk-reference/#oneventname-eventtypes-callback-function) method which can be used to subscribe to events and perform callbacks.

### Connection Events

Listeners can subscribe to the following events on the Connection object:

#### Example

```js
connection.on("topic", (topicData) => {
  topicData.forEach((topic) => {
    console.log("Topic: " + topic.phrases);
  });
});
 
connection.on("disconnected", () => {
  console.log("User has been disconnected")
});
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `connected`                   | When the WebSocket connection is successfully established.                        | None                                                                                        |
| `disconnected`                | When the WebSocket connection is disconnected.                                    | None                                                                               |
| `started_listening`          | Started listening to input device.                                                | None                                                                      |
| `stopped_listening`          | Stopped listening to input device.                                                 | None                                                                     |
| `processing_started`         | Audio data processing successfully started.                                       | None                                                                     |
| `processing_stopped`         | Audio data processing stopped.                                                    | None                                                                |
| `conversation_created`       | Conversation is created and an ID is generated.                                   | None                                                               |
| `conversation_completed`     | Conversation is ended.                                                            | None                                                             |
| `session_modified`           | When the sample rate of the session is modified.                                  | Returns an object containing the new sample rate.                                                                                                    |
| `speech_recognition`         | When data is being transferred between the client and server                      | [Speech Recognition Object](#speech-recognition-object) |
| `message`                     | When the message object is detected.                                              | [Message Response Object](#message-response-object)                                                                                          |
| `topic`                       | When topics are detected.                                                         | [Topic Response Object](#topic-response-object)                                                                                                          |
| `tracker`                     | When Trackers are detected.                                                       | [Tracker Response Object](#tracker-response-object)                                                                                                       |
| `action_item`                | When Action Items are detected.                                                   | [Action Item Response Object](#action-item-response-object)                                                                                          |
| `follow_up`                  | When follow-ups are detected.                                                     |  [Follow Up Response Object](#action-item-response-object)                                                                                                 |
| `question`                    | When questions are detected.                                                      | [Question Response Object](#action-item-response-object)                                                                                                    |

### AudioStream Events

Listeners can subscribe to the following events on the Connection object:

#### Example

```js
const audioStream = new OPUSAudioStream();
audioStream.on("audio_source_disconnected", () => {
  // Do something.
});

// OR 

connection.audioStream.on("audio_source_disconnected", () => {
  // Do something.
});
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `audio_source_connected`    | The audio source is connected to Symbl.                                           | Returns the sample rate of the new audio source                                                         |
| `audio_source_disconnected` | The audio source is connected.                                                    | None                                                 |
| `audio_source_changed`      | A new default device is detected                                                  | None

### Global Events

Listeners can subscribe to the following global Symbl Events using the [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window) object.

#### Example

```js
window.addEventListener("error", (error) => {
  const thrownError = error.detail;

  // Do something.
})
```

| Event                       | Description                                                                       | Callback Data                                                                                                                                                               |
| --------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `error`                       | Errors recorded when there are potential anti-patterns or non-recommended coding. | The Error Object that was thrown. Will be found in the `callbackData.detail`. 


### Callback Data Reference

#### Speech Recognition Object

To retrieve the real-time transcription results as soon as they are detected. You can use this callback to render live transcription which is specific to the speaker of this audio stream.

```js
connection.on("speech_recognition", (speechData) => {
  // Handle speechData here.
});
```

####  JSON Response Example

```js
{
  "type": "recognition_result",
  "isFinal": true,
  "payload": {
    "raw": {
      "alternatives": [{
        "words": [{
          "word": "Hello",
          "startTime": {
            "seconds": "3",
            "nanos": "800000000"
          },
          "endTime": {
            "seconds": "4",
            "nanos": "200000000"
          }
        }, {
          "word": "world.",
          "startTime": {
            "seconds": "4",
            "nanos": "200000000"
          },
          "endTime": {
            "seconds": "4",
            "nanos": "800000000"
          }
        }],
        "transcript": "Hello world.",
        "confidence": 0.9128385782241821
      }]
    }
  },
  "punctuated": {
    "transcript": "Hello world."
  },
  "user": {
    "userId": "emailAddress",
    "name": "John Doe",
    "id": "23681108-355b-4fc3-9d94-ed47dd39fa56"
  }
}
```

---

#### Message Response Object

This callback function contains the "finalized" transcription data for this speaker and if used with multiple streams with other speakers this callback would also provide their messages.

The "finalized" messages mean that the automatic speech recognition has finalized the state of this part of transcription and has declared it "final". Therefore, this transcription will be more accurate than the [Speech Recognition Object](#speech-recognition-object).

```js
connection.on("message", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```js
[{
  "from": {
    "id": "0a7a36b1-047d-4d8c-8958-910317ed9edc",
    "name": "John Doe",
    "userId": "emailAddress"
  },
  "payload": {
    "content": "Hello world.",
    "contentType": "text/plain"
  },
  "id": "59c224c2-54c5-4762-9582-961bf250b478",
  "channel": {
    "id": "realtime-api"
  },
  "metadata": {
    "disablePunctuation": true,
    "timezoneOffset": 480,
    "originalContent": "Hello world.",
    "words": "[{\"word\":\"Hello\",\"startTime\":\"2021-02-04T20:34:59.029Z\",\"endTime\":\"2021-02-04T20:34:59.429Z\"},{\"word\":\"world.\",\"startTime\":\"2021-02-04T20:34:59.429Z\",\"endTime\":\"2021-02-04T20:35:00.029Z\"}]",
    "originalMessageId": "59c224c2-54c5-4762-9582-961bf250b478"
  },
  "dismissed": false,
  "duration": {
    "startTime": "2021-02-04T20:34:59.029Z",
    "endTime": "2021-02-04T20:35:00.029Z"
  }
}]
```

---

#### Action Item Response Object

This callback provides you with any of the detected action items in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's action items in case of multiple streams.

```js
connection.on("action_item", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[{
  "id": "94020eb9-b688-4d56-945c-a7e5282258cc",
  "confidence": 0.9909798145016999,
  "messageReference": {
    "id": "94020eb9-b688-4d56-945c-a7e5282258cc"
  },
  "hints": [{
    "key": "informationScore",
    "value": "0.9782608695652174"
  }, {
    "key": "confidenceScore",
    "value": "0.9999962500210938"
  }, {
    "key": "comprehensionScore",
    "value": "0.9983848333358765"
  }],
  "type": "action_item",
  "assignee": {
    "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
    "name": "John Doe",
    "userId": "emailAddress"
  },
  "dueBy": {
    "value": "2021-02-05T00:00:00-07:00"
  },
  "tags": [{
    "type": "date",
    "text": "today",
    "beginOffset": 39,
    "value": {
      "value": {
        "datetime": "2021-02-05"
      }
    }
  }, {
    "type": "person",
    "text": "John Doe",
    "beginOffset": 8,
    "value": {
      "value": {
        "name": "John Doe",
        "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
        "assignee": true,
        "userId": "emailAddress"
      }
    }
  }],
  "dismissed": false,
  "payload": {
    "content": "Perhaps John Doe can submit the report today.",
    "contentType": "text/plain"
  },
  "from": {
    "id": "e2c5acf8-b9ed-421a-b3b3-02a5ae9796a0",
    "name": "John Doe",
    "userId": "emailAddress"
  }
}]
```

---

#### Question Response Object

This callback provides you with any of the detected questions in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's questions in case of multiple streams.

```js
connection.on("question", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[
  {
    "id": "e0e44c21-c965-47b0-92d9-878ac22302ae",
    "confidence": 0.9834683553122807,
    "hints": [
      {
        "key": "confidenceScore",
        "value": "0.9957259328650095"
      },
      {
        "key": "comprehensionScore",
        "value": "0.971210777759552"
      }
    ],
    "type": "question",
    "assignee": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654003",
      "name": "Jane Doe",
      "userId": "user@example.com"
    },
    "tags": [],
    "dismissed": false,
    "payload": {
      "content": "How may I help you today?",
      "contentType": "text/plain"
    },
    "from": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654003",
      "name": "Jane Doe",
      "userId": "user@example.com"
    },
    "entities": null,
    "messageReference": {
      "id": "79a57ed7-d043-4a82-85fc-ae7844d8d2bb"
    }
  }
]
```

---

#### Follow Up Response Object

This callback provides you with any of the detected follow ups in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every speaker's follow ups in case of multiple streams.

```js
connection.on("follow_up", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[
  {
    "id": "05bfb176-c2d3-42fd-a7e7-bbc80596a3e9",
    "confidence": 1,
    "hints": [
      {
        "key": "addressedTo",
        "value": "[\"first_person_singular\",\"second_person_singular\"]"
      },
      {
        "key": "informationScore",
        "value": "0.7361413043478261"
      },
      {
        "key": "confidenceScore",
        "value": "1.0"
      }
    ],
    "type": "follow_up",
    "assignee": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
      "name": "Adam Voliva",
      "userId": "adam.symbl.test@gmail.com"
    },
    "tags": [
      {
        "type": "person",
        "text": "Adam Voliva",
        "beginOffset": 0,
        "value": {
          "value": {
            "name": "Adam Voliva",
            "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
            "assignee": true,
            "userId": "adam.symbl.test@gmail.com"
          }
        }
      }
    ],
    "dismissed": false,
    "payload": {
      "content": "Adam Voliva can send it internet service technician to your home.",
      "contentType": "text/plain"
    },
    "from": {
      "id": "29c192e0-6fbc-4b94-9cb8-040783654002",
      "name": "Adam Voliva",
      "userId": "adam.symbl.test@gmail.com"
    },
    "entities": null,
    "messageReference": {
      "id": "05bfb176-c2d3-42fd-a7e7-bbc80596a3e9"
    }
  }
]
```

---

#### Topic Response Object

This callback provides you with any of the detected topics in real-time as they are detected.  As with the [Message Response Object](#message-response-object) this would also return every topic in case of multiple streams.

```js
connection.on("topic", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
[{
  "id": "e69a5556-6729-11eb-ab14-2aee2deabb1b",
  "messageReferences": [{
    "id": "0df44422-0248-47e9-8814-e87f63404f2c",
    "relation": "text instance"
  }],
  "phrases": "auto insurance",
  "rootWords": [{
    "text": "auto"
  }],
  "score": 0.9,
  "type": "topic"
}]
```

---

#### Tracker Response Object

This callback provides you with any of the detected trackers in real-time as they are detected. As with the [Message Response Object](#message-response-object) this would also return every tracker in case of multiple streams.

```js
connection.on("tracker", (data) => {
  // Handle data here.
});
```

##### JSON Response Example

```json
{
  "type": "tracker_response",
  "isFinal": true,
  "trackers": [
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "This is awesome",
          "messageRefs": [
            {
              "id": "fa93aa64-0e8d-4697-bb52-e2916ca63192",
              "text": "This is awesome.",
              "offset": 0
            }
          ],
          "insightRefs": []
        },
        {
          "type": "vocabulary",
          "value": "Hello world",
          "messageRefs": [
            {
              "id": "8e720656-fed7-4b11-b359-3931c53bbcec",
              "text": "Hello world.",
              "offset": 0
            }
          ],
          "insightRefs": []
        }
      ]
    },
    {
      "name": "Goodness",
      "matches": [
        {
          "type": "vocabulary",
          "value": "I like it",
          "messageRefs": [
            {
              "id": "193dc144-2b55-4214-b211-ab83bd3e4a2e",
              "text": "I love it.",
              "offset": -1
            }
          ],
          "insightRefs": []
        }
      ]
    }
  ],
  "sequenceNumber": 1
}
```