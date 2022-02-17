import * as R from 'ramda'

// zipApply :: [a -> b] -> [a] -> [b]
export const zipApply = R.curry((fs, xs) => {
  if (fs.length === 0 || xs.length === 0) return []
  return [fs[0](xs[0]), ...zipApply(R.tail(fs), R.tail(xs))]
})

// branch :: [a -> b] -> a -> [b]
export const branch = R.curry((fs, x) => zipApply(fs, R.repeat(x, fs.length)))

// trace :: String -> a -> a
export const trace = R.curry((msg, x) => {
  // eslint-disable-next-line no-console
  console.log(msg, x)
  return x
})

// isOdd :: Number -> Boolean
export const isOdd = R.pipe(n => n % 2, R.equals(1))
