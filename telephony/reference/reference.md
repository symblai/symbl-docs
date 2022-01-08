---
id: api-reference
title: Telephony API Reference
slug: /telephony-api/api-reference
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


---

## Endpoint

### HTTP REQUEST

`POST https://api.symbl.ai/v1/endpoint:connect`

### Example API Call

<Tabs
  defaultValue="cURL"
  values={[
    { label: 'cURL', value: 'cURL', },
    { label: 'Javascript', value: 'javascript' },
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


<TabItem value="swift">

```swift

import Foundation
#if canImport(FoundationNetworking)
import FoundationNetworking
#endif

var semaphore = DispatchSemaphore (value: 0)

let parameters = "{\r\n\t\"operation\": \"start\",\r\n\t\"endpoint\": {\r\n\t  \"type\" : \"pstn\",\r\n\t  \"phoneNumber\": \"__phone_number_goes_here\"\r\n\t},\r\n\t\"actions\": [{\r\n\t  \"invokeOn\": \"stop\",\r\n\t  \"name\": \"sendSummaryEmail\",\r\n\t  \"parameters\": {\r\n\t    \"emails\": [\r\n\t      \"user@example.com\"  \r\n\t    ]\r\n\t  }\r\n\t}],\r\n\t\"data\" : {\r\n\t\t\"session\": {\r\n\t\t\t\"name\" : \"__name_of_this_call__\"\r\n\t\t}\r\n    }\r\n}"
let postData = parameters.data(using: .utf8)

var request = URLRequest(url: URL(string: "http://localhost:8000/v1/endpoint:connect")!,timeoutInterval: Double.infinity)
request.addValue("ACCESS_TOKEN", forHTTPHeaderField: "x-api-key")
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


<TabItem value="csharp">

```csharp

var client = new RestClient("http://localhost:8000/v1/endpoint:connect");
client.Timeout = -1;
var request = new RestRequest(Method.POST);
request.AddHeader("x-api-key", "ACCESS_TOKEN");
request.AddHeader("Content-Type", "application/json");
var body = @"{
" + "\n" +
@"  ""operation"": ""start"",
" + "\n" +
@"  ""endpoint"": {
" + "\n" +
@"    ""type"" : ""pstn"",
" + "\n" +
@"    ""phoneNumber"": ""__phone_number_goes_here""
" + "\n" +
@"  },
" + "\n" +
@"  ""actions"": [{
" + "\n" +
@"    ""invokeOn"": ""stop"",
" + "\n" +
@"    ""name"": ""sendSummaryEmail"",
" + "\n" +
@"    ""parameters"": {
" + "\n" +
@"      ""emails"": [
" + "\n" +
@"        ""user@example.com""  
" + "\n" +
@"      ]
" + "\n" +
@"    }
" + "\n" +
@"  }],
" + "\n" +
@"  ""data"" : {
" + "\n" +
@"    ""session"": {
" + "\n" +
@"      ""name"" : ""__name_of_this_call__""
" + "\n" +
@"    }
" + "\n" +
@"    }
" + "\n" +
@"}";
request.AddParameter("application/json", body,  ParameterType.RequestBody);
IRestResponse response = client.Execute(request);
Console.WriteLine(response.Content);

```

</TabItem>


<TabItem value="php">

```php

<?php
require_once 'HTTP/Request2.php';
$request = new HTTP_Request2();
$request->setUrl('http://localhost:8000/v1/endpoint:connect');
$request->setMethod(HTTP_Request2::METHOD_POST);
$request->setConfig(array(
  'follow_redirects' => TRUE
));
$request->setHeader(array(
  'x-api-key' => 'ACCESS_TOKEN',
  'Content-Type' => 'application/json'
));
$request->setBody('{
\n  "operation": "start",
\n  "endpoint": {
\n    "type" : "pstn",
\n    "phoneNumber": "__phone_number_goes_here"
\n  },
\n  "actions": [{
\n    "invokeOn": "stop",
\n    "name": "sendSummaryEmail",
\n    "parameters": {
\n      "emails": [
\n        "user@example.com"  
\n      ]
\n    }
\n  }],
\n  "data" : {
\n    "session": {
\n      "name" : "__name_of_this_call__"
\n    }
\n    }
\n}');
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

url = URI("http://localhost:8000/v1/endpoint:connect")

http = Net::HTTP.new(url.host, url.port);
request = Net::HTTP::Post.new(url)
request["x-api-key"] = "ACCESS_TOKEN"
request["Content-Type"] = "application/json"
request.body = JSON.dump({
  "operation": "start",
  "endpoint": {
    "type": "pstn",
    "phoneNumber": "__phone_number_goes_here"
  },
  "actions": [
    {
      "invokeOn": "stop",
      "name": "sendSummaryEmail",
      "parameters": {
        "emails": [
          "user@example.com"
        ]
      }
    }
  ],
  "data": {
    "session": {
      "name": "__name_of_this_call__"
    }
  }
})

response = http.request(request)
puts response.read_body


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

  url := "http://localhost:8000/v1/endpoint:connect"
  method := "POST"

  payload := strings.NewReader(`{`+"
"+`
  "operation": "start",`+"
"+`
  "endpoint": {`+"
"+`
    "type" : "pstn",`+"
"+`
    "phoneNumber": "__phone_number_goes_here"`+"
"+`
  },`+"
"+`
  "actions": [{`+"
"+`
    "invokeOn": "stop",`+"
"+`
    "name": "sendSummaryEmail",`+"
"+`
    "parameters": {`+"
"+`
      "emails": [`+"
"+`
        "user@example.com"  `+"
"+`
      ]`+"
"+`
    }`+"
"+`
  }],`+"
"+`
  "data" : {`+"
"+`
    "session": {`+"
"+`
      "name" : "__name_of_this_call__"`+"
"+`
    }`+"
"+`
    }`+"
"+`
}`)

  client := &http.Client {
  }
  req, err := http.NewRequest(method, url, payload)

  if err != nil {
    fmt.Println(err)
    return
  }
  req.Header.Add("x-api-key", "ACCESS_TOKEN")
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


<TabItem value="c">

```c

CURL *curl;
CURLcode res;
curl = curl_easy_init();
if(curl) {
  curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");
  curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:8000/v1/endpoint:connect");
  curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
  curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");
  struct curl_slist *headers = NULL;
  headers = curl_slist_append(headers, "x-api-key: ACCESS_TOKEN");
  headers = curl_slist_append(headers, "Content-Type: application/json");
  curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
  const char *data = "{\r\n \"operation\": \"start\",\r\n \"endpoint\": {\r\n   \"type\" : \"pstn\",\r\n    \"phoneNumber\": \"__phone_number_goes_here\"\r\n },\r\n  \"actions\": [{\r\n   \"invokeOn\": \"stop\",\r\n   \"name\": \"sendSummaryEmail\",\r\n   \"parameters\": {\r\n     \"emails\": [\r\n       \"user@example.com\"  \r\n      ]\r\n   }\r\n }],\r\n \"data\" : {\r\n    \"session\": {\r\n      \"name\" : \"__name_of_this_call__\"\r\n    }\r\n    }\r\n}";
  curl_easy_setopt(curl, CURLOPT_POSTFIELDS, data);
  res = curl_easy_perform(curl);
}
curl_easy_cleanup(curl);


```

</TabItem>


<TabItem value="objective-c">

```objectivec

#import <Foundation/Foundation.h>

dispatch_semaphore_t sema = dispatch_semaphore_create(0);

NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:[NSURL URLWithString:@"http://localhost:8000/v1/endpoint:connect"]
  cachePolicy:NSURLRequestUseProtocolCachePolicy
  timeoutInterval:10.0];
NSDictionary *headers = @{
  @"x-api-key": @"ACCESS_TOKEN",
  @"Content-Type": @"application/json"
};

[request setAllHTTPHeaderFields:headers];
NSData *postData = [[NSData alloc] initWithData:[@"{\r\n  \"operation\": \"start\",\r\n \"endpoint\": {\r\n   \"type\" : \"pstn\",\r\n    \"phoneNumber\": \"__phone_number_goes_here\"\r\n },\r\n  \"actions\": [{\r\n   \"invokeOn\": \"stop\",\r\n   \"name\": \"sendSummaryEmail\",\r\n   \"parameters\": {\r\n     \"emails\": [\r\n       \"user@example.com\"  \r\n      ]\r\n   }\r\n }],\r\n \"data\" : {\r\n    \"session\": {\r\n      \"name\" : \"__name_of_this_call__\"\r\n    }\r\n    }\r\n}" dataUsingEncoding:NSUTF8StringEncoding]];
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


<TabItem value="java">

```java

Unirest.setTimeouts(0, 0);
HttpResponse<String> response = Unirest.post("http://localhost:8000/v1/endpoint:connect")
  .header("x-api-key", "ACCESS_TOKEN")
  .header("Content-Type", "application/json")
  .body("{\r\n\t\"operation\": \"start\",\r\n\t\"endpoint\": {\r\n\t  \"type\" : \"pstn\",\r\n\t  \"phoneNumber\": \"__phone_number_goes_here\"\r\n\t},\r\n\t\"actions\": [{\r\n\t  \"invokeOn\": \"stop\",\r\n\t  \"name\": \"sendSummaryEmail\",\r\n\t  \"parameters\": {\r\n\t    \"emails\": [\r\n\t      \"user@example.com\"  \r\n\t    ]\r\n\t  }\r\n\t}],\r\n\t\"data\" : {\r\n\t\t\"session\": {\r\n\t\t\t\"name\" : \"__name_of_this_call__\"\r\n\t\t}\r\n    }\r\n}")
  .asString();


```

</TabItem>


<TabItem value="javascript">

```js

var myHeaders = new Headers();
myHeaders.append("x-api-key", "ACCESS_TOKEN");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "operation": "start",
  "endpoint": {
    "type": "pstn",
    "phoneNumber": "__phone_number_goes_here__"
  },
  "actions": [
    {
      "invokeOn": "stop",
      "name": "sendSummaryEmail",
      "parameters": {
        "emails": [
          "user@exampe.com"
        ]
      }
    }
  ],
  "data": {
    "session": {
      "name": "__name_of_this_call__"
    }
  }
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://localhost:8000/v1/endpoint:connect", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

```

</TabItem>

<TabItem value="cURL">

```shell
curl -k -X POST "https://api.symbl.ai/v1/endpoint:connect" \
     -H "accept: application/json" \
     -H "Content-Type: application/json" \
     -H "X-API-KEY: $AUTH_TOKEN" \
     -d $'{F
      "operation": "start",
      "endpoint": {
        "type" : "pstn",
        "phoneNumber": "'$PHONE_NUMBER'" # 
        "dtmf": ",,$DTMF_MEETING_ID\#,,$MEETING_PASSCODE\#"
      },
      "actions": [{
        "invokeOn": "stop",
        "name": "sendSummaryEmail",
        "parameters": {
          "emails": [
            "'$EMAIL_ADDRESS'"
          ]
        }
      }],
      "data" : {
        "session": {
           "name" : "My Meeting"
        }
      }
    }'
```
</TabItem>

<TabItem value="nodejs">

```js
const phoneNumber = PHONE_NUMBER;
const emailAddress = EMAIL_ADDRESS;
const authToken = AUTH_TOKEN;

const payload = {
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber,
    "dtmf": `,,${DTMF_MEETING_ID}#,,${MEETING_PASSCODE}#`
  },
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        emailAddress
      ]
    }
  }],
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}

