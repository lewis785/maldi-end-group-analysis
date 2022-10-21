import { NameMass } from 'maldi-end-group-analysis'
import styled from 'styled-components'

const Span = styled.span`
  display: flex;
  justify-content: space-between;
  width: 100%;
`

const Text = styled.p`
  padding: 0;
  margin: 0;
`

interface Props {
  endGroups: [NameMass, NameMass]
}

export const EndGroups = ({ endGroups }: Props) => {
  return (
    <Span>
      <Text>{endGroups[0].name}</Text>
      <Text>{endGroups[1].name}</Text>
    </Span>
  )
}
