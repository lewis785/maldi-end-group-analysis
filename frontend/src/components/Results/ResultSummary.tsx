import { NameMass, Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { OpenToggle } from '../OpenToggle'

const Summary = styled.summary`
  display: grid;
  grid-template-columns: 1ch 0.5fr repeat(4, 1ch 1fr);
  column-gap: 1rem;
  align-items: center;
`

const Text = styled.p`
  text-align: center;
`

interface Props {
  expanded: boolean
  result: Result
}

export const ResultSummary = ({ expanded, result }: Props) => {
  const { mass, endGroups, monomers, cation } = result

  const name = ({ name }: NameMass) => {
    return name === 'empty' ? '-' : name
  }

  const difference = parseFloat((mass.target - mass.actual).toFixed(3))

  return (
    <Summary>
      <OpenToggle isOpen={expanded} />
      <Text>
        {mass.actual} ({difference})
      </Text>
      <div />
      <Text>{name(endGroups[0])}</Text>
      <div />
      <Text>{name(endGroups[1])}</Text>
      <div />
      <Text>{cation.name}</Text>
      <div />
      <Text>
        {monomers[0].name} ({monomers[0].count})
      </Text>
    </Summary>
  )
}
