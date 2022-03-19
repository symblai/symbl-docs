---
id: create-tracker
title: Create Trackers 
sidebar_label: POST Tracker
slug: /management-api/trackers/create-tracker/
---

---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

The endpoint given below creates a Tracker entity which can be consumed with Symbl APIs. Currently, the Tracker entities can be consumed with the [Async APIs](/docs/tutorials/trackers/create-trackers-async-api/) and [Streaming APIs](/docs/tutorials/trackers/create-trackers-streaming-api) only. Telephony API does not have support for Trackers yet.

You can create several Trackers at the same time as a bulk operation. To learn how, see [**Bulk Create Trackers**](#create-trackers-in-bulk) section. You can create up to 500 Trackers per account. 

:::tip Best Practises
Before creating the Trackers, go through the [Best Practices](#best-practices) section to learn about how to create Trackers.
:::


### API Endpoint

**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/tracker`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

:::info
For better tracking use prominent keywords and phrases along with few longer utterances which represent the Tracker.
:::

:::note Using Punctuations in Trackers Vocabulary 
You can only pass the following punctuations in trackers vocabulary:
- Periods `.` 
- Apostrophes `'` 

Using any other punctuation mark such as `?`, `,`, `!`, `:` is not allowed. 
:::

### Request Body

```javascript
{
    "name": "Promotion Mention",
    "vocabulary": [
       "We have a special promotion going on if you book this before",
       "I can offer you a discount of 10 20 percent you being a new customer for us",
       "We have our month special this month",
       "We have a sale right now on"
    ]
}
```
### Request Body Parameters

Parameter  | Description
---------- | -------
```name```| This member specifies a uniquely identifiable name given to the group/set of phrases defined by the `vocabulary` member. It is case-sensitive which means that a Tracker can be created with the same name but with different cases.
```vocabulary```| It specifies the set of phrases or keywords that need to be tracked in a conversation. Note that the Trackers API finds the matches for the given vocabulary throughout a conversation. For example, the Tracker Voice Message shown above can be used for detecting if the entire conversation is itself an automated reply or contains “contextually similar” phrases in it.

:::caution
Note that the vocabulary cannot have duplicate phrases/keywords.
:::

:::info
This API accepts a request body size up to 1MB. Request bodies exceeding this limit will result in the error `413 - Request Entity Too Large error being returned in the response`.
:::

### Response

```javascript
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
#### `tracker`

This is the wrapper JSON Object which additionally also contains a unique `id`associated with the Tracker entity that can be later used to instruct Symbl APIs to enhance that specific request with this Tracker for tracking keywords/phrases in a conversation.

This API has a maximum concurrency of 1 request. If you wish to create multiple trackers in a single API call, go to [Create Trackers in Bulk](#bulk-create-trackers) section.

:::info Trackers Management UI
You can also create, view, edit and delete Trackers via the Trackers Management UI as well. To access this feature, log in to the [Symbl Platform](https://platform.symbl.ai/#/login). 
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

:::info Create Trackers with Management API
While you can create Trackers with Async or Streaming APIs, it is recommended that you create Trackers using Management API because Trackers created with Management APIs are saved and can be reused while the same is not possible with Async or Streaming APIs. 
:::

## Create Trackers in Bulk
---

This API allows you to create all the trackers to be sent in one array. This helps you perform bulk operations to create Trackers.

### API Endpoint 
**<font color="orange">POST</font> `https://api.symbl.ai/v1/manage/trackers`**

### Request Headers

Header Name  | Required | Description
---------- | ------- |  ------- |
```Authorization``` | Mandatory | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type	``` | Mandatory | `application/json`
```x-api-key``` | Optional | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body

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

### Request Parameters

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

### Response

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

### Best Practices

Following are the best practices to be followed while creating Trackers: 

Dos' and Don'ts | Example |
---------- | ------- |  
Densely pack your vocabulary with information | "What’s the price?" | 
Don't preface your information with lots of words that don’t convey meaning | "I was wondering if you could tell me about your pricing structure". |
Use simple sentences or phrases | Short sentence: "I want to understand your product". Phrase: "understand your product" | 
Avoid using complex sentence structure | "I want to make sure that I have a full understanding of your product".



## Tutorials
---

You might find the following tutorials useful: 

- [How to create and use Trackers- Trackers Management API](/docs/tutorials/trackers/consuming-trackers-management-api/)
- [Creating Trackers with Async APIs](/docs/tutorials/trackers/create-trackers-async-api/)
- [Creating Trackers with Streaming API](/docs/tutorials/trackers/create-trackers-streaming-api/)
- [Using Trackers with Async API](/docs/tutorials/trackers/consuming-trackers-async-api//)
- [Using Trackers with Streaming API](/docs/tutorials/trackers/consuming-trackers-streaming-api/)

