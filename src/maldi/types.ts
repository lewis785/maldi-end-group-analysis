interface Base {
  name: string
  mass: number
}

export interface Monomer extends Base {
  count?: number
}

export interface EndGroup extends Base {}

export interface Cation extends Base {}

export interface EndGroupCombination {
  first: EndGroup
  second: EndGroup
}

export interface Combination {
  cation: Cation
  endGroups: EndGroupCombination
  monomer: Monomer[]
  peak: number
  threshold: number
}
