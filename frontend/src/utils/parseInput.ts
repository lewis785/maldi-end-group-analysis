import { Input, NameMass } from 'maldi-end-group-analysis'

export const parseInput = (input: Input): Input => {
  return {
    peaks: removeEmptyValues(input.peaks),
    monomers: removeEmptyValues(input.monomers),
    endGroups: removeEmptyValues(input.endGroups),
    cations: removeEmptyValues(input.cations),
  }
}

const removeEmptyValues = (object: NameMass[]): NameMass[] => {
  return object.filter((ele) => ele.name !== '' && ele.mass !== 0)
}
