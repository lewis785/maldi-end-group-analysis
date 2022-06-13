import React from 'react'
import { NameMass } from '../types'

interface Props {
  values: NameMass
  onChange: (values: NameMass) => void
  onRemoveClick?: (e: React.MouseEvent) => void
}

export const NameMassInput = ({ values, onChange, onRemoveClick }: Props) => {
  const { name, mass } = values

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onMassChange = (e: InputEvent) => {
    const value = parseFloat(e.target.value)
    if (isNaN(value)) {
      return onChange({ name, mass })
    }
    onChange({ name, mass: value })
  }

  return (
    <span>
      <input
        type="text"
        value={name}
        onChange={(e: InputEvent) => onChange({ name: e.target.value, mass })}
      />
      <input type="number" step="0.01" value={mass} onChange={onMassChange} />
      <button onClick={onRemoveClick}>Remove Row</button>
    </span>
  )
}
