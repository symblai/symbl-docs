---
id: append-to-existing-conversation
title: Appending to an Existing Conversation With Speaker Separation
sidebar_label: Append to Existing Conversations with Speaker Separation
slug: /async-api/tutorials/append-to-existing-conversation/
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Because conversations don’t neatly end at once and may resume later, our Async API allows you to update/append an existing conversation. You can read more about this capability [here](/docs/async-api/overview/video/put-video-url).

To enable Speaker Separation with the append capability, the request structure is the same as shown above for creating a new Conversation. You would need to pass in `enableSpeakerDiarization=true` and `diarizationSpeakerCount=<NUMBER_OF_UNIQUE_SPEAKERS>` query-parameters.

However, there is one caveat in how the Automatic Speech Recognition works with Speaker Separation. Consider the below:

### An Example Scenario

We send a recorded conversation to the Async API with 2 speakers `John` and `Alice` with `enableSpeakerDiarization=true`. The diarization identifies them as `Speaker 1` and `Speaker 2` respectively. We then update the above speakers with their `email` as `john@example.com` and `alice@example.com`.

Now we use the append call for appending another conversation with 2 speakers `John` and `May` with `enableSpeakerDiarization=true`. Let’s assume that the diarization would now identify these as `Speaker 1` and `Speaker 2` respectively. As discussed before, these numbers are arbitrary and have nothing to do with the order in which the speakers spoke in the conversation.

After this job is complete we will have 4 members in this conversation:

1. `John`

2. `Alice`

3. `Speaker 1` (Which is `John` again)

4. `Speaker 2` (Which is `May`)

Since `John` and `Speaker 1` refer to the same speaker but are labeled as different speakers, their `member` references would be different for all `messages` and `insights` that they are a part of.

### Merging Speakers

This is where the `email` identifier comes in. The `PUT members` call can uniquely identify and merge a `member` with the same `email` parameter and eliminate any duplicate references with a single reference across the entire conversation which would update all the references including the `members`, `messages` and `insights`.

If we were to execute a `PUT members` call with the below body where `74001a1d-4e9e-456a-84ed-81bbd363333a` refers to the `id` of `Speaker 1` from the above scenario, this would eliminate this `member` and would update all the references with member represented by `2f69f1c8-bf0a-48ef-b47f-95ae5a4de325` which we know is `John Doe`.

<Tabs
  defaultValue="curl"
  values={[
    { label: 'CURL', value: 'curl', },
    { label: 'Javascript', value: 'javascript', },
    { label: 'Python', value: 'python', }
  ]
}>

<TabItem value="curl">

```shell
$ curl --location --request PUT "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/members/74001a1d-4e9e-456a-84ed-81bbd363333a"
       --header 'Content-Type: application/json'
       --header "Authorization: Bearer $AUTH_TOKEN"
       --data-raw '{
            "id": "74001a1d-4e9e-456a-84ed-81bbd363333a",
            "email": "john@example.com",
            "name": "John Doe"
        }'
```

</TabItem>

<TabItem value="javascript">

```js
const authToken = AUTH_TOKEN;
const conversationId = 'your_conversation_id'  // Generated using Submit text end point
const memberId = '74001a1d-4e9e-456a-84ed-81bbd363333a'  // MemberId of members fetched using fetchMember API
const url = `https://api.symbl.ai/v1/conversations/${conversationId}/members/${memberId}`;

payload = {
    'id': "74001a1d-4e9e-456a-84ed-81bbd363333a",  // Should be a valid UUID e.g. f170371e-d9db-4d55-9d49-a111a89cf078
    'email': "john@example.com",  // Should be a valid emailId e.g. John@domain.com
    'name': "John Doe"  // Should be a valid string e.g. John
}

const responses = {
  400: 'Bad Request! Please refer docs for correct input fields.',
  401: 'Unauthorized. Please generate a new access token.',
  404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
  429: 'Maximum number of concurrent jobs reached. Please wait for some requests to complete.',
  500: 'Something went wrong! Please contact support@symbl.ai'
}

const fetchData = {
  method: "PUT",
  headers: {
    'Authorization': `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
}

fetch(url, fetchData).then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(responses[response.status]);
  }
}).then(response => {
  console.log('response', response);
}).catch(error => {
  console.error(error);
});
```

</TabItem>

<TabItem value="python">

```py
import json
import requests

baseUrl = "https://api.symbl.ai/v1/conversations/{conversationId}/members/{memberId}"
conversationId = 'your_conversation_id'  # Generated using Submit text end point
memberId = '74001a1d-4e9e-456a-84ed-81bbd363333a'  # MemberId of members fetched using fetchMember API

url = baseUrl.format(conversationId=conversationId, memberId=memberId)

# set your access token here. See https://docs.symbl.ai/docs/developer-tools/authentication
access_token = 'your_access_token'

headers = {
    'Authorization': 'Bearer ' + access_token,
    'Content-Type': 'application/json'
}

payload = {
    'id': "74001a1d-4e9e-456a-84ed-81bbd363333a",  # Should be a valid UUID e.g. f170371e-d9db-4d55-9d49-a111a89cf078
    'email': "john@example.com",  # Should be a valid emailId e.g. John@domain.com
    'name': "John Doe"  # Should be a valid string e.g. John
}

responses = {
    401: 'Unauthorized. Please generate a new access token.',
    404: 'The conversation and/or it\'s metadata you asked could not be found, please check the input provided',
    500: 'Something went wrong! Please contact support@symbl.ai'
}

response = requests.request("PUT", url, headers=headers, data=json.dumps(payload))

if response.status_code == 200:
    # Successful API execution
    print(response.json()['message'])  # message containing status of response
elif response.status_code in responses.keys():
    print(responses[response.status_code])  # Expected error occurred
else:
    print("Unexpected error occurred. Please contact support@symbl.ai" + ", Debug Message => " + str(response.text))

exit()
```

</TabItem>
</Tabs>


This is possible because the `email` uniquely identifies that user.

### Best Practices

* The `diarizationSpeakerCount` should be equal to the number of unique speakers present in the conversation for best results as the Diarization model uses this number to probabilistically determine the speakers. If this number is different than the actual speakers, then it might introduce false positives for some part of the transcriptions.

* For the best experience, the Sample Rate of the data should be greater than or equal to `16000Hz`.