import styles from './SquaredTopdownHexagram.module.css'

export const SquaredTopdownHexagram = ({ hexagram }) => {
  const lines = Array.from(hexagram.binaryString).map(Number)
  const lineClass = l => styles[`line-${l}-${(lines[l - 1] ? 'yang' : 'yin')}`]
  return (<div className={styles.wrapper}>
    <div className={lineClass(1)} />
    <div className={styles.core}>
      <div className={lineClass(2)} />
      <div className={lineClass(3)} />
      <div className={lineClass(5)} />
      <div className={lineClass(4)} />
    </div>
    <div className={lineClass(6)} />
  </div>)
}