import styled from 'styled-components'
import { Input } from 'maldi-end-group-analysis'
import { NameMassFieldSet } from './NameMassFieldSet'
import { SliderInput } from './inputs/SliderInput'
import { Button } from './buttons/Button'

const InputSection = styled.section`
  display: flex;
  flex-direction: column;
  width: max(25%, 20rem);
  background: ${({ theme }) => theme.primary.white};
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 1rem 1rem;
  justify-content: space-around;
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: rgba(46, 46, 46, 0.1);
  padding: 1rem 2rem;
  border-top: 2px solid rgba(46, 46, 46, 0.3);
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
      <Actions>
        <SliderInput
          min={0}
          max={100}
          value={difference}
          onChange={onDifferenceChange}
        />
        <Button onClickHandler={onSubmit}>Generate</Button>
      </Actions>
    </InputSection>
  )
}
