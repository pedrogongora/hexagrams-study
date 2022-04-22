import styles from './CircularTopdownHexagram.module.css'

export const CircularTopdownHexagram = ({ hexagram }) => {
  const lines = Array.from(hexagram.binaryString).map(Number)
  const color = l => (lines[l - 1] ? '#fff' : '#000')
  return (
    <div className={styles.wrapper}>
      <svg
        version="1.0"
        viewBox="0 0 360 360"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m6.9767 178.6 86.602-150 86.601 150h-173.2z"
          style={{
            fillRule: 'evenodd',
            fill: color(4),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
        <path
          d="m93.579 28.605 86.601 150 86.6-150-173.2.005z"
          style={{
            fillRule: 'evenodd',
            fill: color(5),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
        <path
          d="m180.18 178.6 86.6-150 86.61 150z"
          style={{
            fillRule: 'evenodd',
            fill: color(6),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
        <path
          d="m180.18 178.6 86.6 150 86.61-150z"
          style={{
            fillRule: 'evenodd',
            fill: color(3),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
        <path
          d="m93.579 328.6 86.601-150 86.6 150h-173.2z"
          style={{
            fillRule: 'evenodd',
            fill: color(2),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
        <path
          d="m6.9767 178.6 86.602 150 86.601-150h-173.2z"
          style={{
            fillRule: 'evenodd',
            fill: color(1),
            strokeLinecap: 'round',
            strokeLinejoin: 'round',
            stroke: '#000',
          }}
        />
      </svg>
    </div>
  )
}
