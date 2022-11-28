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
  gap: 0.5rem;
`

export const InputRows = ({ rows, onChange }: Props) => {
  return (
    <RowsContainer>
      {Object.values(rows).map(({ name, mass }, index) => (
        <NameMassInput
          key={`group-${index}`}
          name={name}
          mass={mass}
          onChange={(values) => onChange(index, values)}
        />
      ))}
    </RowsContainer>
  )
}
