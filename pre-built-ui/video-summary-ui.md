---
id: video-summary-ui
title: Video Summary UI
sidebar_label: Video Summary UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The **Video Summary UI** provides users the ability to interact with the Symbl elements(transcripts section, Insights, Filters) from an audio and video. It surfaces a screen where users can select key elements like topics, transcripts, and insights and the interface will surface the timestamp where this occurred and begin playback from there.

👉 [See Video Summary UI sample](https://meetinginsights.symbl.ai/meeting/?_ga=2.237802309.413798389.1632462507-1601661419.1619109767#/eyJzZXNzaW9uSWQiOiI2NTA0OTI1MTg4MDYzMjMyIiwidmlkZW9VcmwiOiJodHRwczovL3N0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vcmFtbWVyLXRyYW5zY3JpcHRpb24tYnVja2V0LzE5MzE0MjMwMjMubXA0In0=?showVideoSummary=true)

![summary-ui](/img/summary-ui-intro.png)

The Video Summary UI provides the following details:

- **Title** - The title represents the subject of the meeting in a concise manner.
- **Date** - Date of the meeting, formatted in the standard style of MM/DD/YY.
- **Time** - Specific time at which the meeting occurred, formatted in Coordinated Universal Time or UTC standard.
- **Duration** - Total duration of the meeting.
- **Attendees** - A compact list of the people who attended the meeting. You can use the feature to abbreviate each attendee according to their function/position. For Example, an Agent or a Customer.
- **Summary Topics** - A concise list of a cluster of subjects discussed throughout the meeting.
- **Transcript** - Transcript of the conversation with Speaker Separation if the Speaker Diarization is enabled. You can view the transcription of the entire conversation and see what each participant spoke. 
- **Insights** - Insights section shows you all the Conversation Intelligence such as Questions, Action Items, Topics, and Follow Ups, etc., that is being talked about in the conversation. When you click on Insights, you will be redirected to the relevant part in the transcript where the insight was detected. 

## Key Features

1. **Video Playback**: You can begin playback from a particular timestamp in the transcript by clicking on it:



![Video Summary UI](/img/vs2.gif)



2. **Transcript Navigation**: Clicking on an Insight takes you to the location related to the insight in the transcript and begins autoplay of the video from there:
    ![Video Summary UI](/img/vs3.gif)



3. **Topic Highlights**: Selecting topics highlights the topics in the Transcript and generated Insights. In the search bar you will be able to toggle to other Topics along with the ability to autoplay the video from those points as well:

![Video Summary UI](/img/vs4.gif)

![Video Summary UI](/img/vs42.gif)


4. **Audio file** : This is supported by providing an audio file’s url to the `videoUrl` param. When an audio file is used, you will be provided a slightly different user experience -- while playing, the current speaker’s name, if available, is displayed where the video would otherwise be. Current audio formats supported are: `mp3` and `wav`.
    ![Video Summary UI](/img/audio-video-summary.gif)


### How to Enable the Video Summary UI

You need to add a query-parameter to the existing summary URL:

`&showVideoSummary=true`

### What if there is no video in my url ?

![Video Summary UI](/img/vs5.png)


<aside class="notice">
The videoUrl only takes precedence when there is no Video present in the UI.
</aside>

### API Reference
- [POST Video Summary API](/docs/api-reference/experience-api/post-video-summary-ui)

### Tutorials
- [Creating Video Summary UI](/docs/tutorials/pre-built-summary-ui/creating-video-summary-ui)
- [Tuning your Summary Page](docs/pre-built-ui/tuning-summary-page)
- [White label your Summary Page](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)
- [Add custom domain to your Summary Page](/docs/tutorials/pre-built-summary-ui/custom-domain)