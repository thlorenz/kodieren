'use strict'

const test = require('tape')
const spok = require('spok')
// eslint-disable-next-line no-unused-vars
const ocat = require('./util/ocat')

const { dectoen, maskForBits, bitsToLayout, shiftMask, isolate } = require('../')

test('\ndectoen', function(t) {
  const map = dectoen([ 'foo', 'bar', 'foofoo' ])
  spok(t, Array.from(map),
    [ [ 'foo', 0 ], [ 'bar', 1 ], [ 'foofoo', 2 ] ])
  t.end()
})

test('\nmaskForBits', function(t) {
  t.equal(maskForBits(1), 0b1)
  t.equal(maskForBits(2), 0b11)
  t.equal(maskForBits(5), 0b11111)
  t.end()
})

test('\nbitsToLayout', function(t) {
  const res = bitsToLayout([ [ 'foo', 2 ], [ 'bar', 4 ] ])
  spok(t, res,
    { foo: [ 0, 0b11 ], bar: [ 2, 0b1111 ] })
  t.end()
})

test('\nshiftMask', function(t) {
  t.equal(shiftMask(0b100010110011, 4, 0b1111), 0b1011)
  t.equal(shiftMask(0b100010110011, 2, 0b1111), 0b1100)
  t.equal(shiftMask(0b100010110011, 2, 0b111111), 0b101100)
  t.end()
})

test('\nisolate', function(t) {
  t.equal(isolate(0b100010110011, 4, 4), 0b1011)
  t.equal(isolate(0b100010110011, 2, 4), 0b1100)
  t.equal(isolate(0b100010110011, 2, 6), 0b101100)
  t.end()
})
