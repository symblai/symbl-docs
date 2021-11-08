---
id: text-summary-ui
title: Text Summary UI
sidebar_label: Text Summary UI

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The **Text Summary UI** provides you with an interface that shows conversation insights such as Action Items, Topics, Questions, Follow Ups and is interactive, allowing you to select conversation transcripts, insights, and filters. 
You can select to displays the timestamp where this occurred in the course of the conversation and start playback from there.

👉 [See Text Summary UI sample](https://oob-prod.symbl.ai/meeting/?__hstc=142565997.f13e6f687289922af636bba5b8ac2aab.1598766952817.1606472347899.1606474504198.210&__hssc=142565997.1.1606474504198&__hsfp=1690225618&_ga=2.43028069.1767386795.1632916447-941182599.1627371222#/eyJ1c2VySWQiOiJzdXJiaGlyYXRob3JlQHJhbW1lci5haSIsIm5hbWUiOiJTdXJiaGkiLCJzZXNzaW9uSWQiOiI2MzA0NTA2NTcyNzAxNjk2In0)

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
- [Turning your Summary Page](/docs/tutorials/pre-built-summary-ui/tuning-summary-page)
- [White label your Summary Page](/docs/tutorials/pre-built-summary-ui/whitelabeling-summary-ui)
- [Add custom domain to your Summary Page](/docs/tutorials/pre-built-summary-ui/custom-domain)
