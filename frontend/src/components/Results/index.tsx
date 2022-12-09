import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { PeakTitle } from './PeakTitle'
import { ResultDetail } from './ResultDetail'

interface Props {
  results: Result[]
}

const ResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;
`

export const Results = ({ results }: Props) => {
  return (
    <ResultContainer>
      <PeakTitle result={results[0]} />
      {results.map((result) => (
        <ResultDetail result={result} />
      ))}
    </ResultContainer>
  )
}
