import React, { useId, useState } from 'react'
import { NameMass } from '../types'
import { DecimalInput } from './DecimalInput'

interface Props {
  values: NameMass
  onChange: (values: NameMass) => void
}

export const NameMassInput = ({ values, onChange }: Props) => {
  const decimalPlaces = 3
  const { name, mass } = values
  const id = useId()

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onNameChange = ({ target }: InputEvent) => {
    onChange({ name: target.value, mass: Number(mass) })
  }

  const onMassChange = (value: string) => {
    onChange({ name, mass: Number(Number(value).toFixed(decimalPlaces)) })
  }

  return (
    <>
      <label htmlFor={`name-${id}`}>Name</label>
      <input
        id={`name-${id}`}
        type="text"
        value={name}
        onChange={onNameChange}
      />
      <label htmlFor={`mass-${id}`}>Mass</label>
      <DecimalInput
        id={`mass-${id}`}
        initialValue={mass}
        onChange={onMassChange}
        decimalPlaces={decimalPlaces}
      />
    </>
  )
}
