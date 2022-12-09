import styled from 'styled-components'
import { Input } from './Input'

interface Props {
  max: number
  min: number
  value: number
  onChange: (newValue: number) => void
}

const HStack = styled.div`
  display: flex;
  flex-direction: row;
`

export const SliderInput = ({ max, min, value, onChange }: Props) => {
  const convertToNumber = (stringValue: string) => {
    const numberValue = Number(stringValue)
    if (isNaN(numberValue)) {
      return value
    }

    if (numberValue > max) {
      return max
    }

    if (numberValue < min) {
      return min
    }

    return numberValue
  }

  return (
    <HStack>
      <Input
        value={value}
        onChange={(e) => onChange(convertToNumber(e.target.value))}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(convertToNumber(e.target.value))}
      />
    </HStack>
  )
}
