import styled from 'styled-components'
import { NameMass } from 'maldi-end-group-analysis'
import { InputRows } from './InputRows'
import { shouldAddRow, shouldRemoveRow } from '../utils/row'

interface Props {
  onChange: (rows: NameMass[]) => void
  rowCount: Number
  rows: NameMass[]
  label: string
  fixedRows?: boolean
}

const Header = styled.header`
  display: flex;
  justify-content: space-around;
`

const Fieldset = styled.article`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  fixedRows = false,
}: Props) => {
  const addRow = (rows: NameMass[]) => {
    onChange([...rows, { name: '', mass: 0 }])
  }

  const removeRow = (rows: NameMass[], index: number) => {
    onChange([...rows.slice(0, index), ...rows.slice(index + 1)])
  }

  const updateRow = (index: number, values: NameMass) => {
    const newRows = [...rows.slice(0, index), values, ...rows.slice(index + 1)]

    if (!fixedRows && shouldAddRow(newRows)) {
      return addRow(newRows)
    }
    if (!fixedRows && shouldRemoveRow(newRows)) {
      return removeRow(newRows, newRows.length - 1)
    }

    onChange(newRows)
  }

  return (
    <Fieldset>
      <Title>{label}</Title>
      <hr />
      <InputRows rows={rows} onChange={updateRow} />
    </Fieldset>
  )
}
