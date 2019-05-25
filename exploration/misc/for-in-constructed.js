if (typeof console === 'undefined') console = { log: print };


function Ctor() {
  let x = this;

  x[4] = 0;
  x.a = 0;
  x['2'] = 0;
  x.c = 0;
  x.b = 0;
  x[0] = 0;
  x[-1] = 0;
  x.d = 0;
  x[3] = 0;
}

let x = new Ctor();
for (let key in x) {
  console.log(key.toString());
  delete x[3];
  delete x.d;
  x[4] = 0;
  x.e = 0;
}
