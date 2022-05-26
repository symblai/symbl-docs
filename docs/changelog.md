---
id: changelog
title: Changelog
sidebar_label: Changelog
slug: /changelog/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

--- 

Symbl continuously adds new features and enhancements, fixes critical bugs, and deploys performance improvements. Track the latest updates on this page.

### 26 May 2022

![sdk](/img/sdk-icon.png) <br/>
* **Web SDK (Beta) new release:** Version 1.0.4 of the [Symbl Web SDK (Beta)](/docs/web-sdk/overview/) is now available.

   * Added extra validation to `startProcessing` arguments.
   * Check if WebSocket is connected when making a `modifySampleRate` call. If not, throw a `NoConnectionError`.
   * Added reconnection support. If `reconnectOnError` is set to `true` in the [SymblConfig](/docs/web-sdk/web-sdk-reference/configuration-reference/#symbl-configuration), Web SDK attempts to reconnect after a break in connection. A break in connection is determined after thirty (30) seconds of not receiving any expected data from the WebSocket.
   * Added `logLevel` to [SymblConfig](/docs/web-sdk/web-sdk-reference/configuration-reference/#symbl-configuration).
   * Added separate methods to handle `<video>` and `<audio>` elements in audiostreams. Web SDK now has `attachAudioSourceElement`, `detachAudioSourceElement`, `updateAudioSourceElement`, `attachVideoSourceElement`, `detachVideoSourceElement`, and `updateVideoSourceElement`. Previous versions allowed either `<video>` or `<audio>` elements to be passed into the same `attachAudioSourceElement`, but going forward only the new separate corresponding methods may be used depending on element type.
   * Added `getConversationId()` to `StreamingAPIConnection` and `SubscribeAPIConnection`. These will only be populated after the `conversation_created` event has been fired. For more information on the `conversation_created` event, see [Events and Callbacks](/docs/web-sdk/web-sdk-reference/events-and-callbacks/#connection-events).
   * Added a `Conversation` object which can also be used to get the conversation ID. This object is attached to `StreamingAPIConnection` and `SubscribeAPIConnection` as `connection.conversation`. Going forward, the `Conversation` object will integrate with [Conversation APIs](/docs/conversation-api/introduction/).

* Known Issues:

   * If `disconnectOnStopRequest` is missing or `false`, once `stopProcessing` is called an error message will appear repeatedly warning that the websocket cannot send data.

* Bug Fixes:

   * Corrected typos in some of the TypeScript types for Topics.


### 24 May 2022

![api update](/img/api-update.png) <br/>
* **Summary API Beta release:** The [Summary API](/docs/conversation-api/summary/) is now available in [Beta](/docs/product-releases).


### 12 April 2022

![sdk](/img/sdk-icon.png) <br/>
- **Availability of a new Web SDK** that enables you to add Symbl’s Conversation Intelligence to your JavaScript application directly in the browser.  For more information see [Symbl Web SDK (Beta)](/docs/web-sdk/overview).

#### Known Issues
  - When an empty array is passed for `insightTypes` on `createConnection`, users still get those insights available with **ON** handlers for `questions`, `topics`, `action_items`, `follow_ups`.
  - Web SDK does not show any errors when users do not pass or use or send invalid (v4 format) `connectionID` to subscribe to an existing stream.
  - If a user loses network connection for 30 to 40 seconds, the WebSocket connection does not recover and sends a `noConnectionTimeout: 900` message.
  - If a second speaker joins an existing stream and passes the tracker object, the Streaming API only returns the trackers that were passed by the original speaker.
  - If the WebSocket Connection breaks and a user switches network from wifi to mobile hotspot, the connection does not recover.
  - Web SDK does not handle Safari browser seamlessly.
  - The `session_modified` event is not supported.  
  - Update Element is working for `Linear16` but not for `OPUS`.


### 14 March 2022

![api update](/img/api-update.png) <br/>
- **Enabling All Trackers with Streaming API:** Streaming API now supports enabling all the Trackers associated with an account. [Read more here](/docs/streaming-api/api-reference/#using-trackers). <br/>

### 8 Feb 2022

![api update](/img/api-update.png) <br/>
- **Trackers Limit Increase:** Increased Tracker creation limit to 500 per account. <br/>
- **Summarization Alpha Release**: Summary API is now available in the Alpha release phase. 
- **Relative timestamp for Messages API** <font color="orange"> (LABS): </font><br/> Added support for the parameters `timeOffset` and `duration` the Messages API. [Read more here](/docs/conversation-api/messages).
- **Nomenclature Change**: Change of name for the parameter `customVocabulary` for Topics API to `customTopicVocabulary`. Backward compatibility available. 

### 31 Jan 2022

![api update](/img/api-update.png) <br/>
- **Trackers Management UI:** You can create, view, edit, and delete Trackers via the Trackers Management UI. To access this feature, log in to [Symbl Platform](https://platform.symbl.ai/#/login). <br/>
[Read more here](/docs/concepts/trackers#trackers-management-ui).

### 13 Jan 2022

![api update](/img/api-update.png) 
- **Streaming API Opus Support:** Added support for Opus for Streaming API with 48000 Hz sample rate.<br/>
- **Streaming API parameters available in GA**: Availability of the following Streaming API parameters from Labs to GA: `noConnectionTimeout`, `disconnectOnStopRequest` and `disconnectOnStopRequestTimeout`.

### 11 Jan 2022

![api update](/img/api-update.png) 
- **Streaming API Logs:** You can view the log details of all your Streaming API requests. To access this feature, log in to [Symbl Platform](https://platform.symbl.ai/#/login). <br/>
[Read more here](/docs/streaming-api/api-reference#streaming-api-logs).

### 10 Jan 2022

![api update](/img/api-update.png) 
- **Word level confidence score:** You can get word-level confidence score in messages API. <br/>
[Read more here](/docs/conversation-api/messages#word-level-confidence-score--labs).

### 28 Dec 2021

![api update](/img/api-update.png) 
- **Added custom vocabulary support in Topics API.** <font color="orange"> (LABS) </font><br/>
[Read more here](/docs/conversation-api/get-topics#custom-vocabulary-for-topics-labs).

### 26 Nov 2021

![api update](/img/api-update.png) 
- **Added support for generating Trackers in Spanish Language** <font color="orange"> (LABS) </font><br/>
[Read more here](/docs/streamingapi/code-snippets/receive-trackers-in-spanish).

### 22 Oct 2021
![api update](/img/api-update.png) 
- **Added support for generating Summary for only the new Transcripts of a Conversation** <font color="orange"> (LABS) </font><br/>
[Read more here](/docs/tutorials/summarization/refreshing-summary#regenerate-summary-for-only-new-transcripts).

### 14 Oct 2021
![api update](/img/api-update.png) 
- **Added parameters to stop and start the Streaming API processing without disconnecting** <font color="orange"> (LABS) </font><br/>
Availability of parameters with Streaming API for keeping the WebSocket connection connected while stopping processing and for overriding the idle time out. <br/>
[Read more here](/docs/streaming-api/api-reference#request-parameters).


### 8 Oct 2021
![api update](/img/api-update.png)
- Availability of Abstract Topics in Labs. <br/>
[Read more here](/docs/guides/abstract-topics).

### 4 Oct 2021

![summary](/img/summary-ui-icon.png)
- Availability of adding custom domain in the Summary UI URL. <br/>
[Read more here](/docs/pre-built-ui/custom-domain).

### 21 Sep 2021

![api update](/img/api-update.png)
- Added support for `noConnectionTimeout` for Streaming API. <br/>
[Read more here](/docs/streaming-api/api-reference#request-parameters).

### 13 Sep 2021

![sdk](/img/sdk-icon.png)
- Availability of a new JavaScript SDK package: `@symblai/symbl-js`. The older package has been deprecated. <br/>
[Read more here](/docs/javascript-sdk/introduction).

### 9 Sep 2021

![api update](/img/api-update.png)
- Added support for `customVocabulary` for Streaming API. <br/>
[Read more here](/docs/streaming-api/api-reference#code-example).

### 2 Sep 2021

![sdk](/img/sdk-icon.png)
- **Symbl-Agora Marketplace Extension**: Availability of Symbl-Agora Marketplace Extension that allows you to use the Symbl's Conversation Intelligence with the Agora SDK for Android applications. <br/>
[Read more here](/docs/integrations/agora-sdk-plugin).

### 19 Aug 2021

![sdk](/img/sdk-icon.png)
- **Python SDK**: Added support for updating members and speaker events (PUT method) for Conversation API with Python SDK. <br/>
[Read more here](/docs/python-sdk/conversation-api).

### 9 Aug 2021

![sdk](/img/sdk-icon.png)
- **Python SDK**: Added support in Conversation API for getting trackers, analytics and entities with Python SDK. <br/>
[Read more here](/docs/python-sdk/conversation-api).

### 30 July 2021

![api update](/img/api-update.png)
- **Conversation Groups availability**: You can now create logical groups of conversations by setting the grouping criteria such as speaker agent, company name, call type such as internal, external, sales, etc.<br/>
[Read more here](/docs/concepts/conversation-groups).

![api update](/img/api-update.png)
- **Fetch all Conversations API availability**: You can now fetch all conversations in a single API call and also apply filters such as sorting, ordering etc. to your result set.<br/>
[Read more here](/docs/conversation-api/all-conversations).

- Bug Fixes:
  - Incorrect usage recorded due to internal issues in the Telephony API is fixed. 

![summary](/img/summary-ui-icon.png)
- **User Engagement Analytics**: You can get analytics data of your users interactions on the Summary UI via Segment app.<br/>
[Read more here](/docs/pre-built-ui/user-engagement-analytics).

### 13 July 2021

![summary](/img/summary-ui-icon.png)
- **Customizable Trackers and Summary UI**: You can now customize the look and feel of Trackers and Analytics UI to match your brand identity.<br/>
[Read more here](/docs/pre-built-ui/trackers-and-analytics-ui/#customizing-trackers-and-analytics-ui).

![api update](/img/api-update.png)

- Improved validations and error handling in Async API.
- Quality check for Summarization.
- Availability of Interim Trackers. 
- Added Real-time API optimizations. 
- Bug Fixes: 
  - Issue with incorrect Speaker Diarization in the Spanish language is fixed.
  - Issue with retrieving entities such as trackers in bulk in management API is fixed.

![sdk](/img/sdk-icon.png)
- Availability of Streaming API with Python SDK. [Read more here](/docs/python-sdk/streaming-api). 

### 29 June 2021

![api update](/img/api-update.png)
- **PII Identification and Redaction for real-time**: Identifying and Redacting Personally Identifiable Information (PII) such as name, email IDs,  government ID numbers, phone numbers, etc. is now available. With this feature, you can redact confidential information from conversations processed by Symbl. <br/>
[Read more here](/docs/concepts/redaction-pii/#identifying-and-redacting-pii).

![sdk](/img/sdk-icon.png)
- **Python SDK availability**: Availability of Python SDK with support for Telephony and Async APIs. [Read more here](/docs/python-sdk/overview). 

![summary](/img/summary-ui-icon.png)

- **Trackers and Analytics UI**: Availability of the Trackers and Analytics UI that provides a waveform visualization with conversation insights. [Read more here](/docs/pre-built-ui/trackers-and-analytics-ui).
- Support for the `readOnly` parameter has been added to avoid unintended editing of the **Summary UI**.
- Users can now share their own configured URL with their domain name in the iframe implementation.

### 31 May 2021
![api update](/img/api-update.png)

- Added support for creating Transcripts in SRT format. 
[Read more here](/docs/conversation-api/transcript/#create-transcript-in-srt).

### 22 April 2021

![api update](/img/api-update.png)
- Added support for Speaker `userID` in the Analytics API. 
- Availability of Trackers API (Beta) that allows you to track the occurrence of certain keywords or phrases in a conversation. [Read more here](/docs/concepts/trackers).
- Availability of Management API (for Trackers) in Beta. [Read more here](/docs/management-api/introduction).
- Added support for speaker channel separation for Async Video APIs. [Read more here](/docs/async-api/overview/video/post-video#speaker-separation).
- Availability of Summary API (Labs). [Read more here](/docs/concepts/summarization).
- Added support for `refresh` flag in the Summary API (Labs) that allows a previously generated Summary to be regenerated.
- Added support for Comprehensive Action Items API (Labs). [Read more here](/docs/concepts/action-items#comprehensive-action-items-labs.).


---


### [Connect with us on Slack](https://symbldotai.slack.com/join/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA#/shared-invite/email) 💬

