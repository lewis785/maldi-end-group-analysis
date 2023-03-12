import styled from 'styled-components'
import { Input } from 'maldi-end-group-analysis'
import { NameMassFieldSet } from './NameMassFieldSet'
import { SliderInput } from './inputs/SliderInput'

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.primary.white};
  border-right: 1px solid rgba(0, 0, 0, 1);
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  input: Input
  difference: number
  onDifferenceChange: (newValue: number) => void
  onValueChange: (value: Input) => void
  onSubmit: () => void
}

export const InputForm = ({
  input,
  difference,
  onDifferenceChange,
  onValueChange,
  onSubmit,
}: Props) => {
  return (
    <InputSection>
      <Form>
        <NameMassFieldSet
          label="Peaks"
          rows={input.peaks}
          onChange={(rows) => onValueChange({ ...input, peaks: rows })}
          rowCount={1}
        />
        <NameMassFieldSet
          label="Monomers"
          rows={input.monomers}
          onChange={(rows) => onValueChange({ ...input, monomers: rows })}
          rowCount={1}
          fixedRows
        />
        <NameMassFieldSet
          label="Cations"
          rows={input.cations}
          onChange={(rows) => onValueChange({ ...input, cations: rows })}
          rowCount={2}
          fixedRows
        />
        <NameMassFieldSet
          label="End Groups"
          rows={input.endGroups}
          onChange={(rows) => onValueChange({ ...input, endGroups: rows })}
          rowCount={3}
        />
      </Form>
      <div>
        <SliderInput
          min={0}
          max={100}
          value={difference}
          onChange={onDifferenceChange}
        />
        <button onClick={onSubmit}>Generate</button>
      </div>
    </InputSection>
  )
}
