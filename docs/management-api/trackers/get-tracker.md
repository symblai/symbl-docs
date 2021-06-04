---
id: get-tracker
title: GET Tracker 
sidebar_label: GET Tracker 
slug: /management-api/trackers/get-tracker
---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

You can use the GET Tracker API in two ways:
- [GET Tracker by ID](#get-tracker-by-id)
- [GET Tracker by query params](#get-tracker)

## GET Tracker by ID
This API gets the Tracker entity against the `trackerId` provided which can then be consumed in Symbl APIs. 

:::info Currently, this Tracker entity can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be added soon.
:::

### API Endpoint 

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/tracker/{trackerId}`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Query Parameter

The following request parameter (query-param) is accepted in the URI.
`trackerId`- The unique identifier of the Tracker to be fetched.

### Response Body

```javascript
{
    "tracker": {
        "id": "4476908732794496",
        "name": "COVID-19",
        "vocabulary": [
            "covid",
            "cover your mouth with a mask",
            "coughing",
            "social distancing",
            "vaccine"
        ]
    }
}
```
### Error Codes

In case of unsuccessful responses, the following error codes will be returned from the API:

Error Code  | Description | Resolution
---------- | ------- | -------
`404 - Not Found` | The 409 response code specifies that the Tracker with that specific `trackerId` does not exist. | Check the `trackerId` and ensure that it is valid and exists.
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.

## Get Tracker

This API endpoint gets all the Tracker entities against the provided query-params. You can get the Tracker entity using the query parameter`name`.

:::info
Currently, the Tracker entities can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be available soon.
:::

### API Endpoint

**<font color="orange">GET</font> `https://api.symbl.ai/v1/manage/trackers?&name={trackerName}`**

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

## Sample Response Body

```javascript
{
    "trackers": [{
        "id": "4476908732794496",
        "name": "COVID-19",
        "vocabulary": [
            "covid",
            "cover your mouth with a mask", 
            "coughing",
            "social distancing",
            "vaccine"
        ]
    }]
}
```

`trackers`
This is an array of JSON Objects containing a Tracker entity that meets the criteria specified by the query-params.

### Error Codes
In case of unsuccessful responses, the following error codes will be returned from the API

Error Code  | Description | Resolution
---------- | ------- | -------
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request.| Please reach out to support@symbl.ai if it persists after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.