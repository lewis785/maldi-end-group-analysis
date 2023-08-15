import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { EqualIcon, MultiplyIcon, PlusIcon } from '../Icons'

interface Props {
  result: Result
}

const Grid = styled.div<{ monomerCount: number }>`
  display: grid;
  grid-template-columns: 1ch 0.5fr repeat(${(p) => 3 + p.monomerCount}, 1ch 1fr);
  column-gap: 1rem;
  align-items: center;
`

const GridItem = styled.p`
  text-align: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-inline: 0.5rem;
`

export const Calculation = ({ result }: Props) => {
  const renderMonomers = () => {
    return result.monomers.map(({ mass, count }) => (
      <>
        <PlusIcon />
        <GridItem>
          <span>
            ({mass} <MultiplyIcon /> {count})
          </span>
        </GridItem>
      </>
    ))
  }

  return (
    <Grid monomerCount={result.monomers.length}>
      <div />
      <GridItem>{result.mass.actual}</GridItem>
      <EqualIcon />
      <GridItem>{result.endGroups[0].mass}</GridItem>
      <PlusIcon />
      <GridItem>{result.endGroups[1].mass}</GridItem>
      <PlusIcon />
      <GridItem>{result.cation.mass}</GridItem>
      {renderMonomers()}
    </Grid>
  )
}
