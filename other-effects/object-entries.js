if (typeof console === 'undefined') console = { log: print };

let entries = Object.entries({ a: 0, b: 1 });
console.log(entries[0][0], entries[0][1]);
console.log(entries[1][0], entries[1][1]);
