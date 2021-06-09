---
id: python-sdk-tutorials-speech-to-text
title: Get Speech-to-Text of Multiple Audio Files in a Directory
sidebar_label: Get Speech-to-Text of Multiple Audio Files in a Directory
slug: /python-sdk/python-sdk-tutorials-speech-to-text
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```python
import symbl
from os import listdir
from os.path import isfile, join

# returns lambda function with fileName which is under processing
def save_transcriptions_in_file(fileName):
    return lambda conversation: on_success(conversation, fileName)

# returns actual callback to save the transcriptions of a conversation in a file
def on_success(conversation, fileName):
    transcriptions = conversation.messages()

    file = open(fileName + ".txt","w+")
    file.write(str(transcriptions))
    file.close()

# Look [here][unicodeerror], if you're getting unicode error
directory_path = r'<directory_path>'

files = [join(directory_path, file) for file in listdir(directory_path) if isfile(join(directory_path, file))]

# Process audio files in the above mentioned directory
for file in files:
    job = symbl.Audio.process_file(
      # credentials={app_id: <app_id>, app_secret: <app_secret>}, #Optional, Don't add this parameter if you have symbl.conf file in your home directory
      file_path=file, wait=False).on_complete(save_transcriptions_in_file(file))
```