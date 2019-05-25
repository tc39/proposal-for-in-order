if (typeof console === 'undefined') console = { log: print };

Array.prototype[1] = 0;

let a = [];

a.prop = 0;
a[2] = 0;
a[0] = 0;

for (let key in a) {
  // Object.defineProperty(a, 'y', { enumerable: true, configurable: true, value: 0 });
  // Object.defineProperty(a, 'w', { enumerable: true, configurable: true, get: () => 0 });
  console.log(key);
}
