if (typeof console === 'undefined') console = { log: print };

let a = Object.create(null, {
  x: { enumerable: false, configurable: true, value: 0 },
});

let handler = {
  ownKeys(target) {
    let ret = Reflect.ownKeys(target);
    console.log(ret);
    return ret;
  },
  getOwnPropertyDescriptor(t, p) {
    console.log('gopd', p);
    let ret = Reflect.getOwnPropertyDescriptor(t, p);
    // console.log(ret.enumerable);
    // Object.defineProperty(ret, 'enumerable', { get: () => (console.log('getter'), false) });
    // Object.defineProperty(ret, 'value', { get: () => (console.log('value getter'), 0) });
    // o.enumerable = true;
    return ret;
  },
};

let pa = new Proxy(a, handler);

for (let key in pa) {
  console.log('reached');
}
