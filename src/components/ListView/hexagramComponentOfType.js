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
