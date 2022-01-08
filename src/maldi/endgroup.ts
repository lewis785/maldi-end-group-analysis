import { Cation } from './types'

export interface EndGroup {
  name: string
  mass: number
}

export interface CationEndGroup {
  cation: Cation
  endgroups: EndGroupTuple
  totalMass: number
}

export type EndGroupTuple = [EndGroup, EndGroup]

export const generateEndGroupCombinations = (
  endgroups: EndGroup[]
): EndGroupTuple[] => {
  const combinations = endgroups.flatMap<EndGroupTuple>((a, index) =>
    endgroups.slice(index).map<EndGroupTuple>((b) => [a, b])
  )

  return [
    ...combinations,
    [
      { name: 'empty', mass: 0 },
      { name: 'empty', mass: 0 },
    ],
  ]
}

export const generateCationEndGroupCombinations = (
  endGroups: EndGroupTuple[],
  cations: Cation[]
): CationEndGroup[] => {
  return cations.flatMap<CationEndGroup>((cation) =>
    endGroups.map((endgroup) => {
      return {
        cation,
        endgroups: endgroup,
        totalMass: cation.mass + endgroup[0].mass + endgroup[1].mass,
      }
    })
  )
}
