import { Column } from './enum'
import { Input, NameMass } from './../maldi/types'
import { validateHeader, validateRow } from './validator'
import fs from 'fs'

interface Row {
  peak: NameMass | undefined
  monomer: NameMass | undefined
  endgroup: NameMass | undefined
  cation: NameMass | undefined
}

export const importer = (path: string) => {
  const [header, ...rows] = fs
    .readFileSync(path)
    .toString('utf-8')
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.split(','))

  const parsedInput: Input = {
    peaks: [],
    monomers: [],
    endGroups: [],
    cations: [],
  }

  rows.forEach((row) => {
    const { peak, monomer, endgroup, cation } = parseRow(row)
    parsedInput.peaks = peak ? [...parsedInput.peaks, peak] : parsedInput.peaks
    parsedInput.monomers = monomer
      ? [...parsedInput.monomers, monomer]
      : parsedInput.monomers
    parsedInput.endGroups = endgroup
      ? [...parsedInput.endGroups, endgroup]
      : parsedInput.endGroups
    parsedInput.cations = cation
      ? [...parsedInput.cations, cation]
      : parsedInput.cations
  })

  return parsedInput
}

const parseRow = (row: string[]): Row => {
  validateRow(row)
  let peak, monomer, endgroup, cation

  if (row[Column.PEAK_NAME] !== '') {
    peak = {
      name: row[Column.PEAK_NAME],
      mass: Number(row[Column.PEAK_MASS]),
    }
  }

  if (row[Column.MONOMER_NAME] !== '') {
    monomer = {
      name: row[Column.MONOMER_NAME],
      mass: Number(row[Column.MONOMER_MASS]),
    }
  }

  if (row[Column.ENDGROUP_NAME] !== '') {
    endgroup = {
      name: row[Column.ENDGROUP_NAME],
      mass: Number(row[Column.ENDGROUP_MASS]),
    }
  }

  if (row[Column.CATION_NAME] !== '') {
    cation = {
      name: row[Column.CATION_NAME],
      mass: Number(row[Column.CATION_MASS]),
    }
  }

  return { peak, monomer, endgroup, cation }
}
