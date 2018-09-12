if (typeof console === 'undefined') console = { log: print };


let c = { a: 0 };

let a = { x: 0, y: 1, z: 2 };

let b = { y: 1 };

Object.setPrototypeOf(a, b);
Object.setPrototypeOf(c, a);

for (let key in c) {
  console.log(key);
  delete a.y;
}
