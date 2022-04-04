---
id: getting-summary
title: How to get a Summary using Async API
sidebar_label: Get Summary using Async API
slug: /tutorials/summarization/getting-summary/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Alpha Phase
This feature is in the [Alpha](/docs/product-releases) phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This tutorial provides a step-by-step instructions on how to get a Summary using Async APIs. 

To do this, follow the steps given below.

:::note
- If you are using the [Speaker Separation](/docs/async-api/tutorials/get-speaker-separation-audio-video/) feature, the Summary will use temporary labels to assign speakers. For example, it will assign the speakers with labels such as "Speaker 1", "Speaker 2" and so on. In this case, we recommend you to update the labels with actual names using [Speaker Events API](/docs/conversation-api/speaker-events) so you can get a more personalized summary. 
:::

### Step 1: Process conversations with Async API with enableSummary=true parameter
---

When you process a text, video or audio conversation with Async API, you must enable the Summarization feature. To do this, set the parameter `enableSummary=true` in the **query** params as shown below.

In the example below, we use Text Async API, however, the same can be used for Audio and Video Async APIs as well. 

#### Request 

`POST https://api.symbl.ai/v1/process/text?enableSummary=true`

#### Response

```json
{
  "conversationId": "5815170693595136",
  "jobId": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d"
}
```

The Async API call will return the `conversationId`. You can use this Conversation ID to get the Summary in the next Step. 
You must wait for the job to complete before you can get the Summary. 

### Step 2: Get Summary with Summary API
---

Once you have the `conversationId`, you can send a GET request to the Summary API endpoint shown below:

#### Request 

`GET https://api.symbl.ai/v1/conversations/{conversationId}/summary`

#### Example 

`GET https://api.symbl.ai/v1/conversations/5815170693595136/summary`

#### Response

The response will return the Summary as shown below:

```json
{
  "summary": [
    {
      "id": "3498579583479",
      "text": "John, Mark and Paul need to focus more on the Dev team and on the product. In order to focus on the sales hires, Paul needs to know which geographies they should focus on.",
      "messageRefs": [
        {
          "id": "248594875984"
        },
        {
          "id": "948538959348"
        },
        {
          "id": "538598359838"
        },
        {
          "id": "242948723984"
        },
        {
          "id": "234794875984"
        },
        {
          "id": "248545375984"
        },
        {
          "id": "244394875984"
        },
        {
          "id": "248232875984"
        },
        {
          "id": "248595675984"
        },
        {
          "id": "357194875984"
        },
        {
          "id": "236394875984"
        },
        {
          "id": "457594875984"
        }
      ]
    },
    {
      "id": "4385738475683",
      "text": "Mark and Tim will create a link, it will work on their environment and use the same API. The video placement will use a cookie. The idea is to eliminate effort on the consultancy team. Mark suggests a negation using cookies. Rob and Tim agree that it simplifies things on their end.",
      "messageRefs": [
        {
          "id": "938475984357"
        },
        {
          "id": "458375843755"
        },
        {
          "id": "565375984357"
        },
        {
          "id": "932342454357"
        },
        {
          "id": "913434441357"
        },
        {
          "id": "234235235155"
        },
        {
          "id": "134235322465"
        },
        {
          "id": "235235346223"
        },
        {
          "id": "134245723252"
        },
        {
          "id": "458434533646"
        },
        {
          "id": "346346356124"
        },
        {
          "id": "356346346365"
        },
        {
          "id": "645123434625"
        },
        {
          "id": "346635642223"
        },
       {
          "id": "342342352523"
        },
       {
          "id": "324334534622"
        },
       {
          "id": "673546246245"
        },
       {
          "id": "235252456842"
        },
       {
          "id": "246734574683"
        },
       {
          "id": "735773463571"
        },
       {
          "id": "682352246362"
        },
       {
          "id": "574535734242"
        },

      ]
  ]
}
```

<div class="row">
  <div class="column">
    <div class="card"><a href="/docs/conversation-api/summary"><h4>API Reference</h4>To know more about the Response Object descriptions and API parameters, see the Summary API section.</a></div>
  </div>
</div>
<br/>

### What's Next? 

- [Refreshing the Summary](/docs/tutorials/summarization/refreshing-summary) 

