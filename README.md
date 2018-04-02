## [@amarajs/plugin-dom](https://github.com/amarajs/plugin-dom)

Plugin middleware for AmaraJS to add HTML to DOM nodes dynamically.

### Installation

`npm install --save @amarajs/plugin-dom`

### Usage

```javascript
// https://github.com/Matt-Esch/virtual-dom
import virtualDom from 'virtual-dom';

import Amara from '@amarajs/core';
import AmaraDOM from '@amarajs/plugin-dom';
import AmaraBrowser from '@amarajs/plugin-engine-browser';
const amara = new Amara([
    AmaraDOM(virtualDom),
    AmaraBrowser()
]);
```

### Feature Type

The `@amarajs/plugin-dom` middleware allows you to create features of type `"dom"`.

#### Return Values

For `{type: "dom"}` features, your apply function should return either an array of virtual DOM nodes or a single root DOM node with optional children.

```javascript
import h from 'virtual-dom/h';

amara.add({
    type: 'dom',
    targets: ['main'],
    apply: () => [
        h('div', [
            h('p', 'some text'),
            h('p', 'some more text')
        ])
    ]
});

amara.add({
    type: 'dom',
    targets: ['main > div'],
    apply: () => h('p', '... and even more text')
});
```

### Using JSX

You can use JSX instead of creating virtual DOM directly. Simply add the `@jsx` pragma to the top of your file and use the appropriate configuration for your build process.

For example, the following `index.js` and `rollup.config.js` will produce a simple hello world application:

```javascript
// index.js
/** @jsx h */

import vDOM from 'virtual-dom';
import Amara from '@amarajs/core';
import AmaraDOM from '@amarajs/plugin-dom';
import AmaraBrowser from '@amarajs/plugin-engine-browser';

const h = vDOM.h;

new Amara([
    AmaraBrowser(),
    AmaraDOM(vDOM)
])
    .add({
        type: 'dom',
        targets: ['main'],
        apply: () => (<p>Hello, world!</p>)
    })
    .bootstrap(document.querySelector('body'));
```

```javascript
// rollup.config.js
import buble from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';

export default {
    entry: 'index.js',
	useStrict: false,
	plugins: [
        resolve({
            jsnext: true,
            main: true,
            browser: true
        }),
        buble()
    ]
};
```

### Applying Multiple Results to the Same Target

If multiple `{type: "dom"}` features target the same DOM, the DOM will be appended to the target node in the order the features were applied.

### Customization

Construct the `@amarajs/plugin-dom` instance by providing an instance of VirtualDOM. See https://github.com/Matt-Esch/virtual-dom for details.

### Bundled Dependencies

`@amarajs/plugin-dom` comes bundled with the excellent [vdom-parser](https://www.npmjs.com/package/vdom-parser) library to ensure HTML isn't overwritten when applying `"dom"` features to existing DOM targets.

### Contributing

If you have a feature request, please create a new issue so the community can discuss it.

If you find a defect, please submit a bug report that includes a working link to reproduce the problem (for example, using [this fiddle](https://jsfiddle.net/04f3v2x4/)). Of course, pull requests to fix open issues are always welcome!

### License

The MIT License (MIT)

Copyright (c) Dan Barnes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
