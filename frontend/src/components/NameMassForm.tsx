import { useEffect, useState } from 'react'
import { NameMassInput } from './NameMassInput'
import { NameMass } from '../types'
import { v4 } from 'uuid'
import styled from 'styled-components'

interface Props {
  onChange: (rows: Record<string, NameMass>) => void
  rowCount: Number
  rows: Record<string, NameMass>
}

const InputGroup = styled.span`
  display: flex;
  flex-direction: column;
`

export const NameMassForm = ({ onChange, rowCount, rows }: Props) => {
  useEffect(() => {
    const initRows: Record<string, NameMass> = {}
    Array.from(Array(rowCount)).forEach(() => {
      initRows[v4()] = { name: '', mass: 0 }
    })

    onChange(initRows)
  }, [])

  const addRow = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange({ ...rows, [v4()]: { name: '', mass: 0 } })
  }

  const removeRow = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    const state = { ...rows }
    delete state[id]
    onChange(state)
  }

  const createRows = () => {
    console.log(rows)
    return Object.keys(rows).map((id) => {
      return (
        <InputGroup>
          <NameMassInput
            key={id}
            values={rows[id]}
            onChange={(values: NameMass) => onChange({ ...rows, [id]: values })}
            onRemoveClick={(e) => removeRow(e, id)}
          />
        </InputGroup>
      )
    })
  }

  return (
    <fieldset>
      {createRows()}
      <button onClick={addRow}>Add Row</button>
    </fieldset>
  )
}
