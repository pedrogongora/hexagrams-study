import * as R from 'ramda'

import HexagramSquare from './HexagramSquare'

import { hexagramComponentOfType } from './hexagramComponentOfType'
import {
  byWenNumber,
  getComplementaryWenNumber,
  getInverseWenNumber,
} from '../../lib/hexagrams'

const hexagramCore = R.pipe(R.prop('binaryString'), R.slice(1, 5))

const hexagramTime = R.pipe(R.prop('binaryString'), s => `${s[0]}${s[5]}`)

const areSameCore = (a, b) => hexagramCore(a) === hexagramCore(b)

const areSameTime = (a, b) => hexagramTime(a) === hexagramTime(b)

const hexagramListItemStyle = {
  width: '8rem',
  padding: '1rem',
  textAlign: 'center',
  boxSizing: 'border-box',
}

const AllHexagrams = ({ type, hexagrams }) => {
  const HexagramComponent = hexagramComponentOfType(type)
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      {hexagrams.map(h => (
        <div key={h.binaryString} style={hexagramListItemStyle}>
          <HexagramComponent hexagram={h} />
          <div>
            {h.wenNumber}. {h.name}
          </div>
        </div>
      ))}
    </div>
  )
}

const GroupHexagrams = ({ type, group, hexagrams }) => {
  const HexagramComponent = hexagramComponentOfType(type)
  const groupFn = group === 'by-core' ? areSameCore : areSameTime
  const groupProp = group === 'by-core' ? hexagramCore : hexagramTime
  const sortProp = group === 'by-core' ? hexagramTime : hexagramCore
  const groups = R.pipe(R.sortBy(groupProp), R.groupWith(groupFn))(hexagrams)
  return (
    <>
      {groups.map(g => (
        <div>
          <h3>
            {group} - {groupProp(g[0])}
          </h3>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          >
            {R.sortBy(sortProp, g).map(h => (
              <div key={h.binaryString} style={hexagramListItemStyle}>
                <HexagramComponent hexagram={h} />
                <div>
                  {h.wenNumber}. {h.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const ComplementaryInverseSquareList = ({ type, hexagrams }) => {
  const hexagramsMap = new Map()
  hexagrams.forEach(h => hexagramsMap.set(h.wenNumber, h))
  const getDiagonalHexagramNumber = R.pipe(
    getComplementaryWenNumber,
    byWenNumber,
    getInverseWenNumber
  )
  const squares = []
  hexagrams.forEach(h => {
    if (hexagramsMap.get(h.wenNumber) === undefined) return
    const inverse = getInverseWenNumber(h)
    const complementary = getComplementaryWenNumber(h)
    const diagonal = getDiagonalHexagramNumber(h)
    hexagramsMap.delete(h.wenNumber)
    hexagramsMap.delete(complementary)
    hexagramsMap.delete(inverse)
    hexagramsMap.delete(diagonal)
    squares.push(h.wenNumber)
  })
  console.log('squares', squares)
  return (
    <>
      {squares.map(baseHexagramNumber => (
        <div key={`Square_item_baseHexagramNumber_${baseHexagramNumber}`}>
          <h3>Cuadro {baseHexagramNumber}</h3>
          <HexagramSquare
            key={`hex-${baseHexagramNumber.wenNumber}`}
            baseHexagramNumber={baseHexagramNumber}
            hexagrams={hexagrams}
          />
        </div>
      ))}
    </>
  )
}

const ListView = ({ type, group, hexagrams }) => (
  <>
    {group === 'no-group' && <AllHexagrams type={type} hexagrams={hexagrams} />}
    {(group === 'by-core' || group === 'by-time') && (
      <GroupHexagrams type={type} group={group} hexagrams={hexagrams} />
    )}
    {group === 'complementary-inverse' && (
      <ComplementaryInverseSquareList type={type} hexagrams={hexagrams} />
    )}
  </>
)

export default ListView
