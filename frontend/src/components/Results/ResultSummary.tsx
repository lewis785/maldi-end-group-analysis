import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { EndGroups } from './EndGroups'

const Summary = styled.summary`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
`

const Text = styled.p`
  text-align: center;
`

interface Props {
  result: Result
}

export const ResultSummary = ({ result }: Props) => {
  const { mass, endGroups, monomers, cation } = result
  return (
    <Summary>
      <Text>
        {mass.actual} ({mass.target - mass.actual})
      </Text>
      <EndGroups endGroups={endGroups} />
      <Text>{cation.name}</Text>
      <Text>
        {monomers[0].name} ({monomers[0].count})
      </Text>
    </Summary>
  )
}
