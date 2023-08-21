import { useEffect, useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import styled, { ThemeProvider } from 'styled-components'
import { ResultDisplay } from './components/ResultDisplay'
import { lightTheme } from './style/theme'

const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  height: 100dvh;
  color: ${({ theme }) => theme.primary.text};
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
          results={result}
          difference={difference}
          onValueChange={(value) => onInputChange(value)}
          onDifferenceChange={(newValue) => setDifference(newValue)}
          onSubmit={onClick}
        />
        <ResultDisplay results={result} />
      </Container>
    </ThemeProvider>
  )
}

export default App
