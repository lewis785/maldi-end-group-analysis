import React from 'react'
import { NameMass } from '../types'
import { DecimalInput } from './DecimalInput'

interface Props {
  values: NameMass
  onChange: (values: NameMass) => void
}

export const NameMassInput = ({ values, onChange }: Props) => {
  const { name, mass } = values

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onMassChange = (value: number | null) => {
    onChange({ name, mass: value })
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e: InputEvent) => onChange({ name: e.target.value, mass })}
      />
      <DecimalInput value={mass} onChange={onMassChange} />
    </>
  )
}
