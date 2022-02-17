import { useState } from 'react'

import GraphView from './components/GraphView/GraphView'
import ListView from './components/ListView/ListView'

import './App.css'

import hexagrams from './hexagrams.json'

const views = ['list', 'graph']
const listGroupTypes = [
  'no-group',
  'by-core',
  'by-time',
  'complementary-inverse',
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
  'traditional',
  'squared',
  'circular',
  'squared-lr',
  'circular-topdown',
  'squared-topdown',
  'squared-clock',
  'squared-numerology',
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
  const [type, setType] = useState('traditional')
  const [view, setView] = useState('graph')
  const [group, setGroup] = useState('no-group')
  const [graphType, setGraphType] = useState('3D')
  const [nodeType, setNodeType] = useState('dot')
  const [selectedLinks, setSelectedLinks] = useState([])
  const [plotDimensions, setPlotDimensions] = useState('spatial')
  return (
    <>
      <div>
        <Select options={views} value={view} setter={setView} />
        {view === 'list' && (
          <>
            <Select options={listGroupTypes} value={group} setter={setGroup} />
            <Select options={hexagramTypes} value={type} setter={setType} />
          </>
        )}
        {view === 'graph' && (
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
      {view === 'list' && (
        <ListView type={type} group={group} hexagrams={hexagrams} />
      )}
      {view === 'graph' && (
        <GraphView
          graphType={graphType}
          plotDimensions={plotDimensions}
          nodeType={nodeType}
          selectedLinks={selectedLinks}
          hexagrams={hexagrams}
          type={type}
        />
      )}
    </>
  )
}

export default App
