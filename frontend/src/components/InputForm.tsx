import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'maldi-end-group-analysis'
import { NameMassFieldSet } from './NameMassFieldSet'

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`

interface Props {
  onValueChange: (value: Input) => void
}

export const InputForm = ({ onValueChange }: Props) => {
  const [monomers, setMonomers] = useState({})
  const [catIons, setCatIons] = useState({})
  const [endGroups, setEndGroups] = useState({})
  const [peaks, setPeaks] = useState({})
  const [difference, setDifference] = useState(0)

  useEffect(() => {
    onValueChange({
      peaks: Object.values(peaks),
      monomers: Object.values(monomers),
      cations: Object.values(catIons),
      endGroups: Object.values(endGroups),
    })
  }, [monomers, catIons, endGroups, peaks, difference])

  const onConfigChange = (config: {
    totalMass: number
    difference: number
  }) => {
    setPeaks(config.totalMass)
    setDifference(config.difference)
  }

  return (
    <Form>
      <NameMassFieldSet
        label="Peaks"
        rows={peaks}
        onChange={(rows) => setPeaks(rows)}
        rowCount={1}
      />
      <NameMassFieldSet
        label="Monomers"
        rows={monomers}
        onChange={(rows) => setMonomers(rows)}
        rowCount={1}
      />
      <NameMassFieldSet
        label="Cat Ions"
        rows={catIons}
        onChange={(rows) => setCatIons(rows)}
        rowCount={2}
      />
      <NameMassFieldSet
        label="End Groups"
        rows={endGroups}
        onChange={(rows) => setEndGroups(rows)}
        rowCount={3}
      />
    </Form>
  )
}
