---
id: trackers-and-analytics-ui
title: Trackers and Analytics UI
sidebar_label: Trackers and Analytics UI
slug: /pre-built-ui/trackers-and-analytics-ui/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

--- 

The **Trackers and Analytics UI** provides a waveform visualization with conversation insights. The waveform highlights Topics in the timeline using color coded timestamps allowing you to get a snapshot of when they occured in the course of the conversation. You can view Trackers with sentiment score, transcripts, speaker information, and other conversation insights described below.

👉 &nbsp; [See Trackers and Analytics UI sample](https://meetinginsights-experience.symbl.ai/?_ga=2.9776305.580174444.1626193486-1247610446.1617102437#/eyJjb252ZXJzYXRpb25JZCI6IjU5NDg0ODUwNDUwNTk1ODQiLCJhdWRpb1VybCI6Imh0dHBzOi8vc3ltYmwtdGVzdC1jb252ZXJzYXRpb24uczMuYW1hem9uYXdzLmNvbS80X2NvbWNhc3RfY3VzdG9tZXJfc2VydmljZV85bWluMDNzZWMubXAzIn0.?o=fb5a99d192b2821a40639c5c7af86021db2ed6c7e32b3a8fccf6967b7e126c4ed6bd1e4636082ba3fc3a3da3980e5b99272c241e9d44c518715bf5c9772fe3bc405efb43e2cd11ef9c6e106215034ee3ac91c8dda4c09263032103519e56c690980c1c3f07604c183b1a4ddbcfca5df6cee1f7841492017eb2bb28b761cf57f218f05e233a2f34d223d4e0e4d8615fb2fca9c31fa534237c82e276ef4c4ec2c77f4fa320a7c00cded9e897d879b0f77d819475c0383f677214fa366d85bd6b99b10e1b7f56410d1c5813fd71d8f7f441de040f0bddfe2253c6161cb9990ca47f69e052ae5553a33b3cb0fd9dff80c009b466953f671d0ddefcf4534a17b56b2a89b671c07f0bc51daa85939494423b394ada8fabd44b91efc1817e77566ead15ab69e61fe2773a4eb4086d3ae0ca6bceda3274c5361e5ad389)

Currently, the Tracker and Analytics UI is supported for audio conversations. 

![Waveform](/img/trackers-and-analytics-ui.png)

  | Description  | 
---------- | ------- | 
 **1. Waveform Timeline** | The waveform timeline consists of color coded timestamps to show when exactly a Topic was discussed in the conversation. | 
 **2. Topics with Sentiment Score** | Hover your cursor around the Topics to get the Sentiment Score applicable to that Topic. The Sentiment Score can tell you if the Topics discussed were positive or negative in nature. Read more in the [Sentiment Polarity](/docs/async-api/code-snippets/how-to-use-sentiment-analysis/#polarity) section. <br/><br/>              ![Waveform](/img/tracker-ui-score.png) |
 **3. Trackers** | You can view the Trackers identified in the course of the conversation. It provides details on how many times the Trackers occured and who said it.<br/><br/>![Waveform](/img/trackers-ui.png) |
 **4. Analytics** | Provides an overview of speaker talk and silence ratios and words per minute.<br/><br/>![Waveform](/img/wpm.png)|
 **5. Transcript** | Transcript of the conversation with Speaker separation if the Speaker Diarization is enabled. See Best Practices information below. |
 **6. Speaker Analytics** | A timeline showing speakers talk time along with timestamps of when and who asked questions.<br/><br/>![Waveform](/img/speaker-analytics-1.png)|

:::info Best Practices
In order to get a full-fledged version of the **Trackers and Analytics UI**, ensure that you have:

1. **A pre-configured set of Trackers**:
Ensure that you have created Trackers, and processed it with Symbl (i.e., "conversationId" is generated). This happens when you submit the conversation data to the Async API for processing. Read about the step-by-step instructions [here](/docs/management-api/trackers/overview). 

2. **Enabled Speaker Separation**:
Ensure that the Speaker Separation step is also enabled when submitting data to the Async API.
“enableSpeakerDiarization=true” and “diarizationSpeakerCount={number}” should be passed in the query parameter. Read more in the [Speaker Separation](/docs/async-api/overview/speaker-separation/#query-params) page. 
If these optional parameters are set, the Speaker Analytics component can generate high-resolution information.

Please note that once the raw conversation data is processed by Symbl (i.e., "conversationId" is generated), there is no way of retroactively adding trackers or enabling speaker separation. In this case, you have to submit the conversation data once more to the Async API with the optional parameters.
:::


### API Reference
- [POST Trackers and Analytics UI API](/docs/api-reference/experience-api/post-trackers-and-analytics-ui)

### Tutorials
- [Creating Trackers and Analytics Summary UI](/docs/tutorials/pre-built-summary-ui/creating-trackers-and-analytics-ui)
- [White label your Summary Page](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)
