import { useState } from 'react'
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

function App() {
  const [input, setInput] = useState<Input>()
  const [generateResult, result] = useMaldi()

  const onClick = () => {
    if (input !== undefined) {
      generateResult(input)
    }
  }

  return (
    <Container>
      <InputForm onValueChange={(value) => setInput(value)} />
      <span>
      <button onClick={onClick}>Generate </button>
      <ResultsTable results={result} />
      </span>
    </Container>
  )
}

export default App
