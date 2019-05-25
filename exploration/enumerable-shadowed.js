if (typeof console === 'undefined') console = { log: print };


let base = { x: 0 };

let derived = Object.create(null, {
  x: { enumerable: false, configurable: true, value: 0 },
});

Object.setPrototypeOf(derived, base);


for (let key in derived) {
  console.log(key);
}
