---
id: trackers
title: Trackers (Beta)
sidebar_label: Trackers (Beta)
slug: /concepts/trackers
---
:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Trackers allow you to track the occurrence of certain keywords or phrases in a conversation. You can define the keywords or phrases in a Tracker and Symbl will return messages that contain same or contextually similar phrases. 

One of the biggest challenges of using tracking is the limitation of matching only exact phrases or key words whereas in natural human conversations, individuals may be talking about the same thing but may not be using the same phrases or key words. For example, “I don’t have any money” is contextually similar to “I ran out of budget” as both represent similar inherent meaning.

Symbl removes that complexity by reading into contexts and returning messages that closely match the keyword that you’ve defined in a Tracker. Further, the `offset` parameter shows you the extent of the match with the tracking keywords. 
Using these insights you can introduce process improvements and strategies that align with your business goals.

#### Example
The tracker names used in the example below are only for explanatory purposes. You can create any tracker for your usecase and assign any name you like.

- *Sandra is the training head of the Sales team in her company. She uses the insights from the **Intro Tracker** to look at how great sales agents start conversations and **Pricing Tracker** to understand how they share the pricing details. She then uses these insights to train other agents.* 
*The **Intro Tracker** Sandra uses tracks contextually similar phrases such as:*
*"Thank you for taking some time to speak with me"*
*"Have you ever noticed”*
*“Have you ever considered”*


- *Tom is the Chief Quality Assurance Manager and wants to see how many agents are using negative phrases on the customer calls. He gets insights from the **Negative Phrases Tracker** by tracking the following contextually similar phases:*
*“I am not interested”*
*“This makes me uncomfortable”*
*“Not so good”*
*“I am skeptical”*
*“My only problem is”*
*“My only issue is”*
*“This does not fit”*


- *Samuel uses insights from **Leads Tracker** for all the dial out calls at his car insurance company. By tracking phrases that show buying intent, enquiry about policy options, quotes, discounts, etc., he generates more leads for his business. The **Leads Tracker** tracks the following contextually similar phrases:*
*“I need”*
*“Policy options”*
*“Require”*
*“Use case”*
*“Fits our requirement”*
*“Quotes”*
*“Discounts”*

## Key Features
The key features of Trackers are: 

- Ability to create Trackers for commonly used terms or phrases without worrying about the contextual relevancy.
- Bulk creation of Trackers in a single operation.
- Updating or deleting Trackers.
- Ability to get Trackers (using `trackerId` or `name`) which can then be consumed in the Symbl APIs.
- Ability to track a Conversation that contains keywords or phrases of the Tracker. 
- Ability to define the extent to which the keywords match in a message. 
- Easy management (POST/PUT/GET/DELETE) of Trackers using Management API.


#### Tracker Entity
Below is the structure of a Tracker entity:

```json
{
   "name":"Promotion Mention",
   "vocabulary":[
      "We have a special promotion going on if you book this before",
      "I can offer you a discount of 10 20 percent you being a new customer for us",
      "We have our month special this month",
      "We have a sale right now on",
   ]
}
```
Parameter  | Description |
----------- | ------- |  
`name` | This member specifies a uniquely identifiable `name` given to the group/set of phrases defined by the `vocabulary` member.
`vocabulary` | It specifies the set of `phrases` or `keywords` that need to be tracked in a conversation. Note that the Trackers API finds the matches for the given `vocabulary` throughout a conversation. For example, the Tracker Voice Message shown above can be used for detecting if the entire conversation is itself an automated reply or contains “contextually similar” phrases in it.

:::info
For better tracking use prominent keywords and phrases, along with few longer utterances which represent the Tracker.
:::

## Trackers API 

Currently, Trackers are supported with Symbl’s [Async APIs](/docs/async-api/introduction) and [Streaming API](/docs/streaming-api/api-reference#using-trackers).

The Async APIs also have support for consuming Trackers via the [Management API](/docs/management-api/introduction), which takes the onus of maintaining these entities from the developer and shifts it to Symbl’s backend. The Management API provides an easy-to-consume REST interface for managing these entities. 
Click [here](/docs/management-api/introduction) to read about the capabilities of Management APIs. 

The detected Trackers for the conversations (for both Async APIs and Streaming API) can be retrieved using the [**GET Tracker API**](/docs/conversation-api/trackers) endpoint. 


## Related 

- [Viewing detected Trackers with Async API](/docs/async-api/code-snippets/track-phrases-in-a-conversation/#view-detected-trackers)
- [Detect Key Phrases with Streaming API](/docs/streamingapi/code-snippets/detect-key-phrases/#ontrackerresponse-json-response-example)