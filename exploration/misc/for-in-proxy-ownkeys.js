if (typeof console === 'undefined') console = { log: print };

x = new Proxy({ 'a':0, 'c':0, 'b':0, 1: 0 }, {
  ownKeys: () => ['a', 'c', 'b', '1'],
});

for (let a in x) {
  console.log(a);
}

console.log(Object.keys(x).join(', '));