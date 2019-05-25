if (typeof console === 'undefined') console = { log: print };

let a = {
  x: 0,
  y: 1,
};

for (let key in a) {
  console.log(key);
  delete a.y;
  if (key === 'y') {
    console.log('reached');
  }
}
