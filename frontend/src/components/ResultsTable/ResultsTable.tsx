import { Result as MaldiResult } from 'maldi-end-group-analysis'
import { ResultRow } from './ResultRow'

interface Props {
  results: MaldiResult[]
}

export const ResultsTable = ({ results }: Props) => {
  const renderRows = () => {
    return results.map((result) => <ResultRow result={result} />)
  }

  return (
    <table>
      <thead>
        <td>Peak</td>
        <td>Target</td>
        <td>Actual</td>
        <td>Difference</td>
        <td>EndGroup 1</td>
        <td>EndGroup 2</td>
        <td>Cation</td>
        <td>Monomer</td>
        <td>Repeat Units</td>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  )
}