let request = new XMLHttpRequest();
request.onload = function() {
    // handle the successful call here
}

request.open('POST', 'https://api.symbl.ai/v1/endpoint:connect', true);

request.setRequestHeader('X-API-KEY', `${authToken}`);
request.setRequestHeader('Content-Type', 'application/json');

request.send(JSON.stringify(payload));

```

</TabItem>
<TabItem value="python">

```py
import json
import requests

url = "https://api.symbl.ai/v1/endpoint:connect"

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

payload = {
    "operation": "start",  # enum([start, stop]) - Start or Stop connection
    "endpoint": {
        # Object containing Type of the session - either pstn or sip, phoneNumber which is the meeting number symbl should call with country code prepended and dtmf which is the conference passcode.
        "type": "pstn",
        "phoneNumber": phoneNumber,  # Phone number including country code
        "dtmf": ",," + DTMF_MEETING_ID + "#,," + MEETING_PASSCODE + "#"
    },
    "actions": [{
        # actions that should be performed while this connection is active. Currently only one action is supported - sendSummaryEmail
        "invokeOn": "stop",
        "name": "sendSummaryEmail",
        "parameters": {
            "emails": [
                emailAddress
            ]
        }
    }],
    "data": {  # Object containing a session object which has a field name corresponding to the name of the meeting
        "session": {
            "name": "My Meeting"
        }
    }
}

