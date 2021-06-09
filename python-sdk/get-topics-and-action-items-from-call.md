---
id: python-sdk-tutorials-topics-and-action-items
title: Get Topics and Action Items from Call
sidebar_label: Get Topics and Action Items from Call
slug: /python-sdk/python-sdk-tutorials-topics-and-action-items
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the code given below to get Topics and Action Items using minimal lines of code:

```py
import symbl

# Process audio file
conversation = symbl.Audio.process_file(
  # credentials={app_id: <app_id>, app_secret: <app_secret>}, #Optional, Don't add this parameter if you have symbl.conf file in your home directory
  file_path=<file_path>)

# Printing topics and actions
print("Topics are = " + str(conversation.topics()))

print("Action Items = " + str(conversation.actions()))
```