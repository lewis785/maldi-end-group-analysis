import { Result as MaldiResult } from 'maldi-end-group-analysis'

interface Props {
  result: MaldiResult
}

export const ResultRow = ({ result }: Props) => {
  return (
    <tr>
      <td>{result.peak.name}</td>
      <td>{result.peak.mass}</td>
      <td>{result.mass.actual}</td>
      <td>{result.mass.difference}</td>
      <td>
        {result.endGroups[0].name} ({result.endGroups[0].mass})
      </td>
      <td>
        {result.endGroups[1].name} ({result.endGroups[1].mass})
      </td>
      <td>
        {result.cation.name} ({result.cation.mass})
      </td>
      <td>
        {result.monomers[0].name} ({result.monomers[0].mass})
      </td>
      <td>{result.monomers[0].count}</td>
    </tr>
  )
}
