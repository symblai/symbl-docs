---
id: ui-components
title: Reusable and Customizable UI Components
sidebar_label: Introduction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl provides reusable and customizable UI Components that can be widely divided into two types:

1. [Pre-built Summary UI](/docs/conversation-api/concepts/ui-components#pre-built-summary-ui)
2. [Symbl React Elements](/docs/pre-built-ui/symbl-elements)

## Pre-built Summary UI
---
Symbl provides a few Pre-built Summary UI that can be used to generate a user experience of the understanding of the conversation after it has been processed. The pre-built summary UI is available as a URL that can be shared via email to all (or selected) participants or used to embed as a link as part of the conversation history within the application.

![summary-ui](/img/summary-ui-intro.png)

You can generate the following types of Summary UI:

&nbsp; 👉 &nbsp; [Text Summary UI](/docs/pre-built-ui/text-summary-ui)

&nbsp; 👉 &nbsp;[Video Summary UI](/docs/pre-built-ui/video-summary-ui)

&nbsp; 👉 &nbsp;[Tracker and Analytics UI](/docs/pre-built-ui/trackers-and-analytics-ui)

:::note Demo links

[Sample Text Summary UI](https://oob-prod.symbl.ai/meeting/?__hstc=142565997.f13e6f687289922af636bba5b8ac2aab.1598766952817.1606472347899.1606474504198.210&__hssc=142565997.1.1606474504198&__hsfp=1690225618&_ga=2.9776305.580174444.1626193486-1247610446.1617102437#/eyJ1c2VySWQiOiJzdXJiaGlyYXRob3JlQHJhbW1lci5haSIsIm5hbWUiOiJTdXJiaGkiLCJzZXNzaW9uSWQiOiI2MzA0NTA2NTcyNzAxNjk2In0)


[Sample Video Summary UI](https://meetinginsights.symbl.ai/meeting/?_ga=2.237802309.413798389.1632462507-1601661419.1619109767#/eyJzZXNzaW9uSWQiOiI2NTA0OTI1MTg4MDYzMjMyIiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0LzE5MzE0MjMwMjMubXA0In0=?showVideoSummary=true)

[Sample Trackers and Analytics UI](https://meetinginsights-experience.symbl.ai/?_ga=2.9776305.580174444.1626193486-1247610446.1617102437#/eyJjb252ZXJzYXRpb25JZCI6IjU5NDg0ODUwNDUwNTk1ODQiLCJhdWRpb1VybCI6Imh0dHBzOi8vc3ltYmwtdGVzdC1jb252ZXJzYXRpb24uczMuYW1hem9uYXdzLmNvbS80X2NvbWNhc3RfY3VzdG9tZXJfc2VydmljZV85bWluMDNzZWMubXAzIn0.?o=fb5a99d192b2821a40639c5c7af86021db2ed6c7e32b3a8fccf6967b7e126c4ed6bd1e4636082ba3fc3a3da3980e5b99272c241e9d44c518715bf5c9772fe3bc405efb43e2cd11ef9c6e106215034ee3ac91c8dda4c09263032103519e56c690980c1c3f07604c183b1a4ddbcfca5df6cee1f7841492017eb2bb28b761cf57f218f05e233a2f34d223d4e0e4d8615fb2fca9c31fa534237c82e276ef4c4ec2c77f4fa320a7c00cded9e897d879b0f77d819475c0383f677214fa366d85bd6b99b10e1b7f56410d1c5813fd71d8f7f441de040f0bddfe2253c6161cb9990ca47f69e052ae5553a33b3cb0fd9dff80c009b466953f671d0ddefcf4534a17b56b2a89b671c07f0bc51daa85939494423b394ada8fabd44b91efc1817e77566ead15ab69e61fe2773a4eb4086d3ae0ca6bceda3274c5361e5ad389)
:::


The Pre-built Summary UI provides the following:

* Title and details of the conversation including date, number of participants, etc.
* Names of all the participants.
* Topics covered in the conversation in the order of importance.
* Full, searchable transcript of the conversation. Transcripts can be edited, copied and shared.
* Any Insights, action items or questions from the transcript. Insights can also be edited, shared or dismissed, date/assignee for action item to be modified.
* The prebuilt summary UI can also be customizable, as per the use case or product requirement.

### Key Features

- **Interactive UI**: The Summary UI not only provides the Conversation details and insights in a simplistic interface, but allows you to copy, click and playback video (for Video Summary UI) at various conversation points to view transcripts on-demand. 
- **[White labeling](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)**: You can customize your Summary UI by adding your own brand logo, favicon, font, colour, etc. and give a personalized touch. 
- **[Custom Domain](/docs/pre-built-ui/custom-domain)**: You can add your own domain in the Summary UI URL for personalization. 
- **[Tuning](/docs/pre-built-ui/tuning-summary-page)**: You can choose to tune your Summary Page with different configurations such as enabling or disabling Summary Topics, deciding the order of topics, etc.
- **[User Engagement Analytics](/docs/pre-built-ui/user-engagement-analytics)**: You can track user interactions on your Summary UI via the popular tool Segment so that you have visibility into how your end-users are utilizing the Summary UI.


## Symbl React Elements
---
Symbl JS elements helps developers embed customizable JS elements for transcription, insights and action items for both real-time and post conversation experience. These are customizable, embeddable components that can be used to simplify the process of building the experience with the desired branding, as applicable.

The Symbl React elements supports:

* Live captioning
* Topics
* Action Items
* Suggestive Actions

&nbsp; 👉 &nbsp; Read more in the [Symbl React Elements](/docs/pre-built-ui/symbl-elements) page. <br/>
