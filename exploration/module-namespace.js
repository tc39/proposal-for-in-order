// Note: not all CLIs support loading modules.
// As an alternative, you can run a webserver in this directory and open module-namespace.html in your browser.

export let a;

import * as obj from './module-namespace.js';

for (let key in obj) {
  console.log(key);
}

export let b;
