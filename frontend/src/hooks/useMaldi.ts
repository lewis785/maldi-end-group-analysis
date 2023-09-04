import { useState } from 'react'
import { generateMaldiResults, Input, Result } from 'maldi-end-group-analysis'
import { parseInput } from '../utils/parseInput'

const resultsKey = 'maldi-results'

export const useMaldi = (): [
  (input: Input, difference: number) => void,
  Result[]
] => {
  const [result, setResult] = useState<Result[]>(
    JSON.parse(sessionStorage.getItem(resultsKey) || '[]')
  )

  const generateResult = (input: Input, difference: number) => {
    const newResult = generateMaldiResults(parseInput(input), difference)
    setResult(newResult)
    sessionStorage.setItem(resultsKey, JSON.stringify(newResult))
  }

  return [generateResult, result]
}
