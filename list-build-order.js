if (typeof console === 'undefined') console = { log: print };

let base = {
  x: 0,
};

let derived = {
  y: 0,
};

Object.setPrototypeOf(derived, base);


for (let key in derived) {
  derived.z = 0;
  base.w = 0;
  console.log(key);
}
