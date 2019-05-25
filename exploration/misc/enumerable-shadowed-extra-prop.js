if (typeof console === 'undefined') console = { log: print };


let a = Object.create(null, {
  q: { enumerable: false, configurable: true, value: 0 },
  r: { enumerable: true, configurable: true, value: 0 },
});

let b = {
  q: 1,
};

Object.setPrototypeOf(a, b);


for (let x in a) {
  console.log(x);
}
