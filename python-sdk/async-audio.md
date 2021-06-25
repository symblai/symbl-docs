---
id: python-sdk-async-audio
title: Async Audio API 
sidebar_label: Audio API
slug: /python-sdk/async-audio
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Python SDK allow you to asynchronously send conversation data and generate the following:

- Speech-to-Text
- Action Items
- Questions
- Topics
- Follow-ups
- Sentiment Analysis. 

You can also utilize the `parameters` function to send additional parameters supported in the Async Audio API- for [file](/docs/async-api/overview/audio/post-audio) and [url](/docs/async-api/overview/audio/post-audio-url) upload.

### Sample Code
```python
import symbl
 
conversation = symbl.Audio.process_file(file_path=r'c:/Users/john/Downloads/business_meeting.mp3')
print(conversation.topics())
# You can use the same code to generate other insights such as:
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```
:::info
Always prefix "r" before the file location in the code if you are using Windows system. Example: `file_path=r'c:/Users/john/Downloads/business_meeting.mp3`
:::

### Appending Audio API

To append an audio coversation to an already processed audio file, use the code given below:

```py
import symbl

conversation = symbl.Audio.append_file(file_path=r'c:/Users/john/Downloads/business_meeting.mp3')
print(conversation.get_topics())
# You can use the same code to generate other insights such as:
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. In the REST APIs for Audio file upload, these parameters are sent as a part of the query params, here, you must use `parameters` as shown below. <br/>
You can use these parameters in the `.append` functionality as well. 

See the complete list of supported parameters [here](/docs/async-api/overview/audio/post-audio/#query-params). 

```py
import symbl

conversation = symbl.Audio.process_file(file_path='/users/jon/Downloads/Welcome.mp3', 
parameters={
    'name':'new meeting', 
    'detectPhrases': True, 
    'enableSpeakerDiarization': True, 
    'diarizationSpeakerCount': 3, 
    'channelMetadata': [
      {"channel": 1,"speaker": {"name": "Jon Snow","email": "Jon@example.com"}}
     ]})
print(conversation.get_messages())
# print(conversation.get_members()) # Returns a list of participants of the conversation.
```

## Async Audio URL API

Use the code given below to process audio (sent via URL) conversations with the Python SDK and generate conversation insights such as speech-to-text, topics, follow-ups, action items, questions. It can be utilized for any use case where you have access to recorded audio stored publicly as a URL and want to extract insights and other conversational attributes supported by Symbl. 

:::info
The URL provided must be a publicly available URL. Currently we do not any support any redirected links, shortened links (e.g. bit.ly), YouTube, Vimeo, or links from any audio/video platforms.
:::

```py
import symbl

conversation = symbl.Audio.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav')
​print(conversation.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```
### Appending Audio URL API

To append an audio coversation to an already processed audio file, use the code given below:

```python
import symbl

conversation = symbl.Audio.append_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav', conversation_id='5973791156994048')
​
print(conversation.topics())
# print(conversation.follow_ups())
# print(conversation.action_items())
# print(conversation.questions())
# print(conversation.messages())
```
#### Utilizing the `wait` Parameter

Use the `wait` parameter (by default set to `True`) while making concurrent API calls. Setting the value `wait=False` will execute an existing function on a separate thread making it a non-blocking API call. It also has the callback support.<br/>

Example:

```python
conversation = symbl.Audio.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav', wait=False)
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. In the REST APIs, these parameters are sent as a part of the request body, here, these parameters must be sent as a part of the `payload` function. <br/>
You can also use parameters while using the `.append` functionality. 

See the complete list of supported parameters [here](/docs/async-api/overview/audio/post-audio-url#request-body). 

```py
payload = {
     'url':'https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav', 
     'detectPhrases': True, 
     'channelMetadata': [{"channel": 1,"speaker": {"name": "Jon Snow","email": "jon@example.com"}}]
     }
 conversation = symbl.Audio.process_url(payload=payload)
 print(conversation.get_topics())
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```

### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Async API in the following sections:

- [Audio Class](/docs/python-sdk/python-sdk-reference#audio-class)<br/>
- [Conversation Object](/docs/python-sdk/python-sdk-reference#conversation-object)