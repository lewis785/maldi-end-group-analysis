import { Input, Result } from '../../maldi/types'
import { generateHeader } from './headerRow'
import { generateResultRow } from './resultRow'
import { writeFileSync, existsSync } from 'fs'
import { ResultRow } from './type'

export const exportToFile = (
  fileName: string,
  input: Input,
  results: Result[]
) => {
  writeToFile(fileName, exportToString(input, results))
}

export const exportToString = (input: Input, results: Result[]): string => {
  const resultRows = addEmptyLineBetweenPeakRows(
    results.map((result) => generateResultRow(result, input))
  )

  const output = [...generateHeader(input), ...resultRows]

  return output.map((row) => row.join(',')).join('\n')
}

const writeToFile = (filename: string, content: string) => {
  if (!existsSync(`${filename}.csv`)) {
    return writeFileSync(`${filename}.csv`, content)
  }

  let copyNumber = 1
  while (existsSync(`${filename}(${copyNumber}).csv`)) {
    copyNumber++
  }

  writeFileSync(`${filename}(${copyNumber}).csv`, content)
}

const addEmptyLineBetweenPeakRows = (resultRows: ResultRow[]) => {
  if (resultRows.length === 0) {
    return resultRows
  }

  const emptyRow = [...Array(resultRows[0].length)].map((ele) => '')
  let previous = { name: resultRows[0][0], value: resultRows[0][1] }

  return resultRows.reduce<ResultRow[]>((rows, current) => {
    if (current[0] === previous.name && current[1] === previous.value) {
      return [...rows, current]
    }

    previous = { name: current[0], value: current[1] }
    return [...rows, emptyRow, current]
  }, [])
}
