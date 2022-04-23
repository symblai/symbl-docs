---
id: subscribing-to-existing-connection
title: Subscribing to an Existing Connection
slug: /web-sdk/code-snippets/subscribing-to-existing-connection/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

To subscribe to an existing connection, you can use the [`subscribeToConnection`](/web-sdk/web-sdk-reference/web-sdk-reference/#subscribetoconnectionsessionid-string) method with the Subscribe API. 

The Subscribe API allows you to connect to a conversation or a meeting in listen-only mode. Read more about Subscribe API [here](/docs/subscribe-api/). 

:::info Authentication

Your Symbl API Credentials, that is, your App ID and App Secret are required for authentication. Learn how to get them in the [Authentication](/docs/developer-tools/authentication) section. 

:::

```js

import { Symbl } from "@symblai/symbl-web-sdk";

try {

    // We recommend to remove appId and appSecret authentication for production applications.
    // See authentication section for more details
    const symbl = new Symbl({
        appId: '<your App ID>',
        appSecret: '<your App Secret>',
        // accessToken: '<your Access Toknen>'
    });
    
    // Open a Symbl Streaming API WebSocket Connection.
    const connection = await symbl.subscribeToConnection("<YOUR SESSION ID>");

    // Retrieve real-time transcription from the conversation
    connection.on("speech_recognition", (speechData) => {
      const { punctuated } = speechData;
      const name = speechData.user ? speechData.user.name : "User";
      console.log(`${name}: `, punctuated.transcript);
    });
    
    // This is just a helper method meant for testing purposes.
    // Waits 60 seconds before continuing to the next API call.
    await symbl.wait(60000);;
    
    // Closes the WebSocket connection.
    connection.disconnect();
} catch(e) {
    // Handle errors here.
}

```