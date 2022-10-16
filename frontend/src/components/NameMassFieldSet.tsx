import { useEffect, useState } from 'react'
import { NameMassInput } from './NameMassInput'
import { NameMass } from '../types'
import { v4 } from 'uuid'
import styled from 'styled-components'
import { CloseIcon } from './Icons'

interface Props {
  onChange: (rows: Record<string, NameMass>) => void
  rowCount: Number
  rows: Record<string, NameMass>
  label: string
}

const Title = styled.h1`
  font-size: 1.5rem;
  width: 100%;
  text-align: center;
`

const InputGroup = styled.span`
  display: flex;
`

export const NameMassFieldSet = ({
  onChange,
  rowCount,
  rows,
  label,
}: Props) => {
  useEffect(() => {
    const initRows: Record<string, NameMass> = {}
    Array.from(Array(rowCount)).forEach(() => {
      initRows[v4()] = { name: '', mass: null }
    })

    onChange(initRows)
  }, [])

  const addRow = (e: React.MouseEvent) => {
    e.preventDefault()
    onChange({ ...rows, [v4()]: { name: '', mass: 0 } })
  }

  const removeRow = (id: string) => {
    const state = { ...rows }
    delete state[id]
    onChange(state)
  }

  const createRows = () => {
    return Object.keys(rows).map((id) => {
      return (
        <InputGroup key={id}>
          <NameMassInput
            values={rows[id]}
            onChange={(values: NameMass) => onChange({ ...rows, [id]: values })}
          />
          <CloseIcon onClick={() => removeRow(id)} />
        </InputGroup>
      )
    })
  }

  return (
    <fieldset>
      <Title>{label}</Title>
      {createRows()}
      <button onClick={addRow}>Add Row</button>
    </fieldset>
  )
}
