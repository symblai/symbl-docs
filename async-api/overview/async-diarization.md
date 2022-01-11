---
id: speaker-separation
title: Speaker Separation
sidebar_label: Speaker Separation
---

---

The Async Audio & Async Video APIs can detect and separate unique speakers in a single stream of audio & video without need of separate speaker events.

To enable this capability with either of the APIs the `enableSpeakerDiarization` and `diarizationSpeakerCount` query parameters need to be passed with the request.

The `diarizationSpeakerCount` should be equal to the number of unique speakers in the conversation. If the number varies then this might introduce false positives in the diarized results.

If you’re looking for similar capability in Real-Time APIs, please refer to [Active Speaker Events](/docs/javascript-sdk/code-snippets/active-speaker-events) and Speaker Separation in WebSocket API sections.

:::info Speaker Diarization Language Support

Currently, Speaker Diarization is available for English and Spanish languages only.
:::

### Query Params

Parameter | Required | Value
--------- | --------- | -------
```enableSpeakerDiarization``` | Yes | Whether the diarization should be enabled for this conversation. Pass this as `true` to enable this capability.
```diarizationSpeakerCount``` | Yes | The number of unique speakers in this conversation.
