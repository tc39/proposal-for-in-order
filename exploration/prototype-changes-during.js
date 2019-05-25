if (typeof console === 'undefined') console = { log: print };


let derived = { x: 0 };

let baseOne = { y: 0 };

let baseTwo = { z: 0 };



Object.setPrototypeOf(derived, baseOne);


for (let key in derived) {
  Object.setPrototypeOf(derived, baseTwo);
  console.log(key);
}
