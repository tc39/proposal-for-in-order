if (typeof console === 'undefined') console = { log: print };

let a = Object.create(null, {
  0: { enumerable: false, configurable: true, value: 0 },
  1: { enumerable: true, configurable: true, value: 1 },
});

let b = {
  2: 2,
};

function name(x) {
  return x === a ? 'a' : (x === b ? 'b' : 'unknown');
}

let handlers = {
  has(target, propertyName) {
    console.log(name(target) + " has: " + propertyName);
    return Reflect.has(target, propertyName);
  },
  getOwnPropertyDescriptor(target, propertyName) {
    console.log(name(target) + " getOwnPropertyDescriptor: " + propertyName);
    return Reflect.getOwnPropertyDescriptor(target, propertyName);
  },
  ownKeys(target) {
    console.log(name(target) + " ownKeys");
    return Reflect.ownKeys(target);
  },
  getPrototypeOf(target) {
    console.log(name(target) + " getPrototypeOf");
    return Reflect.getPrototypeOf(target);
  },
};

let pa = new Proxy(a, handlers);
let pb = new Proxy(b, handlers);

Object.setPrototypeOf(a, pb);


for (let x in pa) {
  console.log(x);
}
