import { NameMass } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { NameMassInput } from './NameMassInput'

interface Props {
  rows: NameMass[]
  onChange: (index: number, values: NameMass) => void
}

const RowsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const InputRows = ({ rows, onChange }: Props) => {
  return (
    <RowsContainer>
      {Object.values(rows).map((row, index) => (
        <NameMassInput
          key={`group-${index}`}
          values={row}
          onChange={(values) => onChange(index, values)}
        />
      ))}
    </RowsContainer>
  )
}
