if (typeof console === 'undefined') console = { log: print };


let a = Object.create(null, {
  a: { enumerable: true, configurable: true, value: 0 },
  b: { enumerable: true, configurable: true, value: 0 },
  q: { enumerable: true, configurable: true, value: 0 },
  r: { enumerable: false, configurable: true, value: 0 },
});

let b = {
  r: 1,
};

Object.setPrototypeOf(a, b);


for (let x in a) {
  delete a.r;
  console.log(x);
}
