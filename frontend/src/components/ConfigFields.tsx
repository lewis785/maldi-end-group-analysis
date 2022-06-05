import { DecimalInput } from './DecimalInput'

interface Props {
  totalMass: number
  difference: number
  onChange: (config: { totalMass: number; difference: number }) => void
}

export const ConfigFields = ({ difference, totalMass, onChange }: Props) => {
  return (
    <fieldset>
      <label htmlFor="total-mass">Total Mass</label>{' '}
      <DecimalInput
        id="total-mass"
        value={totalMass}
        onChange={(value) => onChange({ totalMass: value, difference })}
      />
      <label htmlFor="difference">Allowed Difference</label>{' '}
      <DecimalInput
        id="difference"
        value={difference}
        onChange={(value) => onChange({ totalMass, difference: value })}
      />
    </fieldset>
  )
}
