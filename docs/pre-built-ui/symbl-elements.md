---
id: symbl-elements
title: Symbl React Elements
sidebar_label: Symbl React Elements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

<div className="widget-container"></div>

<!-- <a href="#" onClick={e => {MyApp.init()}}>Test</a> -->


The **Symbl React Elements** are a set of UI components, which can be easily integrated into your frontend application to directly utilize Symbl’s capabilities such as Transcripts, Topics, and Insights(coming soon). The library provides you with UI elements & custom hooks to customize your own components.

## Key Features

* Plug n Play
* Full-featured UI components for both Offline and Real-time conversations
* Custom hooks to build your own components
* Full Typescript support

## Getting Started

Throughout the documentation you'll find various references to these variable names, which you will have to replace with your own values:

Key  | Description
---------- | -------
```APP_ID``` | The application ID you get from the [home page of the platform](https://platform.symbl.ai/).
```APP_SECRET``` | The application secret you get from the [home page of the platform](https://platform.symbl.ai/).
```AUTH_TOKEN``` | The JWT you get after [authentication](/docs/developer-tools/authentication) with Sybml.


## Installation

<Tabs
  defaultValue="npm"
  values={[
    { label: 'npm', value: 'npm', },
    { label: 'yarn', value: 'yarn', }
  ]
}>
<TabItem value="npm">


```jsx
npm i @symblai/react-elements
```
</TabItem>

<TabItem value="yarn">

```jsx
yarn add @symblai/react-elements
```

</TabItem>
</Tabs>

## Components

The project is still in early development. New components will be added regularly over the coming months.

### SymblProvider

The `<SymblProvider/>` component lets all the child components access the Symbl config inside it.

Normally, like any other Providers, `<SymblProvider/>` should be at the top level, with the component tree inside it.


#### Example

```jsx
import { SymblProvider } from '@symblai/react-elements';

const symblConfig = {
  appId: 'APP_ID',
  appSecret: 'APP_SECRET',
};

function App({ children }) {
  return (
    <SymblProvider config={symblConfig}>
      {children}
    </SymblProvider>
  );
}
```

#### Props

Name  | Type | Description
----------- | ------- | -------
```config``` | Object | The Symbl config object.

#### Config

Name  | Type | Description
----------- | ------- | -------
```appId``` | String | Can be generated from [Symbl Developer Platform](https://platform.symbl.ai/).
```appSecret``` | String | Can be generated from [Symbl Developer Platform](https://platform.symbl.ai/).
```accessToken``` | String | JWT token generated from [our authentication process](/docs/developer-tools/authentication).
```basePath```| String (Default: `https://api.symbl.ai`) |

:::info
One of `appId/appSecret` or `accessToken` is a required parameter.
:::

### Transcript
The `<Transcripts/>` can be used to directly add a Transcript component in your app without much configuration and only need a Conversation ID (`conversationId`) to enable it.


#### Example

```jsx
import { Transcripts } from '@symblai/react-elements';

function App(props) {
  return (
    // ...
    <Transcripts
      conversationId={12345567}
      highlightPhrases={['action_phrase']}
      transcriptsWrapperClassName="testWrapperClass"
      transcriptRowClassName="testClassRow"
      transcriptRowHeaderClassName=""
      transcriptClassName=""
      avatarClassName="avatarClass"
    />
    // ...
  );
}
```

#### Props
Name  | Type | Description
----------- | ------- | -------
```conversationId``` | String | The ID of the conversation.
```messages``` | Array | Array of messages retrieved from the Symbl Real-time API - [Message response](/docs/conversation-api/messages)
```highlightPhrases``` | Array | Highlight key points, actionable texts in the transcript. To style the highlighting a global class is available for each type. Available type `action_phrase`.
```showAvatar``` | Boolean (Default: true) | Toggle the avatar in the transcription.
```mediaElementRefOrId``` | String / ReactRef | ID of the audio/video element for mapping it to transcripts or ref to the element.
```transcriptsWrapperClassName``` | String | Wrapper class for the whole transcript body.
```transcriptRowClassName``` | String | Class for handling the styling of the transcript row.
```transcriptClassName``` | String | Class for handling the styling of transcript text.
```transcriptRowHeaderClassName``` | String | Class for handling the style of the header section of transcript.
```avatarClassName``` | String | Class for styling the avatar.

:::info
When a `conversationId` is passed the Transcripts data is retrieved from the [Conversation API](/docs/conversation-api/introduction) and is required if the messages prop is not passed.
:::

:::info
`action_phrase` is only available when you pass `detectPhrases=true` as a query parameter during submitting the request in Async and Websocket API. [Link](/docs/conversation-api/messages).
::::


#### Highlight classes

Type  | ClassName  
----------- | -------
```action_phrase``` | action-phrase-highlighted

### Topics
The `<Topics/>` will render a list of topic pills ordered by a confidence score.


#### Example

```jsx
import { Topics } from '@symblai/react-elements';

function App(props) {
  return (
    // ...
    <Topics
      conversationId={12345567}
      confidenceThreshold={0.8}
      orderBy={'score'}
    />
    // ...
  );
}
```


#### Props

Prop  | Type | Description
----------- | ------- | -------
```conversationId``` | String(REQUIRED) | The ID of the conversation.
```confidenceThreshold``` | Number | A value between 0 to 1 which will be used to filter the topics.
```orderBy``` | String | Sort topics based on either `score` or `text`.
```colorize``` | Boolean | Toggle to enable the coloring of the topic pills.
```color``` | String | Change the text color.
```backgroundColor``` | String | Change the background color.
```onTopicClick``` | Function | Callback called when a topic is clicked.
