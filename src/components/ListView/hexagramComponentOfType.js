import { Hexagram } from '../Hexagram/Hexagram'
import { CircularHexagram } from '../Hexagram/CircularHexagram'
import { CircularTopdownHexagram } from '../Hexagram/CircularTopdownHexagram'
import { SquaredClockHexagram } from '../Hexagram/SquaredClockHexagram'
import { SquaredHexagram } from '../Hexagram/SquaredHexagram'
import { SquaredLRHexagram } from '../Hexagram/SquaredLRHexagram'
import { SquaredNumerologyHexagram } from '../Hexagram/SquaredNumerologyHexagram'
import { SquaredTopdownHexagram } from '../Hexagram/SquaredTopdownHexagram'

export const hexagramComponentOfType = type => {
  switch (type) {
    case 'squared':
      return SquaredHexagram
    case 'squared-lr':
      return SquaredLRHexagram
    case 'squared-topdown':
      return SquaredTopdownHexagram
    case 'squared-clock':
      return SquaredClockHexagram
    case 'squared-numerology':
      return SquaredNumerologyHexagram
    case 'circular':
      return CircularHexagram
    case 'circular-topdown':
      return CircularTopdownHexagram
    case 'traditional':
    default:
      return Hexagram
  }
}
