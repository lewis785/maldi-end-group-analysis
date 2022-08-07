import { useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import { ResultsTable } from './components/ResultsTable'

function App() {
  const [input, setInput] = useState<Input>()
  const [generateResult, result] = useMaldi()

  const onClick = () => {
    if (input !== undefined) {
      generateResult(input)
    }
  }

  return (
    <div className="App">
      <InputForm onValueChange={(value) => setInput(value)} />
      <button onClick={onClick} />
      <ResultsTable results={result} />
    </div>
  )
}

export default App
