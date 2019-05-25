if (typeof console === 'undefined') console = { log: print };


let a = { x: 0 };

let b = { y: 1 };

Object.setPrototypeOf(a, b);

for (let key in a) {
  console.log(key);
  delete b.y;
  if (key === 'y') {
    console.log('reached');
  }
}
