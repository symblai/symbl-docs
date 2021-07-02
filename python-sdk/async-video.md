---
id: python-sdk-async-video
title: Async Video API 
sidebar_label: Video API
slug: /python-sdk/async-video
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

You can also utilize the `parameters` function to send additional parameters supported in the Async Video API for [file](/docs/async-api/overview/video/post-video#query-params) and [url](/docs/async-api/overview/video/post-video-url#request-body) upload. 

### Sample Code 
```python
import symbl

conversation = symbl.Video.process_file(file_path=r'c:/Users/john/Downloads/video.mp4')
​print(conversation.get_action_items())
# print(conversation.get_topics())
# print(conversation.get_messages())
```
:::note
Always prefix "r" before the file location in the code if you are using Windows system. Example: `file_path=r'c:/Users/john/Downloads/business_meeting.mp3`
:::

### Appending Video API 

To append a video call to an already processed video file, use the code given below:

```py
import symbl

conversation = symbl.Video.append_file(file_path=r'c:/Users/john/Downloads/video.mp4', conversation_id='')
​print(conversation.get_action_items())
# print(conversation.get_topics())
# print(conversation.get_messages())
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. In the REST APIs for Video file upload, these parameters are sent as a part of the query params. Here, you must define it in `parameters` as shown below. <br/>
You can use these parameters in the `.append` functionality as well. 

See the complete list of supported parameters [here](/docs/async-api/overview/video/post-video#query-params). 

```py
import symbl

conversation = symbl.Video.process_file(file_path='/users/jon/Downloads/Welcome.mp4', 
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
## Async Video URL API

Use the code given below to process video calls with the Python SDK and generate conversation insights such as speech-to-text, topics, follow-ups, action items, questions. It can be utilized for any use case where you have access to recorded video stored publicly as a URL and want to extract insights and other conversational attributes supported by Symbl. 

:::info
The URL provided must be a publicly available URL. Currently we do not any support any redirected links, shortened links (e.g. bit.ly), YouTube, Vimeo, or links from any audio/video platforms.
:::

```py
import symbl

conversation = symbl.Video.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4')
​print(conversation.get_topics())

# You can use the same code to generate other insights such as:
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```
### Appending Video URL API

To append an already processed video file via URL, use the code given below:

```py
import symbl

conversation = symbl.Video.append_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4', conversation_id='5973791150094048')
​
print(conversation.get_topics())
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```
### Using Parameters

In the sample below, the optional parameters such as `name`, `detectPhrases`, etc. have been used. In the REST APIs, these parameters are sent as a part of the request body. Here, these parameters must be sent as a part of the `payload` function. <br/>
You can also use parameters while using the `.append` functionality. 

See the complete list of supported parameters [here](/docs/async-api/overview/video/post-video-url#request-body). 

```py
payload = {
     'url':'https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4', 
     'detectPhrases': True, 
     'channelMetadata': [{"channel": 1,"speaker": {"name": "Jon Snow","email": "jon@example.com"}}]
     }
 conversation = symbl.Video.process_url(payload=payload)
 print(conversation.get_topics())
# print(conversation.get_follow_ups())
# print(conversation.get_action_items())
# print(conversation.get_questions())
# print(conversation.get_messages())
```

#### Utilizing the `wait` Parameter

Use the `wait` parameter (by default set to `True`) while making concurrent API calls. Setting the value `wait=False` will execute an existing function on a separate thread making it a non-blocking API call. It also has the callback support.<br/>

Example:

```py
conversation = symbl.Video.process_file(file_path=r'c:/Users/john/Downloads/video.mp4', wait=False)
```
### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Async API in the following sections:

- [Video Class](/docs/python-sdk/python-sdk-reference#video-class)<br/>
- [Conversation Object](/docs/python-sdk/python-sdk-reference#conversation-object)
