import React, { useState } from 'react'
import { NameMass } from '../types'
import { DecimalInput } from './DecimalInput'

interface Props {
  values: NameMass
  onChange: (values: NameMass) => void
}

export const NameMassInput = ({ values, onChange }: Props) => {
  const decimalPlaces = 3
  const { name, mass } = values

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onNameChange = ({ target }: InputEvent) => {
    onChange({ name: target.value, mass: Number(mass) })
  }

  const onMassChange = (value: string) => {
    onChange({ name, mass: Number(Number(value).toFixed(decimalPlaces)) })
  }

  return (
    <>
      <input type="text" value={name} onChange={onNameChange} />
      <DecimalInput
        initialValue={mass}
        onChange={onMassChange}
        decimalPlaces={decimalPlaces}
      />
    </>
  )
}
