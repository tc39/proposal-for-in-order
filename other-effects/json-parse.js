if (typeof console === 'undefined') console = { log: print };

function reviver(key, value) {
  console.log(key);
}

JSON.parse('{ "a": 0, "b": 1 }', reviver);
