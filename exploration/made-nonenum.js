if (typeof console === 'undefined') console = { log: print };


let a = { x: 0, y: 0, z: 0 };


for (let key in a) {
  console.log(key);
  Object.defineProperty(a, 'y', { enumerable: false, configurable: true, writable: true, value: 0 });
}
