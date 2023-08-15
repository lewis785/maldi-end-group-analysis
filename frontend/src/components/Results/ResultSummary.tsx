import { NameMass, Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { OpenToggle } from '../OpenToggle'
import { Fragment } from 'react'

const Summary = styled.summary<{ monomerCount: number }>`
  cursor: pointer;
  display: grid;
  grid-template-columns: 1ch 0.5fr repeat(${(p) => 3 + p.monomerCount}, 1ch 1fr);
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

  const renderMonomers = () => {
    return monomers.map(({ name, count }) => (
      <Fragment key={name}>
        <div key={`div-${name}`} />
        <Text key={`text-${name}`}>{`${name} (${count})`}</Text>
      </Fragment>
    ))
  }

  return (
    <Summary monomerCount={result.monomers.length}>
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
      {renderMonomers()}
    </Summary>
  )
}
