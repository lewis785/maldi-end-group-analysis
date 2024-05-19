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
  border-radius: 5px;
  input {
    min-width: 0;
    :focus {
      z-index: 100;
    }
    :first-of-type {
      /* padding: 1rem 0 1rem 1rem; */
      border-radius: 5px 0 0 5px;
      border-right-width: 0;
      flex-grow: 999;
      :focus {
        border-right-width: 1px;
      }
    }
    :last-of-type {
      border-left-style: dashed;
      border-radius: 0 5px 5px 0;
      flex-grow: 1;
      flex-basis: 4rem;
      text-align: center;
      :focus {
        border-left-style: solid;
      }
    }
  }
`

export const NameMassInput = ({ name, mass, onChange }: Props) => {
  const decimalPlaces = 3

  type InputEvent = React.ChangeEvent<HTMLInputElement>

  const onNameChange = ({ target }: InputEvent) => {
    onChange({ name: target.value, mass })
  }

  const onMassChange = (value: string) => {
    onChange({ name, mass: Number(value) })
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
