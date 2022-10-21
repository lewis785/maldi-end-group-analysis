import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { ResultRow } from './ResultRow'

interface Props {
  results: Result[]
}

const ResultContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 1.5rem;
`

export const Results = ({ results }: Props) => {
  return (
    <ResultContainer>
      {results.map((result) => (
        <ResultRow result={result} />
      ))}
    </ResultContainer>
  )
}
