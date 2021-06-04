---
id: get-speaker-separation-audio-video
title: How to implement speaker separation with Async Audio or Video Files
sidebar_label: Speaker separation with Async API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Enable the Speaker Separation for the Async Audio or Async Video APIs to get speaker-separated transcripts and insights. -->

[Symbl's Async API](/docs/async-api/introduction) allows you to process stored recordings of audio or video from files or URLs or even textual content from a conversation. In this guide, we will walk you through how to implement [Speaker Separation](/docs/async-api/reference/reference/#speaker-separation) with audio or video files. Speaker Separation, in short, is the ability to detect and separate unique speakers in a single stream of audio & video without the need for separate speaker events.

## Contents

* [Enabling the Diarization](#enabling-the-diarization)
    * [Identifying Unique Speakers](#identifying-unique-speakers)
    * [Getting the Speaker Separated Results](#getting-the-speaker-separated-results)
    * [Gain Insights](#gain-insights)
* [Updating the Detected Members](#updating-the-detected-members)
    * [GET members](#get-members)
    * [PUT members](#put-members)
* [Appending to an Existing Conversation With Speaker Separation](#appending-to-an-existing-conversation-with-speaker-separation)
    * [An Example Scenario](#an-example-scenario)
    * [Merging Speakers](#merging-speakers)
    * [Best Practices](#best-practices)

## Enabling the Diarization

To enable Speaker Separation in the Async Audio or Video API is as simple as adding the `enableSpeakerDiarization=true` and `diarizationSpeakerCount=<NUMBER_OF_UNIQUE_SPEAKERS>` query parameters of the request URL.

This snippet shows a cURL command for consuming the Async Video URL-based API which takes in the URL for a publicly available URL of a Video File:

<Tabs
  defaultValue="curl"
  values={[
    { label: 'cURL', value: 'curl', }
  ]
}>
<TabItem value="curl">

```shell
curl --location --request POST "https://api.symbl.ai/v1/process/video/
url?enableSpeakerDiarization=true&diarizationSpeakerCount=$NUMBER_OF_UNIQUE_SPEAKERS
&webhookUrl=$WEBHOOK_URL"
--header 'Content-Type: application/json'
--header "Authorization: Bearer $AUTH_TOKEN"
--data-raw '{
    "url": "https://storage.googleapis.com/demo-conversations/interview-prep.mp4"
}'
```

</TabItem>

<TabItem value="nodejs">
</TabItem>

</Tabs>

:::info
The above example uses the Async Video URL API, but Speaker Separation can be achieved with other Async Audio/Video APIs in the same way.
:::

* `AUTH_TOKEN` needs to be replaced with the Bearer token generated during [our authentication process](/docs/developer-tools/authentication).

* `WEBHOOK_URL` can be replaced with a WebHook URL for receiving the status for the Job created after calling the API.

* For accuracy, `NUMBER_OF_UNIQUE_SPEAKERS` should match the number of unique speakers in the Audio/Video data.

The above URL has two query parameters:

Parameter Name  | Type | Description
---------- | ------- |  ------- |
`enableSpeakerDiarization` | Boolean | Will enable the speaker separation for the audio or video data under consideration.
`diarizationSpeakerCount` | Integer | Sets the number of unique speakers in the audio or video data under consideration.


### Identifying Unique Speakers

Invoking the `members` call in the Conversation API will return the uniquely identified speakers for this conversation when Speaker Diarization is enabled.

#### Code Example

View the API Reference for information on how to get member information.

👉 [GET Member Information](/docs/conversation-api/api-reference/members/)

#### JSON Response Example

```js
{
    "members": [
        {
            "id": "9d6d34d9-5019-4694-9c9a-8ba7bfc8cfab",
            "name": "Speaker 1"
        },
        {
            "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
            "name": "Speaker 2"
        }
    ]
}
```

The `name` assigned to a uniquely identified speaker/member from a separated audio/video will follow the format `Speaker <number>` where `<number>` is arbitrary and does not necessarily reflect in what order someone spoke.

The `id` can be used to identify a speaker/member for that specific conversation and can be used to update the details for the specific member demonstrated below in the [**Updating Detected Members**](#updating-the-detected-members) section.

### Getting the Speaker Separated Results

Invoking the `messages` call in the [Conversation API](/docs/conversation-api/introduction) would return the speaker-separated results.


#### Code Example

View the API Reference for information on how to get speech-to-text messages from the conversation

👉 [GET Messages](/docs/conversation-api/api-reference/messages)

#### JSON Response Example


```js
{
    "messages": [
        {
            "id": "4591723946704896",
            "text": "You're hired two words, everybody loves to hear.",
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            },
            "startTime": "2020-08-04T07:18:17.573Z",
            "endTime": "2020-08-04T07:18:21.573Z",
            "conversationId": "5105430690791424"
        },
        {
            "id": "6328236401229824",
            "text": "But before we hear these words comes the interview today's video is part one in a series.",
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            },
            "startTime": "2020-08-04T07:18:21.973Z",
            "endTime": "2020-08-04T07:18:30.473Z",
            "conversationId": "5105430690791424"
        },
    ]
}
```


The above snippet shows the speaker in the `from` object with a unique ID. These are the uniquely identified `members` of this conversation.

:::info
Reminder: The speaker number in the above snippet is arbitrary and the number doesn’t necessarily reflect the order in which someone spoke.
:::

### Gain insights

Similarly, invoking the `insights` call in the [Conversation API](/docs/conversation-api/api-reference/insights) would also reflect the identified speakers in the detected insights.


#### Code Example

View the API Reference for information on how to get insights from the conversation.

👉 [GET Insights](/docs/conversation-api/api-reference/insights)

#### JSON Response Example


```js
{
    "insights": [
        {
            "id": "5501181057040384",
            "text": "We need to go over three more common interview questions.",
            "type": "action_item",
            "score": 1,
            "messageIds": [
                "5710067261243392"
            ],
            "entities": [],
            "phrases": [
                {
                    "type": "action_phrase",
                    "text": "go over three more common interview questions"
                }
            ],
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            },
            "definitive": true,
            "assignee": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            }
        },
        {
            "id": "5519156904460288",
            "text": "How did you hear about this position?",
            "type": "question",
            "score": 0.999988666660899,
            "messageIds": [
                "4616389407014912"
            ],
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            }
        },
        ...
    ]
}
```


## Updating the Detected Members

The detected members (unique speakers) would have names like `Speaker 1` as the automatic speaker recognition wouldn’t have any context to who this speaker is (name or other details of the speaker). Therefore, it is important to update the details of the detected speakers after the `Job` is marked as `complete`.

### GET members


The `members` call in the [Conversation API](/docs/conversation-api/introduction) returns the uniquely identified speakers as shown in the [**Identifying Unique Speakers**](#identifying-unique-speakers) section above when the Speaker Separation is enabled.

Let’s consider the same set of members that can be retrieved by calling the GET members call in the Conversation API.

👉 [GET Member Information](/docs/conversation-api/api-reference/members/)

#### JSON Response Example

```js
{
    "members": [
        {
            "id": "9d6d34d9-5019-4694-9c9a-8ba7bfc8cfab",
            "name": "Speaker 1"
        },
        {
            "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
            "name": "Speaker 2"
        }
    ]
}
```

### PUT members

We can now use the `PUT members` call to update the details of a specific member as shown below. This call would update the `Speaker 2` as shown in the above section with the values in the cURL’s `request-body`:

👉 [PUT Members Information](/docs/conversation-api/api-reference/update-members)

<Tabs
  defaultValue="curl"
  values={[
    { label: 'CURL', value: 'curl', },
  ]
}>

<TabItem value="curl">

```shell
$ curl --location --request PUT "https://api.symbl.ai/v1/conversations/$CONVERSATION_ID/members/2f69f1c8-bf0a-48ef-b47f-95ae5a4de325"
       --header 'Content-Type: application/json'
       --header "Authorization: Bearer $AUTH_TOKEN"
       --data-raw '{
            "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
            "email": "john@example.com",
            "name": "John Doe"
        }'
```
</TabItem>
<TabItem value="nodejs">
</TabItem>
</Tabs>

* The `CONVERSATION_ID` needs to be replaced with the actual Conversation ID (`conversationId`)

* The `AUTH_TOKEN` needs to be replaced with the Bearer token generated during [our authentication process](/docs/developer-tools/authentication).

The URL has the `id` of the `member` we want to append to `PUT /members` with the request body containing the updated `name `of this `member`.

There is also the option to include the `email` of the member. The `email` will be used as an identifier for tracking those specific members uniquely in that conversation. (Refer to the [**Updating the Detected Members**](#updating-the-detected-members) section below for more details)

After the above call is successful, we will receive the following response:


```js
{
    "message": "Member with id: 2f69f1c8-bf0a-48ef-b47f-95ae5a4de325 for conversationId: <CONVERSATION_ID> updated successfully! The update should be reflected in all messages and insights along with this conversation"
}
```

The `message` is self-explanatory and tells us that all the references to the `member` with the `id` of `2f69f1c8-bf0a-48ef-b47f-95ae5a4de325` in the conversation should now reflect the new values we updated this `member` with. That includes `insights`, `messages` and the conversation’s `members` as well.

So if we call the `GET /members` API now, we would see the following result:

```js
{
    "members": [
        {
            "id": "9d6d34d9-5019-4694-9c9a-8ba7bfc8cfab",
            "name": "Speaker 1"
        },
        {
            "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
            "email": "john@example.com",
            "name": "John Doe"
        }
    ]
}
```

And similarly, with the `GET /messages` API call, we would see the updates reflected below as well:

```js
{
    "messages": [
        {
            "id": "4591723946704896",
            "text": "You're hired two words, everybody loves to hear.",
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "email": "john@example.com",
                "name": "John Doe"
            },
            "startTime": "2020-08-04T07:18:17.573Z",
            "endTime": "2020-08-04T07:18:21.573Z",
            "conversationId": "5105430690791424"
        },
        {
            "id": "6328236401229824",
            "text": "But before we hear these words comes the interview today's video is part one in a series.",
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "email": "john@example.com",
                "name": "John Doe"
            },
            "startTime": "2020-08-04T07:18:21.973Z",
            "endTime": "2020-08-04T07:18:30.473Z",
            "conversationId": "5105430690791424"
        },

    ]
}
```

Curious about the `GET /insights` API? It would reflect these updates as well!

```js
{
    "insights": [
        {
            "id": "5501181057040384",
            "text": "We need to go over three more common interview questions.",
            "type": "action_item",
            "score": 1,
            "messageIds": [
                "5710067261243392"
            ],
            "entities": [],
            "phrases": [
                {
                    "type": "action_phrase",
                    "text": "go over three more common interview questions"
                }
            ],
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "email": "john@example.com",
                "name": "John Doe"
            },
            "definitive": true,
            "assignee": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "name": "Speaker 2"
            }
        },
        {
            "id": "5519156904460288",
            "text": "How did you hear about this position?",
            "type": "question",
            "score": 0.999988666660899,
            "messageIds": [
                "4616389407014912"
            ],
            "from": {
                "id": "2f69f1c8-bf0a-48ef-b47f-95ae5a4de325",
                "email": "john@example.com",
                "name": "John Doe"
            }
        },

    ]
}

```


## Appending to an Existing Conversation With Speaker Separation

Because conversations don’t neatly end at once and may resume later, our Async API allows you to update/append an existing conversation. You can read more about this capability [here](https://docs.symbl.ai/#put-async-video-url-api).

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
    { label: 'CURL', value: 'curl', }
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
<TabItem value="nodejs">
</TabItem>
</Tabs>


This is possible because the `email` uniquely identifies that user.

### Best Practices

* The `diarizationSpeakerCount` should be equal to the number of unique speakers present in the conversation for best results as the Diarization model uses this number to probabilistically determine the speakers. If this number is different than the actual speakers, then it might introduce false positives for some part of the transcriptions.

* For the best experience, the Sample Rate of the data should be greater than or equal to `16000Hz`.
