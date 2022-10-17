import { NameMassInput } from './NameMassInput'
import styled from 'styled-components'
import { CloseIcon } from './Icons'
import { NameMass } from 'maldi-end-group-analysis'

interface Props {
  onChange: (rows: NameMass[]) => void
  rowCount: Number
  rows: NameMass[]
  label: string
}

const Fieldset = styled.fieldset`
  width: 100%;
`

const Title = styled.h1`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
`

const InputGroup = styled.span`
  display: flex;
`

export const NameMassFieldSet = ({ onChange, rows, label }: Props) => {
  const addRow = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange([...rows, { name: '', mass: 0 }])
  }

  const removeRow = (index: number) => {
    onChange([...rows.slice(0, index), ...rows.slice(index + 1)])
  }

  const updateRow = (index: number, values: NameMass) => {
    onChange([...rows.slice(0, index), values, ...rows.slice(index + 1)])
  }

  const createRows = () => {
    return Object.values(rows).map((row, index) => {
      return (
        <InputGroup key={`group-${index}`}>
          <NameMassInput
            values={row}
            onChange={(values: NameMass) => updateRow(index, values)}
          />
          <CloseIcon onClick={() => removeRow(index)} />
        </InputGroup>
      )
    })
  }

  return (
    <Fieldset>
      <Title>{label}</Title>
      {createRows()}
      <button onClick={addRow}>Add Row</button>
    </Fieldset>
  )
}
