import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { EndGroups } from './EndGroups'
import { ResultSummary } from './ResultSummary'

interface Props {
  result: Result
}

const Detail = styled.details`
  border: solid 1px black;
  padding: 1rem;
  /* box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px; */
`

export const ResultDetail = ({ result }: Props) => {
  return (
    <Detail>
      <ResultSummary result={result} />
    </Detail>
  )
}
