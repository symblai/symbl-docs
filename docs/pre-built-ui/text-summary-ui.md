---
id: text-summary-ui
title: Text Summary UI
sidebar_label: Text Summary UI
slug: /pre-built-ui/text-summary-ui/

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The **Text Summary UI** provides you with an interface that shows conversation insights such as Action Items, Topics, Questions, Follow Ups and is interactive, allowing you to select conversation transcripts, insights, and filters. 
You can select to displays the timestamp where this occurred in the course of the conversation and start playback from there.

👉 [See Text Summary UI sample](https://meetinginsights.symbl.ai/meeting/#/eyJzZXNzaW9uSWQiOiI1NDg4MzI2NjE1MjM2NjA4IiwicmVhZE9ubHkiOnRydWUsImhpZGVTaGFyZUJ1dHRvbiI6ZmFsc2UsImFuYWx5dGljc1ZlbmRvcnMiOlt7ImlkIjoiNjMwMzc4NTg5NTg1NDA4MCIsInR5cGUiOiJhbmFseXRpY3MiLCJuYW1lIjoiU2VnbWVudCIsImtleSI6Imtyclg1WjdKS09MV0RERURwMnNnWjJRSEo0R09odFNBIn1dLCJmYXZpY29uIjoiaHR0cHM6Ly9zeW1ibHNhbml0eWRhdGEuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vc3ltYmwtZmF2aWNvbi5wbmciLCJsb2dvIjoiaHR0cHM6Ly9zeW1ibHNhbml0eWRhdGEuczMudXMtZWFzdC0yLmFtYXpvbmF3cy5jb20vc3ltYmwtbG9nby5wbmcifQ..?o=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU0ODgzMjY2MTUyMzY2MDgiLCJpYXQiOjE2MzY2Mjk2MDZ9.UNjq6Vs3UoBLULADrlH6YtYzKYFtcxXQ5DLcWR41UiA)
![verbose-text](/img/verbose-text-demo.png)

Currently, the Text Summary UI is supported for audio conversations.

The Text Summary UI displays the following details:

- **Title** - The title represents the subject of the meeting in a concise manner.
- **Date** - Date of the meeting, formatted in the standard style of MM/DD/YY.
- **Time** - Specific time at which the meeting occurred, formatted in Coordinated Universal Time or UTC standard.
- **Duration** - Total duration of the meeting.
- **Attendees** - A compact list of the people who attended the meeting. You can use the feature to abbreviate each attendee according to their function/position. For Example, an Agent or a Customer.
- **Summary Topics** - A concise list of a cluster of subjects discussed throughout the meeting.
- **Transcript** - Transcript of the conversation with Speaker Separation if the Speaker Diarization is enabled. You can view the transcription of the entire conversation and see what each participant spoke. 
- **Insights** - Insights section shows you all the Conversation Intelligence such as Questions, Action Items, Topics, and Follow Ups, etc., that is being talked about in the conversation. When you click on Insights, you will be redirected to the relevant part in the transcript where the insight was detected.


### API Reference
- [POST Text Summary API](/docs/api-reference/experience-api/post-text-summary-ui)

### Tutorials
- [Creating Text Summary UI](/docs/tutorials/pre-built-summary-ui/creating-text-summary-ui)
- [Tuning your Summary Page](/docs/pre-built-ui/tuning-summary-page)
- [White label your Summary Page](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)
- [Add custom domain to your Summary Page](/docs/tutorials/pre-built-summary-ui/custom-domain)