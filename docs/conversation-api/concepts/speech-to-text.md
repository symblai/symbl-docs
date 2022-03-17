---
id: speech-to-text
title: Speech-to-Text
description: Get real-time speech-to-text data and analytics from your conversations with Symbl.ai APIs. Learn more.
sidebar_label: Introduction
slug: /concepts/speech-to-text/
---

<head>
    <title>Transcribe Speech-to-Text in Real-Time</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl offers state-of-the-art Speech-to-Text capability (also called transcription). You can convert audio and video conversations into text in real-time or after the conversation has ended.

## Key Features

- **Real-time transcripting**: Transcribe your content from real-time and stored files.

- **Domain specific**: Symbl's recognizes Speech-to-Text models for mobile call and video calls for state-of-the-art accuracy.

- **Multi-language Support**: We support 20+ languages including English, Russian, French, Italian, Hindi, Japanese, Spanish, etc. We also support models for different accents. For example, the way American and British English are spoken are different and we have Speech Recognition Models that are fine-tuned for different accents. <br/>
  [Languages Supported](/docs/streaming-api/api-reference#supported-languages)

- **Custom Vocabulary**: We support Custom Vocabulary which help Speech-to-Text recognize specific words or phrases that are more frequently used within a context. For example, suppose that your audio data often includes the word "sell". When Speech-to-Text encounters the word "sell," you want it to transcribe the word as "sell" more often than "cell." In this case, you might use speech adaptation to bias Speech-to-Text toward recognizing "sell."

- **Accurate Punctuation**: Speech-to-Text accurately punctuates transcriptions (e.g., commas, question marks, and periods).

- **[Speaker Diarization](https://en.wikipedia.org/wiki/Speaker_diarisation)**: Know who said what by receiving automatic predictions about which of the speakers in a conversation spoke each utterance this is called Speaker Diarization. This process is fairly accurate but not 100% accurate. If you want near 100% accuracy with who said what, please use audio streams and passing the audio files in channels.

- **Paragraph generation**
- **Support for formats like Markdown (.md) and SubRip Text (.srt)**
- **Action Phrases within the transcription**

## Speech-to-Text API

:::info
Each continuous sentence spoken by a speaker in a conversation is referred to as a Message. Hence, we named our Speech to Text API to Messages API. Messages API returns you a list of messages in a conversation.
:::

To see Messages API in action, you need to process a conversation using Symbl. After you process a meeting, you'll receive a **Conversation ID**. A Conversation ID is the key to receiving conversational insights from any conversation. As an example, here's a simple API call which grabs the speech-to-text transcription from the conversation.

Using the conversation API, you can get a pre-formatted transcript in markdown language or in standard transcription or closed captioning format like SRT. See [Formatted Transcript](/docs/conversation-api/transcript) section for more.

👉 [Messages API](/docs/conversation-api/messages)

### Grab speech-to-text transcription

Remember to replace the `conversationId` in the API call with the Conversation ID you get from the previous API call.

<Tabs
defaultValue="cURL"
values={[
{ label: 'cURL', value: 'cURL', },
{ label: 'Node.js', value: 'nodejs', },
{ label: 'Javascript', value: 'javascript', }
]
}>
<TabItem value="cURL">

```js
curl "https://api.symbl.ai/v1/conversations/{conversationId}/messages" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require("request");
const authToken = AUTH_TOKEN;
const conversationId = "conversationId";

request.get(
  {
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/messages`,
    headers: { Authorization: `Bearer ${authToken}` },
    json: true,
  },
  (err, response, body) => {
    console.log(body);
  }
);
```

</TabItem>
<TabItem value="javascript">

```js
const conversationId = "conversationId";
const authToken = "AUTH_TOKEN";
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/messages`;

// Set headers
let headers = new Headers();
headers.append("Authorization", `Bearer ${authToken}`);

const data = {
  method: "GET",
  headers: headers,
};

// https://developer.mozilla.org/en-US/docs/Web/API/Request
const request = new Request(url, data);

fetch(request)
  .then((response) => {
    console.log("response", response);
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error("Something went wrong on api server!");
    }
  })
  .then((response) => {
    console.log("Success");
    // ...
  })
  .catch((error) => {
    console.error(error);
  });
```

</TabItem>
</Tabs>

## Our customers love our Speech to Text! ❤️

<iframe width="800" height="315" src="https://twitframe.com/show?url=https://twitter.com/yac/status/1362174456093945857" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
