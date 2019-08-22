# Specifying for-in enumeration order

(Partially.)

ECMA-262 leaves the order of `for (a in b) ...` [almost totally unspecified](https://tc39.github.io/ecma262/#sec-enumerate-object-properties), but real engines tend to be consistent in at least some cases. Furthermore, over the years implementations have observed that anyone who wants to run code on the web needs to follow some constraints not captured by the spec.

This is a [stage 2 proposal](https://tc39.github.io/process-document/) to begin fixing that.

## Background

Historical efforts to get consensus on a complete specification of the order of for-in have repeatedly failed, in part because all engines have their own idiosyncratic implementations which are the result of a great deal of work and which they don't really want to revisit.

See the [exploration](exploration/) directory for background and test cases from before this was a concrete proposal.


## A conservative underapproximation of interop semantics

From [this list of interop semantics](exploration#interop-semantics) we can derive a conservative underapproximation of cases where engines already agree, which I believe covers the most common common cases. Specifically:

- Neither the object being iterated nor anything in its prototype chain is exotic.
- Neither the object being iterated nor anything in its prototype has their `[[SetPrototypeOf]]`, `[[DefineOwnProperty]]`, and `[[Delete]]` methods called during iteration, except by `EnumerateObjectProperties` itself.
- No non-enumerable property shadows an enumerable one.

The first two are fairly easy to specify in prose; the third is somewhat harder. As far as I know JavaScriptCore is the only engine which will output anything in [this case](exploration/enumerable-shadowed.js), because of [this longstanding bug](https://bugs.webkit.org/show_bug.cgi?id=38970).

In addition, since [the only case where calling `[[Delete]]` but not `[[DefineOwnProperty]]` leads to divergence in engine behavior](exploration/delete-shadowed.js) is only divergent in ChakraCore and XS, I'm hoping it can be removed from the list in the second bullet point above.

## Spec text

See [candidate spec text](https://tc39.github.io/proposal-for-in-exploration/). This does not yet capture the "no non-enumerable property shadows an enumerable one" constraint above, because I am having trouble figuring out how to say that.
