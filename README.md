## Exploring `for-in` in modern JavaScript

Some tests for the behavior of `for (a in b) ...` in modern JavaScript engines. The specification leaves this [almost totally unspecified](https://tc39.github.io/ecma262/#sec-enumerate-object-properties), but real engines tend to be more consistent.

I suggest running these with [`eshost-cli`](https://github.com/bterlson/eshost-cli) with the `--coalesce` flag.

The main interesting cases are in the top level directory. Some others I was playing with are under [misc/](misc/).

See [spec issue](https://github.com/tc39/ecma262/issues/1281) which inspired this.


### Some history

This is one of the least-specified parts of ECMAScript, which is closely related to the unfortunately fact that, historically, engines have differed wildly outside of some narrow cases. We've tried to improve things over time, but without much success. Discussions of this go back to the pre-ES3.1 days (most recently, see the unsuccessful [enumeration strawman](https://web.archive.org/web/20160324035200/http://wiki.ecmascript.org/doku.php?id=strawman:enumeration
) for ES2015), and have re-occurred for every iteration of the spec since.

But ES2015 did introduce a requirement (in `Reflect.ownKeys`) for engines to preserve information about the insertion order of non-integer (or at least [non-array](https://github.com/tc39/ecma262/pull/1242)) keys, and to be able to list integer keys in ascending order before any other keys. Since then, all the major engines have started using that order in the most common cases.


### Real constraints

The lack of specificity in ECMA-262 does not reflect reality. In discussion going back years, implementors have observed that there are some constraints on the behavior of `for-in` which anyone who wants to run code on the web needs to follow. From what I can gather from discussions (see [below](#previous-discussions)), the most crucial of these are

- no property name is ever returned twice
- a property which is deleted (from the entire prototype chain) before it is returned, and never re-added, is never returned
- for non-integer properties, properties are returned in insertion order
- properties which are added to the base object being iterated after iteration begins are not returned.

(assuming no weirdness with proxies or mutable prototypes or whatever).

The spec requires the first of these, and can be construed to require the second, but leaves the third and fourth explicitly up to implementations. But an implementation which tried to do something unusual with any of these would quickly run into problems.


### Problems for proxies

The existing spec language doesn't make much sense to me in a world with proxies. It refers to enumerable properties, properties being deleted, properties being added, "the" prototype of the object, etc. Few of these terms are defined in terms of MOP traps, and no guidance is given as to which, when, and how often those traps should be invoked. So how are we to interpret these?

Allen gives [some interpretations](https://github.com/tc39/ecma262/issues/1281#issuecomment-411152466), but these are still a bit imprecise for my taste.

While implementations all differ (see [this comment](https://github.com/tc39/ecma262/issues/1281#issuecomment-410949570) or run [proxy-trapped.js](proxy-trapped.js)), there's a bit of commonality in that they all use the `getOwnPropertyDescriptor` trap to inspect properties (though they differ on which properties they inspect, and in what order, and also have bugs).


### Interop semantics

Engines differ in an exciting variety of ways, but only in unusual cases. In particular, as long as the following hold for the duration of iteration

- No proxies or host objects, including in the prototype chain ([test](proxy-trapped.js))
- Prototype chain does not change ([test](prototype-changes-during.js))
- No property is added to something up the prototype chain (but may be added to the object itself) ([test](list-build-order.js))
- No property's enumerability changes ([test](made-nonenum.js), [test](made-enum.js))
- No property is deleted and then re-added ([test](deleted-readded.js) and [SM bug](https://bugzilla.mozilla.org/show_bug.cgi?id=569735#c29))
- No non-enumerable property shadows an enumerable one ([test](enumerable-shadowed.js) and [V8 bug](https://bugs.chromium.org/p/v8/issues/detail?id=8163))
- No shadowing property is deleted ([test](delete-shadowed.js))
- No property is deleted from something in the prototype chain ([SM bug](https://bugzilla.mozilla.org/show_bug.cgi?id=1486656))

then all engines I have on hand (V8, SpiderMonkey, ChakraCore, JavaScriptCore, XS) conform to the reference implementation's behavior (modulo [this ChakraCore bug](https://github.com/Microsoft/ChakraCore/issues/4486)).

The reference implementation behaves pretty much exactly like you'd expect:

```js
function* EnumerateObjectProperties(obj) {
  const visited = new Set();
  for (const key of Reflect.ownKeys(obj)) {
    if (typeof key === "symbol") continue;
    const desc = Reflect.getOwnPropertyDescriptor(obj, key);
    if (desc) {
      visited.add(key);
      if (desc.enumerable) yield key;
    }
  }
  const proto = Reflect.getPrototypeOf(obj);
  if (proto === null) return;
  for (const protoKey of EnumerateObjectProperties(proto)) {
    if (!visited.has(protoKey)) yield protoKey;
  }
}
```

(Assuming no one touches the built-ins to which it refers.)


### Previous discussions

(Yes, I have read every comment in every one of these threads.)


#### Chrome issues

- https://bugs.chromium.org/p/v8/issues/detail?id=6
- https://bugs.chromium.org/p/v8/issues/detail?id=164
- https://bugs.chromium.org/p/v8/issues/detail?id=705
- https://bugs.chromium.org/p/v8/issues/detail?id=3056
- https://bugs.chromium.org/p/chromium/issues/detail?id=883
- https://bugs.chromium.org/p/chromium/issues/detail?id=20144
- https://bugs.chromium.org/p/chromium/issues/detail?id=37404


#### FireFox issues

- https://bugzilla.mozilla.org/show_bug.cgi?id=569735#c29
- https://bugzilla.mozilla.org/show_bug.cgi?id=865760#c5


#### Esdiscuss threads

- https://mail.mozilla.org/pipermail/es-discuss/2008-April/thread.html#6235
- https://mail.mozilla.org/pipermail/es-discuss/2008-June/thread.html#6425
- https://mail.mozilla.org/pipermail/es-discuss/2009-October/thread.html#10032
- https://mail.mozilla.org/pipermail/es5-discuss/2010-February/thread.html#3484
- https://mail.mozilla.org/pipermail/es-discuss/2010-December/thread.html#12459
- https://mail.mozilla.org/pipermail/es5-discuss/2010-April/003533.html
- https://mail.mozilla.org/pipermail/es5-discuss/2010-May/thread.html#3536
- https://mail.mozilla.org/pipermail/es-discuss/2011-March/thread.html#12965
- https://mail.mozilla.org/pipermail/es-discuss/2013-April/thread.html#30204
- https://mail.mozilla.org/pipermail/es-discuss/2015-April/thread.html#42508
- https://mail.mozilla.org/pipermail/es-discuss/2015-August/thread.html#43995


#### TC39 notes

- https://github.com/rwaldron/tc39-notes/blob/096b8af38c4b4b9684b09692a70938d49b5451a7/es7/2016-01/jan-28.md#5xix-proxy-enumerate---revisit-decision-to-exhaust-iterator
- https://github.com/rwaldron/tc39-notes/blob/1d2cb2c585b301732ec9e83ea41f543b38398291/es7/2015-11/nov-18.md#proxy-enumerate-ocerconstrains-implementations-ak


#### TC39 issues

- https://github.com/tc39/ecma262/issues/161
- https://github.com/tc39/Reflector/issues/1
- https://github.com/tc39/Reflector/issues/2
