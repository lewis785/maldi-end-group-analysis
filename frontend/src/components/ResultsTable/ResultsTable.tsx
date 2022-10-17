import { Result as MaldiResult } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { ResultRow } from './ResultRow'

interface Props {
  results: MaldiResult[]
}

const Title = styled.header`
  font-size: 1.5rem;
`

export const ResultsTable = ({ results }: Props) => {
  const renderRows = () => {
    return results.map((result) => <ResultRow result={result} />)
  }

  return (
    <article>
      <Title>
        {results[0].peak.name} - {results[0].mass.target}
      </Title>
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
    </article>
  )
}
