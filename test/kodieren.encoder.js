'use strict'

const test = require('tape')
const { Encoder } = require('../')

const decodeArray = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ]

test('\nEncoder no preEncode or postDecode', function(t) {
  const encoder = new Encoder(decodeArray, [ 0, 0b111 ])
  const encoded = encoder.encode('c')
  const decoded = encoder.decode(encoded)

  t.equal(encoded, 2)
  t.equal(decoded, 'c')
  t.end()
})

test('\nEncoder no preEncode or postDecode', function(t) {
  const encoder = new Encoder(decodeArray, [ 0, 0b111 ], x => x.toLowerCase(), x => '^' + x)
  const encoded = encoder.encode('C')
  const decoded = encoder.decode(encoded)

  t.equal(encoded, 2)
  t.equal(decoded, '^c')
  t.end()
})
