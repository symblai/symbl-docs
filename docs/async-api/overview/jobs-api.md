---
id: jobs-api
title: What is the Job API?
sidebar_label: Get Job Status
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---
The Job Status API is used to retrieve the status of an ongoing Async API request. You can use the Job ID (`jobId`) received in the successful response of the Async API.


## <span class="get">GET</span> Job Status

Returns the status of the ongoing Async job request.


### HTTP REQUEST

`GET https://api.symbl.ai/v1/job/{jobId}`

### Example API Call

:::info
Before using the Jobs API you must get the authentication token (`AUTH_TOKEN`) from [our authentication process](/docs/developer-tools/authentication).
:::

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="cURL">

```shell
curl --location --request GET "https://api.symbl.ai/v1/job/$JOB_ID" \
--header 'Content-Type: application/json' \
--header "Authorization: Bearer $AUTH_TOKEN"
```

</TabItem>

<TabItem value="nodejs">

```js
const request = require('request');
const authToken = AUTH_TOKEN;
const jobId = JOB_ID;

request.get({
    url: `https://api.symbl.ai/v1/job/${jobId}`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true
}, (err, response, body) => {
  console.log(body);
});
```
</TabItem>
</Tabs>

### Response

```json
{
  "id": "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
  "status": "in_progress"
}
```


#### Response Fields

Field    | Description
-------- | ------- |
```id``` | The ID of the Job.
```status``` | Is one of type `scheduled`, `in_progress`, `completed`, `failed`.
