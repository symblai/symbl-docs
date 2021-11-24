---
id: refreshing-summary
title: How to Refresh a Summary 
sidebar_label: Refreshing a Summary 
slug: /tutorials/summarization/refreshing-summary
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info Symbl Labs
This feature is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 


You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

When you wish to renegerate a Summary that you generated earlier, you can do so in two ways: 

1. [Regenerate the entire Summary](#regenerate-the-entire-summary): This makes your earlier Summary and creates a new one.
2. [Regenerate Summary for only new transcripts](#regenerate-summary-for-only-new-transcripts)

## Regenerate the entire Summary 

If you wish to regenerate the Summary that was already created, use the flag `refresh=true`. 

:::important
When you regenerate the Summary with `refresh=true` flag, the previous Summary is deleted and a new one is created. 
:::

### Passing the parameter `refresh=true` in the Summary API 

The parameter `refresh=true` has to be passed as a query parameter in the Summary API as shown below:

#### Request

`POST https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary?refresh=true`

#### Response

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

#### Response Object

Parameter | Description | 
---------- | -------
```id```    | The identifier of the Summary within the scope of the conversation. 
```messageRefs.id``` | The identifier of each message that makes up a Summary.
```text```| The text of the Summary.

## Regenerate Summary for only new transcripts

When you have new or additional transcript messages, you can generate a Summary for only the new ones by passing the parameter `refresh=false`. 

### Passing the parameter refresh=false in the Summary API

The parameter `refresh=false` has to be passed as a query parameter in the Summary API as shown below:

#### Request

`POST https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary?refresh=false`

#### Response

```json
{
  "summary": [
    {
      "id": "7298573211590",
      "text": "Stella, Rob and Mark met to outline the actual requirement for the APIs. They have specified the details in the Product Requirement Documentation. Some of the errors encountered in the past were related to the implementation gaps. Tim will investigate the past errors and share the same with the team",
      "messageRefs": [
        {
          "id": "248594875911"
        },
        {
          "id": "948538959102"
        },
        {
          "id": "538598359123"
        },
        {
          "id": "242948723322"
        },
        {
          "id": "234794875304"
        },
        {
          "id": "248545375300"
        },
        {
          "id": "244394875727"
        },
        {
          "id": "248232875200"
        },
      ]
  ]
}
```

<div class="row">
  <div class="column">
    <div class="card"><a href="/docs/conversation-api/summary#response-object"><h4>API Reference</h4>To know more about the Response Object descriptions and API parameters, see the Summary API section.</a></div>
  </div>
</div>
<br/>