---
id: all-conversations
title: GET All Conversations
sidebar_label: GET All Conversations
slug: /conversation-api/all-conversations/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns all conversations and allows you to add query parameters for sorting, ordering, etc. in the fetched results.

See the complete list of supported query parameters in the [Query Parameters](#query-parameters) section below.

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### API Request

`GET https://api.symbl.ai/v1/conversations`


### Example API Call

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', },
    { label: 'Python', value: 'python' }
  ]
}>
<TabItem value="cURL">

```shell
curl "https://api.symbl.ai/v1/conversations" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;

request.get({
    url: `https://api.symbl.ai/v1/conversations`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import requests

baseUrl = "https://api.symbl.ai/v1/conversations"

url = baseUrl 

# Set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("GET", url, headers=headers)

if response.status_code == 200:
    # Successful API execution
    print("conversations => " + str(response.json()))  # object containing id, type, name, startTime, endTime, members object, and metadata object
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Request

Given below is an example of the request along with optional query parameters. For a complete list of query parameters and their description, see the [Query Parameters](#query-parameters) table below.

```java
GET https://api.symbl.ai/v1/conversations
?limit=2
&order=desc
&sort=conversation.name
&offset=2
&startTime=2021-08-09T18:30:00.000Z
&endTime=2021-08-13T18:30:00.000Z
```

### Query Parameters

Following are the optional query parameters that you can pass in this API: 

| Parameter | Data Type | Description | Required | Default Value | 
|--------|--------|---------------|-----|---|
`limit` | Integer (int16) | Specifies a non-negative integer `count`, to indicate that no more than `count` items in the result will be returned. `limit` set to `0` returns 0 items in the result. | Optional | 20.<br/>Value accepted is between `0` to `65536`. | 
`offset` | Integer (int16) | Specifies a non-negative number of items to skip before applying the `limit`. | Optional | 0 | 
`order` | String / enum | Specifies the order in which the results should be sorted. The `order` is applied on the `startTime` field of the associated Conversation entity. | Optional | `asc`. Values accepted are `asc` and `desc`.
`startTime` | String / [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format | Specifies the start of the datetime range for the results to be returned. This `startTime` is associated with the `startTime` field of the associated Conversation entity. If `startTime` is not mentioned, then `startTime` is calculated as - `startTime = endTime - duration('7 days')`.| Optional | `startTime = endTime - duration('7 days')`. Values accepted are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted strings with value less than current timestamp and less than `endTime`. |
`endTime` | String / [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date format | Specifies the end of the date time range for the results to be returned. This `endTime` is associated with the `endTime` field of the associated Conversation entity. If `endTime` is not mentioned, then the current timestamp is considered as `endTime` automatically. | Optional | `endTime = currentDatetime()`. Values accepted are [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) formatted strings with value less than current timestamp and greater than `startTime`.|
`sort` | String | Specifies one or more fields to be used to sort the results. | Optional | `conversation.startTime` | |
`filter` | String / RSQL format | Specifies a filter string in RSQL format to filter the results. <br/> - Filter parameter should be a valid RSQL string however it can't have OR logical Operator. <br/> - Filter parameter can not have more than 2 parameters in it's filters. There is no limit on filters though, so user can add any number of filters using maximum of two parameters.| Optional | `conversation.startDate <= {currentTimestamp - 7 days}`.

:::note
When no filter is provided, it falls back to the default criteria of `startTime` and `endTime`. 
:::

### Response

```javascript
{
  "conversations": [
    {
      "id": "4866329603473408"
      "type": "meeting",
      "name": "John / Mary Brainstorming",
      "startTime": "2021-02-27T15:53:05.594Z",
      "endTime": "2021-02-27T16:18:05.048Z",
      "members": [
        {
          "name": "John",
          "email": "john@example.com"
        },
        {
          "name": "Mary",
          "email": "mary@example.com"
        }
      ],
      "metadata": {
        "key": "value", 
        "agentId": "johndoe"
      }
    },
    {
      "id": "4931769134481408",
      "type": "meeting",
      "name": "John / Mary Catch up",
      "startTime": "2021-02-24T15:53:05.594Z",
      "endTime": "2021-02-24T16:18:05.048Z",
      "members": [],
      "metadata": {
        "agentId": "johndoe"
      }
    },
    {
      "id": "6866329803473407"
      "type": "meeting",
      "name": "John / Acme Corp Meeting",
      "startTime": "2021-02-27T15:53:05.594Z",
      "endTime": "2021-02-27T16:18:05.048Z",
      "members": [],
      "metadata": {
        "customerId": "889988999", 
        "agentId": "johndoe"
      }
    },
    ...
  ]
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | The unique conversation identifier.
```type``` | The conversation type. Default value is `meeting`.
```name``` | The name of the conversation.
```startTime``` | DateTime value of when the conversation started.
```endTime``` | DateTime value of when the conversation ended. 
```members``` | A list of member objects containing ID, name and email (if detected).
```metadata``` | Contains user-defined metadata key values which are used for labelling conversations.