headers = {
    'X-API-KEY': access_token,
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

if response.status_code == 201:
    # Successful API execution
    print("conversationId => " + response.json()['conversationId'])  # ID to be used with Conversation API.
    print("connectionId => " + response.json()['connectionId'])
    # Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the connectionId is no longer valid
    print("resultWebSocketUrl => " + response.json()['resultWebSocketUrl'])
    # objSame as eventUrl but over WebSocket. The latency of events is lower with a dedicated WebSocket connection.ct
    print("eventUrl => " + response.json()['eventUrl'])
    # REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events
elif response.status_code in responses.keys():
    print(responses[response.status_code] + ", Debug Message => " + str(response.text))  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


## Request Parameters

Here is a breakdown of the request options for the Telephony API endpoint:

#### Main Request Body

Field  | Type | Description
---------- | ------- | -------
```operation``` | string | enum([start, stop]) - Start or Stop connection
```endpoint``` | object | Object containing Type of the session - either pstn or sip, phoneNumber which is the meeting number symbl should call with country code prepended and dtmf which is the conference passcode. [See endpoint section below](#endpoint-config).
```actions``` | array | actions that should be performed while this connection is active. Currently only one action is supported - sendSummaryEmail. [See actions section below](#actions).
```data``` | object | Object containing a session object which has a field name corresponding to the name of the meeting. [See data section below](#data).
```timezone``` | string | The timezone name which comes from the [IANA TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones). [See timezone section below](#timezone).

##### Code Example

```js
{
  "operation": "start",
  "endpoint": {}  // See endpoint config section below
  "actions": {}  // See actions section below
  "data": {}  // See data section below
  "timezone": {}  // See timezone section below.
}
```


#### Endpoint Config

Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
`type` | Yes | enum(["sip", "pstn"]) | Defines the type of connection. Only [SIP](/docs/concepts/pstn-and-sip#sip-session-initiation-protocol) and [PSTN](/docs/concepts/pstn-and-sip#pstn-public-switched-telephone-networks) supported.
`phoneNumber` | Yes | String | Phone number to be used to dial in to in E.164 format i.e. special characters like () or - and leading + or international access codes like 001 or 00 must be omitted. For e.g. - US number should look like 14082924837, whereas UK number should look like 447082924837.
`dtmf` | No | String | DTMF sequence to be sent after call is received (ex: `939293#`)

##### Code Example

```js
{
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber,
    "dtmf": dtmfSequence
  }
}
```

#### Actions

Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
`invokeOn` | Yes | enum(["start", "stop"]) | Event type on which the action should be performed.
`name` | Yes | String |  Name of the action that needs to be invoked. Only `sendSummaryEmail` is currently supported.
`parameters` | Yes | Object  | Object with required input parameter data for invocation of the specified action.
`parameters.emails` | Yes | String[] | An array of emails.


##### Code Example

```js
{
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        "user@example.com"
      ]
    }
  }]
}
```

#### Data

Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
`session` | No | String | Contains information about the meeting.
`session.name` | No | String | The name of the meeting.

##### Code Example

```js
{
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}
```

#### Timezone


Field  | Required | Supported Value | Description
---------- | ------- |  ------- |  -------
`timezone` | No | String | The timezone name which comes from the [IANA TZ database](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

##### Code Example

```js
{
  "timezone": "Asia/Tokyo"
}
```

### Full Request Code Example

```js
{
  endpoint: {
    type: "pstn",
    phoneNumber: "",
    dtmf: ""
  },
  actions: [
    {
      invokeOn: "stop",
      name: "sendSummaryEmail",
      parameters: {
        emails: [
          "user@example.com"
        ],
      },
    },
  ],
  data: {
    session: {
      name: meetingName,
    },
  },
}
```


#### Telephony API Endpoint Object

## Response Parameters

Field | Description
---------- | ------- |
```eventUrl``` | REST API to push speaker events as the conversation is in progress, to add additional speaker context in the conversation. Example - In an on-going meeting, you can push speaker events
```resultWebSocketUrl``` | Same as eventUrl but over WebSocket. The latency of events is lower with a dedicated WebSocket connection.ct
```connectionId``` | Ephemeral connection identifier of the request, to uniquely identify the telephony connection. Once the connection is stopped using “stop” operation, or is closed due to some other reason, the connectionId is no longer valid
```conversationId``` | Represents the conversation - this is the ID that needs to be used in conversation api to access the conversation

#### Code Example

```js
{
  "eventUrl": "https://api.symbl.ai/v1/event/771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "resultWebSocketUrl": "wss://api.symbl.ai/events/771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "connectionId": "771a8757-eff8-4b6c-97cd-64132a7bfc6e",
  "conversationId": "51356232423"
}
```

## Specifying Timezones
Specifying a timezone when initiating a session will result in the Summary UI displaying the meeting start time for that given region.

<aside class="notice">
The timezone must be specified using the values specified in the IANA TZ database. For a list of timezones, refer <a href="https://en.wikipedia.org/wiki/List_of_tz_database_time_zones" target="_blank"> here </a>.</aside>

### Code Example
Below is an example of a request payload which sets the timezone to the Pacific Timezone by passing the TZ database
name to the timezone parameter while initiating a session:

```js
{
  "operation": "start",
  "endpoint": {
    "type" : "pstn",
    "phoneNumber": phoneNumber, // Should be the Zoom phone number this time.
    "dtmf": `,,${DTMF_MEETING_ID}#,,${MEETING_PASSCODE}#`
  },
  "timezone": "US/Pacific",
  "actions": [{
    "invokeOn": "stop",
    "name": "sendSummaryEmail",
    "parameters": {
      "emails": [
        emailAddress
      ]
    }
  }],
  "data" : {
    "session": {
      "name" : "My Meeting"
    }
  }
}
```

:::info
If no timezone is specified it will fall back to UTC time zone.
:::

