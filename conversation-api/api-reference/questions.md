---
id: questions
title: GET Questions
sidebar_label: GET Questions
slug: /conversation-api/questions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This API help you find explicit question or request for information that comes up during the conversation, whether answered or not, is recognized as a question.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/questions`

### Example API Call

:::info
Before using the Conversation API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/questions" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```
</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/questions`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/questions"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
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
    print("questions => " + str(response.json()['questions']))  # questions object containing question id, text, type, score, messageIds,entities
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Response

```json
{
	"questions": [{
			"id": "5179649407582208",
			"text": "Push them for the two weeks delivery, right?",
			"type": "question",
			"score": 0.9730208796076476,
			"messageIds": [
				"5019269922291712"
			]
		},
		{
			"id": "5642466493464576",
			"text": "I think what is the Bahamas?",
			"type": "question",
			"score": 0.9119608386876195,
			"messageIds": [
				"5019269922291712"
			]
		},
		{
			"id": "5756718797553664",
			"text": "Okay need be detained, or we can go there in person and support them?",
			"type": "question",
			"score": 0.893303149769215,
			"messageIds": [
				"5019269922291712"
			]
		},
		{
			"id": "6235991715086336",
			"text": "Why is that holiday in US from 17?",
			"type": "question",
			"score": 0.9998053310511206,
			"messageIds": [
				"5019269922291712"
			]
		}
	]
}
```

### Response Object

Field  | Description
---------- | ------- |
```id``` | Unique conversation identifier.
```text``` | Conversation text.
```type``` | Response type. Default is `question`.
```score``` | Confidence score of the generated question. Value from 0 - 1. A score of 1 is likely an exact match, while a score of 0 means that no match was found. 
```messageIds``` | Unique message identifiers of the corresponding messages.
```from``` | object contains userId, name and identifier of speaker 

