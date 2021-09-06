---
id: jobs-api
title: What is the Job API?
sidebar_label: Get Job Status
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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
    { label: 'Javascript', value: 'javascript', },
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


<TabItem value="java">

```java

Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.get("https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE")
  .header("Content-Type", "application/json")
  .header("Authorization", "Bearer ACCESS_TOKEN")
  .asString();



```

</TabItem>


<TabItem value="javascript">

```js

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Bearer ACCESS_TOKEN");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

</TabItem>


<TabItem value="python">

```python

import requests
import json

url = "https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE"

payload={}
headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ACCESS_TOKEN'
}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)



```

</TabItem>


<TabItem value="swift">

```swift

import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

var semaphore = DispatchSemaphore (value: 0)

var request = URLRequest(url: URL(string: "https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE")!,timeoutInterval: Double.infinity)
request.addValue("application/json", forHTTPHeaderField: "Content-Type")
request.addValue("Bearer ACCESS_TOKEN", forHTTPHeaderField: "Authorization")

request.httpMethod = "GET"

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


<TabItem value="csharp">

```csharp

var client = new RestClient("https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE");
client.Timeout = -1;
var request = new RestRequest(Method.GET);
request.AddHeader("Content-Type", "application/json");
request.AddHeader("Authorization", "Bearer ACCESS_TOKEN");
IRestResponse response = client.Execute(request);
Console.WriteLine(response.Content);

```

</TabItem>


<TabItem value="php">

```php

<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE');
$request->setMethod(HTTP_Request2::METHOD_GET);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'Content-Type' => 'application/json',
  'Authorization' => 'Bearer ACCESS_TOKEN'
));
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


<TabItem value="ruby">

```ruby

require "uri"
require "json"
require "net/http"

url = URI("https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE")

https = Net::HTTP.new(url.host, url.port)
https.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Content-Type"] = "application/json"
request["Authorization"] = "Bearer ACCESS_TOKEN"

response = https.request(request)
puts response.read_body


```

</TabItem>


<TabItem value="go">


```go

package main

import (
  "fmt"
  "net/http"
  "io/ioutil"
)

func main() {

  url := "https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE"
  method := "GET"

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, nil)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("Content-Type", "application/json")
  req.Header.Add("Authorization", "Bearer ACCESS_TOKEN")

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



<TabItem value="c">

```c

CURL *curl;
CURLcode res;
curl = curl_easy_init();
if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "GET");
  curl_easy_setopt(curl, CURLOPT_URL, "https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "Content-Type: application/json");
  headers = curl_slist_append(headers, "Authorization: Bearer ACCESS_TOKEN");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  res = curl_easy_perform(curl);
}
curl_easy_cleanup(curl);


```

</TabItem>


<TabItem value="objective-c">


```objectivec

#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"https://api.symbl.ai/v1/job/JOB_ID_GOES_HERE"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];
NSDictionary *headers = @{
  @"Content-Type": @"application/json",
  @"Authorization": @"Bearer ACCESS_TOKEN"
};

[request setAllHTTPHeaderFields:headers];

[request setHTTPMethod:@"GET"];

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


#### Response Parameters

Parameter  | Description
---------- | ------- |
```id``` | The ID of the Job.
```status``` | Is one of type `scheduled`, `in_progress`, `completed`, `failed`.
