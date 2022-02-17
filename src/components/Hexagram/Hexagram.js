import styles from './Hexagram.module.css'

export const Hexagram = ({ hexagram }) => {
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
}
