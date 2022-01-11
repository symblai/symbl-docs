---
id: build-with-amazon-chime
title: Build with Amazon Chime
sidebar_label: Build with Amazon Chime
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

The Symbl Conversation AI Adapter for Chime SDK is the simplest way to get started with Symbl in your Amazon Chime video platform.

Currently, the Symbl Conversational AI Adapter has the following features:

* Real-time closed-captioning.

* Real-time conversational insights (Action Items, Questions, Follow-ups).

* Transcription.

### Prerequisites

You must have the following installed:

* [Node.js v10+](https://nodejs.org/en/download/)

* [NPM 6.11 or higher]

* [Install the AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv1.html)

* [Install the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

### Set Up for Symbl

#### Install symbl-chime-adapter

To get started you will need to add the symbl-chime-adapter to your node dependencies.


```bash
$ npm install --save symbl-chime-adapter
```


### Symbl Credentials

* Create an account in the [Symbl Console](https://platform.symbl.ai/) if you have not done so already.

* After you login, you will find your appId and appSecret on the home page.

* Create a `.env` file in `demos/browser` and `demos/serverless/src` that includes your appId and appSecret as shown below.


```bash
SYMBL_APP_ID=<xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>
SYMBL_APP_SECRET=<xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx>
```


The App ID and App Secret are used to authenticate your session with Symbl by generating an access token.

<aside class="notice">
Your App ID and Secret should not be shared or posted publicly.
</aside>


### Initialization

The Symbl adapter should be initialized after connecting to your Chime video conference.

To connect each Chime participant to Symbl, it is best practice to generate the client’s access token on your backend service.

After the token is generated it can be returned along with the chime meeting configuration as shown below. For a full example of this, please see this page of our [chime demo application](https://github.com/symblai/symbl-adapter-for-chime-demo/blob/master/demos/serverless/src/handlers.js).


```javascript
const res = await fetch(`https://api.symbl.ai/oauth2/token:generate`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        type: 'application',
        appId: symblAppId,
        appSecret: symblAppSecret,
      }),
    });
    accessToken = await res.json();

    return response(200, 'application/json', JSON.stringify({
    JoinInfo: {
      Meeting: meeting,
      Attendee: attendee,
      Symbl: accessToken,
    },
  }, null, 2));
};
```

After the token is generated and returned by your server, the Symbl Access Token can be applied by setting the static property `ACCESS_TOKEN` of the Symbl class.


```javascript
Symbl.ACCESS_TOKEN = joinInfo.Symbl.accessToken;
```

After the access token has been set and your client has joined the Chime meeting, you can instantiate the Symbl class.

The Symbl constructor takes two parameters:

##### Chime
| Field      | Type   | Required | Description                                          |
|------------|--------|----------|------------------------------------------------------|
| attendeeId | string | true     | ID for video conference participant                  |
| userName   | string | false    | Human readable name for video conference participant |
| meetingId  | string | true     | Unique identifier for the meeting                    |
| meeting    | string | true     | Name of the meeting                                  |

##### Options

| Field               | type    | Required | Supported Values                                                     | Default Value | Description                                              |
|---------------------|---------|----------|----------------------------------------------------------------------|---------------|----------------------------------------------------------|
| confidenceThreshold | double  | false    | 0.5-1.0                                                              | 0.5           | Your access token retrieved through authentication with  |
| languageCode        | boolean | false    | en-US, en-GB, en-AU, it-IT, nl-NL, fr-FR, fr-CA, de-DE, es-US, ja-JP | en-US         | The language code as per the BCP 47 specification        |
| insightsEnabled     | boolean | false    |                                                                      | true          | Whether or not to generate insights.                     |


> Example Config

```javascript
/**
	@param {object} chime - chime configuration
        {
            @property {string} attendeeId -- Client attendee id
            @property {string} userName - User name
            @property {string} meetingId -- UUID of the meeting
            @property {string} meeting meeting name
        },
        @param {object} config - Symbl Configuration
        {
            @property {number} confidenceThreshold  optional | default: 0.5 | 0.0 - 1.0 minimum confidence value produce valid insight
            @property {string} languageCode         optional - default: 'en-US' | The language code as per the BCP 47 specification
            @property {boolean} insightsEnabled     optional - default: true -- false if language code is not english.
        }
*/
  this.symbl = new Symbl(
      {
          attendeeId: this.configuration.credentials.attendeeId,
          userName: this.configuration.credentials.externalUserId.split('#').pop(),
          meetingId: this.configuration.credentials.meetingId,
          meeting: this.meeting,
      }, {
          confidenceThreshold: 0.5,
          languageCode: 'en-US',
          insightsEnabled: true,
      }
  );
