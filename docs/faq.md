---
id: faq
title: Frequently Asked Questions
sidebar_label: FAQ
slug: /faq/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

### Is my data safe with Symbl.ai?

**Yes**

All data on the Symbl platform is encrypted and all connections are secured using 2048 bit AES encryption. Over the wire, data is encrypted using RSA 2048 bit keys. At rest, data is encrypted using AES-256.

We store transcripts, insights, and metadata of the conversation, which is persisted at Symbl’s end. All data access is logged and audited regularly. Logs are maintained for a minimum of 3 months and encrypted at rest. By default, we do not store audio recordings. In cases where storing is required, audio recordings are securely stored and encrypted at rest using 2048 bit RSA.
[Read More](https://symbl.ai/security/)


### How many concurrent API calls can I make?

For trial, [Streaming API](/docs/streamingapi/introduction) has a limit of 2 concurrent connections, and [Async APIs](/docs/async-api/overview/introduction) has a limit of 2 concurrent jobs. After you upgrade your account, it has a limit of 50 concurrent connections for Streaming API and 50 concurrent jobs for Async API.
If you are looking to scale, and need more concurrent jobs than this limit, please contact us at support@symbl.ai.


### What is the maximum length of meeting duration the [Async API](/docs/async-api/overview/introduction) supports?  

The API accepts files that are 4 hours or less in duration.

### What audio formats and channels does [Async Audio API](/docs/async-api/overview/introduction) support?

The audio formats which we support are **mp3**, **wav**, **amr**, **aac**, **ac3**, **aiff**, **flac**, **ogg**, **opus**, **.wma** and **m4a**.
Also, we support mono and dual-channel audio files.

If you have any other type of file and/or stereo audio, you need to first convert the file to the supported format  to use the API.


### What languages do you support for Async APIs?

Our Async APIs support multiple popular languages. To see the complete list, go to the [Languages Supported](/docs/async-api/overview/async-api-supported-languages) section. 

### What happens when the Speaker Diarization and Speaker recognition per Channel are both set to "True"?

If the Diarization feature is set to `true`, it will take priority over Speaker recognition per Channel. 

### Can I run a Tracker one at a time? 

No, Trackers cannot be run one at a time. 

If you have not processed your conversation with the parameter `enableAllTracker=true` in the Async API, Trackers will not be detected. To learn why and understand how to use this parameter while processing your conversation, see [Consuming Trackers with Management API](/docs/management-api/trackers/overview#step-2-submit-files-using-async-api-with-enablealltrackers-flag) section.

### Are punctuations allowed in the trackers vocabulary? 

You can only pass periods `.`, apostrophes `'` and dashes `-` in the trackers vocabulary. Other punctuations like `?`, `,`, `!`, `:` are not allowed. 

### How do I create Trackers? 
You can create Trackers using the Management API. You can also use the Tracker UI via the [Symbl Platform](https://platform.symbl.ai/#/login) to create, view, edit and delete Trackers. 

### How many vocabulary terms can I add in a Tracker?
We recommend that you add at least 5 vocabulary terms and a maximum of 50 per Tracker. 

### How many Trackers can I create?
You can create up to 500 Trackers per account.

### Can I view the logs of Streaming API?
Yes, you can view the Streaming API logs via the [Symbl Platform](https://platform.symbl.ai/#/login). 

