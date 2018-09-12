if (typeof console === 'undefined') console = { log: print };

function trap(target, name) {
  const p = new Proxy(target, Reflect.ownKeys(Reflect).reduce((acc, k) => {
    acc[k] = function(...args) {
      console.log(k + ':', args.map(a => a === target ? '<' + name + '>' : a === p ? 'p<' + name + '>' : a));
      return Reflect[k](...args);
    };
    return acc;
  }, {})); // TODO Object.fromEntries
  return p;
}




let a = Object.create(null, {
  0: { enumerable: true, configurable: true, value: 0 },
  q: { enumerable: true, configurable: true, value: 0 },
  r: { enumerable: false, configurable: true, value: 0 },
  s: { enumerable: true, configurable: true, value: 0 },
  t: { enumerable: false, configurable: true, value: 0 },
  u: { enumerable: true, configurable: true, value: 0 },
  v: { enumerable: false, configurable: true, value: 0 },
  2: { enumerable: true, configurable: true, value: 0 },
});

let b = Object.create(null, {
  1: { enumerable: true, configurable: true, value: 0 },
  q: { enumerable: true, configurable: true, value: 0 },
  r: { enumerable: false, configurable: true, value: 0 },
  s: { enumerable: false, configurable: true, value: 0 },
  t: { enumerable: true, configurable: true, value: 0 },
  w: { enumerable: true, configurable: true, value: 0 },
  x: { enumerable: false, configurable: true, value: 0 },
  3: { enumerable: true, configurable: true, value: 0 },
});



let pa = trap(a, 'a');
let pb = trap(b, 'b');

Object.setPrototypeOf(a, pb);


for (let key in pa) {
  console.log(key);
}
