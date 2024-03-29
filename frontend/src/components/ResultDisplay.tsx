import { Result as MaldiResult } from 'maldi-end-group-analysis'
import { Results } from './Results'
import styled from 'styled-components'

const ResultSection = styled.section`
  display: grid;
  grid-auto-rows: auto;
  row-gap: 2rem;
  box-sizing: border-box;
  flex-grow: 999;
  flex-basis: 500px;
  padding: 1rem 1.5rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.background.primary};

  @media (min-width: 51rem) {
    height: 100%;
  }
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