```

### Subscribe to Real-time Events

Learn how to subscribe to Symbl’s conversational insights and transcription.

There are three different event types that you can subscribe through with Symbl’s Conversational AI Adapter for Chime.

* Closed Captions

* Transcripts

* Insights

Each subscriber function, `subscribeToCaptioningEvents`

#### Closed Captions

Real-time closed captioning is enabled by default and provides real-time transcription of your audio content. Closed captioning tracks can be added to any video element through the callback handler to your Symbl instance.

##### Handler

Closed caption handler has 3 callback functions:

* `onCaptioningToggled` - Will be called whenever closed captioning is toggled on or off.

* `onCaptionCreated` - Event that occurs after speech is first detecting, having the caption object created after as a parameter.

* `onCaptionUpdated` - Event that occurs after speech is no longer detected, indicating the end of transcriipton.

The handler can be added using the `subscribeToCaptioningEvents` function of the Symbl instance.


```javascript
const captioningHandler = {
    onCaptioningToggled: (ccEnabled: boolean) => {
        // Implement
    },
    onCaptionCreated: (caption: Caption) => {
        console.warn('Caption created', caption);
        // Retrieve the video element that you wish to add the caption tracks to.
        const activeVideoElement = getActiveVideoElement() as HTMLVideoElement;
        if (activeVideoElement) {
            subtitle.setVideoElement(activeVideoElement);
        }
    },
    onCaptionUpdated: (caption: Caption) => {
        const activeVideoElement = getActiveVideoElement() as HTMLVideoElement;

        subtitle.setVideoElement(activeVideoElement);
    },
};
symbl.subscribeToCaptioningEvents(captioningHandler);
```

Setting the video element that subtitles will be superimposed over should be done by calling the `setVideoElement` function on the `Caption` class.

If your video chat application has alternating primary video tiles, this can be used to change which element is active.

#### Real-time Insights

Real-time insights are generated as Symbl processes the conversation in your video chat platform.

When an Insight is detected by Symbl and the `onInsightCreated` event is emitted, an Insight object is passed to the callback function provided in the Insight handler.  

The `Insight` class holds data about the insight generated.

##### Insight Class Attributes

| Field | Type   | Description                                              |  
|-------|--------|----------------------------------------------------------|
| type  | string | Insight type. Can beaction_item, question, or follow_up. |   
| text  | string | Insight content                                          |   
| id    | string | ID of the Insight                                        |   
|confidence| number|                                                        |   

##### Assignee

| field  | type   | description                    |
|--------|--------|--------------------------------|
| name   | string | Insight assignee name          |
| userId | string | Insight assignee email address |
| id     | string | Insight assignee ID            |


##### Hints (follow-up's only)

| field | type   | description                    |
|-------|--------|--------------------------------|
| key   | string | Insight assignee name          |
| value | string | Insight assignee email address |
| id    | string | Insight assignee ID            |


##### Handler


The Symbl adapter exposes a handler function, `subscribeToInsightEvents`, that has a callback function `onInsightCreated`.

<aside class="notice">
Insights are enabled by default, but can be manually disabled through the `insightsEnabled` parameter in the `config` of the `Symbl` constructor.
</aside>


```javascript
new Symbl(chimeConfiguration, {insightsEnabled: true});
```

Subscribing to the Insight publisher is achieved by passing a handler to the `subscribeToInsightEvents` function of your `Symbl` instance.

### Example

When an insight event is emitted from the `onInsightCreated` handler, you can
use the Insight object returned and either use the `createElement` function to
create a default element or you can use the data included in the `Insight`
object returned in the handlers callback to create your own element,
capture the data and store as a metric, etc.

```javascript
const insightHandler = {
    onInsightCreated: (insight: Insight) => {

        // Creates a predesigned insight element
        const element = insight.createElement();

        // Customize any styling
        element.classList.add('mx-auto');
        element.style.width = '98%';

        /** OR create your own element
        insight.element = document.createElement('div');
        insight.element.innerHTML = `<div style="width: auto; height: 400px">
                                 <h3 style="font-width: 400;">
                                     ${insight.type}
                                 </h3>

                                 <h2>
                                     ${insight.text}
                                 </h2>
                              </div>`;
        **/

        // Retrieve container you wish to add insights to.
        const insightContainer = document.getElementById('receive-insight');

        // Call add on the insight object to add it to DIV
        insight.add(insightContainer);
    }
};

// Subscribe to real-time insight events using the handler created above
this.symbl.subscribeToInsightEvents(insightHandler);
```

![Default Insights Element](/img/howto3.png)


<aside class="notice">
Although [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/) is required to style the default element, Bootstrap is not required by default in the libraries dependencies. To use the default insight element you will need to add Bootstrap to your dependencies.
</aside>

#### Real-time Transcripts

Real-time transcripts differ slightly from real-time closed-captioning. A Transcript object is created when after speech is no longer detected.

##### Attributes

| Field     | Type   | Description                  |   
|-----------|--------|------------------------------|
| message   | string | Speaker content              |   
| userName  | string | Speaker name                 |   
| userId    | string | Speaker ID                   |   
| timeStamp | Date   | Time of the transcript event |   

##### Handler

The Transcript handler has only one event, `onTranscriptCreated`. Each time a speaker finishes speaking a `Transcript` object is generated.

Subscribing to the transcript publisher is achieved by passing a handler to the `subscribeToTranscriptEvents` function of your `Symbl` instance.

```javascript
const transcriptHandler = {
    onTranscriptCreated: (transcript: Transcript) => {
      // Handle transcript item
    }
};
this.symbl.subscribeToTranscriptEvents(transcriptHandler);
```

### Generating Meeting Summary URL

To generate a meeting summary URL, you need only to call the `getSummaryUrlfunction` of your Symbl instance.

```javascript

const meetingSummaryUrl = await symbl.getSummaryUrl();

```
