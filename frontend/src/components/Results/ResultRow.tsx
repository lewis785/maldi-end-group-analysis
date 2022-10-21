import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { EndGroups } from './EndGroups'

interface Props {
  result: Result
}

const Row = styled.article`
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 1fr;
  column-gap: 1rem;
  align-items: center;
  border: solid 1px black;
  padding: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  flex: 1;
`

const Text = styled.p`
  padding: 0;
  margin: 0;
`

export const ResultRow = ({ result }: Props) => {
  const { mass, endGroups, cation, monomers } = result
  return (
    <Row>
      <Text>
        {mass.actual} ({mass.target - mass.actual})
      </Text>
      <EndGroups endGroups={endGroups} />
      <Text>{cation.name}</Text>
      <Text>
        {monomers[0].name} ({monomers[0].count})
      </Text>
    </Row>
  )
}
