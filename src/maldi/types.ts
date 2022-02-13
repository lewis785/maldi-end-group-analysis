import { EndGroupTuple } from './endgroup'

export interface NameMass {
  name: string
  mass: number
}

export interface Monomer extends NameMass {
  count?: number
}

export interface EndGroup extends NameMass {}

export interface Cation extends NameMass {}

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

export interface Result {
  monomers: Monomer[]
  cation: Cation
  endGroups: EndGroupTuple
  mass: {
    target: number
    actual: number
    difference: number
  }
}
