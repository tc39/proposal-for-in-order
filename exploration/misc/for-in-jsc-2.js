if (typeof console === 'undefined') console = { log: print };

let a = Object.create(null, {
  x: { enumerable: false, configurable: true, value: 0 },
});

let handler = {
  getOwnPropertyDescriptor(t, p) {
    console.log('gopd');
    let o = Reflect.getOwnPropertyDescriptor(t, p);
    o.enumerable = true;
    return o;
  },
};

let pa = new Proxy(a, handler);

for (let key in pa) {
  console.log('reached');
}
