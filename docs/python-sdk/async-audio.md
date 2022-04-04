---
id: python-sdk-async-audio
title: Async Audio API 
sidebar_label: Audio API
slug: /python-sdk/async-audio/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Python SDK allow you to asynchronously send audio conversation data and generate the following:

- Speech-to-Text (messages)
- Action Items
- Questions
- Topics
- Follow-ups
- Members (a list of participants in a conversation).

You can also utilize the `parameters` function to send additional parameters supported in the Async Audio API- for [file](/docs/async-api/overview/audio/post-audio#query-params) and [url](/docs/async-api/overview/audio/post-audio-url#request-body) upload.

### Sample Code

```python
import symbl
 
conversation_object = symbl.Audio.process_file(file_path=r'c:/Users/john/Downloads/business_meeting.mp3')
print(conversation_object.get_messages())
print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())
```
:::info
Always prefix "r" before the file location in the code if you are using Windows system. Example: `file_path=r'c:/Users/john/Downloads/business_meeting.mp3`
:::

### Appending Audio API

To append an audio conversation to an already processed audio file, use the `.append` function as shown below:

```python
conversation_object = symbl.Audio.append_file(file_path=r'c:/Users/john/Downloads/business_meeting.mp3', conversation_id='5973791156994048')
```
A complete sample code for the append function is given below:
```py
import symbl

conversation_object = symbl.Audio.append_file(file_path=r'c:/Users/john/Downloads/business_meeting.mp3', conversation_id='5973791156994048')
print(conversation_object.get_messages())
print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. The query parameters for Async Audio File API can be sent using `parameters` variable as shown below. <br/>
You can use these parameters in the `.append` functionality as well. 

See the complete list of supported parameters [here](/docs/async-api/overview/audio/post-audio/#query-params). 

```python
import symbl

conversation_object = symbl.Audio.process_file(file_path='/users/jon/Downloads/Welcome.mp3', 
parameters={
    'name':'new meeting', 
    'detectPhrases': True, 
    'enableSpeakerDiarization': True, 
    'diarizationSpeakerCount': 3, 
    'channelMetadata': [
      {"channel": 1,"speaker": {"name": "Jon Snow","email": "Jon@example.com"}}
     ]})
print(conversation_object.get_messages())
print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())
```

## Async Audio URL API

Use the code given below to process audio (sent via URL) conversations with the Python SDK and generate conversation insights such as speech-to-text, topics, follow-ups, action items, questions. It can be utilized for any use case where you have access to recorded audio stored publicly as a URL and want to extract insights and other conversational attributes supported by Symbl. 

:::info
The URL provided must be a publicly available URL. Currently we do not support any redirected links, shortened links (e.g. bit.ly), YouTube, Vimeo, or links from any audio/video platforms.
:::

```python
import symbl

request_body = {
   'url': ‘https://symbltestdata.s3.us-east-2.amazonaws.com/playground_sample_audio.mp3’,
   'name': 'Python SDK Test Meeting',
 }


conversation_object = symbl.Audio.process_url(payload = request_body)
# conversation = symbl.Audio.append_url(payload=request_body, conversation_id='4639962491256832')
print(conversation_object.get_messages())
print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())
```
### Appending Audio URL API

To append an audio conversation to an already processed audio file, use the `.append` function with the `conversation_id` as shown below:

```python
conversation_object = symbl.Audio.append_url(payload=request_body, conversation_id='4639962491256832')
```

A complete sample of the `.append` function is given below:

```py

import symbl

request_body = {
   'url': ‘https://symbltestdata.s3.us-east-2.amazonaws.com/playground_sample_audio.mp3’,
   'name': 'Business Meeting',
 }



conversation_object = symbl.Audio.append_url(payload=request_body, conversation_id='4639962491256832')
print(conversation_object.get_messages())
print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())

```
#### Utilizing the `wait` Parameter

Use the `wait` parameter (by default set to `True`) while making concurrent API calls. Setting the value `wait=False` will execute an existing function on a separate thread making it a non-blocking API call. It also has the callback support.<br/>

Example:

```python
conversation_object = symbl.Audio.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav', wait=False)
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. In the REST APIs, these parameters are sent as a part of the request body, here, these parameters must be sent as a part of the `request_body` function. <br/>
You can also use parameters while using the `.append` functionality. 

See the complete list of supported parameters [here](/docs/async-api/overview/audio/post-audio-url#request-body). 

```python
request_body = {
     'url':'https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav', 
     'detectPhrases': True, 
     'channelMetadata': [{"channel": 1,"speaker": {"name": "Jon Snow","email": "jon@example.com"}}]
     }
 conversation_object = symbl.Audio.process_url(payload=request_body)
 print(conversation_object.get_messages())
 print(conversation_object.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation_object.get_follow_ups())
# print(conversation_object.get_action_items())
# print(conversation_object.get_questions())
# print(conversation_object.get_members())
```

## Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Async API in the following sections:

- [Audio Class](/docs/python-sdk/python-sdk-reference#audio-class)<br/>
- [Conversation Object](/docs/python-sdk/python-sdk-reference#conversation-object)