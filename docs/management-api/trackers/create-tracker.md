---
id: create-tracker
title: Create Tracker
sidebar_label: POST Tracker
slug: /management-api/trackers/create-tracker
---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The endpoints given below creates a Tracker entity which can be consumed in Symbl APIs. 

To create Trackers in bulk, see [**Bulk Create Trackers**](#bulk-create-trackers) section.  

:::note 
Currently, the Tracker entities can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be added soon.
:::

### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/tracker`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Sample Request Body

```javascript
{
    "name": "COVID-19",
    "vocabulary": [
      "covid",
      "cover your mouth with a mask", 
      "coughing",
      "social distancing",
      "vaccine"
    ]
}
```
### Request Body Params

Parameter  | Description
---------- | -------
```name```| The name acts as a unique identifier assigned to the Tracker. It is case-sensitive which means that a Tracker can be created with the same name but with different cases.
```vocabulary```| The vocabulary contains the set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts. 

:::caution
Note that the vocabulary cannot have duplicate phrases/keywords.
:::

:::info
This API accepts a request body size up to 1MB. Request bodies exceeding this limit will result in the error `413 - Request Entity Too Large error being returned in the response`.
:::

### Sample Response Body

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
#### `tracker`

This is the wrapper JSON Object which additionally also contains a unique `id`associated with the Tracker entity that can be later used to instruct Symbl APIs to enhance that specific request with this Tracker for tracking keywords/phrases in a conversation.

:::info
This API has a maximum concurrency of 1 request. If you wish to create multiple trackers in a single API call, go to [Create Trackers in Bulk](#bulk-create-trackers) section.
:::

### Error Codes
In case of unsuccessful responses, the following error codes will be returned from the API:

Error Code  | Description | Resolution
---------- | ------- | -------
`409 - Conflict` | The 409 response code specifies that the Tracker with that specific name already exists. | Modify the name of the Tracker or Update the name of the existing Tracker with that name to resolve the error.
`429 - Too many requests` | The 429 response code specifies that the number of concurrent requests surpassed the limit for the API (which is 1 API call at a time). | Ensure that your system doesn’t make concurrent API calls that exceed this maximum limit.
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`413 - Request Entity Too Large` | The 413 response code specifies that the size of the request body exceeds that of the maximum limit the API supports (which is 1MB). | Please ensure that the size of the request body is under this limit to resolve this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request. | Please reach out to support@symbl.ai if it persists after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. | This may happen due to multiple reasons. Please reach out to support@symbl.ai if it persists after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists after multiple attempts.

## Create Trackers in Bulk

### API Endpoint 
**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/trackers`**

This API allows you to create all the trackers to be sent in one array. This helps you perform bulk operations to create Trackers.

:::note
Currently, the tracker entities can be consumed in the [Async APIs](/docs/async-api/introduction) only. Support for the other APIs will be made available soon.
:::

## Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).
## Sample Request Body

```javascript
[{
	"name": "Voice Message",
	"vocabulary": [
		"At the tone please record",
		"Please leave message after tone",
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
}]
```
:::info
The request body is essentially an array of tracker entities, each of which will be created separately in Symbl’s backend.
:::

Parameter | Description | 
---------- | -------
`name` | The `name` acts as a unique identifier assigned to the Tracker. It is case-sensitive which means that a Tracker can be created with the same name but with different cases.
`vocabulary` | The vocabulary contains a set of phrases/keywords which signify the context of the Tracker. In other words, these are a set of sentences that are commonly used while talking about the said Tracker in different contexts. 

:::caution
The vocabulary cannot have duplicate phrases/keywords.
:::

:::info
This API accepts a request body up to 1MB size. Request bodies exceeding this limit will result in the error: `413 - Request Entity Too Large error`.&nbsp;&nbsp;

If you need to create Tracker entity(s) greater than this size, consider splitting it into multiple Tracker entities with the vocabulary of the Tracker split across these instances.
:::

### Sample Response Body

```javascript
{
	"trackers": [{
		"id": "7476908732794496",
		"name": "Voice Message",
		"vocabulary": [
			"At the tone please record",
			"Please leave message after tone",
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
	}]
}
```
#### `trackers`
The `trackers` is the wrapper JSON Array which contains all the Tracker entities created.&nbsp;&nbsp;

It also contains a unique `id` associated with the Tracker entity that can be later used to instruct Symbl's APIs to enhance that specific request with this Tracker for tracking the keywords/phrases.

:::info
This API has a maximum concurrency of 1 request.
:::

### Error Codes
In case of unsuccessful responses, the following error codes will be returned from the API:


Error Code  | Description | Resolution
---------- | ------- | -------
`409 - Conflict` | The 409 response code specifies that the Tracker with that specific name already exists. | Modify the name of the Tracker or Update the name of the existing Tracker with that name to resolve the error.
`429 - Too many requests` | The 429 response code specifies that the number of concurrent requests surpassed the limit for the API (which is 1 API call at a time). | Ensure that your system doesn’t make concurrent API calls that exceed this limit.
`400 - Bad Request` | The 400 response code specifies that the request body or the parameters have incorrect key names or their values have types that are different than the ones expected. | Please read the message returned in the response to fix this error.
`413 - Request Entity Too Large` | The 413 response code specifies that the size of the request body exceeds that of the maximum limit the API supports (which is 1 MB). | Please ensure that the size of the request body is under this limit to resolve this error.
`500 - Internal Server Error` | The 500 response code specifies that the server failed to handle the request. | Please reach out to support@symbl.ai if it persists after multiple attempts.
`502 - Bad Gateway` | The 502 response code specifies that the server failed to acknowledge the request. This may happen due to multiple reasons. | Please reach out to support@symbl.ai if it persists after multiple attempts.
`504 - Gateway Timeout` | The 504 response code specifies that the server failed to respond within the timeout duration. | Please reach out to support@symbl.ai if it persists after multiple attempts. 
