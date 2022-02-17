import * as R from 'ramda'

import HexagramSquare from './HexagramSquare'

import { hexagramComponentOfType } from './hexagramComponentOfType'
import {
  getComplementaryWenNumber,
  getInverseWenNumber,
} from '../../lib/hexagrams'

const hexagramCore = R.pipe(R.prop('binaryString'), R.slice(1, 5))

const hexagramTime = R.pipe(R.prop('binaryString'), s => `${s[0]}${s[5]}`)

const areSameCore = (a, b) => hexagramCore(a) === hexagramCore(b)

const areSameTime = (a, b) => hexagramTime(a) === hexagramTime(b)

const areSameComplementaryInverseSquare = (a, b) => {
  const aInverseWen = getInverseWenNumber(a)
  const aComplementary = getComplementaryWenNumber(a)
  const sameSquare =
    b.wenNumber === aInverseWen || b.wenNumber === aComplementary
  console.log('same sq?', a.binaryString, b.binaryString, sameSquare)
  return sameSquare
}

const compareComplementaryInverseSquare = (a, b) => {
  const sameSquare = areSameComplementaryInverseSquare(a, b)
  return sameSquare
    ? a.wenNumber > b.wenNumber
      ? 1
      : 0
    : a.wenNumber < b.wenNumber
    ? -1
    : 1
}

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
  const sortedHexagrams = hexagrams.sort(compareComplementaryInverseSquare)
  console.log('sortedHexagrams', sortedHexagrams.map(h => h.binaryString))
  const squares = R.groupWith(
    areSameComplementaryInverseSquare,
    sortedHexagrams
  )
  console.log('squares', squares)
  return (
    <>
      {squares.map(square => (
        <HexagramSquare key={`hex-${square[0].wenNumber}`} hexagrams={square} />
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
