---
id: web-sdk-reference
title: Web SDK Reference
slug: /web-sdk/web-sdk-reference/web-sdk-reference/
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

## Symbl Class

The Symbl class takes in an optional [SymblConfig](/web-sdk/web-sdk-reference/configuration-reference/#symbl-configuration). **If no config is passed, you must authenticate later using the `init` method.**

### `init(symblConfig: SymblConfig)`

Validates and initializes Symbl with application configuration.

#### Example

```js
const symbl = new Symbl();
symbl.init({
  accessToken: '<Your Access Token>',
  // appId: '<Your App ID>',
  // appSecret: '<Your App Secret>',
})
```

---

### `createConnection(sessionId?: string, audioStream?: AudioStream)`

Accepts an optional sessionId and an optional instance of [AudioStream](#audiostream-class).

Validates that SessionID is unique and then opens a Symbl Streaming API WebSocket connection.

Returns an instance of [StreamingAPIConnection](#streamingapiconnection-class).

#### Example

```js
const symbl = new Symbl();
const connection = symbl.createConnection("abc123");
```

---

### `createAndStartNewConnection(options: StreamingAPIConnectionConfig, audioStream?: AudioStream)`

Accepts a required [Connection Config](/web-sdk/web-sdk-reference/configuration-reference/#connection-configuration) object and an optional instance of [AudioStream](#audiostream-class).

Opens a new connection and starts processing audio.

Returns an instance of [StreamingAPIConnection](#streamingapiconnection-class).

#### Example

```js
const symbl = new Symbl();
const connection = symbl.createAndStartNewConnection({
  config: {
    encoding: "OPUS"
  }
});
```

---

### `subscribeToConnection(sessionId: string)`

Accepts a required Session ID to subscribe to.

Establishes a Subscribe API connection with session ID.

Returns an instance of [SubscribeAPIConnection](#subscribeapiconnection-class)

#### Example

```js
const symbl = new Symbl();
const connection = symbl.subscribeToConnection(sessionId);
```

---

### `Symbl.wait(time: number, unit: string = TimeUnit.MS)`

Waits for provided amount of time in the supplied units (ms, s, min).

#### Example

```js
// Waits 5 seconds
await Symbl.wait(5000);
```

## StreamingAPIConnection Class

The `StreamingAPIConnection` class represents a Streaming API WebSocket connection. In most instances you would be interfacing with this class from the return variable on [`createConnection`](#createconnectionsessionid-string-audiostream-audiostream) or [`createAndStartNewConnection`](#createandstartnewconnectionoptions-streamingapiconnectionconfig-audiostream-audiostream). You can also import it from the Web SDK and use it separately: `import { StreamingAPIConnection } from '@symblai/symbl-web-sdk';`. `StreamingAPIConnection` inherits from the `BaseConnection` base class.

### `connect()`

Will open a Symbl Streaming API WebSocket connection. If already connected will log a warning. Once successfully connected, will send out the `connected` event.

#### Example

```js
const connection = await symbl.createConnection();
await connection.connect();
```

---

### `disconnect()`

Disconnects from Symbl Streaming API WebSocket

#### Example

```js
connection.disconnect();
```

---

### `startProcessing(options: StreamingAPIConnectionConfig)`

Accepts a required [Connection Config](/web-sdk/web-sdk-reference/configuration-reference/#connection-configuration)

Triggers the streaming connection to begin processing audio through Symbl websocket

#### Example

```js
connection.startProcessing({
  config: {
    encoding: "OPUS"
  }
});
```

---

### `stopProcessing()`

Triggers the streaming connection to stop processing audio through Symbl websocket. If `disconnectOnStopRequest` is set to `false` then the WebSocket will be put into a non-processing state which can be resumed later by calling `startProcessing` again. If `disconnectOnStopRequest` is not set or set to `true` the WebSocket connection will need to be re-opened to start processing audio again.

#### Example

```js
connection.startProcessing({
  config: {
    encoding: "OPUS"
  }
});
```

---

### `on(eventName: EventTypes, callback: Function)`

Subscribe to an event and perform a callback when it's fired.

Checkout out our [Events / Callbacks Reference](/web-sdk/web-sdk-reference/events-and-callbacks/) for more information.

#### Example

```js
connection.on('connected', () => {
  console.log('I am connected!');
})
```

---

### `modifySampleRate(sampleRateHertz: number)`

Accepts a sample rate in hertz, e.g. `48000`

Updates the sample rate mid-stream and sends out the `session_modified` event


#### Example

```js
connection.modifySampleRate(48000);
```

---

### `getSessionId()`

Getter for the `sessionId`.

#### Example

```js
const sessionId = connection.getSessionId();
```

---

### `isProcessing()`

Returns true if the connection is processing audio.

#### Example

```js
connection.isProcessing();
```

---

### `isConnected()`

Returns true if connected to the WebSocket.

#### Example

```js
connection.isConnected();
```


### `updateAudioStream(audioStream: AudioStream)`

Accepts an [AudioStream](#audiostream-class) instance.

Replaces the existin audio stream with the one provided. Will stop processing if currently processing audio.

#### Example

```js
const audioStream = new OpusAudioStream();
connection.updateAudioStream(audioStream);
```

## SubscribeAPIConnection Class

The `SubscribeAPIConnection` class represents a Subscribe API WebSocket connection. In most instances you would be interfacing with this class from the return variable on [`subscribeToConnection`](#subscribetoconnectionsessionid-string). You can also import it from the Web SDK and use it separately: `import { SubscribeAPIConnection } from '@symblai/symbl-web-sdk';`. `SubscribeAPIConnection` inherits from the `BaseConnection` base class.

### `connect()`

Will open a Symbl Subscribe API WebSocket connection. If already connected will log a warning. Once successfully connected, will send out the `connected` event.

#### Example

```js
const connection = await symbl.createConnection();
await connection.connect();
```

---

### `disconnect()`

Disconnects from Symbl Subscribe API WebSocket

#### Example

```js
connection.disconnect();
```

---

### `on(eventName: EventTypes, callback: Function)`

Subscribe to an event and perform a callback when it's fired.

#### Example

```js
connection.on('connected', () => {
  console.log('I am connected!');
})
```

---

### `isConnected()`

Returns true if connected to the WebSocket.

#### Example

```js
connection.isConnected();
```

## AudioStream Class

`LINEAR16AudioStream` and `OpusAudioStream` both inherit from the `AudioStream` base class, so their usage is identical. The main difference is `LINEAR16AudioStream` is meant to be paired with the `LINEAR16` encoding type, and the `OpusAudioStream` is meant to be paired with the `OPUS` encoding type.

### `attachAudioDevice(deviceId: string, mediaStream: MediaStream)`

Accepts an optional [deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) and an optional [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream). If no `deviceId` is passed, the default device is used.

Attaches audio device either through default browser method creating a MediaStream or via a passed in MediaStream

#### Example

```js
audioStream.attachAudioDevice("my-device-id");
```

---

### `detachAudioDevice()`

Disconnects processor to cleanly detach the audio input device.

#### Example

```js
audioStream.detachAudioDevice();
```

---

### `updateAudioDevice(deviceId: string, mediaStream: MediaStream)`

Accepts an optional [deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId) and an optional [MediaStream](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream). If no `deviceId` is passed, the default device is used.

Updates the audio device in use by the audio stream.

#### Example

```js
audioStream.updateAudioDevice("my-device-id");
```

---

:::note
Make sure to use the appropriate element type for `SourceElement` functions. Different types of `AudioSourceElement` and `VideoSourceElement` are available. 
:::

### `attachAudioSourceElement(audioSourceDomElement)`

Accepts a required [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Attaches an audio element to the processor and starts processing audio data from the audio file. In order to start processing you need to call `.play()` on the audio element. We recommend doing this after the `processing_started` Event has been fired.


#### Example

```js
// Authenticate with Symbl
const symbl = new Symbl({
  accessToken: "< MY ACCESS TOKEN >"
});

// Create your audio element
const myAudioElement = new Audio();
myAudioElement.type = "audio/mp3";
myAudioElement.src = "link-to-file.mp3";

// Attach audio element to AudioStream
const audioStream = new LINEAR16AudioStream();
audioStream.attachAudioSourceElement(myAudioElement);

// Create connection and start processing audio
const connection = symbl.createConnection("abc123", audioStream);
connection.startProcessing({
  config: {
    encoding: "LINEAR16"
  }
});

// Play the element once audio is ready to be processed.
connection.on("processing_started", () => {
  myAudioElement.play();
});
```

---

### `detachAudioSourceElement()`

Disconnects processor to cleanly detach the audio source element.

#### Example

```js
audioStream.detachAudioSourceElement();
```

---

### `updateAudioSourceElement(audioSourceDomElement)`

Accepts a required [HTMLAudioElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Updates the audio element attached to the audio stream.


#### Example

```js
audioStream.updateAudioSourceElement(myAudioElement);
```

---

### `attachVideoSourceElement(audioSourceDomElement)`

Accepts a required [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Attaches a video element to the processor and starts processing audio data from the video file. To start processing you need to call `.play()` on the audio element. Symbl recommends doing this after the `processing_started` event has been fired.


#### Example

```js
// Authenticate with Symbl
const symbl = new Symbl({
  accessToken: "< MY ACCESS TOKEN >"
});

// Create your audio element
const myVideoElement = document.createElement("video");
myVideoElement.type = "video/mp4";
myVidioElement.src = "link-to-file.mp4";

// Attach audio element to AudioStream
const audioStream = new LINEAR16AudioStream();
audioStream.attachVideoSourceElement(myVideoElement);

// Create connection and start processing audio
const connection = symbl.createConnection("abc123", audioStream);
connection.startProcessing({
  config: {
    encoding: "LINEAR16"
  }
});

// Play the element once audio is ready to be processed.
connection.on("processing_started", () => {
  myAudioElement.play();
});
```

---

### `detachVideoSourceElement()`

Disconnects the processor to cleanly detach the video source element.

#### Example

```js
audioStream.detachVideoSourceElement();
```

---

### `updateVideoSourceElement(videoSourceDomElement)`

Accepts a required [HTMLVideoElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement) or [HTMLSourceElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSourceElement). A `type` with the Content-Type is required and the `src` attribute is also required. The `src` attribute can be a URL or a [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)

Updates the video element attached to the audio stream.


#### Example

```js
audioStream.updateVideoSourceElement(myVideoElement);
```

---

