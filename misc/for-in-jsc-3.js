if (typeof console === 'undefined') console = { log: print };


let a = {
  x: 0,
};

let b = {
  x: 0,
};


let pb = new Proxy(b, {
  ownKeys(target) {
    return Reflect.ownKeys(target);
  },
});

Object.setPrototypeOf(a, pb);


for (let key in a) {
  console.log(key);
}
