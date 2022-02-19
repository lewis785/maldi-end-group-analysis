import { Input, Result } from 'maldi/types'
import { generateHeader } from './headerRow'
import { generateResultRow } from './resultRow'
import { writeFileSync } from 'fs'

export const exporter = (fileName: string, input: Input, results: Result[]) => {
  const resultRows = results.map((result) => generateResultRow(result, input))
  let output = [...generateHeader(input), ...resultRows]

  const outputText = output.map((row) => row.join(',')).join('\n')

  writeFileSync(fileName, outputText)
}
