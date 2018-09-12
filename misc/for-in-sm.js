if (typeof console === 'undefined') console = { log: print };

let a = {
  x: 0,
  y: 1,
};

let pa = new Proxy(a, {});

for (let key in pa) {
  console.log(key);
  delete a.y;
  if (key === 'y') {
    console.log('reached');
  }
}
