import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { Calculation } from './Calculation'
import { ResultSummary } from './ResultSummary'
import { useToggle } from '../../hooks/useToggle'

interface Props {
  result: Result
}

const Detail = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  padding: 1rem;
`

export const ResultDetail = ({ result }: Props) => {
  const [expanded, toggleExpand] = useToggle(false)

  return (
    <Detail onClick={toggleExpand}>
      <ResultSummary result={result} expanded={expanded} />
      {expanded && (
        <>
          <hr />
          <Calculation result={result} />
        </>
      )}
    </Detail>
  )
}
