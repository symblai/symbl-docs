---
id: python-sdk-tutorials-live-transcript
title: Get Live Audio Transcript using System Microphone
sidebar_label: Get Live Audio Transcript using System Microphone
slug: /python-sdk/python-sdk-tutorials-live-transcript
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```py
import symbl

connection = symbl.Streaming.start_connection()

connection.subscribe({'transcript_response': lambda response: print('got this response from callback', response)})

connection.send_audio_from_mic()
```