import { ChangeEvent, useState } from 'react'
import styled from 'styled-components'

const Input = styled.input`
  &.error {
    border: 1px solid red;
  }
`

interface Props {
  decimalPlaces: number
  id?: string
  initialValue: number | null
  error?: boolean
  onChange: (value: string) => void
}

export const DecimalInput = ({
  decimalPlaces,
  id,
  initialValue,
  error = false,
  onChange,
}: Props) => {
  const decimalRegex = new RegExp(`^\\d+(\\.\\d{0,${decimalPlaces}})?$`)
  const [decimalValue, setDecimalValue] = useState<string>(
    initialValue ? initialValue.toFixed(decimalPlaces) : ''
  )

  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.value || target.value.match(decimalRegex)) {
      setDecimalValue(target.value)
      onChange(target.value)
    }
  }

  return (
    <Input
      id={id}
      className={`${error ? 'error' : ''}`}
      type="text"
      value={decimalValue}
      onChange={onValueChange}
    />
  )
}
