import { Result as MaldiResult } from 'maldi-end-group-analysis'
import { Result } from './Result'

interface Props {
  results: MaldiResult[]
}

export const Results = ({ results }: Props) => {
  const renderRows = () => {
    return results.map((result) => <Result result={result} />)
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
