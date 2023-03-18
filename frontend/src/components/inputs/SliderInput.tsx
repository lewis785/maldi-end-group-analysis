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
  gap: 0.5rem;
  align-items: center;
`

const SliderTextInput = styled.input`
  width: 2rem;
  border-radius: 10px;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid rgba(0, 0, 0, 0.4);
  min-width: 0;
`

const Slider = styled.input`
  min-width: 0;
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
      <label htmlFor="slider">Difference</label>
      <SliderTextInput
        id="slider"
        type="text"
        value={value}
        onChange={(e) => onChange(convertToNumber(e.target.value))}
      />
      <Slider
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(convertToNumber(e.target.value))}
      />
    </HStack>
  )
}
