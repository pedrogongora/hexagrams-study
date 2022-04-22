import { Hexagram } from '../Hexagram/Hexagram'
import { HexagonalHexagram } from '../Hexagram/Hexagonal'
import { HexagonalTopdownHexagram } from '../Hexagram/HexagonalTopdownHexagram'
import { HexagonalBottomupHexagram } from '../Hexagram/HexagonalBottomupHexagram'
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
      return HexagonalHexagram
    case 'hexagonal-topdown':
      return HexagonalTopdownHexagram
    case 'hexagonal-bottomup':
      return HexagonalBottomupHexagram
    case 'tradicional':
    default:
      return Hexagram
  }
}
