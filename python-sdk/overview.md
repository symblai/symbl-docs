---
id: python-sdk
title: Symbl Python SDK 
sidebar_label: Introduction
slug: /python-sdk/overview
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Symbl Python SDK allows you to add Conversational Intelligence directly into your web applications and meeting platforms. You can generate Speech-to-Text and get intelligent insights such as action items, topics and questions, etc. Currently, the Symbl Python SDK is supported with the Async API and Telephony API. 

> **Source Code** <br/>
Find the source code here: [https://github.com/symblai/symbl-python](https://github.com/symblai/symbl-python). 

## Installation

### Install Python 
Before you install the Symbl Python SDK, ensure that you have installed Python 2.7+ or Python 3.4+ (PyPy supported).
You can download the latest version of Python from the official Python site and read the Python documentation for the instructions.

### Install Symbl SDK 
To install the SDK you can use either of the following methods:

- Install via `pip` using the command:

```py
pip install --upgrade symbl
```
OR

```py
python -m pip install --upgrade symbl
```

:::note
`pip`is the package installer for Python. pip is already installed if you are using Python 2 >=2.7.9 or Python 3 >=3.4. If you do not have it, install it using the get pip commands documented in PIP Documentation. 
:::

- Install from source using the command:

```py
python setup.py install
```
 
## Configuration

Before using the Symbl Python SDK, you have to set up your authentication credentials. You can get your authentication credentials from your Symbl Platform account. 
Using your App ID and App Secret, create the credentials file with the following details:

```py
[credentials]
app_id=<YOUR_APP_ID>
app_secret=<YOUR_APP_SECRET>
```

Save this file as `symbl.conf`. By default, the location is your home directory, which would look something like this in a Windows System: `~/Users/<USERNAME>`.
You can also save it in the same location from where you are executing the `.py` file. 

Essentially, you must save the `symbl.conf` in the same folder from where you are executing the program as it utilizes the credentials to successfully run it. 

:::tip
Alternatively,  if you wish to quickly test the code, you can utilize the `credentials` variable to pass your App ID and Secret as a part of the code itself. However, you must add the credentials variable every time make a new API call. 
:::

```py
import symbl

# Process audio file
conversation = symbl.Audio.process_file(
# credentials={app_id: <app_id>, app_secret: <app_secret>}, 
#Optional, Don't add this parameter if you have symbl.conf file in your home directory.
file_path=<file_path>)
```
## Using the Python SDK

The Python SDK allows you to utilize the capabilities of the Symbl APIs with minimal coding effort. 
To use this SDK, you must first `import` Symbl SDK and then specify the service you’d like to use along with the operation that want to perform:

```py
import symbl
```

In the example given below, we are calling the real-time audio processing service  that accepts a URL to ingest the audio file. 

```py
# Process audio file 
conversation = symbl.Audio.process_url(url='https://symbltestdata.s3.us-east-2.amazonaws.com/sample_audio_file.wav')
```

Further, we specify the operation which is generating topics for the said conversation.

```py
# Generate transcript
print(conversation.topics())
```
## Getting Conversation Insights 

Using this SDK, you can easily get the Conversation Insights such as Speech-to-Text, Topics, Follow ups, Action Items and Questions.

In this Python SDK release, you can utilize the following Symbl APIs:  
- [Telephony API (in Real-time)](/docs/python-sdk/python-sdk-telephony-api)
- [Async Text API](/docs/python-sdk/async-api)
- [Async Audio (File) API](/docs/python-sdk/async-audio)  
- [Async Audio (URL) API](/docs/python-sdk/async-audio#async-audio-url-api)
- [Async Video (File) API](/docs/python-sdk/async-video)
- [Async Video (URL) API](/docs/python-sdk/async-video#async-video-url-api)
 
:::info
Support for Streaming APIs is currently not available. This functionality will be added soon. 
:::


