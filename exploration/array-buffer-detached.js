// Note: this relies on a web API to detach the array buffer.

let a = new Uint8Array(3);

let done = false;
for (let key in a) {
  console.log(key);
  if (!done) {
    postMessage(null, '*', [a.buffer]);
    done = true;
  }
}
