import { Result } from 'maldi-end-group-analysis'
import styled from 'styled-components'

const Title = styled.header`
  font-size: 1.5rem;
`

interface Props {
  result: Result
}

export const PeakTitle = ({ result }: Props) => {
  const { peak } = result

  return (
    <Title>
      {peak.name} - {peak.mass}
    </Title>
  )
}
