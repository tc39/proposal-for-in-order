if (typeof console === 'undefined') console = { log: print };

let base = { y: 0 };

let derived = { x: 0, y: 0, z: 0 };

Object.setPrototypeOf(derived, base);

for (let key in derived) {
  console.log(key);
  delete derived.y;
}
