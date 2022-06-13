import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Input } from '../types'
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
  const [totalMass, setTotalMass] = useState(0)
  const [difference, setDifference] = useState(0)

  useEffect(() => {
    onValueChange({
      totalMass,
      difference,
      monomers: Object.values(monomers),
      cations: Object.values(catIons),
      endGroups: Object.values(endGroups),
    })
  }, [monomers, catIons, endGroups, totalMass, difference])

  const onConfigChange = (config: {
    totalMass: number
    difference: number
  }) => {
    setTotalMass(config.totalMass)
    setDifference(config.difference)
  }

  return (
    <Form>
      <ConfigFields
        totalMass={totalMass}
        difference={difference}
        onChange={onConfigChange}
      />
      <NameMassForm
        key="monomers"
        rows={monomers}
        onChange={(rows) => setMonomers({ ...monomers, ...rows })}
        rowCount={1}
      />
      <NameMassForm
        key="catIons"
        rows={catIons}
        onChange={(rows) => setCatIons({ ...catIons, ...rows })}
        rowCount={3}
      />
      <NameMassForm
        key="endGroups"
        rows={endGroups}
        onChange={(rows) => setEndGroups({ ...endGroups, ...rows })}
        rowCount={3}
      />
    </Form>
  )
}
