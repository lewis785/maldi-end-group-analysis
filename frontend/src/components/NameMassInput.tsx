import { NameMass } from 'maldi-end-group-analysis'
import React, { useId } from 'react'
import styled from 'styled-components'
import { DecimalInput } from './DecimalInput'

interface Props {
  values: NameMass
  onChange: (values: NameMass) => void
}

const Row = styled.div`
  display: flex;
  justify-content: space-around;
`

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
    <Row>
      <input
        id={`name-${id}`}
        type="text"
        value={name}
        onChange={onNameChange}
        placeholder="Name"
      />
      <DecimalInput
        id={`mass-${id}`}
        placeholder="Mass"
        initialValue={mass}
        onChange={onMassChange}
        decimalPlaces={decimalPlaces}
      />
    </Row>
  )
}
