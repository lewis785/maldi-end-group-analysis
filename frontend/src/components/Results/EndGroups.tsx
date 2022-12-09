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
  const name = ({ name }: NameMass) => {
    return name === 'empty' ? '-' : name
  }

  return (
    <Span>
      <Text>{name(endGroups[0])}</Text>
      <Text>{name(endGroups[1])}</Text>
    </Span>
  )
}
