import { useEffect, useState } from 'react'
import { NameMassInput } from './NameMassInput'
import { NameMass } from '../types'
import { v4 } from 'uuid'
import styled from 'styled-components'

interface Props {
  rowCount: Number
}

const InputGroup = styled.span`
  display: flex;
  flex-direction: column;
`

export const NameMassForm = ({ rowCount }: Props) => {
  const [rows, setRows] = useState<Record<string, NameMass>>({})
  // const [rowOrder, setRowOrder] = useState([])

  useEffect(() => {
    const initRows: Record<string, NameMass> = {}
    Array.from(Array(rowCount)).forEach(() => {
      initRows[v4()] = { name: '', mass: 0 }
    })
    setRows(initRows)
  }, [])

  const addRow = (e: React.MouseEvent) => {
    e.preventDefault()
    setRows({ ...rows, [v4()]: { name: '', mass: 0 } })
  }

  const removeRow = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const state = { ...rows }
    delete state[id]
    setRows(state)
  }

  const createRows = () => {
    console.log(rows)
    return Object.keys(rows).map((id) => {
      return (
        <InputGroup>
          <NameMassInput
            key={id}
            values={rows[id]}
            onChange={(values: NameMass) => setRows({ ...rows, [id]: values })}
            onRemoveClick={(e) => removeRow(e, id)}
          />
        </InputGroup>
      )
    })
  }

  return (
    <form>
      <fieldset>{createRows()}</fieldset>
      <button onClick={addRow}>Add Row</button>
    </form>
  )
}
