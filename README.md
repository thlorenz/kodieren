# kodieren [![build status](https://secure.travis-ci.org/thlorenz/kodieren.svg?branch=master)](http://travis-ci.org/thlorenz/kodieren)

Encoding related utilities

## Installation

    npm install kodieren

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

-   [API](#api)
    -   [dectoen](#dectoen)
    -   [maskForBits](#maskforbits)
    -   [bitsToLayout](#bitstolayout)
        -   [Example:](#example)
    -   [shiftMask](#shiftmask)
    -   [Example](#example)
    -   [isolate](#isolate)
    -   [number](#number)
    -   [bin](#bin)
-   [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [API](https://thlorenz.github.io/kodieren)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### dectoen

Derives an encoding map from a decoding table

**Parameters**

-   `arr` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;T>** encoding table

Returns **[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;T, [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** decoding map

### maskForBits

Gets the bit mask for the specified number of bits

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number of bits

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the bitmask, i.e. `111` for 3 bits

### bitsToLayout

Takes a table of properties with bit length and derives bit layout from it.
The bit layout is a hash map indexed by property name and each entry contains
the index of the property in the bit field and it's mask needed to isolate it.

#### Example:

    bitsToLayout([ [ 'foo', 2 ], [ 'bar', 4 ] ])
    // => { foo: [ 0, 0b11 ], bar: [ 2, 0b1111 ] }

**Parameters**

-   `bits` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** 

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)&lt;[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>** 

### shiftMask

Righ shifts the given number as specified and then applies the given mask.
This is useful to isolate information from a bit field.

### Example

    shiftMask(0b100010110011, 4, 0b1111)
    => 0b1011

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the number containing the information we want
-   `digits` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the amount
-   `mask` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the mask to apply after shifting

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the result after shift and mask was applied

### isolate

Isolates some digits from a bit field

**Parameters**

-   `bits` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the bit field
-   `idx` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the index at which the digits to isolate start (from the right)
-   `len` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the amount of bits to isolate

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the isolated bits

### number

An array of numbers whose index is equal it's value.
Useful if we need to pass a table when encoding a number.

Type: [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### bin

Renders a binary representation of the given number padded as specified

**Parameters**

-   `n` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** number to print
-   `nbits` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** amount of total digits to print (optional, default `32`)

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the rendered number

### Encoder

Instantiates an encoder that uses the decodeArray to encode/decode to/from.

#### Example

    const decodeArray = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]
    const encoder = new Encoder(decodeArray, [ 0, 0b111 ])
    const encoded = encoder.encode('c')
    const decoded = encoder.decode(encoded)
    console.log({ encoded, decoded })
    // => { encoded: 2, decoded: 'c' }

**Parameters**

-   `decodeArray` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;T>** the decode/encode map
-   `Array.null`  &lt;Number, Number> `[ bitIdx, mask ]` used to isolate values from the given bits
-   `preEncode` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** conversion function run before an item is encoded (optional, default `identity`)
-   `postDecode` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** conversion function run after an item is decoded (optional, default `identity`)

Returns **[Encoder](#encoder)** instance

### Encoder.encode

Encodes the item to bits according to the encoding table derived from the
decodeArray

**Parameters**

-   `item` **T** item to encode

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** bits representing the item

### Encoder.decode

Decodes the bits from the decodeArray

**Parameters**

-   `bits` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** bits to decode

Returns **T** the item represented by the bits

## License

MIT
