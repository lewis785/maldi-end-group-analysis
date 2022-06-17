import { ChangeEvent, useState } from 'react'

interface Props {
  decimalPlaces: number
  initialValue: number | null
  onChange: (value: string) => void
}

export const DecimalInput = ({
  initialValue,
  decimalPlaces,
  onChange,
}: Props) => {
  const regex = new RegExp(`^\\d+(\\.\\d{0,${decimalPlaces}})?$`)
  const [decimalValue, setDecimalValue] = useState<string>(
    initialValue ? initialValue.toFixed(decimalPlaces) : ''
  )

  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.value || target.value.match(regex)) {
      setDecimalValue(target.value)
      onChange(target.value)
    }
  }

  return <input type="text" value={decimalValue} onChange={onValueChange} />
}
