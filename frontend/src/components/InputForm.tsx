import styled from 'styled-components'
import { Input, Result } from 'maldi-end-group-analysis'
import { NameMassFieldSet } from './NameMassFieldSet'
import { SliderInput } from './inputs/SliderInput'
import { Button } from './buttons/Button'
import { CsvExport } from './CsvExport'
import { useEffect, useRef } from 'react'

const InputSection = styled.section`
  display: grid;
  flex-grow: 1;
  flex-basis: 100px;
  grid-template-rows: 1fr auto;
  grid-template-columns: 100%;
  height: 100%;
  width: min(20rem, 100%);
  background: ${({ theme }) => theme.primary.white};
  border-right: 1px solid rgba(0, 0, 0, 0.3);
`

const Form = styled.section`
  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: minmax(0, auto);
  overflow-y: auto;
  padding: 1rem 1rem;
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
  results: Result[]
  difference: number
  onDifferenceChange: (newValue: number) => void
  onValueChange: (value: Input) => void
  onSubmit: () => void
}

export const InputForm = ({
  input,
  results,
  difference,
  onDifferenceChange,
  onValueChange,
  onSubmit,
}: Props) => {
  const htmlRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(htmlRef.current?.scrollHeight)
  })

  return (
    <InputSection>
      <Form ref={htmlRef}>
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
        <CsvExport input={input} results={results} />
      </Actions>
    </InputSection>
  )
}
