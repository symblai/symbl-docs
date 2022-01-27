---
id: symbl-conversation-1-2-3
title: Extracting Speech to Text & Conversational Action Items from an audio file
---

In this guide, we will show you how to use Postman, an API collaboration tool, to extract Speech to Text & Conversational Action Items from audio.


### Get started in 3 easy steps:

1. Get Symbl Authentication 🔐
2. Submit your Audio file 🎤
3. Receive Speech to Text & Conversational Action Items 🎁

#### Overview
We are going to use the [Async API](/docs/async-api/overview/introduction) to upload the audio file. After processing the request, we will get a Conversation ID, and will use this Conversation ID in the Conversation’s Message API & Insight API for receiving data.

#### Install Postman
Here’s our magical Postman link which will surface our API collection.

:::info
After clicking the run in postman button, please select Postman for Windows/Mac option only.
:::

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/5f215bfc2a64aa314279)

:::info
If you see "A collection Symbl APIs already exists", click Replace.
:::

## Step 1: Symbl Authentication 🔐

#### Retrieve your credentials

Before we can begin processing your file, you will need to retrieve your credentials. Your credentials consist of your `appId` and `appSecret`. You can find them on the [home page of the platform](https://platform.symbl.ai/).


![](/img/credentials.png)


#### Steps:

1. After you have clicked on the Postman link provided above. Click on **Authentication** folder on the left.

![](/img/authentication-postman.png)


2. Click on **Generate Token(Authenticate)** option and you’ll be able to see the API. Inside the **Body** tab, you’ll see `appID` and `appSecret`.  

3. Paste your credentials([from platform homepage](https://platform.symbl.ai/)), click Send, and you should see `accessToken` (like in the image below) generated. This token is automatically copied to all other APIs in Postman. So, you don't need to copy this Token.


![](/img/authentication.png)

## Step 2: Submit your Audio file 🎤

#### Overview

To upload your audio file, you have to use the [Async Audio API](/docs/async-api/overview/audio/post-audio). This API takes your audio file and processes it. After processing it, it gives you a Conversation ID as a unique ID for your audio file and a Job ID for tracking the audio processing job.

#### Steps:
1. Inside your Postman app, click on **Async APIs** and then click on **Audio – Submit New Audio**. This will open the Async Audio API.

![](/img/async-audio-postman.png)

2. Please [click here](https://drive.google.com/uc?export=download&id=1-NAp9skycv2_c8iVM6Rd91vSMONAeClF) to download an audio file if you don’t have one handy. This file `business_meeting.mp3` is provided for ease of testing.

3. Once the audio file downloads, click on **Headers** and change the value of `Content-Type` to `audio/mpeg`.

4. Click on the **Body** section. Then click on **Select File** and choose the file `business_meeting.mp3` or whichever file you wish to use. Click Send and in 30 or so seconds, you’ll receive the `conversationId`.


![](/img/async-audio.png)

:::tip Stuck? We would love to help you
Ping us at [Developer Slack Forum](https://app.slack.com/client/TB14FF1EG#/) and we will get back to you in a few hours.
:::


## Step 3: Receive Speech to Text & Conversational Action Items 🎁

After you receive the `conversationId` in the response, you can now use the GET Conversation’s Messages API to receive Speech to Text for it.


### Receiving Speech to Text

In Postman Collection (on the left hand side) select **Conversation API**, in the expanded view click on **Get Messages** and press Send. And you should be able to see Speech to Text data in API response. The `conversationId` is automatically picked up from the Async Audio API response.

![](/img/conversation-postman.png)

:::info
If you don’t see any results when you click send, give the system 1 minute to process and click on send again.
:::

### Receiving Action Items

In the **Conversation API** tab in Postman, click on **Get Action Items** and press Send. This way you’ll be able to see the action items from the audio clip you uploaded. If you want to know more about action items and APIs like it, [click here](/docs/conversation-api/introduction).

## Bonus Section:

* If you want to learn more check out [Introduction to Conversation API.](/docs/conversation-api/introduction)

* If you want to try more APIs, please click on **Get Topics**, **Get Questions**, **Get Entities**, etc in the **Conversation API** tab in Postman.



🎉 **Congratulations! 🎉 You now know how to get Speech to Text & Conversational Insights from an audio file. **
