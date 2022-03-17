---
title: Custom Trackers (Beta)
id: custom-trackers
sidebar_label: Custom Trackers (Beta)
slug: /guides/custom-trackers
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

:::note In Beta Phase
This feature is in the Beta phase. If you have any questions, ideas or suggestions please reach out to us at devrelations@symbl.ai.
:::

Custom Trackers are defined by you to solve for your specific business use case. You can create, edit, delete and manage your custom Trackers in two ways: 

1. Using **Trackers APIs** 
2. Using **Trackers Management UI**

## Trackers API

The Trackers APIs are built over our [Management API](/docs/management-api/introduction) that shifts the onus of maintaining these entities from you to Symbl’s backend. This means that the Management API comprehensively manages your Tracker entities at your account level while offering you an easy-to-consume REST interface. 

:::info
For step-by-step instructions on how to use Trackers API see the [Using Trackers API](/docs/management-api/trackers/overview) page. 
:::

The following Trackers APIs are available:

Operation  | Endpoint
---------- | -------
Creating Trackers | [`POST` v1/manage/tracker](/management-api/trackers/create-tracker)
Creating Trackers in Bulk | [`POST` v1/manage/trackers](/management-api/trackers/create-tracker#bulk-create-trackers-api)
Getting Trackers with ID| [`GET` v1/manage/tracker/{trackerId}](/management-api/trackers/get-tracker#get-tracker-by-id)
Getting Trackers with name | [`GET` v1/manage/trackers?&name={trackerName}](/management-api/trackers/get-tracker#get-tracker)
Updating Trackers| [`PUT`v1/manage/tracker/{trackerId}](/management-api/trackers/update-tracker)
Deleting Trackers| [`DELETE`v1/manage/tracker/{trackerId}](/management-api/trackers/delete-tracker)

:::note
Currently, Trackers is supported with our Async APIs and Streaming APIs.
:::

### Trackers Management UI 

The other option is to use the Tracker Management UI instead of making an API call. This UI provides you with a simple interface to create, view, edit, and delete Trackers. It is available as a part of your Symbl Platform account. Log in to your [Symbl Platform](https://platform.symbl.ai/#/login) account to start using the Trackers Management UI. 

The following capabilities are supported in the Trackers Management UI:

- Creating Trackers
- Viewing Trackers
- Editing Trackers
- Deleting Trackers

![img-tracker-ui](/img/tracker-ui-1.png)

:::tip
The Trackers Management UI allows you to copy the Tracker ID using the copy button and use it directly in your code, if you wish to. To do this, 

1. Go to your created Tracker and click on the select option. The edit options shows up. 

![copy-tracker-id](/img/copy-tracker-id.png)
2. Click **Copy ID**. This copies the Tracker ID in the following format:

`{"trackers":[{"id":"4807227589263360"}]}`

You can now paste the Tracker ID copied in your clipboard directly in your code!
:::

:::important
**Using punctuations**: While creating a Tracker, you can only pass periods `.`, apostrophes `'` and dashes `-` in the Trackers vocabulary. Other punctuations like `?`, `,`, `!`, `:` are not allowed.<br/>
**Vocabulary terms**: We recommend that you add at least 5 and a maximum of 50 vocabulary terms per Tracker.<br/>
**Trackers limitation**: You can create up to 500 Trackers per account. 
:::

## Tutorials

The following step-by-step instructions will get you started with Trackers API quickly:

#### Trackers API

- [How to create a Tracker](/docs/management-api/trackers/overview#consuming-trackers-with-management-api)
- [How to create Trackers with Async API](/docs/management-api/trackers/overview#consuming-trackers-with-async-apis)
- [How to create Trackers with Streaming API](/docs/management-api/trackers/overview#consuming-trackers-with-streaming-api)
- [Viewing detected Trackers with Async API](/docs/async-api/code-snippets/track-phrases-in-a-conversation/#view-detected-trackers)
- [Detect Key Phrases with Streaming API](/docs/streamingapi/code-snippets/detect-key-phrases/#ontrackerresponse-json-response-example)
- [How to create Trackers in Bulk](/docs/management-api/trackers/create-tracker#create-trackers-in-bulk)
- [How to receive Trackers in Spanish with Streaming API](/docs/streamingapi/code-snippets/receive-trackers-in-spanish)

