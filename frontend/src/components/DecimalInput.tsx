import { ChangeEvent } from 'react'

interface Props {
  id?: string
  value: number | null
  onChange: (value: number | null) => void
}

export const DecimalInput = ({ id, value, onChange }: Props) => {
  const onValueChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (target.value === '') {
      return onChange(null)
    }

    const targetValue = parseFloat(target.value)
    if (isNaN(targetValue)) {
      return onChange(value)
    }

    return onChange(targetValue)
  }

  return (
    <input id={id} type="number" value={value || ''} onChange={onValueChange} />
  )
}
