export interface EndGroup {
  name: string
  mass: number
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
