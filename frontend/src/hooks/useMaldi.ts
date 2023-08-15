import { useEffect, useState } from 'react'
import { generateMaldiResults, Input, Result } from 'maldi-end-group-analysis'
import { parseInput } from '../utils/parseInput'

export const useMaldi = (): [
  (input: Input, difference: number) => void,
  Result[]
] => {
  const [result, setResult] = useState<Result[]>(
    JSON.parse(sessionStorage.getItem('maldi-results') || '[]')
  )

  useEffect(() => {
    sessionStorage.setItem('maldi-results', JSON.stringify(result))
  }, [result])

  const generateResult = (input: Input, difference: number) => {
    setResult(generateMaldiResults(parseInput(input), difference))
  }

  return [generateResult, result]
}
