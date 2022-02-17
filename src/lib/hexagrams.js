import * as R from 'ramda'
import { branch, isOdd } from './fpUtil'

import hexagrams from '../hexagrams.json'

const binarySequence = [
  2, 24, 7, 19, 15, 36, 46, 11, 16, 51, 40, 54, 62, 55, 32, 34, 8, 3, 29, 60,
  39, 63, 48, 5, 45, 17, 47, 58, 31, 49, 28, 43, 23, 27, 4, 41, 52, 22, 18, 26,
  35, 21, 64, 38, 56, 30, 50, 14, 20, 42, 59, 61, 53, 37, 57, 9, 12, 25, 6, 10,
  33, 13, 44, 1,
]

// negateBinString :: String -> String
export const negateBinString = R.pipe(
  Array.from,
  R.map(R.pipe(Number, Boolean, R.not, n => (n ? '1' : '0'))),
  R.join('')
)

// findByBinString :: String -> [Hexagram] -> Hexagram
export const findByBinString = R.curry((b, hs) =>
  R.find(R.pipe(R.prop('binaryString'), R.equals(b)), hs)
)

// findByWenNum :: Number -> [Hexagram] -> Hexagram
export const findByWenNum = R.curry((n, hs) =>
  R.find(R.pipe(R.prop('wenNumber'), R.equals(n)), hs)
)

// byWenNumber :: Number -> Hexagram
export const byWenNumber = n => findByWenNum(n, hexagrams)

// byBinaryString :: String -> Hexagram
export const byBinaryString = s => findByBinString(s, hexagrams)

// inverseBinString :: String -> String
export const inverseBinString = R.pipe(
  branch([R.pipe(R.identity, R.reverse), R.identity]),
  R.ifElse(R.apply(R.equals), negateBinString, R.head)
)

// binStringFromCore :: String -> String
export const binStringFromCore = R.pipe(
  branch([R.slice(0, 3), R.slice(1, 4)]),
  R.concat
)

// getBinaryString :: Hexagram -> Number
export const getBinaryString = R.prop('binaryString')

// getWenNumber :: Hexagram -> Number
export const getWenNumber = R.prop('wenNumber')

// getOppositeWenNumber :: Hexagram -> Number
export const getOppositeWenNumber = R.prop('opposite')

// getInverseWenNumber :: Hexagram -> Number
export const getInverseWenNumber = R.pipe(
  R.prop('wenNumber'),
  R.ifElse(isOdd, R.add(1), R.flip(R.subtract)(1))
)

// getComplementaryWenNumber :: Hexagram -> Number
export const getComplementaryWenNumber = R.pipe(
  getBinaryString,
  negateBinString,
  byBinaryString,
  getWenNumber
)

// byCoreString :: String -> Hexagram
export const byCoreString = s =>
  findByBinString(binStringFromCore(s), hexagrams)

export const toGraphNode = hexagram => {
  const { wenNumber, name, char } = hexagram
  return {
    id: wenNumber,
    name: `${char} ${wenNumber}. ${name}`,
    val: '',
    char,
    color: '#000',
    hexagram,
  }
}

export const toOppositeLink = R.pipe(
  branch([R.prop('wenNumber'), getOppositeWenNumber]),
  ([wen, opp]) => ({
    source: wen,
    target: opp,
    name: 'opposite',
    color: '#0f0',
    linkOpacity: 0.5,
  })
)

export const toInverseLink = R.pipe(
  branch([R.prop('wenNumber'), getInverseWenNumber]),
  ([wen, inv]) => ({
    source: wen,
    target: inv,
    name: 'inverse',
    color: '#f00',
    linkOpacity: 0.5,
  })
)

export const toWenSequenceLink = ({ wenNumber }) => ({
  source: wenNumber,
  target: wenNumber === 1 ? 64 : wenNumber - 1,
  name: 'wen-sequence',
  color: '#ce5cc0',
  linkOpacity: 0.5,
})

export const computeWenSequenceLinks = circular =>
  [...Array(circular ? 64 : 63).keys()]
    .map(R.add(circular ? 1 : 2))
    .map(n => findByWenNum(n, hexagrams))
    .map(toWenSequenceLink)

export const computeBinarySequenceLinks = circular =>
  binarySequence
    .map((n, i) => ({
      source: n,
      target: binarySequence[i !== 63 ? i + 1 : circular ? 0 : undefined],
      name: 'fu-xi-sequence',
      color: '#ded532',
      linkOpacity: 0.5,
    }))
    .filter(({ target }) => target !== undefined)

const complementaryBin = R.pipe(
  R.prop('binaryString'),
  R.split(''),
  R.map(Number),
  R.map(Boolean),
  R.map(R.not),
  R.map(b => (b ? 1 : 0)),
  R.map(n => `${n}`),
  R.join('')
)

export const computeComplementaryLinks = hexagrams => {
  const bins = hexagrams
    .map(complementaryBin)
    .map(bin => hexagrams.find(h => h.binaryString === bin).wenNumber)
    .map((w, n) => ({
      source: n + 1,
      target: w,
      name: 'complementary',
      color: '#00f',
      linkOpacity: 0.5,
    }))
  return bins
}
