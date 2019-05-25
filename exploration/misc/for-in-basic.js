if (typeof console === 'undefined') console = { log: print };

let x = {
  1: 0,
  [Symbol('b')]: 0,
  'a': 0,
  '2': 0,
  'c': 0,
  'b': 0,
  [Symbol('a')]: 0,
  0: 0,
  '-1': 0,
  'd': 0,
  3: 0,
};

for (let key in x) {
  console.log(key.toString());
  delete x[3];
  delete x.d;
  x[4] = 0;
  x.e = 0;
}

console.log(JSON.stringify(x));
console.log(Object.keys(x).join(', '));
