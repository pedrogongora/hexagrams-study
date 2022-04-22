import ReactDOMServer from 'react-dom/server'
import * as THREE from 'three'
import {
  CSS2DObject,
  CSS2DRenderer,
} from 'three/examples/jsm/renderers/CSS2DRenderer'
import SpriteText from 'three-spritetext'
import ForceGraph3D from 'react-force-graph-3d'
import ForceGraph2D from 'react-force-graph-2d'

import { Hexagram } from '../Hexagram/Hexagram'
import { SquaredHexagram } from '../Hexagram/SquaredHexagram'
import { SquaredTopdownHexagram } from '../Hexagram/SquaredTopdownHexagram'
import { SquaredLRHexagram } from '../Hexagram/SquaredLRHexagram'
import { SquaredClockHexagram } from '../Hexagram/SquaredClockHexagram'
import { SquaredNumerologyHexagram } from '../Hexagram/SquaredNumerologyHexagram'
import { CircularHexagram } from '../Hexagram/CircularHexagram'
import { CircularTopdownHexagram } from '../Hexagram/CircularTopdownHexagram'

import {
  computeBinarySequenceLinks,
  computeComplementaryLinks,
  computeWenSequenceLinks,
  toGraphNode,
  toInverseLink,
  toOppositeLink,
} from '../../lib/hexagrams'

const hexagramComponentOfType = type => {
  switch (type) {
    case 'cuadrado':
      return SquaredHexagram
    case 'cuadrado-i-d':
      return SquaredLRHexagram
    case 'cuadrado-topdown':
      return SquaredTopdownHexagram
    case 'cuadrado-reloj':
      return SquaredClockHexagram
    case 'cuadrado-numerologia':
      return SquaredNumerologyHexagram
    case 'hexagonal':
      return CircularHexagram
    case 'hexagonal-topdown':
      return CircularTopdownHexagram
    case 'tradicional':
    default:
      return Hexagram
  }
}

const hexagramNode = type => node => {
  const HexagramComponent = hexagramComponentOfType(type)
  const componentInstance = (
    <div style={{ transform: 'scale(50%)' }} title={`${node.name}`}>
      <HexagramComponent hexagram={node.hexagram} />
    </div>
  )
  const markup = ReactDOMServer.renderToStaticMarkup(componentInstance)
  const el = document.createElement('div')
  el.innerHTML = markup
  // console.log('node', node.id, el)
  return new CSS2DObject(el)
}

const textNode = nodeTextProp => node => {
  const sprite = new SpriteText(node[nodeTextProp])
  sprite.color = node.color
  sprite.textHeight = 3
  return sprite
}

const nodeThreeObjectOfType = (nodeType, type, nodeTextProp) => {
  if (nodeType === 'dot') return undefined
  if (nodeType === 'hexagram') return hexagramNode(type)
  return textNode(nodeTextProp)
}

const includeLinks = (linkType, selectedLinks) =>
  selectedLinks.includes(linkType)

const GraphView = ({
  graphType,
  plotDimensions,
  nodeType,
  type,
  selectedLinks,
  hexagrams,
}) => {
  const nodes = hexagrams.map(toGraphNode)
  const oppositeLinks = hexagrams.map(toOppositeLink)
  const inverseLinks = hexagrams.map(toInverseLink)
  const complementaryLinks = computeComplementaryLinks(hexagrams)
  const wenSequenceLinks = computeWenSequenceLinks(false) // hexagrams.map(toWenSequenceLink)
  const fuXiSequenceLinks = computeBinarySequenceLinks(false)
  // console.log('wenSequenceLinks', wenSequenceLinks)
  const links = [
    ...(includeLinks('fu-xi-sequence', selectedLinks) ? fuXiSequenceLinks : []),
    ...(includeLinks('wen-sequence', selectedLinks) ? wenSequenceLinks : []),
    ...(includeLinks('opposite', selectedLinks) ? oppositeLinks : []),
    ...(includeLinks('inverse', selectedLinks) ? inverseLinks : []),
    ...(includeLinks('complementary', selectedLinks) ? complementaryLinks : []),
  ]
  // console.log(selectedLinks, includeLinks('opposite', selectedLinks), links)
  const graphData = {
    nodes,
    links,
  }
  const Graph = graphType === '2D' ? ForceGraph2D : ForceGraph3D
  const numDimensions =
    plotDimensions === 'spatial' ? 3 : plotDimensions === 'planar' ? 2 : 1
  const nodeTextProp =
    nodeType === 'name' ? 'name' : nodeType === 'hexagram' ? 'char' : 'id'
  const options =
    graphType === '2D'
      ? {
          nodeCanvasObject:
            nodeType !== 'dot'
              ? (node, ctx, globalScale) => {
                  const label =
                    nodeType === 'name'
                      ? node.name
                      : nodeType === 'number'
                      ? node.id
                      : node.char
                  const fontSize = 5 // globalScale
                  ctx.font = `${fontSize}px Sans-Serif`
                  const textWidth = ctx.measureText(label).width
                  const bckgDimensions = [textWidth, fontSize].map(
                    n => n + fontSize * 0.2
                  ) // some padding

                  ctx.fillStyle = 'rgba(255, 255, 255, 0.0)'
                  ctx.fillRect(
                    node.x - bckgDimensions[0] / 2,
                    node.y - bckgDimensions[1] / 2,
                    ...bckgDimensions
                  )

                  ctx.textAlign = 'center'
                  ctx.textBaseline = 'middle'
                  ctx.fillStyle = node.color
                  ctx.fillText(label, node.x, node.y)

                  node.__bckgDimensions = bckgDimensions // to re-use in nodePointerAreaPaint
                }
              : undefined,
          nodePointerAreaPaint:
            nodeType !== 'dot'
              ? (node, color, ctx) => {
                  ctx.fillStyle = color
                  const bckgDimensions = node.__bckgDimensions
                  bckgDimensions &&
                    ctx.fillRect(
                      node.x - bckgDimensions[0] / 2,
                      node.y - bckgDimensions[1] / 2,
                      ...bckgDimensions
                    )
                }
              : undefined,
        }
      : {
          forceEngine: 'd3',
          numDimensions,
          nodeThreeObject: nodeThreeObjectOfType(nodeType, type, nodeTextProp),
        }

  return (
    <div>
      <Graph
        extraRenderers={[new CSS2DRenderer()]}
        graphData={graphData}
        nodeOpacity={nodeType === 'dot' ? 1 : 0}
        nodeResolution={32}
        nodeThreeObjectExtend={true}
        linkDirectionalArrowRelPos={1}
        linkDirectionalArrowLength={3}
        linkOpacity={1}
        backgroundColor="#eee"
        {...options}
      />
    </div>
  )
}

export default GraphView
