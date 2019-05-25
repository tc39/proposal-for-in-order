if (typeof console === 'undefined') console = { log: print };


let base = Object.create(null, {
  prop: { enumerable: false, configurable: true, value: 0 },
});

let derived = Object.create(base, {
  prop: { enumerable: true, configurable: true, value: 0 },
});



for (let key in derived) {
  console.log(key);
}
