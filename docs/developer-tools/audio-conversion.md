---
id: audio-conversion
title: Audio Conversion
sidebar_label: Audio Conversion

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

---

### Async Audio Conversion

Async Audio API supports files of either `.wav` or `.mp3` and the file must have `mono-channel audio` only. Any other file formats can be converted using the code snippet from [FFmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg)

`$ npm install --save fluent-ffmpeg`

> The below snippet shows how you can convert a file from .mp4 to .mp3 using the fluent-ffmpeg node module


<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="curl">

```js

```
</TabItem>

<TabItem value="nodejs">

```js
const ffmpeg = require('fluent-ffmpeg');

ffmpeg('/my/path/to/original/file.mp4')
    .format('mp3')
    .on('end', () => {
        console.log('end');
    })
    .on('error', (err) => {
        // error
    })
    .save('/path/to/output/file.mp3');
```

</TabItem>
</Tabs>
