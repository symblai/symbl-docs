---
id: summary
title: GET Summary 
sidebar_label: GET Summary (Alpha)
slug: /conversation-api/summary/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Alpha Phase
This feature is in the [Alpha](/docs/product-releases) phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API allows you to get a [Summary](/docs/concepts/summarization) of important contextual messages in a conversation. 

Currently, Summaries cannot be generated in real-time. Support for creating Summary in real-time will be added soon.  

:::caution
The Summary API generates high-quality Summaries for longer meetings so it is recommended that you use longer meetings with Summary API.
:::

:::note recommendations

For generating Summarization, we recommend the following:
- The number of words in the conversation should be above 85 words. 
- The speaker information should be passed in generate Summary request. Learn how to provide speaker information in [Provide Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info/) page. 
:::

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### API Endpoint
**<font color="orange">GET</font> `https://api.symbl.ai/v1/conversations/{conversationId}/summary`**

### Request Headers

Header Name  | Required | Value
----------- | ------- |  ------- |
```Authorization```| Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Optional | This header must contain the MIME Type `application/json`. 

:::info
If you are using `x-api-key` we recommend that you use `Authorization` header instead as `x-api-key` is deprecated. 
:::
    
### Request Header Sample

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Javascript', value: 'javascript', },
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request GET 'https:///api.symbl.ai/v1/conversations/{conversationId}/summary' \
--header "Authorization: Bearer $AUTH_TOKEN" \
# Set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
--header 'Content-Type: application/json' \
```

</TabItem>

<TabItem value="javascript">

```js
const request = require('request');
const authToken = AUTH_TOKEN;;

request.get({
    url: `https:///api.symbl.ai/v1/conversations/{conversationId}/summary`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```
</TabItem>
</Tabs>

### Using Refresh Parameter

You can use the `refresh=true` as query parameter in the Summary API for any of the following use-cases:

- **To Regenerate the Summary (Async APIs)** <br/> 
Summaries can be generated again when you have new discussion items. Use `refresh=true` in [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) as a query param. This will delete the previous Summary and will create a new one. 

- **To create Summary (Telephony and Streaming APIs)** <br/> 
If you are using Telephony or Streaming API, after the conversation has ended, use the `refresh=true` parameter in the [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) to generate the Summary.

- **To generate Summary for already processed Conversations** <br/>
If you have already processed a conversation using Async or Real-time APIs (without `EnableSummary` flag) and would like to generate a Summary for it, you can use `refresh=true` as query parameter in the [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) and use the `conversationId` to get the Summary. 

:::info Creating Summary for new Messages 
You can generate a Summary for only the new messages of a conversation that you have already generated a Summary of. 
:::

### Response Body Sample

```javascript
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
### Response Object

Parameter | Description | 
---------- | -------
```id```    | The identifier of the Summary within the scope of the conversation. 
```messageRefs.id``` | The identifier of each message that makes up a Summary.
```text```| The text of the Summary.

:::note
In case of Streaming API and Telephony API, if a conversation is still in-progress or in case of Async API, the job is still in-progress while this API is invoked, it would treat it as “Not Found” error by returning `404 Not Found` HTTP status code with a message indicating that it is in progress. <br/>
For example, if a conversation with `conversationId` ‘48948598475’ is still in progress, the Summary for it can be generated only after the conversation is complete. Please call this API after the conversation has ended. If you need more help, reach out to us at support@symbl.ai.
:::