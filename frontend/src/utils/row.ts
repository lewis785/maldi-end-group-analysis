import { NameMass } from 'maldi-end-group-analysis'

const isRowEmpty = ({ name, mass }: NameMass) => {
  return name === '' && (mass === 0 || mass === null)
}

export const shouldAddRow = (rows: NameMass[]) => {
  return rows.every((row) => {
    return !isRowEmpty(row)
  })
}

export const shouldRemoveRow = (rows: NameMass[]) => {
  if (rows.length < 2) {
    return false
  }

  const [secondLast, last] = rows.slice(-2)
  return isRowEmpty(secondLast) && isRowEmpty(last)
}
