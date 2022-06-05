import { ChangeEvent } from 'react'

interface Props {
  id?: string
  value: number
  onChange: (value: number) => void
}

export const DecimalInput = ({ id, value, onChange }: Props) => {
  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const targetValue = parseFloat(target.value)
    if (isNaN(targetValue)) {
      return onChange(value)
    }

    return onChange(targetValue)
  }

  return <input id={id} type="number" value={value} onChange={onValueChange} />
}
