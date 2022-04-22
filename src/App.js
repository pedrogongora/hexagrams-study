import { useState } from 'react'

import GraphView from './components/GraphView/GraphView'
import ListView from './components/ListView/ListView'

import './App.css'

import hexagrams from './hexagrams.json'

const views = ['lista', 'gráfica']
const listGroupTypes = [
  'secuencia Wen',
  'por núcleo',
  'por líneas de tiempo',
  'cuadros complementario-inverso',
]
const graphTypes = ['3D', '2D']
const nodeTypes = ['dot', 'name', 'hexagram', 'number']
const linkTypes = [
  'opposite',
  'inverse',
  'complementary',
  'wen-sequence',
  'fu-xi-sequence',
]
const plotDimensionTypes = ['spatial', 'planar', 'linear']
const hexagramTypes = [
  'tradicional',
  'hexagonal',
  'hexagonal-topdown',
  'hexagonal-bottomup',
  'cuadrado',
  'cuadrado-i-d',
  'cuadrado-topdown',
  'cuadrado-reloj',
  'cuadrado-numerologia',
]

const Select = ({ options, value, setter, multiple }) => (
  <select
    value={value}
    multiple={multiple}
    onChange={e =>
      setter(
        multiple
          ? Array.from(e.target.selectedOptions, option => option.value)
          : e.target.value
      )
    }
  >
    {options.map(optionValue => (
      <option key={optionValue}>{optionValue}</option>
    ))}
  </select>
)

const App = () => {
  const [type, setType] = useState('tradicional')
  const [view, setView] = useState('lista')
  const [group, setGroup] = useState('secuencia Wen')
  const [graphType, setGraphType] = useState('3D')
  const [nodeType, setNodeType] = useState('dot')
  const [selectedLinks, setSelectedLinks] = useState([])
  const [plotDimensions, setPlotDimensions] = useState('spatial')
  return (
    <div className="App">
      <div className='App_Controls'>
        <Select options={views} value={view} setter={setView} />
        {view === 'lista' && (
          <>
            <Select options={listGroupTypes} value={group} setter={setGroup} />
            <Select options={hexagramTypes} value={type} setter={setType} />
          </>
        )}
        {view === 'gráfica' && (
          <>
            <Select
              options={graphTypes}
              value={graphType}
              setter={setGraphType}
            />
            <Select options={nodeTypes} value={nodeType} setter={setNodeType} />
            <Select
              options={linkTypes}
              value={selectedLinks}
              multiple={true}
              setter={setSelectedLinks}
            />
            {graphType === '3D' && (
              <>
                {nodeType === 'hexagram' && (
                  <Select
                    options={hexagramTypes}
                    value={type}
                    setter={setType}
                  />
                )}
                <Select
                  options={plotDimensionTypes}
                  value={plotDimensions}
                  setter={setPlotDimensions}
                />
              </>
            )}
          </>
        )}
      </div>
      <div className='App_View'>
        {view === 'lista' && (
          <ListView type={type} group={group} hexagrams={hexagrams} />
        )}
        {view === 'gráfica' && (
          <GraphView
            graphType={graphType}
            plotDimensions={plotDimensions}
            nodeType={nodeType}
            selectedLinks={selectedLinks}
            hexagrams={hexagrams}
            type={type}
          />
        )}
      </div>
    </div>
  )
}

export default App
