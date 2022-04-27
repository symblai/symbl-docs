---
id: transcript
title: POST Formatted Transcript
sidebar_label: POST Formatted Transcript
slug: /conversation-api/transcript/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

This API returns a formatted transcript in [Markdown](#create-transcript-in-markdown) and [SRT](#create-transcript-in-srt) format. 

## Create Transcript in Markdown

You can use this markdown payload "as is" in any of your markdown compatible UI components or simply store it in your database. The API can break down the transcript into paragraphs, highlight key phrases and attach speaker identities in the transcript.


#### For example:

> Raw Markdown payload

```md
Speaker 1: Good morning Mr. Lewis. <br/><br/>Speaker 1: It's good to see you
again.<br/><br/>Speaker 2: Thanks a lot.<br/><br/>Speaker 1: Start Let us
<mark>talk about the pricing of your accounting software</mark>.<br/><br/>
Speaker 1: How much does it cost to the customer?<br/><br/>Speaker 2: The
software is sold as a yearly subscription the full cost to the customer is
 two thousand five hundred dollars per.<br/><br/>Speaker 1: Okay.<br/><br/>
```

> Markdown format looks like

<hr />
Speaker 1: Good morning Mr. Lewis. <br/><br/>Speaker 1: It's good to see you again.<br/><br/>Speaker 2: Thanks a lot.<br/><br/>Speaker 1: Start Let us <mark>talk about the pricing of your accounting software</mark>.<br/><br/>Speaker 1: How much does it cost to the customer?<br/><br/>Speaker 2: The software is sold as a yearly subscription the full cost to the customer is two thousand five hundred dollars per.<br/><br/>Speaker 1: Okay.<br/>
<hr />

### Authentication

Before using this API, you must generate your authentication token (`AUTH_TOKEN`). To learn how to get the authentication token, see the [Authentication](/docs/developer-tools/authentication) page.

### HTTP Request

`POST https://api.symbl.ai/v1/conversations/{conversationId}/transcript`

### Request Header

 Name  | REQUIRED | Description
----------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Yes | 	Accepted value application/json
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

### Request Body Sample

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

curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/transcript" \
--header "Authorization: Bearer $AUTH_TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{
    "contentType": "text/markdown",
    "createParagraphs": true,
    "phrases": {
        "highlightOnlyInsightKeyPhrases": true,
        "highlightAllKeyPhrases": true
    },
    "showSpeakerSeparation": false
}'

```
</TabItem>

<TabItem value="nodejs">


```js
const request = require('request');
const authToken = AUTH_TOKEN;
const convesrationId = CONVERSATION_ID;

request.post({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/transcript`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true,
    body: {
      "contentType": "text/markdown",
      "createParagraphs": true,
      "phrases": {
          "highlightOnlyInsightKeyPhrases": true,
          "highlightAllKeyPhrases": true
      },
      "showSpeakerSeparation": false
    },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import json
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/transcript"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'contentType': 'text/markdown',  # <Required | contentType of response>
    'createParagraphs': True,
    # <Optional, boolean| This boolean parameter specifies whether or not the transcription for the Conversation should be broken down into logical paragraphs.>
    'phrases': {"highlightOnlyInsightKeyPhrases": True, "highlightAllKeyPhrases": True},
    # <Optional, object| This is a json field which accepts two values highlightOnlyInsightKeyPhrases and highlightAllKeyPhrases. Both variables accepts boolean format.>
    'showSpeakerSeparation': True,
    # <Optional, boolean| When set to true, response will generate the transcript with each sentence separated by Speaker who spoke that sentence.>
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    # Successful API execution
    print("transcript => " + str(response.json()['transcript']))  # Containing markdown payload and contentType
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Request Body Parameters

 Name  | Required | Description
----------- | ------- |  ------- |
```contentType``` |   Mandatory | Content Type of response. Set this as ``` text/markdown ``` .
```createParagraphs``` | Optional | This boolean parameter specifies whether or not the transcription for the Conversation should be broken down into logical paragraphs.
```phrases``` |  Optional | This is a JSON field which accepts two values `highlightOnlyInsightKeyPhrases` and `highlightAllKeyPhrases`. Both variables accepts boolean format.
```showSpeakerSeparation``` |  Optional | When set to `true`, response will generate the transcript with each sentence separated by Speaker who spoke that sentence. If set to `false` it will not have any impact on the generated transcript.


#### createParagraphs member
If the value is `true` the paragraphs will be generated on the basis of existing
Messages and references to these messages (through `messageIds`).

If the value is `false` then the content will be returned as is without any line breaks.

#### phrases member
This object specifies highlighting related to phrases detected for different entities by the backend. It mainly contains two properties:

1. `highlightOnlyInsightKeyPhrases` - Will generate highlighting syntax according to the contentType only for the key phrases detected for Insights if passed as `true`

2. `highlightAllKeyPhrases` - Will generate highlighting syntax according to the contentType only for the key phrases detected for all the entities (both Insights and Messages) if passed as `true`. For messages key phrases to be detected and highlighting please pass `detectPhrases` to `true` in [Async APIs](/docs/async-api/overview/audio/post-audio).

:::info
The highlighted text is present in the response structure with `<mark>` tags.  
:::

#### showSpeakerSeparation member

`showSpeakerSeparation` only works when speaker information must be passed while
sending the conversation information.

In [Async API](/docs/async-api/overview/introduction) - Diarization must be turned on.

In [Telephony API](/docs/telephony/introduction), [Streaming API](/docs/streamingapi/overview/introduction) and [Javascript SDK](/docs/javascript-sdk/overview/introduction) - Speaker events must be pushed.

### Sample Response

> When `showSpeakerSeparation` is `false`


```js
{
    "transcript": {
        "payload": "Good morning.<br/><br/>Mr. Lewis.<br/><br/>It's good to see
        you again.<br/><br/>Please take a seat.<br/><br/>Hello again.<br/><br/>
        Mrs. Jones.<br/><br/>Thanks a lot.<br/><br/>So tell me.<br/><br/>How was
        your first evening in New York?<br/><br/>I started with the walk in
        Central Park and then I had a fantastic meal in a Mexican restaurant
        that I had read about my guidebook.<br/><br/>I wanted to go for another
        walk after the meal, but I was exhausted, so I had an early night.<br/>
        <br/>Oh, and of course, you're probably suffering from jet lag.<br/>
        <br/>Are you feeling better this morning?<br/><br/>Yes, I slept like a
        log, so I feel much better today.<br/><br/>Well, that's good because we
        have quite a few things we need to discuss, so we get down to business.
        <br/><br/>Absolutely.<br/><br/>Well, would you like to start?<br/><br/>
        Let us <mark>talk about the pricing of your accounting software</mark>.
        <br/><br/>How much does it cost to the customer?<br/><br/>The software
        is sold as a yearly subscription the full cost to the customer is two
        thousand five hundred dollars per year.Goodbye.",
        "contentType": "text/markdown"
    }
}
```

> `showSpeakerSeparation` is `true`

```js
{
    "transcript": {
        "payload": "Speaker 1: Good morning.<br/><br/>Speaker 1: Mr. Lewis.<br/>
        <br/>Speaker 1: It's good to see you again.<br/><br/>Speaker 1: Please
        take a seat.<br/><br/>Speaker 2: Hello again.<br/><br/>Speaker 2: Mrs.
        Jones.<br/><br/>Speaker 2: Thanks a lot.<br/><br/>Speaker 1: So tell me.
        <br/><br/>Speaker 1: How was your first evening in New York?<br/><br/>
        Speaker 1: I started with the.<br/><br/>Speaker 2: Walk in Central Park
        and then I had a fantastic meal in a Mexican restaurant that I had read
        about my guidebook.<br/><br/>Speaker 2: I wanted to go for another walk
        after the meal, but I was exhausted, so I had an early.<br/><br/>Speaker
        1: Night.<br/><br/>Speaker 1: oh and of course you're probably suffering
        from jet lag are you feeling better this morning?<br/><br/>Speaker 2:
        Yes I slept like a log, so I feel much better.<br/><br/>Speaker 1: Today
        well that's good because we have quite a few things we need to discuss,
        so we get down to business.<br/><br/>Speaker 2: Absolutely well would
        you like to?<br/><br/>Speaker 1: Start Let us <mark>talk about the
        pricing of your accounting software</mark>.<br/><br/>Speaker 1: How
        much does it cost to the customer?<br/><br/>Speaker 2: The software is
        sold as a yearly subscription the full cost to the customer is two
        thousand five hundred dollars per.<br/><br/>Speaker 1: Year.<br/><br/>",
        "contentType": "text/markdown"
    }
}
```

### Response Object

 Name  | Description
----------- |  ------- |
```transcript``` | This json field contain two fields payload and contentType.

#### Transcript object

Name  | Description
----------- |  ------- |
```payload``` | The transcription content formatted according to the `contentType` and other request attributes passed in the request.
```contentType``` |  The content type passed in the request body of the transcription.

## Create Transcript in SRT

This API endpoint allows you to create a Transcript in SRT format. Ensure that you send `contentType` as `text/srt` in the request body. 

### HTTP Request

`POST https://api.symbl.ai/v1/conversations/{conversationId}/transcript`

### Request Header

 Name  | REQUIRED | Description
----------- | ------- |  ------- |
```Authorization``` | Yes | `Bearer <token>` The token you get from our [authentication process](/docs/developer-tools/authentication).
```Content-Type``` | Yes | 	Accepted value application/json
```x-api-key``` | No | DEPRECATED. The JWT token you get from our [authentication process](/docs/developer-tools/authentication).

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

curl --location --request POST "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/transcript" \
--header "Authorization: Bearer $AUTH_TOKEN" \
--header 'Content-Type: application/json' \
--data-raw '{
    "contentType": "text/srt",
    "showSpeakerSeparation": false
}'

```
</TabItem>

<TabItem value="nodejs">


```js
const request = require('request');
const authToken = AUTH_TOKEN;
const convesrationId = CONVERSATION_ID;

request.post({
    url: `https://api.symbl.ai/v1/conversations/${conversationId}/transcript`,
    headers: { 'Authorization': `Bearer ${authToken}` },
    json: true,
    body: {
      "contentType": "text/srt",
      "showSpeakerSeparation": false
    },
    json: true
}, (err, response, body) => {
    console.log(body);
});
```

</TabItem>
<TabItem value="python">

```py
import json
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/transcript"
conversationId = 'your_conversation_id'  # Generated using Submit text end point

url = baseUrl.format(conversationId=conversationId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'contentType': 'text/srt',  # <Required | contentType of response>
    'showSpeakerSeparation': False,
    # <Optional, boolean| When set to true, response will generate the transcript with each sentence separated by Speaker who spoke that sentence.>
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("POST", url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    # Successful API execution
    print("transcript => " + str(response.json()['transcript']))  # Containing markdown payload and contentType
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>

### Request Body

 Name  | REQUIRED | Description
----------- | ------- |  ------- |
```contentType``` |   Yes | Content Type of response. Set this to `text/srt`. 
```showSpeakerSeparation``` |  No | When set to `true`, response will generate the transcript with each sentence separated by Speaker who spoke that sentence. If set to `false` it will not have any impact on the generated transcript. No other properties are available for SRT format currently. 


### Response

```js
{
  "transcript": {
      "payload": {
      "content": "1\n00:00:00,000 --> 0:0:4,100\nOkay, so you're talking about that file, which I am sending you.\n\n2\n0:0:6,800 --> 0:0:20,600\nAh, there is way, I don't think there is way too now, cancel that file cancels that upload The venue is, so I will submit documents tomorrow.\n\n3\n0:0:20,600 --> 0:0:23,200\nSo this meeting is being recorded.\n\n4\n0:0:24,300 --> 0:0:28,500\nWe will create small file of like MP4 for testing purpose.\n\n5\n0:0:30,400 --> 0:0:32,200\nI will submit documents tomorrow.\n\n6\n0:0:33,600 --> 0:0:38,500\nOn Keith Health scheduled meeting to discuss on topic model tomorrow.\n\n7\n0:0:41,600 --> 0:0:42,800\nI am interested.\n\n8\n0:0:44,800 --> 0:0:46,600\nIs this really question?\n\n9\n0:0:50,100 --> 0:0:54,500\nPriyanka has scheduled interview in next week.\n\n10\n0:0:57,800 --> 0:0:58,300\nBye.",
      "contentType": "text/srt"
    }
  }
}
```
Use the response body to create a `.srt` file. The `\n` will create a new line in the file.
