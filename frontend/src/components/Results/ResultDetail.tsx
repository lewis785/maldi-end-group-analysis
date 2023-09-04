import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { Calculation } from './Calculation'
import { ResultSummary } from './ResultSummary'
import { useToggle } from '../../hooks/useToggle'
import { opacity } from '../../utils/opacity'

interface Props {
  result: Result
}

const Detail = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  padding: 1rem;
  background: ${({ theme }) => opacity(theme.colors.table.background, 0.8)};
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.table.hover};
  }
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
