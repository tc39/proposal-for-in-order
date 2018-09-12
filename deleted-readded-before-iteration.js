if (typeof console === 'undefined') console = { log: print };

let a = {
  y: 0,
  z: 0,
  x: 0,
};
delete a.z;
a.z = 0;

for (let key in a) {
  console.log(key);
}
