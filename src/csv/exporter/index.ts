import { Input, Result } from 'maldi/types'
import { generateHeader } from './headerRow'
import { generateResultRow } from './resultRow'
import { writeFileSync } from 'fs'
import { ResultRow } from './type'

export const exporter = (fileName: string, input: Input, results: Result[]) => {
  const resultRows = addEmptyLineBetweenPeakRows(
    results.map((result) => generateResultRow(result, input))
  )

  const output = [...generateHeader(input), ...resultRows]

  const outputText = output.map((row) => row.join(',')).join('\n')

  writeFileSync(fileName, outputText)
}

const addEmptyLineBetweenPeakRows = (resultRows: ResultRow[]) => {
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
