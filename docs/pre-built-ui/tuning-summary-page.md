---

id: tuning-summary-page
title: Tuning your Summary Page
sidebar_label: Tuning your Summary Page
slug: /pre-built-ui/tuning-summary-page/
---

---

You can choose to tune your Summary Page with query parameters in order to play with different configurations and see how the results look.

:::info
Currently, tuning is supported for [Text](/docs/pre-built-ui/text-summary-ui) and [Video Summary UI](/docs/pre-built-ui/video-summary-ui). 
:::

### Query Parameters

You can configure the summary page by passing in the configuration through query parameters in the summary page URL that gets generated at the end of your meeting. See the end of the URL in this example:

`https://meetinginsights.symbl.ai/meeting/#/eyJ1...I0Nz?insights.minScore=0.95&topics.orderBy=position`

| Query Parameter | Default Value | Supported Values | Description |
| ------------ | -------- | ---------  | ------------------------------------ |
| `insights.minScore` | 0.8 | 0.5 to 1.0 | Minimum score that the summary page should use to render the insights |
| `insights.enableAssignee` | false | [true, false] | Enable to disable rending of the assignee and due date of the insight |
| `insights.enableAddToCalendarSuggestion` | true | [true, false] | Enable to disable add to calendar suggestion when applicable on insights |
| `insights.enableInsightTitle` | true | [true, false] | Enable or disable the title of an insight. The title indicates the originating person of the insight and if assignee of the insight. |
| `topics.enabled` | true | [true, false] | Enable or disable the summary topics in the summary page |
| `topics.orderBy` | 'score' | ['score', 'position'] | Ordering of the topics. score - order topics by the topic importance score. Position - order the topics by the position in the transcript they surfaced for the first time
