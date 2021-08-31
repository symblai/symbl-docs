---
id: agora-sdk-plugin
title: Agora SDK Plugin for Android
slug: /integrations/agora-sdk-plugin
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This document provides information about how to build and use the Symbl conversation AI plugin with Agora SDK. 
 
Symbl is an AI-powered, API first, Conversation Intelligence platform that analyzes conversation data and lets you:
 
- Generate Conversation Intelligence like Sentiment Analysis, Action Items, Topics, Trackers, Summary, and much more in your applications.
- Generate Speech-to-text capabilities like Transcription, Speaker Separation, and Speaker Diarization, with multi-channel data with data Video, Audio, Text, and Streaming.
 
To read more about what is Symbl and how it works go [here](https://docs.symbl.ai/docs/what-is-symbl/).

The Symbl’s key capabilities are:

&nbsp; &nbsp;👉 &nbsp; [Speech-to-Text (Transcripts)](/docs/concepts/speech-to-text)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topics](/docs/concepts/topics) <br/>
&nbsp; &nbsp;👉 &nbsp; [Sentiment Analysis](/docs/concepts/sentiment-analysis) <br/>
&nbsp; &nbsp;👉 &nbsp; [Action Items](/docs/concepts/action-items)<br/>
&nbsp; &nbsp;👉 &nbsp; [Follow-Ups](/docs/concepts/follow-ups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Questions](/docs/concepts/questions)<br/>
&nbsp; &nbsp;👉 &nbsp; [Trackers](/docs/concepts/trackers)<br/>
&nbsp; &nbsp;👉 &nbsp; [Conversation Groups](/docs/concepts/conversation-groups)<br/>
&nbsp; &nbsp;👉 &nbsp; [Conversation Analytics](/docs/concepts/conversational-analytics)<br/>
&nbsp; &nbsp;👉 &nbsp; [Topic Hierarchy](/docs/concepts/topic-hierarchy)<br/>
&nbsp; &nbsp;👉 &nbsp; [Entities](https://docs.symbl.ai/docs/what-is-symbl#%EF%B8%8F-entities)<br/>
&nbsp; &nbsp;👉 &nbsp; [Summary UI](https://docs.symbl.ai/docs/what-is-symbl#%EF%B8%8F-summary-page-ui)<br/>

## Overview

The application Symbl-Agora Android-SDK-plugin has two main components:

- Agora-Symbl Component
- Agora-Symbl Extension Plugin
 
### Agora-Symbl Component

This component is responsible for passing the required parameters (such as user authorization, connection host URL) to establish a connection to Agora and Symbl platforms.
 
This component also provides a user interface and shows Symbl's conversation intelligence in near real-time.

#### Codebase path

```js
/symbl-agora-android-sdk-plugin/app
```

#### Codebase language
`Java`

### Agora-Symbl Extension Plugin
 
This component is an audio extension filter for the Agora filter plugin.
In a real-time engagement powered by Agora, the transmission process is as follows:

![agora](/img/agora-flow.png)

You can add features that make real-time engagement sessions more interactive in the pre-processing or post-processing phase. Such functions include voice change, image enhancement, audio effects, and voice recognition. To implement these features, use audio filters to process the audio data and video filters to process the video data.

This component uses APIs provided by Agora to create an audio filter plugin.
 
For further details, see this [reference specification of plugin example](https://github.com/AgoraIO-Community/RTE-2021-Innovation-Challenge/blob/master/Demo/Plugin_API.md).

#### Codebase language
`C++` and `Java`
 
#### OS type

`Android` 
 
## Building and Running the Symbl-Agora SDK Plugin
---

In this section, you will build and use conversational AI Symbl-Agora SDK Plugin for Android. 

Follow the step-by-step instructions given below:

### Step 1. Download Plugin Dependencies 

You must download the following plugin dependencies: 

- **Symbl-Agora SDK plugin**: This is bundled Android plugin (aar) which is core Symbl-Agora plugin.

Download link [here](https://cdn-agora.symbl.ai/agora-symblai-filter-debug.aar). 

- **Agora SDK**: Place the required dependent files in the specified directory

Download link [here](https://cdn-agora.symbl.ai/agora-symblai-filter-debug.aar).

Place the required dependencies in the directories specified below:

| Dependency | Processor | Storage Path 
|--------|----------|-------|
| `agora-rtc-sdk.jar` | - | `symbl-agora-android-sdk-plugin\app\libs` 
| `libagora-rtc-sdk-jni.so` | 64-bit | `symbl-agora-android-sdk-plugin\app\src\main\jniLibs\arm64-v8a`
| `libagora-rtc-sdk-jni.so` | 32-bit | `symbl-agora-android-sdk-plugin\app\src\main\jniLibs\armeabi-v7a`
| `libeffect.so` | 64-bit | `symbl-agora-android-sdk-plugin\agora-symblai\src\main\jniLibs\arm64-v8a`
| `libeffect.so` | 32-bit | `symbl-agora-android-sdk-plugin\agora-symblai\src\main\jniLibs\armeabi-v7a`


### Step 2. Configure Agora and Symbl Platform 

#### 2.1 Agora Platform Configuration

This section describes the required Agora parameters to be configured in the application to be connected to the Agora platform and consume streaming service.
 
The sample code below describes the parameters in the `MainActivityForm.java` that are used to build the Agora service request.

```java
private final static String AGORA_CUSTOMER_CHANNEL_NAME = "AGORA_CHANNEL_NAME";
private static final String AGORA_CUSTOMER_APP_ID = "AGORA_CUSTOMER_ID";
public static final String TOKEN_VALUE = "28nalEsLm0ymgAAAAAEAA8nW45JzUnYQEAAQASNSdh";
public static final String AGORA_MEETING_ID = "UNIQUE_MEETING_ID";
```
 
The following table describes the parameters to be used in the Agora configuration:

| Parameter | Description | 
|--------|----------|
| `AGORA_CUSTOMER_APP_ID` | All clients in a channel use App IDs for authentication.
| `TOKEN_VALUE` | All clients in a channel use tokens for authentication.

For more details, see the [Setup Authentication](https://docs.agora.io/en/Agora%20Platform/token) page.
 
The above details need to be set in the `MainActivityForm.java` file in the Symbl-Agora SDK plugin.

![agora-dash](/img/agora-dash.png)
 
#### 2.2 Symbl Platform Configuration
 
This section describes the required Symbl parameters and their respective descriptions.
The sample code below describes the parameters in the `MainActivityForm.java` that are used to build the Symbl service request.
 
```java
public static final String symbl_meeting_UserId = "john@example.com";
public static final String symbl_meeting_user_Name = "agora";
String symbl_unique_meetingId = "UniqueMeeting"+System.currentTimeMillis();
```
 
The following table describes the parameters to be used in the Symbl configuration: 
 
| Parameter | Description | 
|---------|----------| 
| `symbl_meeting_UserId` | Used to identify the user in the real-time meeting.
| `symbl_meeting_user_Name` | The name of the user attending the real-time meeting.

Using the parameters above, and generating a unique meeting Id, you can take advantage of the
[Symbl Summary UI](https://docs.symbl.ai/docs/telephony/code-snippets/receive-prebuilt-ui-email-after-conversationcapability) which provides users with a translated meeting summary page with transcript, attendees, Topics, Action Items, Follows Ups and insights. 

![summary-ui](/img/agora-summary-ui.png)

You can also customize the Symbl parameters by updating the `strings.xml` file in your Android project. The file is located at `/symbl-agora-android-sdk-plugin/app/src/main/res/values/strings.xml`.
 
The sample code below describes the parameters available in the `strings.xml` file. 

```js
<string name="symbl_app_id">APP_ID</string>
<string name="symbl_app_secret">APP_SECRET</string>
<string name="symbl_platform_url">api.symbl.ai</string>
<string name="symbl_token_api">https://api.symbl.ai/oauth2/token:generate</string>
<string name="symbl_token_token_timeout_ms">20000</string>
<string name="symbl_meeting_language_code">en-US</string>
<string name="symbl_meeting_encoding">LINEAR16</string>
<string name="symbl_meeting_sampleRateHertz">44100</string>
<string name="symbl_confidence_threshold">0.5</string>
```
The following table describes the parameters available in the `strings.xml` file for the Symbl configuration.
 
| Parameter | Description | 
|---------|----------| 
| `symbl_platform_url` | The URL for the Symbl platform.
| `symbl_app_id` | The Symbl App Id.
| `symbl_app_secret` | The Symbl App Secret.
| `symbl_meeting_language_code` | The language code. Currently, en-US (English US) is the only language supported.
| `symbl_token_api` | The URL for secure token generation.
| `symbl_meeting_encoding`<br/>`symbl_meeting_sampleRateHertz` and `symbl_confidence_threshold` | Used by Symbl platform.

:::note
The `symbl_app_id` and `symbl_app_secret` values must be set in the Agora platform during the login of the plugin. 
:::
 
For more details, refer the tutorial on [Receiving AI insights from your Web Browser](https://docs.symbl.ai/docs/streamingapi/tutorials/receive-ai-insights-from-your-web-browser).

 
### Step 3. Start Connection

The Symbl platform expects request which consists of meeting details and configuration details what kind of conversation AI details you want post-meeting.
 
You can optionally override this request depending on you business requirement.
 
The sample code below shows you the reference method (agoramarketplace.symblai.cai.MainActivity#**setSymblPluginConfigs**).

```js
/**
* This main method to configure symbl connection configuration
*
* @param pluginParams
* @param channelName
* @throws JSONException
*/
private void setSymblPluginConfigs(JSONObject pluginParams, String channelName) throws JSONException {
   try {
       String symbl_unique_meetingId = "UniqueMeeting"+System.currentTimeMillis();
       pluginParams.put("secret", getString(R.string.symbl_app_secret));
       pluginParams.put("appKey", getString(R.string.symbl_app_id));

       pluginParams.put("meetingId", symbl_unique_meetingId);

       pluginParams.put("userId", symbl_meeting_UserId);
       pluginParams.put("name", symbl_meeting_user_Name);
       pluginParams.put("languageCode", "en-US");

       // Symbl main plugin config objects
       SymblPluginConfig symplParams = new SymblPluginConfig();

       //this Api config is used to set
       ApiConfig apiConfig = new ApiConfig();
       apiConfig.setAppId(getString(R.string.symbl_app_id));
       apiConfig.setAppSecret(getString(R.string.symbl_app_secret));
       apiConfig.setTokenApi(getString(R.string.symbl_token_api));
       apiConfig.setSymblPlatformUrl(getString(R.string.symbl_platform_url));
       symplParams.setApiConfig(apiConfig);

       RealtimeStartRequest realtimeFlowInitRequest = new RealtimeStartRequest();
       RealtimeAPIConfig realtimeAPIConfig = new RealtimeAPIConfig();
       realtimeAPIConfig.setConfidenceThreshold(Double.parseDouble(String.valueOf(R.string.symbl_confidence_threshold)));
       realtimeAPIConfig.setLanguageCode(getString(R.string.symbl_meeting_language_code));

       Speaker speaker=new Speaker();
       speaker.setName(symbl_meeting_user_Name);
       speaker.setUserId(symbl_meeting_UserId);
       realtimeFlowInitRequest.setSpeaker(speaker);

       SpeechRecognition speechRecognition = new SpeechRecognition();
       speechRecognition.setEncoding(getString(R.string.symbl_meeting_encoding));
       speechRecognition.setSampleRateHertz(Double.parseDouble(getString(R.string.symbl_meeting_sampleRateHertz)));
       realtimeAPIConfig.setSpeechRecognition(speechRecognition);

       Redaction redaction = new Redaction();
       redaction.setIdentifyContent(true);
       redaction.setRedactContent(true);
       redaction.setRedactionString("*****");
       realtimeAPIConfig.setRedaction(redaction);

       realtimeFlowInitRequest.setConfig(realtimeAPIConfig);
       Tracker tracker1 = new Tracker();
       tracker1.setName("Budget");
       List<String> vocabulary = new ArrayList<>();
       vocabulary.add("budgeted");
       vocabulary.add("budgeted decision");
       tracker1.setVocabulary(vocabulary);
       List<Tracker> trackerList = new ArrayList<>();
       trackerList.add(tracker1);

       realtimeFlowInitRequest.setTrackers(trackerList);
       realtimeFlowInitRequest.setType("start_request");
       realtimeFlowInitRequest.setId(symbl_unique_meetingId);
       realtimeFlowInitRequest.setSentiments(true);
       realtimeFlowInitRequest.setInsightTypes(Arrays.asList("action_item", "question", "follow_up"));
       symplParams.setRealtimeStartRequest(realtimeFlowInitRequest);
       Gson gson = new Gson();
       // don’t change KEY here same used inside plugin side
       pluginParams.put("inputRequest", gson.toJson(symplParams));
   } catch (Exception ex) {
       Log.e(TAG, "ERROR while setting Symbl plugin configuration");
   }
}
```

### Setting Conversation Processor Listener

The different recognition results will always be returned in the JSON format.
 
Multiple events are generated while the raw audio is sent to Symbl for processing. 
 
#### Speech-to-Text recognition format

```json
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

#### Topic recognition format

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

The responses needs to be parsed and processed in the `onEvent` method of the UI (**MainActivity.java**).
 
The capabilities already integrated by the Symbl-Agora plugin are documented below:<br/>

👉   [Speech-to-Text (Transcripts)](https://docs.symbl.ai/docs/concepts/speech-to-text)<br/>
👉   [Topics](https://docs.symbl.ai/docs/concepts/topics)<br/>
👉   [Sentiment Analysis](https://docs.symbl.ai/docs/concepts/sentiment-analysis)<br/>
👉   [Action Items](https://docs.symbl.ai/docs/concepts/action-items)<br/>
👉   [Follow-Ups](https://docs.symbl.ai/docs/concepts/follow-ups)<br/>
👉   [Questions](https://docs.symbl.ai/docs/concepts/questions)<br/>
👉   [Trackers](https://docs.symbl.ai/docs/concepts/trackers)<br/>
👉   [Conversation Groups](https://docs.symbl.ai/docs/concepts/conversation-groups)<br/>
👉   [Conversation Analytics](https://docs.symbl.ai/docs/concepts/conversational-analytics)<br/>
👉   [Topic Hierarchy](https://docs.symbl.ai/docs/concepts/topic-hierarchy)<br/>
 
 
### Error Codes and resolutions

For any Symbl service-related issues, you should receive an event similar to the following:

```json
{
   "additionalDetails":"Symbl_on_close",
   "conversationId":"",
   "errorCode":0,
   "errorMessage":"Symbl platform connection close with reason and code Invalid status code received: 401 Status line: HTTP/1.1 401 Unauthorized code 1002",
   "event":"Symbl_on_close",
   "meetingId":"4523722348167168",
   "result":""
}
```

Given below are a list of things to take care of while troubleshooting these types of issues:

- Make sure the Agora active token is provided before the start of the meeting
- Check logs and errors for more details
- The Symbl active token is valid for 24 hrs 
- Multiple meetings and common conversation results can be extracted by sharing a common unique meeting ID that can be set using code and attribute.

```json
String symbl_unique_meetingId = "UniqueMeeting"+System.currentTimeMillis();
```



 
 
 
