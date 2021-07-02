---
id: python-sdk-async-api
title: Async Text API 
sidebar_label: Text API
slug: /python-sdk/async-api
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Python SDK allow you to asynchronously send conversation data and generate the following:

- Speech-to-Text
- Action Items
- Questions
- Topics
- Follow-ups
- Sentiment Analysis.

You can also utilize the `parameters` function to send additional parameters supported in the [Async Text API](https://docs.symbl.ai/docs/async-api/overview/text/post-text#query-params).

### Sample Code
```python
import symbl
dictionary ={
   "name": "Business Meeting",
   "confidenceThreshold": 0.6,
   "detectPhrases": True,
   "messages": [
     {
       "duration": {
         "startTime": "2020-07-21T16:04:19.99Z",
         "endTime": "2020-07-21T16:04:20.99Z"
       },
       "payload": {
         "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you are providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family? Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
         "contentType": "text/plain"
       },
       "from": {
         "name": "John",
         "userId": "john@example.com"
       }
     }
   ]
 }
conversation = symbl.Text.process(payload=dictionary)

print(conversation.get_action_items()) # Returns action items arising out of the conversation

# print(conversation.get_action_items()) 
# print(conversation.get_topics()) 
# print(conversation.get_questions())
# print(conversation.get_messages(parameters={'sentiment': True})) # This returns Sentiment score in the messages due to the parameter sentiment. 
```
### Using Parameters

Any parameter that is supported for Async text API can be provided in the dictionary format.

See the complete list of supported parameters [here](/docs/async-api/overview/text/post-text). 

### Appending Text API

Use the code given below to append text conversation already processed. 

```py 
import symbl

 dictionary ={
   "name": "Business Meeting",
   "confidenceThreshold": 0.6,
   "detectPhrases": True,
   "messages": [
     {
       "duration": {
         "startTime": "2020-07-21T16:04:19.99Z",
         "endTime": "2020-07-21T16:04:20.99Z"
       },
       "payload": {
         "content": "Hello.  So this is a live demo that we are trying to give very we are going to show how the platform detects various insights can do transcription in real-time and also the different topics of discussions, which would be generated after the call is over, and they will be an email that will be sent to the inbox.  So that is the idea.  So I am going to do a quick conversation.  I would say where I will demonstrate all of this great catching up.  Thanks for calling good to hear.  From you.  And I would love to hear more about what you have to offer?  I will set up a time and appointment probably sometime tomorrow evening where we can go over the documents that you are providing.  I love all the plants.  I just need to discuss with my family in terms of which one will we go forward with it?  It very excited to hear from you and the discount and look forward to talking sharply.  I have a quick question though.  Is there basically website?  Where I can go to and look at all these details myself.  It will be very helpful.  Can you also share the quotation to me on email so that I can go ahead and talk about it with my other kind of folks in the family? Thanks a lot.  Thanks for calling good catching up.  Talk soon.",
         "contentType": "text/plain"
       },
       "from": {
         "name": "John",
         "userId": "john@example.com"
       }
     }
   ]
 }
conversation = symbl.Text.append(payload=dictionary, conversation_id='5274326339158016')

print(conversation.get_action_items())

# print(conversation.get_topics())
# print(conversation.get_messages())
```


#### Utilizing the `wait` Parameter

Use the `wait` parameter (by default set to `True`) while making concurrent API calls. Setting the value `wait=False` will execute an existing function on a separate thread making it a non-blocking API call. It also has the callback support.<br/>

Example:
```py
conversation = symbl.Text.process(payload=dictionary, wait=False)
```
### Python SDK Reference

For a complete list of supported classes and objects in the Python SDK, see the [Python SDK Reference](/docs/python-sdk/python-sdk-reference) page. 

You can view more capabilities added to Async API in the following sections:

- [Text Class](/docs/python-sdk/python-sdk-reference#text-class)<br/>
- [Conversation Object](/docs/python-sdk/python-sdk-reference#conversation-object)