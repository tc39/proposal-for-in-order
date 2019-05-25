if (typeof console === 'undefined') console = { log: print };


let base = Object.create(null, {
  x: { enumerable: true, configurable: true, value: 0 },
  y: { enumerable: false, configurable: true, value: 0 },
  z: { enumerable: true, configurable: true, value: 0 },
});


let derived = Object.create(base, {
  w: { enumerable: true, configurable: true, value: 0 },
});


for (let key in derived) {
  console.log(key);
  Object.defineProperty(base, 'y', { enumerable: true, configurable: true, writable: true, value: 0 });
}
