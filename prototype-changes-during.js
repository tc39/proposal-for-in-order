if (typeof console === 'undefined') console = { log: print };


let derived = { q: 0 };

let baseOne = { r: 0 };

let baseTwo = { s: 0 };



Object.setPrototypeOf(derived, baseOne);


for (let key in derived) {
  Object.setPrototypeOf(derived, baseTwo);
  console.log(key);
}
