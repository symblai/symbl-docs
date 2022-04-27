---
id: python-sdk-reference
title: Python SDK Reference
sidebar_label: Python SDK Reference
slug: /python-sdk/python-sdk-reference/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This page contains detailed descriptions of the class and objects supported by the Symbl Python SDK. 

- [Audio Class](#audio-class)
- [Video Class](#video-class)
- [Text Class](#text-class)
- [Conversation Object](#conversation-object)
- [Telephony Class](#telephony-class)
- [Streaming Class](#streaming-class)

## Audio Class
Symbl's Async APIs provide the functionality for processing audio recordings from files or public/signed URLs. The data processed for these conversations are available via the Conversation APIs once the APIs have completed the processing.

You can utilize different functions of Async APIs by directly utilizing `symbl.Audio`.

### process_file(file_path):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`file_path`| Mandatory | A valid path to a file.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`content_type` | Optional | Parameter defining the content_type of audio. Acceptable values are `audio/wav`, `audio/mp3`, `audio/mpeg`. Leave it blank if you're not sure about the content_type of file.
`wait`| Optional | This accepts a Boolean value and is by default `true`. Value False will execute the function `submit_audio` on a separate thread making it a non-blocking API call. This also has callback support.
`parameters`| Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/audio/post-audio/#query-params).


### process_url(url):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload` | Mandatory | A valid payload having `url` as the member and it should be valid to a file hosted directly. valid payload [`payload = { 'url': "<url>" }`]
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`wait` | Optional | Accepts a Boolean value, by default, set to `true`. Value False will execute the function `submit_video` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/audio/post-audio-url#query-params).


### append_file(file_path, conversation_id):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`file_path`| Mandatory | A valid path to a file.
`conversation_id`| Mandatory | Unique identifiier of the previous conversation to which appending the current conversation.
`content_type`| Optional| Parameter defining the content_type of audio. Acceptable values are `audio/wav`, `audio/mp3`, `audio/mpeg`. Leave it blank if you're not sure about the `content_type` of file.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`wait`| Optional |  Accepts a Boolean value. By default set to `true`. Value False will execute the function `submit_audio` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/audio/put-audio#query-params).


### append_url(url, conversation_id):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload` | Mandatory |  A valid payload having `url` as the member and it should be valid to a file hosted directly. valid payload [`payload = { 'url': "<url>" }`] |
`conversation_id` | Mandatory | Unique `conversationId` of a previous conversation to which appending the current conversation.
`wait` | Optional | Accepts a Boolean value, By default `true`. Value False will execute the function `submit_video` on a separate thread making it a non-blocking API call (Has callback support).
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/audio/put-audio-url#query-params).


## Video Class
Symbl's Async APIs provide the functionality for processing video recordings from files or public/signed URLs. The data processed for these conversations are available via the Conversation APIs once the APIs have completed the processing.

You can utilize different functions of Async APIs by directly utilizing `symbl.Video`.

### process_file(file_path):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`file_path`| Mandatory | A valid path to a file.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`content_type` | Optional | Parameter defining the `content_type` of video. Acceptable values are `video/mp4`. Leave it blank if you're not sure about the `content_type` of file. 
`wait`| Optional | Accepts a Boolean value. By default set to `true`. Value False will execute the function `submit_video` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/video/post-video#query-params).

### process_url(payload):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload`| Mandatory | A valid payload having `url` as the member and it should be valid to a file hosted directly. valid payload [`payload = { 'url': "<url>" }`].
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`wait`| Optional | Accepts a Boolean. By default set to `true`. Value False will execute the function submit_video on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/video/post-video-url#query-params).


### append_file(file_path, conversation_id):

Returns conversation object.

Name | Required | Description
-----|------------ | --------
`file_path` | Mandatory | A valid path to a file.
`conversation_id` | Mandatory | Unique `conversationId` of a previous conversation to which appending the current conversation.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`content_type`| Optional | Parameter defining the `content_type` of video. Acceptable values are `video/mp4`. Leave it blank if you're not sure about the `content_type` of file.
`wait` | Optional | Accepts a Boolean value: `true` or `false`. By default set to `true`. Value `false` will execute the function `submit_video` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/video/put-video#query-params).

### append_url(payload, conversation_id):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload` | Mandatory | A valid payload having `url` as the member and it should be valid to a file hosted directly. valid payload [`payload = { 'url': "<url>" }`].
`conversation_id` | Mandatory | Unique `conversationId` of a previous conversation to which appending the current conversation.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`wait` | Optional | Accepts a Boolean value: `true` or `false`. Value False will execute the function `submit_video` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/video/put-video-url#query-params).


## Text Class
Symbl's Async APIs provide the functionality for processing textual content from a conversation. The data processed for these conversations are available via the Conversation APIs once the APIs have completed the processing.

You can utilize different functions of Async APIs by directly utilizing `symbl.Text`.

### process(payload):

Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload` | Mandatory | Textual dictionary containing the conversation to be processed in textual form, See [Async API Documentation](/docs/async-api/overview/text/post-text/#code-example-1) for payload.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`content_type` | Optional | Parameter defining the content_type of the text conversation. Acceptable value is `application/json`.
`wait` | Optional | Accepts a Boolean value: `true` or `false`. By default, it is set to `true`. Value False will execute the function submit_text on a separate thread making it a non-blocking API call (Has callback support).
`parameters`| Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/text/post-text#query-params).

### append(payload, conversation_id):
Returns conversation object.

Name | Required | Description
-----|------------ | --------
`payload` | Mandatory | Textual dictionary containing the conversation to be processed in textual form, See [docs](/docs/async-api/overview/text/post-text#code-example-1) for payload.
`conversation_id` | Mandatory | Unique `conversationId` of a previous conversation to which appending the current conversation.
`credentials` | Optional | Don't add this parameter if you have symbl.conf file in your home directory or working directory.
`wait` | Optional | Accepts a Boolean value: `true` or `false`. By default, it is set to `true`. Value False will execute the function `submit_text` on a separate thread making it a non-blocking API call (Has callback support).
`parameters` | Optional | By default {}) Dictionary, Any parameter and it's value can be provided in the dictionary format. For getting a list of value check [here](/docs/async-api/overview/text/put-text#query-params).

## Conversation object
The Text, Audio, and Video classes of the Async API return the Conversation object. The conversation object is a shorthand for conversation API and can be utilized for fetching multiple insights.

### conversation_object.get_conversation_id():

Returns a unique Conversation Id of the conversation which you are currently processing.

### conversation_object.get_job_id():

Returns a Job Id of the conversation which you are currently processing.
### conversation_object.get_action_items():

Returns Action Items which are some specific outcomes recognized in the conversation that requires one or more people in the conversation to act in the future

### conversation_object.get_follow_ups():

Returns a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

### conversation_object.get_members():

Returns a list of all the members in a conversation. A Member is referred to as a participant in the conversation that is uniquely identified as a speaker. Identifying different participants in the meetings can be done by implementing speaker separation.

### conversation_object.get_messages():

`parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, click [here](/docs/conversation-api/messages#query-params).

Returns a list of messages (sentences spoken by speakers) in a conversation. You can use this for providing transcription for video conference, meeting or telephone call.

### conversation_object.get_questions():

Returns explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question.

### conversation_object.get_topics():

`parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, please click [here](/docs/conversation-api/get-topics#query-params).

Returns The most relevant topics of discussion from the conversation that is generated based on the combination of the overall scope of the discussion.

### conversation_object.get_conversation():

Returns the conversation meta-data like meeting name, member name and email, start and end time of the meeting, meeting type and meeting id.

### conversation_object.get_entities()

Provides a functionality to extract entities(custom, location, person, date, number, organization,datetime,daterange, etc ) from the conversation.

### conversation_object.get_trackers()

Returns the occurrence of certain key words or phrases from the conversation.

### conversation_object.get_analytics()

Returns the speaker ratio, talk time, silence, pace and overlap from the conversation.

### conversation_object.put_members(members_id, parameters={})

`members_id`:- (mandatory) string, that takes the id of the member who's details you would like to update.

`parameters`:- (mandatory) takes a dictionary of parameters. For list of parameters accepted, see [PUT Member Information](https://docs.symbl.ai/docs/conversation-api/update-members/#request-body) page. 

Updates an existing member in an conversation. This API can be used for updating the unique speakers detected as members from diarization as well.

To see an example of the usage of `put_members` functionality, go to out [GitHub examples](https://github.com/symblai/symbl-python-sdk/blob/main/example/Conversation_APIs/Put_APIs/put_apis_example.py) page.

### conversation_object.put_speakers_events(parameters={})

`parameters`:- (mandatory) takes a dictionary which contains `speakerEvents`. For list of parameters accepted, see [Speaker Events Object](/docs/conversation-api/speaker-events/#speaker-event-object) page.

This API provides the functionality to update Speakers in a conversation after it has been processed.

To checkout an example of the usage of `put_speakers_events` functionality using Conversations class for Async APIs, see this [GitHub example](https://github.com/symblai/symbl-python/tree/main/example/Conversation_APIs/Put_APIs/put_speaker_events_async.py) page.

To checkout an example of the usage of `put_speakers_events` functionality using Conversations class for Streaming APIs, see this [GitHub example](https://github.com/symblai/symbl-python-sdk/blob/main/example/Conversation_APIs/Put_APIs/put_speaker_events_streaming.py) page. 


Example to demonstrate the use of conversation class:

```py
import symbl

file = "<file_path>"
conversation_object = symbl.Audio.process_file(file_path=file)

print(conversation_object.get_messages())
print(conversation_object.get_action_items())
print(conversation_object.get_follow_ups())
print(conversation_object.get_members())
print(conversation_object.get_topics())
print(conversation_object.get_questions())
```

## Conversations Class
The Conversation API provides a REST API interface for getting your processed Speech to Text data(also known as Transcripts) and conversational insights.

These APIs require a `conversationId`.

You can utilize different functions of Conversation APIs by directly utilizing `symbl.Conversations`.

### get_conversation_id():

Returns a unique Conversation Id of the conversation which you are currently processing.

### get_job_id():

Returns a Job Id of the conversation which you are currently processing.

### get_action_items(conversation_id):

Returns Action Items which are some specific outcomes recognized in the conversation that requires one or more people in the conversation to act in the future

### get_follow_ups(conversation_id):

Returns a category of action items with a connotation to follow-up a request or a task like sending an email or making a phone call or booking an appointment or setting up a meeting.

### get_members(conversation_id):

Returns a list of all the members in a conversation. A Member is referred to a participant in the conversation that is uniquely identified as a speaker. Identifying different participants in the meetings can be done by implementing speaker separation.

### get_messages(conversation_id):

`parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, please click [here](/docs/conversation-api/messages#query-params).

Returns a list of messages (sentences spoken by speakers) in a conversation. You can use this for providing transcription for video conference, meeting or telephone call.

### get_questions(conversation_id):

Returns explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question.

### get_topics(conversation_id):

`parameters`:- (Optional) dictionary, takes a dictionary of parameters. For list of parameters accepted, please click [here](/docs/conversation-api/get-topics#query-params).

Returns The most relevant topics of discussion from the conversation that is generated based on the combination of the overall scope of the discussion.

### get_conversation(conversation_id)

Returns the conversation meta-data like meeting name, member name and email, start and end time of the meeting, meeting type and meeting ID.

### get_entities(conversation_id)

Provides a functionality to extract entities(custom, location, person, date, number, organization,datetime,daterange, etc ) from the conversation.

### get_trackers(conversation_id)

Returns the occurrence of certain key words or phrases from the conversation.

### get_analytics(conversation_id)

Returns the speaker ratio, talk time, silence, pace and overlap from the conversation.

### put_members(conversation_id, members_id, parameters={})

`members_id`:- (mandatory) string, that takes the ID of the member who's details you would like to update.

`parameters`:- (mandatory) takes a dictionary of parameters. For list of parameters accepted, see [Put Members Information API](/docs/conversation-api/update-members/#request-body) page.

Updates an existing member in an conversation. This API can be used for updating the unique speakers detected as members from diarization as well.

To see an example of the usage of `put_members` functionality using Conversations class, see our [GitHub example](https://github.com/symblai/symbl-python-sdk/blob/main/example/Conversation_APIs/Put_APIs/put_members.py) page. 

### put_speakers_events(conversation_id, parameters={})

`parameters`:- (mandatory) takes a dictionary which contains `speakerEvents`. For list of parameters accepted, see [Speaker Event Object](https://docs.symbl.ai/docs/conversation-api/speaker-events/#speaker-event-object) page.

This API provides the functionality to update Speakers in a conversation after it has been processed.

To see an example of the usage of `put_speakers_events` functionality using Conversations class for Async APIs, see our [GitHub example](https://github.com/symblai/symbl-python-sdk/blob/main/example/Conversation_APIs/Put_APIs/put_speaker_events_async.py) page.

To see an example of the usage of `put_speakers_events` functionality using Conversations class for Streaming APIs, see our [GitHub example](https://github.com/symblai/symbl-python-sdk/blob/main/example/Conversation_APIs/Put_APIs/put_speaker_events_streaming.py) page.

Example to demonstrate the use of conversation class:

```py
import symbl

conversation_id=1234567890 # Update with the conversation Id of your conversation

print(symbl.conversations.get_messages(conversation_id))
```

## Telephony Class
Based on PSTN and SIP protocols, the Telephony API provides an interface for the developers to have Symbl bridge/join VoIP calls and get the results back in real-time as well. Optionally, the developer can also trigger an email at the end of the conversation containing the URL to view the transcription, insights and topics in a single page Web Application.

### start_pstn(phoneNumber, dtmf, actions, data):

Returns a connection object.

- `phoneNumber`: (Mandatory) phoneNumber where symbl should call.

- `credentials` : (Optional) Don't add this parameter if you have symbl.conf file in your home directory or working directory.

- `dtmf` : (Optional) dtmf sequence to entered by symbl to join the call.

- `actions` : (Optional) follows the following pattern.

```py
[{invokeOn: "stop", name: "sendSummaryEmail", parameters: {emails: ["email@example.com"]}}]
```
- `data`: (Optional) {session: {name: "sessionName"}}

- `languages` : (Optional) To provide the Language list explicitly.

- `timezone` : (Optional) To provide timezone explicitly.

For more details check documentation [here](/docs/telephony-api/api-reference#endpoint).


### start_sip(uri, audioConfig, actions, data):

Returns a connection object.

- `uri`: (Mandatory) URI where symbl should connect.

- `audioConfig`: (Optional) audioConfigs of the SIP.

- `credentials` : (Optional) Don't add this parameter if you have symbl.conf file in your home directory or working directory.

- `actions` : (Optional) follows the following pattern.

```py

[{invokeOn: "stop", name: "sendSummaryEmail", parameters: {emails: ["email@example.com"]}}]
data: (Optional) {session: {name: "sessionName"}}
```
For more details check documentation [here](/docs/telephony-api/api-reference#endpoint).

- `languages` : (Optional) To provide the Language list explicitly.

- `timezone` : (Optional) To provide timezone explicitly.

### stop(connectionId):

Only `connectionId` parameter is Mandatory. Other optional parameters can be added as defined in the [Telephony API Documentation](/telephony-api/api-reference#endpoint).

Return an updated connection object which will have the `conversationId` in the response.

## Streaming Class

Symbl's Streaming API is based on WebSocket protocol and can be used for real-time use-cases where both the audio and its results from Symbl's back-end need to be available in real-time.

### start_connection(credentials=None, speaker=None, insight_types=None):

Returns a connection object.

Parameter | Required | Description 
---- | ------- | ------ |
`credentials`| Optional| Don't add this parameter if you have `symbl.conf` file in your home directory or working directory.
`speaker` | Optional | Speaker object containing `name` and `email` field.
`insight_type` | Optional | The insights to be returned in the WebSocket connection.
`config` | Optional | Use this parameter to pass `confidenceThreshold`, `languageCode` For more details, see the Config parameter documentation [here](/docs/streaming-api/api-reference/#config). 
`languages` | Optional | To provide the Language list explicitly.
`timezone` | (Optional) | To provide timezone explicitly.

You can subscribe to the following events for Streaming API by the connection object.

- `insight_response`:- generates an event whenever a question or an action_item is found.
- `message_response`:- generates an event whenever a transcription is available.
- `tracker_response`:- It will generate an event whenever a tracker is identified in any transcription.
- `topic_response`:- It will generate an event whenever a topic is identified in any transcription.
- `message`:- (Part of streaming API only), It will generate an event for live transcriptions. It will include isFinal property which will be False initially, meaning the transcription is not finalized.

Example of subcribing to events:

```py
events = {
   'message_response': lambda response: print('Final Messages -> ', [message['payload']['content'] for message in response['messages']])}

insight_types = ['question', 'action_item']

connection_object = symbl.Streaming.start_connection(
   insight_types=insight_types)

connection_object.subscribe(events)

connection_object.send_audio_from_mic()
```

### connection object

The connection object is returned by telephony API's start_pstn & start_sip or Streaming API' start_connection function. A connection object can be utilized for communicating with Symbl Server through underlying websocket implementation.

- `connection_object.subscribe({'event': callback, ...})`:<br/>
    Subscribe function can be used with both Telephony as well as Streaming class.
    Takes a dictionary parameter, where the key can be an event and it's value can be a callback function that should be executed on the occurrence of that event.<br/>
    The list of events that can be subscribed by connection object are:-
    
1. **insight_response** :- generates an event whenever a question or an action_item is found.<br/>
2. **message_response**:- generates an event whenever a transcription is available.<br/>
3. **tracker_response**:- It will generate an event whenever a tracker is identified in any transcription.
4. **topic_response**:- It will generate an event whenever a topic is identified in any transcription.
5. **message**:- It will generate an event for live transcriptions. It will include isFinal property which will be False initially, meaning the transcription is not finalized.

Example:

```py
events = {'message_response': lambda message: print('printing the transcription', str(message)),
'insight_response': lambda insight: print('printing the insight response ', str(insight))}
```

- `connection_object.stop()`:<br/>Stops the Streaming connection.

- `connection.send_audio_from_mic(device=None)`: <br/> `send_audio_from_mic` function can be used with Streaming class only. It Uses sounddevice library to take input from User's mic and send data to websocket directly. Recommended function for first time users. Device parameter can take the deviceId (integer) as input, for more information see sd.query_devices() [here][https://python-sounddevice.readthedocs.io/en/0.3.12/api.html#sounddevice.query_devices]. <br/>

If this function is not running correctly, please make sure the sounddevice library is installed correctly and has access to your microphone. For more details, check [here][https://python-sounddevice.readthedocs.io/en/0.4.1/installation.html]

- `connection_object.send_audio(data)`:<br/>
`send_audio` function can be used with Streaming class only. 
Can be used when user is willing to send custom audio data from some other library.
`send_audio` function sends audio data to websockets in binary format.

- Conversation Object :- 
Connection object has a conversation parameter, through which you can directly query the conversation api with the provided conversationId.

```py
import symbl

connection_object = symbl.Streaming.start_connection()

...

connection_object.conversation.get_topics()
```