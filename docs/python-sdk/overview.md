---
id: python-sdk
title: Symbl Python SDK 
sidebar_label: Introduction
slug: /python-sdk/overview/
pagination_label: Python SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Symbl Python SDK allows you to add Conversational Intelligence directly into your web applications and meeting platforms. You can generate Speech-to-Text and get intelligent insights such as action items, topics and questions, etc. 

> **Source Code** <br/>
Find the source code here: [https://github.com/symblai/symbl-python](https://github.com/symblai/symbl-python). 

## Installation

### Install Python 
Before you install the Symbl Python SDK, ensure that you have installed Python 2.7+ or Python 3.4+ (PyPy supported).
You can download the latest version of Python from the official Python site and read the Python documentation for the instructions.

### Install Symbl SDK 
To install the SDK you can use either of the following methods:

- Install via `pip` using the command:

```python
pip install --upgrade symbl
```
OR

```python
python -m pip install --upgrade symbl
```

:::note
`pip`is the package installer for Python. pip is already installed if you are using Python 2 >=2.7.9 or Python 3 >=3.4. If you do not have it, install it using the get pip commands documented in PIP Documentation. 
:::

- Install from source using the following command. <br/>
This is an alternate way of installing the Python SDK, where after downloading the Python SDK repository on your own local PC you can run this command to install: 

```python
python setup.py install
```
 
## Configuration

Before using the Symbl Python SDK, you have to set up your authentication credentials. You can get your authentication credentials from your Symbl Platform account. 
Using your App ID and App Secret, create the credentials file with the following details:

```py
[credentials]
app_id=7454596659614e544841576d6f4c53564d583569634379716a446578
app_secret=7454596659614e544841576d6f4c53564d583569634379716a
```

Save this file as `symbl.conf`. By default, the location is your home directory, which would look something like this in a Windows System: `~/Users/<USERNAME>`.
You can also save it in the same location from where you are executing the `.py` file. 

Essentially, you must save the `symbl.conf` in the same folder from where you are executing the program as it utilizes the credentials to successfully run it. 

:::tip Using Credentials in-line
Alternatively,  if you wish to quickly test the code, you can utilize the `credentials` variable to pass your App ID and Secret as a part of the code itself. However, you must add the credentials variable every time make a new API call. 

```python
import symbl

local_path = r'c:/Users/john/Downloads/business_meeting.mp3'

# Process audio file
conversation_object = symbl.Audio.process_file(
file_path=local_path
credentials={app_id: <app_id>, app_secret: <app_secret>},  #This is optional if you didn’t setup the symbl.conf file in your home directory. 
)
```
:::

## Using the Python SDK

The Python SDK allows you to utilize the capabilities of the Symbl APIs with minimal coding effort. 
To use this SDK, you must first `import` Symbl SDK and then specify the service you’d like to use along with the operation that want to perform:

```py
import symbl
```

In the example given below, we are calling the real-time audio processing service that accepts a `file_path` to ingest the audio file. 

```py
# Process audio file
local_path = r'c:/Users/john/Downloads/business_meeting.mp3'

conversation_object = symbl.Audio.process_file(
file_path=local_path

```

Further, we specify the operation which is generating transcript (messages) for the said conversation.

```py
# Generate transcript
print(conversation_object.get_messages())
```
## Getting Conversation Insights 

Using Python SDK, you can get the Conversation Insights: Speech-to-Text (messages), Topics, Follow ups, Action Items and Questions.

```py
print(conversation_object.get_messages()) # Returns the transcript of the conversation

# print(conversation_object.get_action_items()) 
# print(conversation_object.get_topics()) 
# print(conversation_object.get_questions())
# print(conversation_object.get_follow_ups()) 

```

## Supported APIs

In this Python SDK release, you can utilize the following Symbl APIs:  
- [Streaming API (in Real-time)](/docs/python-sdk/streaming-api/)
- [Telephony API (in Real-time)](/docs/python-sdk/python-sdk-telephony-api)
- [Async Text API](/docs/python-sdk/async-api)
- [Async Audio (File) API](/docs/python-sdk/async-audio)  
- [Async Audio (URL) API](/docs/python-sdk/async-audio#async-audio-url-api)
- [Async Video (File) API](/docs/python-sdk/async-video)
- [Async Video (URL) API](/docs/python-sdk/async-video#async-video-url-api)


## Additional Resources

- For additional information about the Python SDK implementation, view our [GitHub README](https://github.com/symblai/symbl-python). 
- To view a list of examples, view our [GitHub examples folder](https://github.com/symblai/symbl-python/tree/main/example). 

