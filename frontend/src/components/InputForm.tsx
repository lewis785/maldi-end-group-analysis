import styled from 'styled-components'
import { Input } from 'maldi-end-group-analysis'
import { NameMassFieldSet } from './NameMassFieldSet'

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  background: ${({ theme }) => theme.primary.white};
  border-right: 1px solid rgba(0, 0, 0, 1);
`

interface Props {
  input: Input
  onValueChange: (value: Input) => void
}

export const InputForm = ({ input, onValueChange }: Props) => {
  return (
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
  )
}
