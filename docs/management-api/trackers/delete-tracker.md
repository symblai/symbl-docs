---
id: delete-tracker
title: Delete Tracker 
sidebar_label: DELETE Tracker 
slug: /management-api/trackers/delete-tracker/
---

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

This API will delete the Tracker entity against the `trackerId` provided. 

:::info Trackers Management UI
You can create, view, edit and delete Trackers via the Trackers Management UI as well. To access this feature, log in to the[Symbl Platform](https://platform.symbl.ai/#/login)
:::

### API Endpoint 

**<font color="orange">DELETE</font> `https://api.symbl.ai/v1/manage/tracker/{trackerId}`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Yes | `application/json`
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Parameters
The request parameter `trackerId` (the unique ID of the Tracker to be deleted) is accepted as a path param in the URI.


### Sample Response Body
```javascript
{
    "id": "5929848712719472",
    "type": "tracker",
    "deleted": true
}
```
### Response Body Parameters

Parameter  | Description
---------- | -------
```id```| The id of the Tracker that was deleted.
```type```| The type of the Entity. This will be set to `tracker` for this API.
```deleted```| The status of deletion for this Tracker entity.

### Error Codes
In case of unsuccessful responses, the following error codes will be returned from the API:

Error Code  | Description | Resolution
---------- | ------- | -------
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`404 - Not Found` | The 404 response code specifies that the Tracker with that specific `trackerId` does not exist. | Check the `trackerId` and ensure that it is indeed valid and exists.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request.| Please reach out to support@symbl.ai if it persists even after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists even after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists even after multiple attempts.