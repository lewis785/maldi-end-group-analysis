import { Input, Result } from '../maldi/types'
import { generateHeader } from './export/headerRow'

export const exporter = (input: Input, results: Result[]) => {
  const columnCount = getColumnCount(input)
  let output = [...generateHeader(input, columnCount)]

  console.log(output.map((row) => row.join(',')).join('\n'))

  return output.map((row) => row.join(',')).join('\n')
}

const getColumnCount = ({ monomers, cations, endgroups }: Input): number => {
  let columnCount = 5
  columnCount += monomers.length > 0 ? monomers.length + 1 : 2
  columnCount += cations.length > 0 ? cations.length + 1 : 2
  columnCount += endgroups.length > 0 ? endgroups.length + 1 : 2

  return columnCount
}
