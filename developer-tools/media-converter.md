---
id:  media-convertor
title: Media convertor
sidebar_label: Media convertor

---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Currently this utility only supports one feature:

* Transcode Audio file

This utility can be used as a library in your Node.js code. You can simply install it in your local project.


`$ npm install symbl-media --save`


Use the transcode command to transcode the file.


`$ media transcode -i ./my-input-file.wav -o ./my-output-file.mp3 -f mp3`


For more information please visit [this](https://github.com/symblai/symbl-media).

> You can quickly transcode an audio file using transcodeMediaFile method.

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>
<TabItem value="curl">

</TabItem>

<TabItem value="nodejs">

```js
const {transcodeMediaFile} = require('symbl-media');
(async () => {
    try {
        const result = await transcodeMediaFile('./my-input-file.wav', 'my-output-file.mp3','mp3');
        console.log('Successfully transcoded to: ', result.outPath);
    } catch (e) {
        console.error(e);
    }
})();
```

</TabItem>
</Tabs>
