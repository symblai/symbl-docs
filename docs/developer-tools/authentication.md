---
id: authentication
title: Authentication
sidebar_label: Authentication
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---
Symbl uses the [OAuth2.0 Protocol](https://datatracker.ietf.org/doc/html/rfc6749) for Authentication. 
To begin, get your API Credentials from [Symbl Platform](https://platform.symbl.ai/). Using these credentials you can then generate the Access Token to invoke Symbl API calls. 

### Step 1: Get your API Credentials

The first step is to get your App ID and App Secret from the Symbl Platform. To do this, follow the steps given below:

1. Log into [Symbl Platform](https://platform.symbl.ai/).
2. From the homepage, copy your **App ID** and **App Secret**.

     ![Transcript](/img/app-secret-app-id-1.png)

Ensure that you keep this Credentials safe and handy as you need it to generate the Access Token. However, you can always log back in and get the credentials anytime. 

These credentials will be required every time you generate the Access Token. 

### Step 2: Generate the Access Token

Once you have your API Credentials, you can generate the Access Token and use it in the API Authorization. 

To generate the Access Token, make a POST request to the endpoint:
`https://api.symbl.ai/oauth2/token:generate`

You must send your App ID and Secret in the request body. See the sample requests below:

:::note
The Node.js code works with Node.js 7+ and browsers. You will need to install the [request library](https://www.npmjs.com/package/request) for the Node.js sample code.
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
curl -k -X POST "https://api.symbl.ai/oauth2/token:generate" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -d $'{
      "type" : "application",
      "appId": "'$APP_ID'",
      "appSecret": "'$APP_SECRET'"
    }'
```
</TabItem>

<TabItem value="nodejs">

`$ npm i request`

```js
const request = require('request');

const appId = APP_ID;
const appSecret = APP_SECRET;

const authOptions = {
  method: 'post',
  url: "https://api.symbl.ai/oauth2/token:generate",
  body: {
    type: "application",
    appId: appId,
    appSecret: appSecret
  },
  json: true
};

request(authOptions, (err, res, body) => {
  if (err) {
    console.error('error posting json: ', err);
    throw err
  }

  console.log(JSON.stringify(body, null, 2));
});
```

</TabItem>
<TabItem value="python">

```python
import requests
import json

url = "https://api.symbl.ai/oauth2/token:generate"

appId = "your_app_id"  # App Id found in your platform
appSecret = "your_app_secret"  # App Id found in your platform

payload = {
    "type": "application",
    "appId": appId,
    "appSecret": appSecret
}
headers = {
    'Content-Type': 'application/json'
}

responses = {
    400: 'Bad Request! Please refer docs for correct input fields.',
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    # Successful API execution
    print("accessToken => " + response.json()['accessToken'])  # accessToken of the user
    print("expiresIn => " + str(response.json()['expiresIn']))  # Expiry time in accessToken
elif response.status_code in responses.keys():
    print(responses[response.status_code], response.text)  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


Alternatively, you can also generate the Token from Postman using the cURL command given above. 

On successful completion, the success message appears as shown below:

```json
{
   "accessToken": "your_accessToken",
   "expiresIn": 86400
 }
```


`accessToken` - Token to be used for authorization in the Authorization header.
`expiresIn` - Duration in seconds after which the accessToken expires. 

For any invalid `appId` and `appSecret` combination, the HTTP `401 Unauthorized` response code will be returned.

You can now use this `accessToken` to authenticate yourself and invoke Symbl APIs. 

:::info
`expiresIn` is the duration in seconds after which the Access Token expires. The default expiration time is 86400 seconds. You can generate the Token again after the expiration. 
:::


#### Regenerating Access Token

To maximize security, we allow the Access Token to be used only for a default duration of 86400 secs. On the expiry, you can regenerate it using Step 2. 

Also note that once a token is generated with an initial expiry of 86400, we will hold that in cache until it is near expiration. If you make a request to generate a token and there is still one cached, we will return that token with the remaining expiry time. 
