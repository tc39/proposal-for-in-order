if (typeof console === 'undefined') console = { log: print };

let keys = Object.keys({ a: 0, b: 1 });
console.log(keys[0]);
console.log(keys[1]);
