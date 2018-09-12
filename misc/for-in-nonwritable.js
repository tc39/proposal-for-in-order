if (typeof console === 'undefined') console = { log: print };

let obj = Object.create(null, {
  x: { enumerable: true, configurable: true, writable: true, value: 0 },
  y: { enumerable: true, configurable: false, writable: false, value: 0 },
  a: { enumerable: true, configurable: true, writable: true, value: 0 },
});
Object.defineProperty(obj, 'z', { enumerable: true, configurable: false, writable: false, value: 0 });

for (let key in obj) {
  Object.defineProperty(obj, 'w', { enumerable: true, configurable: false, writable: false, value: 0 });
  console.log(key);
}
