import styles from './Hexagram.module.css'

const YangLine = ({ y }) => (
  <rect
    x="0rem"
    y={`${y}rem`}
    width="5rem"
    height="0.6rem"
    style={{ fill: '#000', stroke: '#000', strokeWidth: '0' }}
  />
)

const YinLine = ({ y }) => (
  <>
    <rect
      x="0rem"
      y={`${y}rem`}
      width="2rem"
      height="0.6rem"
      style={{ fill: '#000', stroke: '#000', strokeWidth: '0' }}
    />
    <rect
      x="3rem"
      y={`${y}rem`}
      width="2rem"
      height="0.6rem"
      style={{ fill: '#000', stroke: '#000', strokeWidth: '0' }}
    />
  </>
)

export const Hexagram = ({ hexagram }) => {
  const lines = Array.from(hexagram.binaryString).map(Number)
  const color = l => (lines[l - 1] ? '#fff' : '#000')
  return (
    <div className={styles.wrapper}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="5rem"
        height="6rem"
      >
        {lines.map((line, i) =>
          line ? <YangLine y={i} /> : <YinLine y={i} />
        )}
      </svg>
    </div>
  )
}

/* export const Hexagram = ({ hexagram }) => {
  const lines = Array.from(hexagram.binaryString).map(Number)
  const lineClass = l => styles[lines[l - 1] ? 'yang' : 'yin']
  return (
    <div className={styles.wrapper}>
      <div className={lineClass(6)} />
      <div className={lineClass(5)} />
      <div className={lineClass(4)} />
      <div className={lineClass(3)} />
      <div className={lineClass(2)} />
      <div className={lineClass(1)} />
    </div>
  )
} */
