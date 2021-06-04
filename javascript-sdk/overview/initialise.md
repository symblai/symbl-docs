---
id: initialise
title: Initialize the SDK
sidebar_label: Initialize the SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Redirect} from '@docusaurus/router';


<Redirect to="/docs/javascript-sdk/overview/introduction" />


## Installation

First start by installing our Javascript SDK:

```bash
$ npm install --save symbl-node
```


## Initialize

<Tabs
  defaultValue="nodejs"
  values={[
    { label: 'Node.js', value: 'nodejs', }
  ]
}>

<TabItem value="nodejs">

```js
 sdk.init({
    // APP_ID and APP_SECRET come from the Symbl Platform: https://platform.symbl.ai
    appId: APP_ID,
    appSecret: APP_SECRET,
    basePath: 'https://api.symbl.ai'
  })
  .then(() => console.log('SDK Initialized.'))
  .catch(err => console.error('Error in initialization.', err));
 ```
 </TabItem>

 </Tabs>

 Import the SDK using the ES5 or ES6 way:

<Tabs
  defaultValue="es5"
  values={[
    { label: 'ES5', value: 'es5', },
    { label: 'ES6', value: 'es6', }
  ]
}>

<TabItem value="es5">

```js

var sdk = require('symbl-node').sdk;
```

 </TabItem>

<TabItem value="es6">

```js

import { sdk } from 'symbl-node';
```

</TabItem>
</Tabs>
