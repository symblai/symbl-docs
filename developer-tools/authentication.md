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
    { label: 'Python', value: 'python' },
    { label: 'Java', value: 'java' },
    { label: 'Swift', value: 'swift' },
    { label: 'C#', value: 'csharp' },
    { label: 'PHP', value: 'php' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Go', value: 'go' },
    { label: 'C', value: 'c' },
    { label: 'Objective-C', value: 'objective-c' },
  ]
}>

<TabItem value="objective-c">

```objectivec

#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.symbl.ai/oauth2/token:generate"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];
NSDictionary *headers = @{
  @"Content-Type": @"application/json"
};

[request setAllHTTPHeaderFields:headers];
NSData *postData = [[NSData alloc] initWithData:[@"{\n  \"type\": \"application\",\n    \"appId\": \"App ID Goes Here\",\n  \"appSecret\": \"App Secret Goes Here\"\n}" dataUsingEncoding:NSUTF8StringEncoding]];
[request setHTTPBody:postData];

[request setHTTPMethod:@"POST"];

NSURLSession *session = [NSURLSession sharedSession];
NSURLSessionDataTask *dataTask = [session dataTaskWithRequest:request
completionHandler:^(NSData *data, NSURLResponse *response, NSError *error) {
  if (error) {
    NSLog(@"%@", error);
    dispatch_semaphore_signal(sema);
  } else {
    NSHTTPURLResponse *httpResponse = (NSHTTPURLResponse *) response;
    NSError *parseError = nil;
    NSDictionary *responseDictionary = [NSJSONSerialization JSONObjectWithData:data options:0 error:&parseError];
    NSLog(@"%@",responseDictionary);
    dispatch_semaphore_signal(sema);
  }
}];
[dataTask resume];
dispatch_semaphore_wait(sema, DISPATCH_TIME_FOREVER);

```    

</TabItem>

<TabItem value="c">

```c

CURL *curl;
CURLcode res;
curl = curl_easy_init();
if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_easy_setopt(curl, CURLOPT_URL, "https://api.symbl.ai/oauth2/token:generate");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "Content-Type: application/json");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  const char *data = "{\n   \"type\": \"application\",\n    \"appId\": \"App ID Goes Here\",\n  \"appSecret\": \"App Secret Goes Here\"\n}";
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
  res = curl_easy_perform(curl);
}
curl_easy_cleanup(curl);


```

</TabItem>

<TabItem value="go">

```go

package main

import (
  "fmt"
  "strings"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://api.symbl.ai/oauth2/token:generate"
  method := "POST"

  payload := strings.NewReader(`{
    "type": "application",
    "appId": "App ID Goes Here",
    "appSecret": "App Secret Goes Here"
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")

  res, err := client.Do(req)
  if err != nil {
    fmt.Println(err)
    return
  }
  defer res.Body.Close()

  body, err := ioutil.ReadAll(res.Body)
  if err != nil {
    fmt.Println(err)
    return
  }
  fmt.Println(string(body))
}

```
</TabItem>

<TabItem value="ruby">

```ruby

require "uri"
require "json"
require "net/http"

url = URI("https://api.symbl.ai/oauth2/token:generate")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request.body = JSON.dump({
  "type": "application",
  "appId": "App ID Goes Here",
  "appSecret": "App Secret Goes Here"
})

response = https.request(request)
puts response.read_body


```

</TabItem>

<TabItem value="php">

```php

<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://api.symbl.ai/oauth2/token:generate');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Content-Type' => 'application/json'
));
$request->setBody('{\n  "type": "application",\n    "appId": "App ID Goes Here",\n  "appSecret": "App Secret Goes Here"\n}');
try {
  $response = $request->send();
  if ($response->getStatus() == 200) {
    echo $response->getBody();
  }
  else {
    echo 'Unexpected HTTP status: ' . $response->getStatus() . ' ' .
    $response->getReasonPhrase();
  }
}
catch(HTTP_Request2_Exception $e) {
  echo 'Error: ' . $e->getMessage();
}

```

</TabItem>

<TabItem value="java">

```java

Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.post("https://api.symbl.ai/oauth2/token:generate")
  .header("Content-Type", "application/json")
  .body("{\n\t\"type\": \"application\",\n\t\"appId\": \"App ID Goes Here\",\n\t\"appSecret\": \"App Secret Goes Here\"\n}")
  .asString();


```

</TabItem>

<TabItem value="csharp">

```csharp

var client = new RestClient("https://api.symbl.ai/oauth2/token:generate");
client.Timeout = -1;
var request = new RestRequest(Method.POST);
request.AddHeader("Content-Type", "application/json");
var body = @"{" + "\n" +
@"  ""type"": ""application""," + "\n" +
@"  ""appId"": ""App ID Goes Here""," + "\n" +
@"  ""appSecret"": ""App Secret Goes Here""" + "\n" +
@"}";
request.AddParameter("application/json", body,  ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
Console.WriteLine(response.Content);

```

</TabItem>

<TabItem value="swift">

```swift

import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

var semaphore = DispatchSemaphore (value: 0)

let parameters = "{\n\t\"type\": \"application\",\n\t\"appId\": \"App ID Goes Here\",\n\t\"appSecret\": \"App Secret Goes Here\"\n}"
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "https://api.symbl.ai/oauth2/token:generate")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")

request.httpMethod = "POST"
request.httpBody = postData

let task = URLSession.shared.dataTask(with: request) { data, response, error in 
  guard let data = data else {
    print(String(describing: error))
    semaphore.signal()
    return
  }
  print(String(data: data, encoding: .utf8)!)
  semaphore.signal()
}

task.resume()
semaphore.wait()

    
```

</TabItem>

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
