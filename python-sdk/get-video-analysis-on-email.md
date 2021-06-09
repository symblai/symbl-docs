---
id: video-analysis-email
title: Get Video Conferencing Analysis on your Email  
sidebar_label: Get Video Conferencing Analysis on your Email 
slug: /python-sdk/tutorials/video-analysis-email
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem'; 

Symbl joins your video conferencing call (e.g.,  Zoom or Google Hangouts) and sends you analysis on your email after the call has ended. 

```python
import symbl

connection = symbl.Telephony.start_pstn(
      # credentials={app_id: <app_id>, app_secret: <app_secret>}, #Optional, Don't add this parameter if you have symbl.conf file in your home directory
      phone_number=phoneNumber,
      dtmf = ",,{}#,,{}#".format(meetingId, password),
      actions = [
        {
          "invokeOn": "stop",
          "name": "sendSummaryEmail",
          "parameters": {
            "emails": [
              emailId
            ],
          },
        },
      ]
    )

print(connection)
```

Parameter  | Required | Description | Value
----------- | ------- |  ------- | ------- | 
`phoneNumber` | Mandatory | Phone number including country code. If you are dailing in via phone to a conference tool, e.g., Zoom, Google hangouts, use the dail-in numbers provided. | `"+11234567890"`
`dtmf`| Optional | The DTMF details for dailing into your conference tool in the format `",,{}#,,{}#".format(meetingId, password)` | `meetingId`- Your meeting ID of your conference tool. Example`"12345"`. &nbsp; &nbsp; `password` - Your meeting password of your conference tool. Example: `"A1B2C3D4"`.&nbsp;&nbsp;`emailId`- Your email ID registered on the conference tool. Example: `"stacy@example.com"`|
`emailId` | Mandatory | The email ID where you'd like to recieve the analysis should be sent as a part of the `actions`. | `philson@example.com`