if (typeof console === 'undefined') console = { log: print };

function trap(target, name) {
  const p = new Proxy(target, Reflect.ownKeys(Reflect).reduce((acc, k) => {
    acc[k] = function(...args) {
      console.log(k + ': ' + args.map(a => a === target ? '<' + name + '>' : a === p ? 'p<' + name + '>' : a).join(', '));
      return Reflect[k](...args);
    };
    return acc;
  }, {})); // TODO Object.fromEntries
  return p;
}




let a = {
  x: 0,
  y: 0,
};

let b = {
  x: 0,
  z: 0,
};



let pa = trap(a, 'a');
let pb = trap(b, 'b');

Object.setPrototypeOf(a, pb);


for (let key in pa) {
  console.log(key);
}
