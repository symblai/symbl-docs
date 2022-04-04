---
id: update-tracker
title: Update Tracker 
sidebar_label: PUT Tracker 
slug: /management-api/trackers/update-tracker/
---

----

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

To update an existing Tracker, send a PUT Tracker API request with Management API. This updates a Tracker entity against the `trackerId` which can be consumed in Symbl APIs.

:::info Trackers Management UI
You can create, view, edit and delete Trackers via the Trackers Management UI as well. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)
:::

### API Endpoint 

**<font color="orange">PUT</font> `https://api.symbl.ai/v1/manage/tracker/{trackerId}`**

:::info
Currently, the Tracker entities can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for other APIs will be added soon.
:::

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Parameter

The request parameter `trackerId` (the unique identifier of the Tracker to be updated) is accepted as path param in the URI:

### Sample Request Body

```javascript
{
    "id": "4476908732794496",
    "name": "Promotion Mention",
    "vocabulary": [
      "A flat 10 20 percent sale is",
      "Flash sale is available right now",
      "Lifestyle discount is available"
    ]
}
```
### Request Body Parameters

Parameter  | Description
---------- | -------
```id```| The `id` is the unique identifier of the Tracker entity being updated.
```name```| The name acts as a unique identifier assigned to the Tracker. It is case-sensitive, which means that a Tracker can be created with the same name but with different cases.
```vocabulary```| The vocabulary contains a set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts. 

:::caution
The `vocabulary` cannot have duplicate phrases/keywords.
:::

:::info
This API accepts a request body size up to 1MB. Sizes exceeding this limit will result in the error `413 - Request Entity Too Large`.
:::

### Sample Response Body
```javascript
{
   "tracker":{
      "id":"4476908732794496",
      "name":"Promotion Mention",
      "vocabulary":[
         "A flat 10 20 percent sale is",
         "Flash sale is available right now",
         "Lifestyle discount is available",
         "We have a special promotion going on if you book this before",
         "I can offer you a discount of 10 20 percent you being a new customer for us",
         "We have our month special this month",
         "We have a sale right now on"
      ]
   }
}
```
#### `tracker` 
This is the wrapper JSON Object which additionally also contains a unique `id` associated with the Tracker entity that can be later used to instruct Symbl APIs to enhance tracking of the keywords/phrases in that conversation.

### Error Codes

In case of unsuccessful responses, the following error codes will be returned from the API:

Error Code  | Description | Resolution
---------- | ------- | -------
`409 - Conflict` | The 409 response code specifies that the Tracker with that specific name already exists. | Modify the name of the Tracker or update the name of the existing Tracker with that name to resolve the error.
`404 - Not Found` | The 404 response code specifies that the Tracker with that specific `trackerId` does not exist. | Check the `trackerId` and ensure that it is valid and exists.
`429 - Too many requests` | The 429 response code specifies that the number of concurrent requests surpassed the limit for the API (which is 1 API call at a time). | Ensure that your system doesn’t make concurrent API calls that exceed this limit.
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`413 - Request Entity Too Large` | The 413 response code specifies that the size of the request body exceeds that of the maximum limit the API supports (which is 1 MB). | Please ensure that the size of the request body is under this limit to resolve this error. 
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.