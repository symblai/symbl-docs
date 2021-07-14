---
id: faq
title: Frequently Asked Questions
sidebar_label: Frequently Asked Questions

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Is my data safe with Symbl.ai?

TL;DR: **Yes**

All data on the Symbl platform is encrypted and all connections are secured using 2048 bit AES encryption. Over the wire, data is encrypted using RSA 2048 bit keys. At rest, data is encrypted using AES-256.

We store transcripts, insights, and metadata about the conversation, which is persisted at Symbl’s end. All data access is logged and audited regularly. Logs are maintained for a minimum of 3 months and encrypted at rest. By default, we do not store audio recordings. In cases where storing is required, audio recordings are securely stored and encrypted at rest using 2048 bit RSA.
[Read More](https://symbl.ai/security/)


### How many concurrent API calls can I do?

For trial, this API has a limit of 20 concurrent jobs. After you upgrade your account, it has a limit of 50 concurrent jobs.
If you are looking to scale, and need more concurrent jobs than this limit, please contact us at support@symbl.ai


### What is the maximum length of meeting duration the [Async API](/docs/async-api/overview/introduction) support?  

The API accepts files that are 4 hours or less in duration.

### What audio formats and channels does [Async Audio API](/docs/async-api/overview/introduction) support?

The audio formats which we support are mp3, wav, amr, aac, ac3, aiff, flac, ogg, opus and .wma .
Also, we support mono and dual-channel audio file.

If you have any other type of file and/or stereo audio, you need to first convert the file to the supported format  to use the API.


### What languages do you support for Async APIs?

All our APIs support the same range of languages. [Languages Supported](/docs/async-api/overview/async-api-supported-languages)
