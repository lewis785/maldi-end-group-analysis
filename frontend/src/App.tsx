import { useState } from 'react'
import { InputForm } from './components/InputForm'
import { useMaldi } from './hooks/useMaldi'
import { Input } from 'maldi-end-group-analysis'
import { Results } from './components/Results'

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
      <Results results={result} />
    </div>
  )
}

export default App
