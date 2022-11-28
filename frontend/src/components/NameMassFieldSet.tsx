import { NameMassInput } from './NameMassInput'
import styled from 'styled-components'
import { CloseIcon } from './Icons'
import { NameMass } from 'maldi-end-group-analysis'
import { InputRows } from './InputRows'

interface Props {
  onChange: (rows: NameMass[]) => void
  rowCount: Number
  rows: NameMass[]
  label: string
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`

const Header = styled.header`
  display: flex;
  justify-content: space-around;
`

const Fieldset = styled.fieldset`
  width: 100%;
  padding: 1rem;
`

const Title = styled.h1`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

  return (
    <Fieldset>
      <Title>{label}</Title>
      <Header>
        <h3>Name</h3>
        <h3>Mass</h3>
      </Header>
      <InputRows rows={rows} onChange={updateRow} />
      <button onClick={addRow}>Add Row</button>
    </Fieldset>
  )
}
