import { useEffect, useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import styled, { ThemeProvider } from 'styled-components'
import { ResultDisplay } from './components/ResultDisplay'
import { lightTheme } from './style/theme'
import { SliderInput } from './components/inputs/SliderInput'

const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr 2fr;
  height: 100vh;
`
const HStack = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.primary.white};
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
  const [difference, setDifference] = useState<number>(0)
  const [generateResult, result] = useMaldi()

  useEffect(() => {
    const state = sessionStorage.getItem('maldi-input')
    if (state !== null) {
      setInput(JSON.parse(state))
    }
  }, [])

  const onInputChange = (newInput: Input) => {
    sessionStorage.setItem('maldi-input', JSON.stringify(newInput))
    setInput(newInput)
  }

  const onClick = () => {
    if (input !== undefined) {
      generateResult(input, difference)
    }
  }

  return (
    <ThemeProvider theme={lightTheme}>
    <Container>
      <InputForm
        input={input}
        onValueChange={(value) => onInputChange(value)}
      />
        <HStack>
          <SliderInput
            min={0}
            max={100}
            value={difference}
            onChange={(newValue) => setDifference(newValue)}
        />
        <button onClick={onClick}>Generate</button>
        <ResultDisplay results={result} />
        </HStack>
    </Container>
    </ThemeProvider>
  )
}

export default App
