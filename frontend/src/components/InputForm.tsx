import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from 'maldi-end-group-analysis'
import { ConfigFields } from './ConfigFields'
import { NameMassForm } from './NameMassForm'

const Form = styled.form`
  display: flex;
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
      <NameMassForm
        key="peaks"
        rows={peaks}
        onChange={(rows) => setPeaks(rows)}
        rowCount={1}
      />
      <NameMassForm
        key="monomers"
        rows={monomers}
        onChange={(rows) => setMonomers(rows)}
        rowCount={1}
      />
      <NameMassForm
        key="catIons"
        rows={catIons}
        onChange={(rows) => setCatIons(rows)}
        rowCount={2}
      />
      <NameMassForm
        key="endGroups"
        rows={endGroups}
        onChange={(rows) => setEndGroups(rows)}
        rowCount={3}
      />
    </Form>
  )
}
