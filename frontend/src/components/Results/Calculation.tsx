import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { EqualIcon, MultiplyIcon, PlusIcon } from '../Icons'

interface Props {
  result: Result
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 0.5fr repeat(4, 1ch 1fr);
  column-gap: 1rem;
  align-items: center;
`

const GridItem = styled.p`
  text-align: center;
`

export const Calculation = ({ result }: Props) => {
  return (
    <Grid>
      <GridItem>{result.mass.actual}</GridItem>
      <EqualIcon />
      <GridItem>{result.endGroups[0].mass}</GridItem>
      <PlusIcon />
      <GridItem>{result.endGroups[1].mass}</GridItem>
      <PlusIcon />
      <GridItem>{result.cation.mass}</GridItem>
      <PlusIcon />
      <GridItem>
        <span>
          ({result.monomers[0].mass} <MultiplyIcon /> {result.monomers[0].count}
          )
        </span>
      </GridItem>
    </Grid>
  )
}
