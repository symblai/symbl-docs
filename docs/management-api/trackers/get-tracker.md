---
id: get-tracker
title: Get Tracker 
sidebar_label: GET Tracker 
slug: /management-api/trackers/get-tracker/
---

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

You can GET Trackers in the following ways with the Management API:
- [GET All Trackers](#get-all-trackers)
- [GET Tracker by ID](#get-tracker-by-id)
- [GET Tracker by name](#get-tracker-by-name)

:::info Trackers Management UI
You can create, view, edit and delete Trackers via the Trackers Management UI as well. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)
:::



## GET All Trackers

This API call lists all the Trackers registered to the Management API at the account level. 

### API Endpoint 

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/trackers`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Response Body

```json
{
    "tracker": {
        "id": "4476908732794496",
        "name": "Voice Message",
        "vocabulary": [
              "At the tone please record",
            "Please leave message after tome",
            "Call back during normal office hours",
            "If you are calling about an emergency",
            "Our offices are currently closed",
            "Our repesentatives are unavailable at this time",
            "Please leave message",
            "start recording message",
            "Begin recording message",
            "sending you to his voicemail",
            "Leave Name and contact info",
            "Leave name and number",
            "I can call after",
            "Leave message with name",
            "leave message with number",
            "press to listen",
            "press to record",
            "press to send",
            "Record your message",
            "Return call ASAP",
            "return your call as soon as possible",
            "get back soon",
            "get back as quickly as possible",
            "Sorry we missed your call",
            "sorry we missed you",
            "You have reached office"
        ]
    }
}
```

## GET Tracker by ID
This API gets the Tracker entity against the `trackerId` provided which can then be consumed in Symbl APIs. 

:::info 
Currently, the Tracker entity can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be added soon.
:::

### API Endpoint 

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/tracker/{trackerId}`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Parameter

The `trackerId`- the unique identifier of the Tracker to be fetched is accepted as a request parameter (path-param) in the URI.

### Response Body

```json
{
    "tracker": {
        "id": "4476908732794496",
        "name": "Promotion Mention",
        "vocabulary": [
            "We have a special promotion going on if you book this before",
            "I can offer you a discount of 10 20 percent you being a new customer for us",
            "We have our month special this month",
            "We have a sale right now on"
        ]
    }
}
```
### Error Codes

In case of unsuccessful responses, the following error codes will be returned from the API:

Error Code  | Description | Resolution
---------- | ------- | -------
`404 - Not Found` | The 404 response code specifies that the Tracker with that specific `trackerId` does not exist. | Check the `trackerId` and ensure that it is valid and exists.
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.

## Get Tracker by Name

This API endpoint gets all the Tracker entities against the provided query parameter: `name`.

:::info
Currently, the Tracker entities can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be available soon.
:::

### API Endpoint

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/trackers?name={trackerName}`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Parameters
The following request parameter (query-param) is accepted in the URI:

`name`- This query parameter specifies the unique name against which the Tracker was created.

:::note
If no query-params are passed, then this API will return all the Trackers available in that account.
:::

### Sample Response 
`trackers` is an array of JSON Objects containing a Tracker entity that meets the criteria specified by the query-params.

```json
{
    "trackers": [{
        "id": "4476908732794496",
        "name": "Promotion Mention",
        "vocabulary": [
            "We have a special promotion going on if you book this before",
            "I can offer you a discount of 10 20 percent you being a new customer for us",
            "We have our month special this month",
            "We have a sale right now on"
        ]
    }]
}
```

### Error Codes
In case of unsuccessful responses, the following error codes will be returned from the API

Error Code  | Description | Resolution
---------- | ------- | -------
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request.| Please reach out to support@symbl.ai if it persists after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.