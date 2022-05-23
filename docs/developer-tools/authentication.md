---
id: authentication
title: Authentication
sidebar_label: Authentication
slug: /developer-tools/authentication/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---
Symbl uses [OAuth2.0 Protocol](https://datatracker.ietf.org/doc/html/rfc6749) for Authentication. 
To receive API Credentials you need to create an account at [Symbl Platform](https://platform.symbl.ai/). Then you can use your Symbl credentials to generate the Access Token needed to make Symbl API calls. 

### Step 1: Get your API Credentials

To get your App ID and App Secret from the Symbl Platform:

1. Log into [Symbl Platform](https://platform.symbl.ai/).

1. From the home page, copy your **App ID** and **App Secret**.

     ![API Credentials](/img/app-secret-app-id-1.png)

Keep your Credentials safe and private. You need these credentials to generate a Symbl API Access Token. You can retrieve your credentials from the home page at any time. 

These credentials are required every time you generate the Access Token. 

### Step 2: Generate the Access Token

Once you have API Credentials, you can generate the Access Token and use it for API Authorization. 

To generate the Access Token, make a POST request to the endpoint:
`https://api.symbl.ai/oauth2/token:generate`

You must send your App ID and Secret in the request body as shown in the following examples:

:::note
The Node.js code works with Node.js 7+ and browsers. You need to install the [request library](https://www.npmjs.com/package/request) for the Node.js sample code.
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

appId = "your_app_id"  # Your App Id from the platform home page
appSecret = "your_app_secret"  # Your App Secret from the platform home page

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
    print("expiresIn => " + str(response.json()['expiresIn']))  # Expiration time in accessToken
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

Any invalid `appId` or `appSecret` combination returns the HTTP **401 Unauthorized** response.

You can now use this `accessToken` to authenticate yourself and use Symbl APIs. 

:::info
`expiresIn` is the duration in seconds after which the Access Token expires. The default expiration time is 86400 seconds. You can generate the Token again after the expiration. 
:::


#### Regenerating Access Token

To maximize security, Symbl Access Tokens expire in a default duration of 86400 secs. After expiration, you can regenerate it using Step 2. 

Note that once a token is generated with an initial expiration time of 86400, the system holds that in cache until it is near expiration. If you make a request to generate a token and there is still one cached, the system returns the token with the remaining expiration time. 
