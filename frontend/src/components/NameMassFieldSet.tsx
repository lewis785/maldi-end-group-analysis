import styled from 'styled-components'
import { NameMass } from 'maldi-end-group-analysis'
import { InputRows } from './InputRows'

interface Props {
  onChange: (rows: NameMass[]) => void
  rowCount: Number
  rows: NameMass[]
  label: string
  addRows?: boolean
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
`

const Fieldset = styled.fieldset`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

export const NameMassFieldSet = ({
  onChange,
  rows,
  label,
  addRows = false,
}: Props) => {
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
      <hr />
      <Header>
        <h3>Name</h3>
        <h3>Mass</h3>
      </Header>
      <InputRows rows={rows} onChange={updateRow} />
      {addRows && <button onClick={addRow}>Add Row</button>}
    </Fieldset>
  )
}
