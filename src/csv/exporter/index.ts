import { Input, Result } from 'maldi/types'
import { generateHeader } from './headerRow'

export const exporter = (input: Input, results: Result[]) => {
  const columnCount = getColumnCount(input)
  let output = [...generateHeader(input, columnCount)]

  console.log(output.map((row) => row.join(',')).join('\n'))

  return output.map((row) => row.join(',')).join('\n')
}

const getColumnCount = ({ monomers, cations, endGroups }: Input): number => {
  let columnCount = 5
  columnCount += monomers.length > 0 ? monomers.length + 1 : 2
  columnCount += cations.length > 0 ? cations.length + 1 : 2
  columnCount += endGroups.length > 0 ? endGroups.length + 1 : 2

  return columnCount
}
