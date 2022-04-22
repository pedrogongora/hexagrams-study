import {
  byWenNumber,
  getComplementaryWenNumber,
  getInverseWenNumber,
} from '../../lib/hexagrams'
import { hexagramComponentOfType } from './hexagramComponentOfType'

import styles from './HexagramSquare.module.css'

const HexagramWrapper = ({ type, hexagram }) => {
  //console.log('hex', hexagram )
  const HC = hexagramComponentOfType(type)
  return (
    <div className={styles.HexagramComponentWrap}>
      <div>
        <HC hexagram={hexagram} />
      </div>
      <div>
        {hexagram.wenNumber}. {hexagram.name}
      </div>
    </div>
  )
}

const HexagramSquare = ({ type, baseHexagramNumber, hexagrams }) => {
  const base = byWenNumber(baseHexagramNumber)
  const complementary = byWenNumber(getComplementaryWenNumber(base))
  const inverse = byWenNumber(getInverseWenNumber(base))
  const inverseComplementary = byWenNumber(getInverseWenNumber(complementary))
  return (
    <div className={styles.HexagramSquare}>
      <div>
        <div>
          <HexagramWrapper type={type} hexagram={base} />
          {complementary !== inverse && (
            <>
              <div className={styles.hLink}>inverso</div>
              <HexagramWrapper type={type}  hexagram={inverse} />
            </>
          )}
        </div>
        <div>
          <div
            className={complementary !== inverse ? styles.vLink : styles.vLink2}
          >
            {complementary !== inverse ? 'complementario' : 'inverso/complementario'}
          </div>
          {complementary !== inverse && (
            <>
              <div>&nbsp;</div>
              <div className={styles.vLink}>complementario</div>
            </>
          )}
        </div>
      </div>
      <div>
        <div>
          <HexagramWrapper type={type}  hexagram={complementary} />
          {complementary !== inverse && (
            <>
              <div className={styles.hLink}>inverso</div>
              <HexagramWrapper type={type}  hexagram={inverseComplementary} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HexagramSquare
