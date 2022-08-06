import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  &.error {
    border: 1px solid red;
  }
`

interface Props {
  decimalPlaces: number
  initialValue: number | null
  onChange: (value: string) => void
  id?: string
}

export const DecimalInput = ({
  decimalPlaces,
  id,
  initialValue,
  onChange,
}: Props) => {
  const decimalRegex = new RegExp(`^\\d+(\\.\\d{0,${decimalPlaces}})?$`)
  const [decimalValue, setDecimalValue] = useState<string>(
    initialValue ? initialValue.toFixed(decimalPlaces) : ''
  )
  const [invalid, setInvalid] = useState(false)

  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.value || target.value.match(decimalRegex)) {
      setDecimalValue(target.value)
      onChange(target.value)
      setInvalid(false)
    }
  }

  const validate = () => {
    console.log(/^d+\\.$/.test(decimalValue))
    setInvalid(decimalValue === '' || /^\d+\.$/.test(decimalValue))
  }

  return (
    <Input
      id={id}
      className={`${invalid ? 'error' : ''}`}
      type="text"
      value={decimalValue}
      onChange={onValueChange}
      onBlur={validate}
    />
  )
}
