import { useEffect, useState } from 'react'
import {
  generateMaldiResults,
  Input,
  NameMass,
  Result,
} from 'maldi-end-group-analysis'

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

const parseInput = (input: Input): Input => {
  return {
    peaks: removeEmptyValues(input.peaks),
    monomers: removeEmptyValues(input.monomers),
    endGroups: removeEmptyValues(input.endGroups),
    cations: removeEmptyValues(input.cations),
  }
}

const removeEmptyValues = (object: NameMass[]): NameMass[] => {
  return object.filter((ele) => ele.name !== '' && ele.mass !== 0)
}
