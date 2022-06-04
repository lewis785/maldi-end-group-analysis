import { useState } from 'react'
import styled from 'styled-components'
import { NameMassForm } from './NameMassForm'

const Form = styled.form`
  display: flex;
`

export const InputForm = () => {
  const [inputs, setInputs] = useState({
    monomers: {},
    catIons: {},
    endGroups: {},
  })
  const [monomers, setMonomers] = useState({})
  const [catIons, setCatIons] = useState({})
  const [endGroups, setEndGroups] = useState({})

  return (
    <Form>
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
