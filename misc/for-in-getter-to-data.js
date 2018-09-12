if (typeof console === 'undefined') console = { log: print };

let a = Object.create(null, {
  x: { enumerable: true, configurable: true, get: () => 0 },
  y: { enumerable: true, configurable: true, get: () => 0 },
  z: { enumerable: true, configurable: true, value: 0 },
  w: { enumerable: true, configurable: true, value: 0 },
});

for (let key in a) {
  Object.defineProperty(a, 'y', { enumerable: true, configurable: true, value: 0 });
  Object.defineProperty(a, 'w', { enumerable: true, configurable: true, get: () => 0 });
  console.log(key);
}
