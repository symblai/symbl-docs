---
id: summary-ui
title: Summary UI
sidebar_label: Summary UI
slug: /pre-built-ui/summary-ui/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import VideoDemoButton from '@site/src/components/Button';

---

The Summary UI provides users with a translated meeting summary page with transcript, attendees, topics, action items, follows ups, and more.

You can generate the following types of Summary UI:

- [Text Summary UI](/docs/pre-built-ui/experience-api#text-summary-ui)
- [Video Summary UI](/docs/pre-built-ui/experience-api#video-summary-ui)

:::note Demo links

[Sample Text Summary UI](https://oob-prod.symbl.ai/meeting/?__hstc=142565997.f13e6f687289922af636bba5b8ac2aab.1598766952817.1606472347899.1606474504198.210&__hssc=142565997.1.1606474504198&__hsfp=1690225618&_ga=2.9776305.580174444.1626193486-1247610446.1617102437#/eyJ1c2VySWQiOiJzdXJiaGlyYXRob3JlQHJhbW1lci5haSIsIm5hbWUiOiJTdXJiaGkiLCJzZXNzaW9uSWQiOiI2MzA0NTA2NTcyNzAxNjk2In0)

<VideoDemoButton href="https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI2NTA0OTI1MTg4MDYzMjMyIiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0LzE5MzE0MjMwMjMubXA0In0=?showVideoSummary=true" text="Sample Video Summary UI" />
:::

## Contents

* [Generating a Summary UI](#generating-a-summary-ui)
* [Video Summary UI](#video-summary-ui)
	* [How to enable the video summary UI?](#how-to-enable-the-video-summary-ui)
	* [What if there is no video in my URL](#what-if-there-is-no-video-in-my-url)
* [Localized Summary UI](#localized-summary-ui)
	* [German Summary UI](#german-summary-ui)
	* [Japanese Summary UI](#japanese-summary-ui)


## Generating a Summary UI

There are multiple ways to generate the Summary UI:

1. If you have a `conversationId`, you can use [Experience API](/docs/pre-built-ui/experience-api) to create it.
	* You can receive a `conversationId` from any [Telephony API](/docs/telephony/introduction), [Streaming API](/docs/streamingapi/introduction) or [Async API](/docs/async-api/introduction) endpoint.
	* You can view an example request from the Experience API [here](/docs/pre-built-ui/experience-api#http-request).

2. You can also recieve an email with a link to the Summary UI using the Telephony API. [Learn more about how to do that here](/docs/telephony/code-snippets/receive-prebuilt-ui-email-after-conversation).


## Video Summary UI

The Video Summary UI provides users the ability to interact with the Symbl elements(transcripts section, Insights, Filters) from an audio and video. It surfaces a screen where users can select key elements like topics, transcripts, and insights and the interface will surface the timestamp where this occurred and begin playback from there.


<VideoDemoButton href="https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI2NTA0OTI1MTg4MDYzMjMyIiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0LzE5MzE0MjMwMjMubXA0In0=?showVideoSummary=true" text="Demo of Video Summary UI" />

Features currently supported:

1. <strong>Auto scroll</strong>: The transcript auto scrolls while the video plays:

![Video Summary UI](/img/videosummaryUI.gif)



2. **Video Playback**: You can begin playback from a particular timestamp in the transcript by clicking on it:



![Video Summary UI](/img/vs2.gif)



3. **Transcript Navigation**: Clicking on an Insight takes you to the location related to the insight in the transcript and begins autoplay of the video from there:
    ![Video Summary UI](/img/vs3.gif)



4. **Topic Highlights**: Selecting topics highlights the topics in the Transcript and generated Insights. In the search bar you will be able to toggle to other Topics along with the ability to autoplay the video from those points as well:

![Video Summary UI](/img/vs4.gif)

![Video Summary UI](/img/vs42.gif)


5. **Audio file** : This is supported by providing an audio file’s url to the `videoUrl` param. When an audio file is used, you will be provided a slightly different user experience -- while playing, the current speaker’s name, if available, is displayed where the video would otherwise be. Current audio formats supported are: `mp3` and `wav`.
    ![Video Summary UI](/img/audio-video-summary.gif)


### How to Enable the Video Summary UI:

You need to add a query parameter to the existing summary URL:

`&showVideoSummary=true`

### What if there is no video in my URL?

The UI uses placeholder text to show that there is no video. Example below:

![Video Summary UI](/img/vs5.png)


:::info
The `videoUrl` only takes precedence when there is no video present in the UI.
:::

## Localized Summary UI

The Localized Summary UI provides users a translated meeting summary page chosen based on one of eight currently supported languages chosen when a session is initiated.

A timezone may also be specified that will change how the start time of the session is rendered in the summary UI.

:::info
Meeting Insights and Topics are currently not supported for non-english languages and the corresponding sections in the Summary UI will not be displayed.
:::

### German Summary UI

![Localized Summary UI](/img/germansummaryui.png)

### Japanese Summary UI

![Localized Summary UI](/img/Japsummaryui.png)

The language code specified will also change the language of the follow-up email after a session has ended.
