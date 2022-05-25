---
id: summary
title: GET Summary (Beta)
sidebar_label: GET Summary (Beta)
slug: /conversation-api/summary/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info In Beta
This feature is in [Beta](/docs/product-releases). If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
:::

The Summary API provides a [Summarization](/docs/concepts/summarization) of important contextual messages in a conversation. 

Currently, Summaries cannot be generated in real-time. Support for creating Summaries in real-time is in development.  

The Summary API generates high-quality Summaries for longer meetings. Current best practice is to use the Summary API for longer meetings.

To generate the best Summarization, Symbl recommends:

- The number of words in the conversation should be greater than 85 words.

- Speaker information should be passed in when generating the Summary request. For more information see [Provide Speaker Information to generate Summary](/docs/tutorials/summarization/adding-speaker-info/). 

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`) as described in [Authentication](/docs/developer-tools/authentication).

### API Endpoint
**<font color="orange">GET</font> `https://api.symbl.ai/v1/conversations/{conversationId}/summary`**

### Request Headers

| Header Name  | Required | Value |
| --- | --- | --- |
| `Authorization` | Mandatory | `Bearer <token>` is generated when you complete the [authentication process](/docs/developer-tools/authentication). |
| `Content-Type` | Optional | This header must contain the MIME Type `application/json`. |

If you are using `x-api-key` it is deprecated. Symbl recommends using the `Authorization` header instead. 
    
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

- **Regenerate the Summary (Async APIs)** <br/> 
Summaries can be generated again when you have new discussion items. Use `refresh=true` in [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) as a query param. This deletes the previous Summary and creates a new one. 

- **Create Summary (Telephony and Streaming APIs)** <br/> 
If you are using the Telephony or Streaming API, after the conversation has ended, use the `refresh=true` parameter in the [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) to generate the Summary.

- **Generate Summary for already processed Conversations** <br/>
If you have already processed a conversation using the Async API or Real-time API (without the `EnableSummary` flag) and would like to generate a Summary for it, you can use `refresh=true` as a query parameter in the [Summary API Endpoint](/docs/conversation-api/summary#api-endpoint) and pass the `conversationId` to get the Summary. 
 
You can only generate a Summary for the new messages of a conversation that already has a generated Summary. 


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

| Parameter | Description | 
| --- | --- |
| `id` | The identifier of the Summary within the scope of the conversation. |
| `messageRefs.id` | The identifier of each message that makes up a Summary. |
| `text` | The text of the Summary. |

The following scenarios return a `Not Found` error resulting in a **404 Not Found** HTTP status code with a message indicating that it is in progress:

* If the Streaming API or Telephony API have a conversation that is still in-progress.
* If an Async API job is still in-progress when the Summary API is invoked.

For example, if a conversation with `conversationId` ‘48948598475’ is still in progress, the Summary for it can be generated only after the conversation is complete. Call the Summary API after the conversation has ended.

If you have questions or comments, email [support@symbl.ai](mailto:support@symbl.ai).
