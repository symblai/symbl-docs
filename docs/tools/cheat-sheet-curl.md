---
id:  cheat-sheet-for-curl-commands
title: Cheat Sheet for `cURL` Commands
sidebar_label: cheat sheet
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The following cheat sheet of `cURL` commands for Symbl.ai's APIs provides pre-formatted code for you to run in your terminal. The cheat sheet provides commands for:


* [Authentication](#authentication)
* [Telephony API](#telephony-api)
	* [Connect a PSTN Call](#connect-a-pstn-call)
	* [Connect a Connect a SIP Call](#Connect-a-SIP-Call)
	* [Stop a Call](#Stop-a-Call)


### Authentication

POST request with which the Authentication API takes the `appId` with the `appSecret` to return a JSON Web Token.

Here is the API endpoint:
`https://api.symbl.ai/oauth2/token:generate`

```bash
curl --location --request POST 'https://api.symbl.ai/oauth2/token:generate' \
--header 'Content-Type: application/json' \
--data-raw '{
	"type": "application",
	"appId": "",
	"appSecret": ""
}'
```
The output is the following:

```bash
{"accessToken":"","expiresIn":86400}
```

## Telephony API

The Telephony API has three API endpoints.

### Connect a PSTN Call

POST request with which to initiate a PSTN call.

Here is the API endpoint:
`https://api.symbl.ai/v1/endpoint:connect`

 

```bash
curl --location --request POST 'https://api.symbl.ai/v1/endpoint:connect' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
	"operation": "start",
	"endpoint": {
	  "type" : "pstn",
	  "phoneNumber": "+12532158782",
	  "dtmf": "6671425093"
	},
	"actions": [{
	  "invokeOn": "stop",
	  "name": "sendSummaryEmail",
	  "parameters": {
	    "emails": [
	      "__email_address__"  
	    ]
	  }
	}],
	"data" : {
		"session": {
			"name" : "__name_of_this_call__"
		}
    }
}'

```

### Connect a SIP Call

POST request with which to initiate a SIP call.

Here is the API endpoint:
`https://api.symbl.ai/v1/endpoint:connect`



```bash
curl --location --request POST 'https://api.symbl.ai/v1/endpoint:connect' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
	"operation": "start",
	"endpoint": {
	  "type" : "sip",

	  // Replace with a valid SIP URI, accessible over internet. See more - https://tools.ietf.org/html/rfc5630
	  // SIP with RTP and SIPS with SRTP for secure VoIP traffic are supported
	  // URI paramters can be passed in
	  // include country code, example - "sip:john.99332@example.com"
	  "uri": "__sip_uri__"
	},
	"actions": [{
	  "invokeOn": "stop",
	  "name": "sendSummaryEmail",
	  "parameters": {
	    "emails": [
			// list of valid email addresses.
			// If added, an email will be sent at the end of the call
	      "__email_address__"  
	    ]
	  }
	}],
	"data" : {
		"session": {
			// Give name to your meeting/call
			"name" : "__name_of_this_session__"
			// Optionally, send participants in the meeting/call, Uncomment following '\''users'\'' array.
			// "users": [{
			// 	"user": {
			// 		"name": "John",
			// 		"userId": "john@example.com",
			// 		"role": "organizer"
			// 	}
			// },
			// {
			// 	"user": {
			// 		"name": "Mary",
			// 		"userId": "mary@example.com"
			// 	}
			// }]
		}
    }
}'
```

### Stop a Call

POST request with which to stop a call no matter what type.

Here is the API endpoint:
`https://api.symbl.ai/v1/endpoint:connect`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/endpoint:connect' \
--header 'Content-Type: application/json' \
--header 'x-api-key: $AUTH_TOKEN' \
--data-raw '{
	"operation": "stop",
	"connectionId": ""
}'
```

## Async API

### Process Text

POST request with which to process Text.

Here is the API endpoint:
`https://api.symbl.ai/v1/process/text`


```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/text' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "messages": [
    {
      "payload": {
        "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you'\''re providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family?  That'\''s it.  Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
        "contentType": "text/plain"
      },
      "from": {
        "name": "John",
        "userId": "john@example.com"
      }
    }
  ]
}'

```

POST request with which to create a conversation from email.

```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/text' \
--header 'x-api-key: $AUTH_TOKEN' \
--data-raw '{
  "messages": [
    {
      "payload": {
        "content": "Hi Mike, Natalia here. Hope you don’t mind me reaching out. Who would be the best possible person to discuss internships and student recruitment at ABC Corp? Would you mind pointing me toward the right person and the best way to reach them? Thanks in advance for your help, I really appreciate it!"
      },
      "from": {
        "userId": "natalia@example.com",
        "name": "Natalia"
      }
    },
    {
      "payload": {
        "content": "Hey Natalia, thanks for reaching out. I am connecting you with Steve who handles recruitements for us."
      },
      "from": {
        "userId": "mike@abccorp.com",
        "name": "Mike"
      }
    },
    {
      "payload": {
        "content": "Thanks Mike! Great to connect with you Steve. I would really like to learn more about your recruitment needs. A quick call would be helpful. What time works best for you?"
      },
      "from": {
        "userId": "natalia@example.com",
        "name": "Natalia"
      }
    },
    {
      "payload": {
        "content": "Hi Natalia, great to connect with you as well. I am pretty open tomorrow after 2 pm."
      },
      "from": {
        "userId": "steve@abccorp.com",
        "name": "Steve"
      }
    },
    {
      "payload": {
        "content": "That'\''s perfect. I will block some time at 2pm tomorrow to discuss further. Looking forward to talk to you. Looking forward to talk to you."
      },
      "from": {
        "userId": "natalia@example.com",
        "name": "Natalia"
      }
    }
  ]
}'
```

PUT request with which to append messages to an existing conversation.

```bash
curl --location --request PUT 'https://api.symbl.ai/v1/process/text/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "messages": [
    {
      "payload": {
        "content": "Hi Steve, it was great chatting with you! I was really impressed with your recruitment philosophy. I will set up meetings with two students for the internship positions that match your screening criteria over next week. Hope you have a great weekend."
      },
      "from": {
        "userId": "natalia@example.com",
        "name": "Natalia"
      }
    },
    {
      "payload": {
        "content": "Thanks Natalia. It was great talking with you as well. Looking forward."
      },
      "from": {
        "userId": "steve@abccorp.com",
        "name": "Steve"
      }
    }
  ]
}'

```
### Audio Processing with a File

POST request with which to submit a new file for transcription. The file must conform to a codec for audio.

Here is the API endpoint:
`https://api.symbl.ai/v1/process/audio`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/audio' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: audio/wav' \
--data-binary '@'
```

PUT request with which to append to an existing file whose codec conforms to audio.

`https://api.symbl.ai/v1/process/audio/{{conversation_id}}`

```bash
curl --location --request PUT 'https://api.symbl.ai/v1/process/audio/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: audio/mpeg' \
--data-binary '@'
```

### Audio Processing with a URL

POST request with which to submit a new file for a new `conversationId`.

Here is the API endpoint:
`https://api.symbl.ai/v1/process/audio/url`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/audio/url' \
--header 'x-api-key:' \
--header 'Content-Type: application/json' \
--data-raw '{
  "url": "",
  "confidenceThreshold": 0.6,
  "timezoneOffset": 0
}'
```
PUT request with which to append to an existing file whose codec conforms to audio.

```bash
curl --location --request PUT 'https://api.symbl.ai/v1/process/audio/url/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "url": "",
  "confidenceThreshold": 0.6,
  "timezoneOffset": 0
}'
```
### Video Processing with a File

POST request with which to submit a new file whose codec conforms to video.

Here is the API endpoint:
`https://api.symbl.ai/v1/process/video`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/video' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: video/mp4' \
--data-binary '@'
```
PUT request with which to append to a file whose codec conforms to video.

```bash
curl --location --request PUT 'https://api.symbl.ai/v1/process/video/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: video/mp4' \
--data-binary '@'
```

### Video Processing with URL

POST request with which to post a file whose codec conforms to a video through a url.

Here is the API endpoint:
`https://api.symbl.ai/v1/process/video/url`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/process/video/url' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "url": "",
  "confidenceThreshold": 0.6,
  "timezoneOffset": 0
}'
```

PUT request with which to append to a file whose codec conforms to video through a url.

```bash

curl --location --request PUT 'https://api.symbl.ai/v1/process/video/url/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
  "url": "",
  "confidenceThreshold": 0.6,
  "timezoneOffset": 0
}'
```

## Conversation API

### Conversation

GET request with which to get a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Messages (Transcripts)

GET request with which to get messages.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/messages`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/messages' \
--header 'x-api-key: $AUTH_TOKEN' \

```

### Members (Participants / Attendees)

GET request with which to get members from a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/members`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/members' \
--header 'x-api-key: $AUTH_TOKEN' \
```

PUT request with which to update an existing list of members with new members.

`https://api.symbl.ai/v1/conversations/{{conversation_id}}/members/{{member_id}}`

```bash
curl --location --request PUT 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/members/' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": "",
    "email": "john@example.com",
    "name": "John"
}'
```

### Topics
GET request with which to get topics from a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/topics?parentRefs=true`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/6335358679646208/topics?parentRefs=true' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Questions
GET request with which to get questions from a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/questions`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/questions' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Follow Ups
GET request with which to request follow ups.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/follow-ups`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/follow-ups' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Action Items
GET request with which to get action items.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/action-items`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/action-items' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Analytics
GET request with which to get action items from a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/action-items`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/action-items' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Entities
GET request with which to get entities.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/entities`

```bash
curl --location --request GET 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/entities' \
--header 'x-api-key: $AUTH_TOKEN' \
```

### Delete
DEL request with which to delete a conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}`

```bash
curl --location --request DELETE 'https://api.symbl.ai/v1/conversations/{{conversation_id}}' \
--header 'x-api-key: $AUTH_TOKEN' \
```

## Experience

POST request for returning a summary of details on your conversation.

Here is the API endpoint:
`https://api.symbl.ai/v1/conversations/{{conversation_id}}/experiences`

```bash
curl --location --request POST 'https://api.symbl.ai/v1/conversations/{{conversation_id}}/experiences' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw '{
      "name": "verbose-text-summary"
}'
```

## Job

GET request with which to check the status of a job.

Here is the API endpoint:

```bash
curl --location --request GET 'https://api.symbl.ai/v1/job/{{jobId}}' \
--header 'x-api-key: $AUTH_TOKEN' \
--header 'Content-Type: application/json' \
--data-raw ''
```
