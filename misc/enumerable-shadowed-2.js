if (typeof console === 'undefined') console = { log: print };


let base = { prop: 0 };

let derived = Object.create(base, {
  prop: { enumerable: false, configurable: true, value: 0 },
});


for (let key in derived) {
  console.log(key);
}
console.log(JSON.stringify(derived));
