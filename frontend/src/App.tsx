import { useEffect, useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import { ResultsTable } from './components/ResultsTable'
import styled from 'styled-components'

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
`

const initialState: Input = {
  peaks: [],
  monomers: [],
  cations: [],
  endGroups: [],
}

function App() {
  const [input, setInput] = useState<Input>(initialState)
  const [generateResult, result] = useMaldi()

  useEffect(() => {
    const state = sessionStorage.getItem('maldi-input')
    console.log(state)
    if (state !== null) {
      setInput(JSON.parse(state))
    }
  }, [])

  const onInputChange = (newInput: Input) => {
    console.log('input Change', { newInput })
    sessionStorage.setItem('maldi-input', JSON.stringify(newInput))
    setInput(newInput)
  }

  const onClick = () => {
    if (input !== undefined) {
      generateResult(input)
    }
  }

  return (
    <Container>
      <InputForm
        input={input}
        onValueChange={(value) => onInputChange(value)}
      />
      <span>
        <button onClick={onClick}>Generate </button>
        <ResultsTable results={result} />
      </span>
    </Container>
  )
}

export default App
