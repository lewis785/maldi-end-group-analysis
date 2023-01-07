import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { PeakTitle } from './PeakTitle'
import { ResultDetail } from './ResultDetail'

interface Props {
  results: Result[]
}

const ResultContainer = styled.article`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const ResultList = styled.ol`
  display: flex;
  flex-direction: column;
  list-style: none;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-bottom: 0;
`

export const Results = ({ results }: Props) => {
  return (
    <ResultContainer>
      <PeakTitle result={results[0]} />
      <ResultList>
        {results.map((result, index) => (
          <ResultDetail key={`result-${index}`} result={result} />
        ))}
      </ResultList>
    </ResultContainer>
  )
}
