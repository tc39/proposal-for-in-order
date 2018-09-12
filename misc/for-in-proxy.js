typeof console === 'undefined' && (console = { log: print });
var o = {a : 0, b: 1, c: 2 };
for (let a in new Proxy(o, {
  has(a) {
    console.log('has', a);
    return true;
  },
  getOwnPropertyDescriptor(t, p) {
    console.log('gopd', p);
    return Reflect.getOwnPropertyDescriptor(t, p);
  },
})) {
  console.log(a);
  console.log('pd');
  delete o.b;
  console.log('ad');
}
