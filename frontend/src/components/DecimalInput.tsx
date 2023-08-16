import { ChangeEvent, useEffect, useState } from 'react'
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
  const decimalPointNoDecimalRegex = new RegExp(
    `^(\\d+\\.|\\.\\d{0,${decimalPlaces}})$`
  )

  const [decimalValue, setDecimalValue] = useState<string>('')
  const [invalid, setInvalid] = useState(false)

  useEffect(() => {
    if (initialValue && initialValue !== Number(decimalValue)) {
      setDecimalValue(initialValue ? initialValue.toString() : '')
    }
  }, [initialValue])

  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const value = target.value
    setInvalid(false)

    if (decimalPointNoDecimalRegex.test(value)) {
      return setDecimalValue(value)
    }

    if (!value || value.match(decimalRegex)) {
      setDecimalValue(value)
      onChange(value)
    }
  }

  const validate = () => {
    setInvalid(
      decimalValue === '' || decimalPointNoDecimalRegex.test(decimalValue)
    )
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
