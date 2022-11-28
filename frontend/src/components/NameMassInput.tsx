import { NameMass } from 'maldi-end-group-analysis'
import React from 'react'
import styled from 'styled-components'
import { DecimalInput } from './DecimalInput'
import { Input } from './inputs/Input'

interface Props {
  name: string
  mass: number
  onChange: (values: NameMass) => void
}

const Row = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 1rem;
`

export const NameMassInput = ({ name, mass, onChange }: Props) => {
  const decimalPlaces = 3

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onNameChange = ({ target }: InputEvent) => {
    onChange({ name: target.value, mass: Number(mass) })
  }

  const onMassChange = (value: string) => {
    onChange({ name, mass: Number(Number(value).toFixed(decimalPlaces)) })
  }

  return (
    <Row>
      <Input
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      />
      <DecimalInput
        placeholder="Mass"
        initialValue={mass}
        onChange={onMassChange}
        decimalPlaces={decimalPlaces}
      />
    </Row>
  )
}
