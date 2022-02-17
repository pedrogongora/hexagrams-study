import { hexagramComponentOfType } from './hexagramComponentOfType'

import styles from './HexagramSquare.module.css'

const HexagramComponent = ({ type, hexagram }) => {
  //console.log('hex', hexagram )
  const HC = hexagramComponentOfType(type)
  return <div className={styles.HexagramComponentWrap}>
    <div>
      <HC hexagram={hexagram} />
    </div>
    <div>
      {hexagram.wenNumber}. {hexagram.name}
    </div>
  </div>
}

const HexagramSquare = ({ type, hexagrams }) => {
  console.log('square', hexagrams)
  return (
    <div className={styles.HexagramSquare}>
      <HexagramComponent hexagram={hexagrams[0]} />
      <HexagramComponent hexagram={hexagrams[1]} />
      {hexagrams.length > 2 && (
        <>
          <HexagramComponent hexagram={hexagrams[2]} />
          <HexagramComponent hexagram={hexagrams[3]} />
        </>
      )}
    </div>
  )
}

export default HexagramSquare
