---
id: summary
title: GET Summary (Labs)
sidebar_label: GET Summary (Labs)
slug: /conversation-api/summary
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info Symbl Labs
This API is a part of the Symbl Labs. Symbl Labs is our experimental wing designed to share our bleeding edge AI research on human conversations with anyone who wants to explore its limits. 

You can access the Labs features using your Symbl App Id and Secret.  If you don't already have it, sign up on our [platform](https://platform.symbl.ai/#/login) to get your credentials.

**Note**: The usage of data for Labs projects is stored for enhancing our research.  We may continue to build, iterate, mutate or discontinue any of the below given features on the sole discretion of our team as deemed necessary. 

For any queries or feedback, please contact us at labs@symbl.ai.
:::

## GET Summary

This API allows you to get a [Summary](/docs/concepts/summarization) of important contextual messages in a conversation. 

Currently, the Summary can be enabled with Async APIs. Support for Summarization in real-time will be added soon. However, if you are using Streaming or Telephony API, you can use the `refresh` parameter to generate the Summary after the conversation has ended. To read about how to use it, see the [Refresh Parameter](#refresh-parameter) section below. 

:::note
This API works best on audio/video conversations that are at least 10 mins in duration. For text conversations, there must be more than 60 lines of conversation for the Summary to get generated.
:::


### API Endpoint
**<font color="orange">GET</font> `https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary`**

### Request Headers

Header Name  | Required | Value
----------- | ------- |  ------- |
```Authorization```| Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Mandatory | This header must contain the MIME Type `application/json`. 

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
curl --location --request GET 'https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary' \
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
    url: `https://api-labs.symbl.ai/v1/conversations/{conversationId}/summary`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```
</TabItem>
</Tabs>

### Refresh Parameter

You can use the `refresh` query parameter in the Summary API for any of the following use-cases:

- **Regenerating the Summary (Async APIs)** <br/> 
Summaries can be generated again when you have new discussion items. Use `refresh=true` in Summary API as a query param. This will delete the previous Summary and will create a new one. 

- **Creating Summary (Telephony and Streaming APIs)** <br/> 
If you are using Telephony or Streaming API, after the conversation has ended, use the `refresh=true` parameter in the Summary API to generate the Summary.

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