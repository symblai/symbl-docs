---
id: errors
title: Error Codes
sidebar_label: Error Codes
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
Symbl uses HTTP response status codes to indicate the success or failure of your API calls. If your request fails, Symbl returns an error along with the appropriate status code.

Find details on common error codes and how to resolve them below.

### HTTP Codes

Error Code | Meaning
---------- | -------
200 | OK -- Success.
201 | Created -- Your request successfully led to the creation of a resource.
400 | Bad Request -- Your request is invalid.
401 | Unauthorized -- Your API key is invalid.
403 | Forbidden
404 | Not Found -- The specified resource does not exist.
405 | Method Not Allowed -- You tried to access an api with an invalid method.
429 | Too Many Requests -- Too many requests hit the API too quickly.
500 | Internal Server Error -- We had a problem with our server. Try again later.

### Async Text API- POST

Error Code | Description | Resolution
---------- | ------- | ---------
429 | Too Many Requests -- Too many requests hit the API too quickly. This API has a limit of a maximum of `X` number of concurrent jobs per account.| If you are looking to scale, and need more concurrent jobs than this limit, please contact us at support@symbl.ai


### Create Trackers 

Error Code | Description | Resolution
---------- | ------- | ---------
409 - Conflict | The 409 response code specifies that the Tracker with that specific name already exists. | Modify the name of the Tracker or Update the name of the existing Tracker with that name to resolve the error.
429 - Too many requests | The 429 response code specifies that the number of concurrent requests surpassed the limit for the API (which is 1 API call at a time). | Ensure that your system doesn’t make concurrent API calls that exceed this maximum limit.
400 - Bad Request | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
413 - Request Entity Too Large | The 413 response code specifies that the size of the request body exceeds that of the maximum limit the API supports (which is 1MB). | Please ensure that the size of the request body is under this limit to resolve this error.
500 - Internal Server Error | The 500 response code specifies that the server failed to handle the request.| Please reach out to support@symbl.ai if it persists after multiple attempts.
502 - Bad Gateway | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists after multiple attempts.
504 - Gateway Timeout | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists after multiple attempts.


### Get Tracker

Error Code | Description | Resolution
---------- | ------- | ---------
404 - Not Found | The 404 response code specifies that the Tracker with that specific trackerId does not exist. | Check the trackerId and ensure that it is valid and exists.


```bash
// example auth token is incorrect
{
    "message": "Token validation failed for provided token."
}
```




<aside class="notice">
If you face any issues or find bugs, please report them immediately to <a href="mailto:support@symbl.ai?subject=Support%20Ticket">support@symbl.ai</a> and we'll get back to you as soon as possible.
</aside>
