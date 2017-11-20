'use strict'

// As an annoying note bitshifting only works for up to 31 bit ints
// https://stackoverflow.com/a/307200/97443
// Therefore we'll use a max-word of 30bits which works out to 5 digits of our base64 encoding.
// This means each record needs to be limited to that size.

/**
 * Derives an encoding map from a decoding table
 *
 * @name dectoen
 *
 * @param {Array.<T>} arr encoding table
 * @returns {Map.<T, Number>} decoding map
 */
function dectoen(arr) {
  const map = new Map()
  for (var i = 0; i < arr.length; i++) {
    map.set(arr[i], i)
  }
  return map
}

/**
 * Gets the bit mask for the specified number of bits
 *
 * @name maskForBits
 *
 * @param {Number} n number of bits
 * @returns {Number} the bitmask, i.e. `111` for 3 bits
 */
function maskForBits(n) {
  return (0b1 << n) - 1
}

/**
 * Takes a table of properties with bit length and derives bit layout from it.
 * The bit layout is a hash map indexed by property name and each entry contains
 * the index of the property in the bit field and it's mask needed to isolate it.
 *
 * ### Example:
 *
 * ```
 * bitsToLayout([ [ 'foo', 2 ], [ 'bar', 4 ] ])
 * // => { foo: [ 0, 0b11 ], bar: [ 2, 0b1111 ] }
 * ```
 *
 * @name bitsToLayout
 *
 * @param {Array.<Array<String, Number>>} bits
 * @returns {Object.<Array.<Number, Number>>}
 */
function bitsToLayout(bits) {
  var idx = 0
  const map = {}
  for (const [ name, b ] of bits) {
    const mask = maskForBits(b)
    map[name] = [ idx, mask ]
    idx += b
  }
  return map
}

/**
 * Righ shifts the given number as specified and then applies the given mask.
 * This is useful to isolate information from a bit field.
 *
 * ## Example
 *
 * ```
 * shiftMask(0b100010110011, 4, 0b1111)
 * => 0b1011
 * ```
 *
 *
 * @name shiftMask
 *
 * @param {Number} n the number containing the information we want
 * @param {Number} digits the amount
 * @param {Number} mask the mask to apply after shifting
 * @returns {Number} the result after shift and mask was applied
 */
function shiftMask(n, digits, mask) {
  const shifted = n >> digits
  return shifted & mask
}

/**
 * Isolates some digits from a bit field
 *
 * @name isolate
 *
 * @param {Number} bits the bit field
 * @param {Number} idx the index at which the digits to isolate start (from the right)
 * @param {Number} len the amount of bits to isolate
 * @returns {Number} the isolated bits
 */
function isolate(bits, idx, len) {
  return (bits >> idx) & maskForBits(len)
}

/**
 * An array of numbers whose index is equal it's value.
 * Useful if we need to pass a table when encoding a number.
 *
 * @constant {Number} number
 * @default
 */const number = []
for (var i = 0; i < 1000; i++) {
  number[i] = i
}

/**
 * Renders a binary representation of the given number padded as specified
 *
 * @name bin
 *
 * @param {Number} n number to print
 * @param {Number}[nbits=32] amount of total digits to print
 * @returns {String} the rendered number
 */
function bin(n, nbits = 32) {
  return n.toString(2).padStart(nbits, '0')
}
module.exports = {
    dectoen
  , number
  , bitsToLayout
  , isolate
  , maskForBits
  , shiftMask
  , bin
}
