---
id: concepts
title: Websockets
description: Symbl.ai's Streaming API is based on Websocket protocol. Learn more about what is a WebSocket and how to establish a connection now.
sidebar_label: Websockets
slug: /concepts/websockets/
---

<head>
    <title>Building a Websocket Connection</title>
</head>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

Symbl's Streaming API is based on WebSocket protocol. This Web Socket is a general-purpose protocol that suits any application designed for real-time, two-way communication within a browser — like chat apps, collaboration software, and multiplayer games.

## What is a Websocket?

WebSockets are a thin transport layer built on top of a device’s TCP/IP stack that support the famous “full duplex” connection.

### Establishing a Websocket Connection

To establish a WebSocket connection, an HTTP-based handshake is exchanged between the client and the server.

Once successful, the application-layer protocol is **“upgraded” from HTTP to WebSockets**.

This allows data to be sent or received using WebSockets with a much lower latency and less technical overhead than the traditional HTTP request-response cycle.

<!-- ![Websocket](/img/websocket.png) -->

For either of those to run smoothly, the application has to establish a two-way communication so that both the client app and the server can send messages to one another, at the same time.
