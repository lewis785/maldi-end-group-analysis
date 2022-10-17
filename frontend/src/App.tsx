import { useEffect, useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import styled from 'styled-components'
import { ResultDisplay } from './components/ResultDisplay'

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
`

const initialState: Input = {
  peaks: [{ name: '', mass: 0 }],
  monomers: [{ name: '', mass: 0 }],
  cations: [
    { name: '', mass: 0 },
    { name: '', mass: 0 },
  ],
  endGroups: [{ name: '', mass: 0 }],
}

function App() {
  const [input, setInput] = useState<Input>(initialState)
  const [generateResult, result] = useMaldi()

  useEffect(() => {
    const state = sessionStorage.getItem('maldi-input')
    console.log('RENDERED', { state })
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
        <button onClick={onClick}>Generate</button>
        <ResultDisplay results={result} />
      </span>
    </Container>
  )
}

export default App
