import { Input, Result } from 'maldi-end-group-analysis'
import { Button } from './buttons/Button'
import { csv } from 'maldi-end-group-analysis'
import { CSVLink } from 'react-csv'
import { useRef } from 'react'
import { parseInput } from '../utils/parseInput'

interface Props {
  input: Input
  results: Result[]
}

export const CsvExport = ({ input, results }: Props) => {
  const ref = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(
    null
  )

  const csvExport = () => {
    ref.current?.link.click()
  }

  return (
    <>
      <Button onClickHandler={csvExport} disabled={results.length === 0}>
        Export
      </Button>
      <CSVLink
        ref={ref}
        filename="maldi-end-group-analysis"
        data={csv.exportToArray(parseInput(input), results)}
        hidden
      >
        Export
      </CSVLink>
    </>
  )
}
