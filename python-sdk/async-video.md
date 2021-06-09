---
id: python-sdk-async-video
title: Async Video API 
sidebar_label: Video API
slug: /python-sdk/async-video
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the code given below to process video calls with the Python SDK and generate conversation insights such as speech-to-text, topics, follow-ups, action items, questions: 

```python
import symbl

conversation = symbl.Video.process_file(file_path=r'c:/Users/john/Downloads/video.mp4')
​print(conversation.action_items())
# print(conversation.topics())
# print(conversation.messages())
```
:::note
Always prefix "r" before the file location in the code if you are using Windows system. Example: `file_path=r'c:/Users/john/Downloads/business_meeting.mp3`
:::

### Appending Video API 

To append a video call to an already processed video file, use the code given below:

```py
import symbl

conversation = symbl.Video.append_file(file_path=r'c:/Users/john/Downloads/video.mp4', conversation_id='')
​print(conversation.action_items())
# print(conversation.topics())
# print(conversation.messages())
```

## Async Video URL API

Use the code given below to process video calls with the Python SDK and generate conversation insights such as speech-to-text, topics, follow-ups, action items, questions. It can be utilized for any use case where you have access to recorded video stored publicly as a URL and want to extract insights and other conversational attributes supported by Symbl. 

:::info
The URL provided must be a publicly available URL. Currently we do not any support any redirected links, shortened links (e.g. bit.ly), YouTube, Vimeo, or links from any audio/video platforms.
:::

```py
import symbl

conversation = symbl.Video.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4')
​print(conversation.topics())

# You can use the same code to generate other insights such as:
# print(conversation.follow_ups())
# print(conversation.action_items())
# print(conversation.questions())
# print(conversation.messages())
```
### Appending Video URL API

To append an already processed video file via URL, use the code given below:

```py
import symbl

conversation = symbl.Video.append_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_video_file.mp4', conversation_id='5973791150094048')
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

```py
conversation = symbl.Video.process_file(file_path=r'c:/Users/john/Downloads/video.mp4', wait=False)
```

