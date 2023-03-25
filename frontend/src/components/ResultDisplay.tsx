import { Result as MaldiResult } from 'maldi-end-group-analysis'
import { Results } from './Results'
import styled from 'styled-components'

const ResultSection = styled.section`
  display: flex;
  justify-content: center;
  flex-grow: 999;
  flex-basis: 500px;
  padding: 1rem 1.5rem;
  overflow-y: auto;
`

interface Props {
  results: MaldiResult[]
}

export const ResultDisplay = ({ results }: Props) => {
  const peakResults = results.reduce<{ [key: string]: MaldiResult[] }>(
    (output, current, index) => {
      if (index === 0 || results[index - 1].peak.name !== current.peak.name) {
        return { ...output, [current.peak.name]: [current] }
      }
      return {
        ...output,
        [current.peak.name]: [...output[current.peak.name], current],
      }
    },
    {}
  )

  const renderTables = (peakResults: { [key: string]: MaldiResult[] }) => {
    return Object.values(peakResults).map((result, index) => {
      return <Results key={`results-${index}`} results={result} />
    })
  }

  return <ResultSection>{renderTables(peakResults)}</ResultSection>
}
