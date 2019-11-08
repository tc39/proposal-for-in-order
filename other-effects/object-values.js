if (typeof console === 'undefined') console = { log: print };

let values = Object.values({ a: 0, b: 1 });
console.log(values[0]);
console.log(values[1]);
