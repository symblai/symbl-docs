---
id: entities
title: GET Entities
sidebar_label: GET Entities
slug: /conversation-api/entities/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::info
This is a Beta API - Undergoing further development.
If you have any suggestions, idea or questions about this API please reach us at devrelations@symbl.ai.
:::

This API provides you with a functionality to extract entities (custom, location, person, date, number, organization, datetime, daterange etc.) from the conversation.

### Detecting Entities

In order to detect entities in conversation we have introduced new parameter for the [Async API](/docs/async-api/introduction) named `detectEntities` which is set to `false` by default.

For the [Async Audio File](/docs/async-api/overview/audio/post-audio) and the [Async Video File](/docs/async-api/overview/video/post-video) endpoints, `detectEntities` is a query parameter, e.g. `https://api.symbl.ai/v1/process/audio?detectEntities=true`. For the other APIs it's passed in the JSON Request Body.

### Authentication

Before using the Conversation API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`GET https://api.symbl.ai/v1/conversations/{conversationId}/entities`

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
curl "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/entities" \
    -H "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const conversationId = CONVERSATION_ID;

request.get({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/entities`,
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

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/entities"
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
    print("entities => " + str(response.json()['entities']))  # List of entity object containing type, value, text, messageRefs, customType (if a custom entity)
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()

```

</TabItem>
</Tabs>

### Response

<Tabs
  defaultValue="Custom Entity"
  values={[
    { label: 'Custom Entity', value: 'Custom Entity', },
    { label: 'Person Entity', value: 'Person Entity', },
    { label: 'Organization Entity', value: 'Organization Entity', },
    { label: 'Date Entity', value: 'Date Entity', },
    { label: 'Number Entity', value: 'Number Entity', }
  ]
}>

<TabItem value="Custom Entity">

```js
{
  "type": "custom",
  "customType": "Company Executives",
  "value": "marketing director",
  "text": "marketing director",
  "messageRefs": [
    {
      "id": "5118221462011904",
      "text": "The marketing director is out-of-town due to some work.",
      "offset": 4
    }
  ]
}
```

</TabItem>

<TabItem value="Person Entity">

```js
{
  "type": "person",
  "value": "jamie smith",
  "text": "jamie smith",
  "messageRefs": [
    {
      "id": "5979280332816384",
      "text": "The name is Jamie Smith.",
      "offset": 12
    }
  ]
}

```

</TabItem>

<TabItem value="Organization Entity">

```js
{
  "type": "organization",
  "value": "Vodafone",
  "text": "Vodafone",
  "messageRefs": [
    {
      "id": "6141473464516608",
      "text": "Hello, this is Peter from Vodafone, I help you today.",
      "offset": 26
    }
  ]
}
```

</TabItem>

<TabItem value="Date Entity">

```js
{
  "type": "date",
  "value": "2020-07-15",
  "text": "today",
  "messageRefs": [
    {
      "id": "6141473464516608",
      "text": "Hello, this is Peter from Vodafone, I help you today.",
      "offset": 47
    },
    {
      "id": "4603163403354112",
      "text": "Being a loyal customer at the three types of plan options that I can offer you today.",
      "offset": 79
    },
    {
      "id": "5936512994639872",
      "text": "Is there anything else I may assist you with today?",
      "offset": 45
    }
  ]
}
```

</TabItem>

<TabItem value="Number Entity">

```js
{
  "type": "number",
  "value": "two",
  "text": "two",
  "messageRefs": [
    {
      "id": "6137109238775808",
      "text": "What do you two think of that?",
      "offset": 12
    }
  ]
}
```

</TabItem>
</Tabs>


Note:

* In Async Text custom entities needs to be passed in API body.

* In Async Audio/Async Video API needs to be passed in Query Parameter.



### Response Object

| Field       | Description                                                                 |
|-------------|-----------------------------------------------------------------------------|
| `type`        | Defines the type of entity present.                                         |
| `value`       | The value of entity.                                                        |
| `text`        | The text string matched by the algorithm.                               |
| `messageRefs` | Contains message references like id, text and offset of entity in message.  |
| `customType`  | Optional. Show the custom entity type which was defined.                    |
