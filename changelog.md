---
id: changelog
title: Changelog
sidebar_label: Changelog
slug: /changelog
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

--- 

We continuously add new features and enhancements, fix critical bugs, and regularly deploy changes to improve performance. Keep a tab of our latest updates on this page.

### 30 July 2021

![summary](/img/summary-ui-icon.png)
- **User Engagement Analytics**: You can get analytics data of your users interactions on the Summary UI via Segment app.<br/>
[Read more here](https://docs.symbl.ai/docs/pre-built-ui/user-engagement-analytics).

![api update](/img/api-update.png)
- Bug Fixes:
  - Incorrect usage recorded due to internal issue in Telephony API is fixed. 

### 13 July 2021

![summary](/img/summary-ui-icon.png)
- **Customizable Trackers and Summary UI**: You can now customize the look and feel of Trackers and Analytics UI to match your brand identity.<br/>
[Read more here](https://docs.symbl.ai/docs/pre-built-ui/trackers-and-analytics-ui/#customizing-trackers-and-analytics-ui).

![api update](/img/api-update.png)

- Improved validations and error handling in Async API.
- Quality check for Summarization.
- Availability of Interim Trackers. 
- Added Real-time API optimizations. 
- Bug Fixes: 
  - Issue with incorrect Speaker Diarization in the Spanish language is fixed.
  - Issue with retrieving entities such as trackers in bulk in management API is fixed.

![sdk](/img/sdk-icon.png)
- Availability of Streaming API with Python SDK. [Read more here](/docs/python-sdk/streaming-api). 

---

### 29 June 2021

![api update](/img/api-update.png)
- **PII Identification and Redaction for real-time**: Identifying and Redacting Personally Identifiable Information (PII) such as name, email IDs,  government ID numbers, phone numbers, etc. is now available. With this feature, you can redact confidential information from conversations processed by Symbl. <br/>
[Read more here](/docs/concepts/redaction-pii/#identifying-and-redacting-pii).

![sdk](/img/sdk-icon.png)
- **Python SDK availability**: Availability of Python SDK with support for Telephony and Async APIs. [Read more here](/docs/python-sdk/overview). 

![summary](/img/summary-ui-icon.png)

- **Trackers and Analytics UI**: Availability of the Trackers and Analytics UI that provides a waveform visualization with conversation insights. [Read more here](/docs/pre-built-ui/trackers-and-analytics-ui).
- Support for the `readOnly` parameter has been added to avoid unintended editing of the **Summary UI**.
- User can now share their own configured URL with their domain name in iframe implementation.

---

### 31 May 2021
![api update](/img/api-update.png)

- Added support for creating Transcripts in SRT format. 
[Read more here](/docs/conversation-api/transcript/#create-transcript-in-srt).

---

### 22 April 2021

![api update](/img/api-update.png)
- Added support for Speaker `userID` in the Analytics API. 
- Availability of Trackers API (Beta) that allows you to track the occurrence of certain keywords or phrases in a conversation. [Read more here](/docs/concepts/trackers).
- Availability of Management API (for Trackers) in Beta. [Read more here](/docs/management-api/introduction).
- Added support for speaker channel separation for Async Video APIs. [Read more here](/docs/async-api/overview/video/post-video#speaker-separation).
- Availability of Summary API (Labs). [Read more here](/docs/concepts/summarization).
- Added support for `refresh` flag in the Summary API (Labs) that allows a previously generated Summary to be regenerated.
- Added support for Comprehensive Action Items API (Labs). [Read more here](/docs/concepts/action-items#comprehensive-action-items-labs.).


---


### [Connect with us on Slack](https://symbldotai.slack.com/join/shared_invite/zt-4sic2s11-D3x496pll8UHSJ89cm78CA#/shared-invite/email) 💬
