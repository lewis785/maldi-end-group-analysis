import { Input, Result } from 'maldi-end-group-analysis'
import { Button } from './buttons/Button'
import { csv } from 'maldi-end-group-analysis'
import { CSVLink } from 'react-csv'
import { useEffect, useRef, useState } from 'react'
import { parseInput } from '../utils/parseInput'

interface Props {
  input: Input
  results: Result[]
}

const isValidInput = (input: Input) => {
  return (
    input.peaks.length > 0 &&
    input.monomers.length > 0 &&
    input.cations.length > 0 &&
    input.endGroups.length > 0
  )
}

export const CsvExport = ({ input, results }: Props) => {
  const [data, setData] = useState<(string | number | undefined)[][]>([])
  const ref = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(
    null
  )

  const csvExport = () => {
    const parsedInput = parseInput(input)
    setData(
      isValidInput(parsedInput) ? csv.exportToArray(parsedInput, results) : []
    )

    ref.current?.link.click()
  }

  return (
    <>
      <Button
        onClickHandler={csvExport}
        disabled={results.length === 0 || !isValidInput(parseInput(input))}
      >
        Export
      </Button>
      <CSVLink ref={ref} filename="maldi-end-group-analysis" data={data} hidden>
        Export
      </CSVLink>
    </>
  )
}
