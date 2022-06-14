import { useState } from 'react'
import { generateMaldiResults, Input, Result } from 'maldi-end-group-analysis'

export const useMaldi = (): [(input: Input) => void, Result[]] => {
  const [result, setResult] = useState<Result[]>([])

  const generateResult = (input: Input) => {
    setResult(generateMaldiResults(input, 0))
  }

  return [generateResult, result]
}
