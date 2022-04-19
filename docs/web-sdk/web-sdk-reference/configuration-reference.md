---
id: configuration-reference
title: Configuration Reference
slug: /web-sdk/web-sdk-reference/configuration-reference/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This page contains the details of the **Connection Configuration** and the **Symbl Configuration** required while using the Web SDK. 

### Connection Configuration

The following code shows an example connection configuration for Web SDK. The connection configuration is passed into the Streaming API connection during the [`startProcessing`](#startprocessingoptions-streamingapiconnectionconfig) method. 

```js
const connectionConfig = {
  id: "bd82dd08-ad93-4549-827c-3f646647ae61",
  disconnectOnStopRequest: false,
  disconnectOnStopRequestTimeout: 1800,
  noConnectionTimeout: 900,
  insightTypes: ["follow_up", "action_item", "question"],
  config: {
      meetingTitle: "Mic Test", // Name for meeting
      confidenceThreshold: 0.7, //Minimum confidence score set for the API to consider an insight as valid.
      timezoneOffset: 480, // Offset in minutes from UTC
      languageCode: "en-US",
      encoding: "OPUS",// Also supports LINEAR16
      sampleRateHertz: 48000 // Rate of the incoming audio stream. Make sure the correct sample rate is provided for best results
  },
  trackers: [{
      name: "Promotion Mention", // Name of the Tracker
      vocabulary: ["We have a special promotion going on", "We have a sale right now on", "offer"] // Words or phrases that should be tracked
  }],
  speaker: {
      userId: "john@example.com", // Unique identifier of the speaker
      name: "john"
  }
}
```

You can pass any of the following connection configuration parameters:

    
Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
```id``` | Optional* | Should match this regex: `/^[a-zA-Z0-9-]{6,64}$/` | The ID for the current session. *If not provided, a UUID will be generated for you.
```insightTypes``` | Optional | action_item, question | Types of insights to return. If not provided, no insights will be returned.
```customVocabulary``` | Optional | List of String | An array of strings containing vocabulary specific to your company, products, or phrases. 
```config``` | Optional | Find the supported value [here](#config) | Configuration for this request. [See the config section below for more details](#config).
```speaker``` | Optional  | Find the supported value [here](#speaker) | Speaker identity to use for audio in this WebSocket connection. If omitted, no speaker identification will be used for processing. [See the speaker section below for more details](#speaker).
```trackers``` | Optional | List of Trackers | An array of trackers. [See the trackers section below for more details](#trackers).
```noConnectionTimeout``` | Optional |  Between `0` to `1800` seconds | The buffer time (in seconds) during which the WebSocket API connection stays open even if there’s no Streaming API connection active for that duration. This allows the Speaker to reconnect to the same meeting with the same Subscribers if they lost the connection previously. <br/> <br/> For example,  when this parameter is set to `noConnectionTimeout = 600 secs` and if there is no graceful termination using `stop_request` message sent explicitly when there just one WebSocket connection, the `connectionId` and `conversationId` are kept valid for 600 seconds before finalizing the connection, after which connectionId will be not available to subscribe and `conversationId` will have all the last know information associated with it.
```disconnectOnStopRequest``` | Optional | `true` or `false` | This parameter allows you to set your Streaming API connection in such a way that even when the `stop_request` is sent. The connection does not drop-off, only the processing is stopped and the `conversationId` and connection is kept live for `1800` seconds by default. You can always override this value by passing the `disconnectOnStopRequest` parameter. <br/> <br/> This allows you to stop and start the Streaming API processing without dropping the WebSocket connection, so that you can stop and resume the processing in the middle of a call and optimize the Streaming API usage costs. <br/> <br/> The default value is `true`. |
```disconnectOnStopRequestTimeout``` | Optional | Between `0` to `1800` seconds | This parameter allows you to override the idle time out (if a WebSocket connection is idle for 30 minutes). Set this parameter with a value between `0` to `1800` seconds. If the idle connection needs to be kept alive beyond `1800` seconds, you have to restart the connection at `1800` seconds elapsed. <br/> <br/> If the value is passed as `0`, the WebSocket connection is dropped when `stop_request` is received. The default value is `1800`.

##### Code Example

```js
{
  "type": "start_request",
  "insightTypes": ["question", "action_item"],
  "customVocabulary": ["acme", "acme-platform"],
  "config": {},  // See Config section below.
  "speaker": {}  // See Speaker section below.
  "trackers": [] // See Trackers section below.
}
```

---


#### <a name="config"></a>Config

Field | Required | Supported value | Default Value | Description
---------- | ------- | ------- |  ------- |  ------- |
```confidenceThreshold``` | false  | <=0.5 to <=1.0 | 0.5 | Minimum confidence score that you can set for an API to consider it as valid insight. The minimum confidence score should be in the range >=0.5 to <=1 (greater than or equal to `0.5` and less than or equal to `1.0`.). Default value is `0.5`.
```encoding``` | false  | `LINEAR16`, `Opus` | `LINEAR16` | Audio Encoding in which the audio will be sent over the WebSocket.
```sampleRateHertz  ``` | false  |  | `16000` | The rate of the incoming audio stream.
```meetingTitle``` | false | | | The name of the meeting.

##### <a name="config-example"></a>Code Example

```js
{
  "config": {
    "confidenceThreshold": 0.9,
    // "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "meetingTitle": "Client Meeting",
    "encoding": "LINEAR16",
    "sampleRateHertz": 16000 // Make sure the correct sample rate is provided for best results
  }
}
```

---


####  <a name="speaker"></a>Speaker

Field  | Required | Supported Value
---------- | ------- |  -------
```userId``` | Optional | Any user identifier for the user.
```name``` | Optional | Display name of the user.

##### Code Example

```js
{
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
}
```

---
    
#### <a name="trackers"></a> Trackers
 
Field  | Required | Supported Value
---------- | ------- |  -------
```name``` | Optional | The name acts as a unique identifier assigned to the Tracker. It is case-sensitive, which means that a Tracker can be created with the same name but with different cases.
```vocabulary``` | Optional | The vocabulary contains a set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts. 
    
##### Code Example
    
```js
{
    trackers: [
        {
            name: "Goodness",
            vocabulary: [
                "This is awesome",
                "I like it",
                "I love this"
            ]
        }
    ]
}
```

---

#### Full Code Example

```js
const connectionConfig = {  
  "disconnectOnStopRequest": false,
  "disconnectOnStopRequestTimeout": 1800,
  "noConnectionTimeout": 1800,
  "insightTypes": ["question", "action_item"],
  "config": {
    "confidenceThreshold": 0.9,
    "timezoneOffset": 480, // Your timezone offset from UTC in minutes
    "encoding": "LINEAR16",
    "sampleRateHertz": 44100, // Make sure the correct sample rate is provided for best results
    "meetingTitle": "Client Meeting"
  },
  "trackers": [
    {
        "name": "Goodness",
        "vocabulary": [
            "This is awesome",
            "I like it",
            "I love this"
        ]
    }
  ],
  "speaker": {
    "userId": "jane.doe@example.com",
    "name": "Jane"
  }
};
 ```

### Symbl Configuration

Field  | Required | Supported Value
---------- | ------- |  -------
```accessToken``` | Optional | The access token generated using [Symbl’s Authentication method](https://docs.symbl.ai/docs/developer-tools/authentication/). Recommended method for production environments. *Cannot be paired with `appId` or `appSecret`.
```appId``` | Optional | The App ID from the [Symbl Platform](https://platform.symbl.ai). We only recommend using this on non-production environments. *Must be paired with `appSecret`.
```appSecret``` | Optional | The App Secret from the [Symbl Platform](https://platform.symbl.ai). We only recommend using this on non-production environments. *Must be paired with `appId`.
```basePath``` | Optional | The base path of the Symbl API. By default it is `https://api.symbl.ai`.
```logLevel``` | Optional | The log level you wish to view in the console. Supported values are `error`,`warn`,`debug`,`info`,`log`,`trace`.
