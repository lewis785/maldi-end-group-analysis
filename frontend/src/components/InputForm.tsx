import { useState } from 'react'
import styled from 'styled-components'
import { ConfigFields } from './ConfigFields'
import { NameMassForm } from './NameMassForm'

const Form = styled.form`
  display: flex;
`

export const InputForm = () => {
  const [monomers, setMonomers] = useState({})
  const [catIons, setCatIons] = useState({})
  const [endGroups, setEndGroups] = useState({})
  const [totalMass, setTotalMass] = useState(0)
  const [difference, setDifference] = useState(0)

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
        rows={monomers}
        onChange={(rows) => setMonomers({ ...monomers, ...rows })}
        rowCount={1}
      />
      <NameMassForm
        rows={catIons}
        onChange={(rows) => setCatIons({ ...catIons, ...rows })}
        rowCount={3}
      />
      <NameMassForm
        rows={endGroups}
        onChange={(rows) => setEndGroups({ ...endGroups, ...rows })}
        rowCount={3}
      />
    </Form>
  )
}
