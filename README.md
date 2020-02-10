**This proposal has been accepted and [merged into the main specification](https://github.com/tc39/ecma262/pull/1791). This repository exists only for historical interest.**

# Specifying for-in enumeration order

(Partially.)

ECMA-262 leaves the order of `for (a in b) ...` [almost totally unspecified](https://tc39.github.io/ecma262/#sec-enumerate-object-properties), but real engines tend to be consistent in at least some cases. Furthermore, over the years implementations have observed that anyone who wants to run code on the web needs to follow some constraints not captured by the spec.

This is a [stage 4 (finished) proposal](https://tc39.github.io/process-document/) to begin fixing that.

## Background

Historical efforts to get consensus on a complete specification of the order of for-in have repeatedly failed, in part because all engines have their own idiosyncratic implementations which are the result of a great deal of work and which they don't really want to revisit.

See the [exploration](exploration/) directory for background and test cases from before this was a concrete proposal.


## A conservative underapproximation of interop semantics

From [this list of interop semantics](exploration#interop-semantics) we can derive a conservative underapproximation of cases where engines already agree, which I believe covers the most common common cases. Specifically:

- Neither the object being iterated nor anything in its prototype chain is a proxy, typed array, module namespace object, or host exotic object.
- Neither the object nor anything in its prototype chain has its prototype change during iteration.
- Neither the object nor anything in its prototype chain has a property deleted during iteration.
- Nothing in the object's prototype chain has a property added during iteration.
- No property of the object or anything in its prototype chain has its enumerability change during iteration.
- No non-enumerable property shadows an enumerable one.

All but the last are fairly easy to specify in prose; the last is somewhat harder. As far as I know JavaScriptCore is the only engine which will output anything in [this case](exploration/enumerable-shadowed.js), because of [this longstanding bug](https://bugs.webkit.org/show_bug.cgi?id=38970), so I am hopeful that point can be discarded.

## Effects

There are a variety of APIs which make a property enumeration order observable. `for-in` is the most complex, because it, uniquely, enumerates properties from the prototype chain as well. The remaining can be split into those which use the same order as `for-in` does for own properties, which are affected by this proposal, and those which use the same order as `Reflect.ownKeys`, which are not.

### `for-in`-ordered APIs

The following APIs use [`EnumerableOwnPropertyNames`](https://tc39.es/ecma262/#sec-enumerableownpropertynames), which requires that its results be ordered "in the same relative order as would be produced by the Iterator that would be returned if the EnumerateObjectProperties internal method were invoked with [the object in question]". [`EnumerateObjectProperties`](https://tc39.es/ecma262/#sec-enumerate-object-properties) is the spec-internal method which is used by `for-in`, and is the part of the spec which this proposal is concerned with improving.

- [`Object.keys`](https://tc39.es/ecma262/#sec-object.keys)
- [`Object.values`](https://tc39.es/ecma262/#sec-object.values)
- [`Object.entries`](https://tc39.es/ecma262/#sec-object.entries)
- [`JSON.parse`](https://tc39.es/ecma262/#sec-json.parse) via [`InternalizeJSONProperty`](https://tc39.es/ecma262/#sec-internalizejsonproperty)
- [`JSON.stringify`](https://tc39.es/ecma262/#sec-json.stringify) via [`SerializeJSONObject`](https://tc39.es/ecma262/#sec-serializejsonobject)

The [other-effects](other-effects/) directory contains tests demonstrating simple examples of how each of these are observable. All major engines already agree in all of these cases.

Because all of the objects produced by `JSON.parse` are within the interop semantics, it will be fully specified after this proposal. The others can all be passed exotic arguments and so will not.

### `Reflect.ownKeys`-ordered APIs

The following APIs invoke the `[[OwnPropertyKeys]]` internal method directly, whose behavior is fully specified. They are therefore not affected by this proposal.

- [`Reflect.ownKeys`](https://tc39.es/ecma262/#sec-reflect.ownkeys)
- [`Object.getOwnPropertyNames`](https://tc39.es/ecma262/#sec-object.getownpropertynames) (via [`GetOwnPropertyKeys`](https://tc39.es/ecma262/#sec-getownpropertykeys))
- [`Object.getOwnPropertySymbols`](https://tc39.es/ecma262/#sec-object.getownpropertysymbols) (via [`GetOwnPropertyKeys`](https://tc39.es/ecma262/#sec-getownpropertykeys))
- [`Object.assign`](https://tc39.es/ecma262/#sec-object.assign)
- [`Object.create`](https://tc39.es/ecma262/#sec-object.create) (via [`ObjectDefineProperties`](https://tc39.es/ecma262/#sec-objectdefineproperties))
- [`Object.defineProperties`](https://tc39.es/ecma262/#sec-object.defineproperties) via [`ObjectDefineProperties`](https://tc39.es/ecma262/#sec-objectdefineproperties)
- [`Object.getOwnPropertyDescriptors`](https://tc39.es/ecma262/#sec-object.getownpropertydescriptors)
- [`Object.freeze`](https://tc39.es/ecma262/#sec-object.freeze) (via [`SetIntegrityLevel`](https://tc39.es/ecma262/#sec-setintegritylevel))
- [`Object.seal`](https://tc39.es/ecma262/#sec-object.seal) (via [`SetIntegrityLevel`](https://tc39.es/ecma262/#sec-setintegritylevel))
- [`Object.isFrozen`](https://tc39.es/ecma262/#sec-object.isfrozen) (via [`TestIntegrityLevel`](https://tc39.es/ecma262/#sec-testintegritylevel))
- [`Object.isSealed`](https://tc39.es/ecma262/#sec-object.issealed) (via [`TestIntegrityLevel`](https://tc39.es/ecma262/#sec-testintegritylevel))
- [object spread](https://tc39.es/ecma262/#sec-object-initializer-runtime-semantics-propertydefinitionevaluation) (via [`CopyDataProperties`](https://tc39.es/ecma262/#sec-copydataproperties))
- object rest in both [assignment](https://tc39.es/ecma262/#sec-runtime-semantics-restdestructuringassignmentevaluation) and [binding](https://tc39.es/ecma262/#sec-destructuring-binding-patterns-runtime-semantics-restbindinginitialization) position (via [`CopyDataProperties`](https://tc39.es/ecma262/#sec-copydataproperties))

## Spec text

See [candidate spec text](http://tc39.es/proposal-for-in-order/). This does not yet capture the "no non-enumerable property shadows an enumerable one" constraint above, because I am having trouble figuring out how to say that.
