import { ChangeEvent, useState } from 'react'
import { Input } from './inputs/Input'

interface Props {
  decimalPlaces: number
  initialValue: number | null
  onChange: (value: string) => void
  placeholder?: string
}

export const DecimalInput = ({
  decimalPlaces,
  placeholder,
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
    setInvalid(decimalValue === '' || /^\d+\.$/.test(decimalValue))
  }

  return (
    <Input
      className={`${invalid ? 'error' : ''}`}
      placeholder={placeholder}
      type="text"
      value={decimalValue}
      onChange={onValueChange}
      onBlur={validate}
    />
  )
}
