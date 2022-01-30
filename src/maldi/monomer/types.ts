import { EndGroupTuple } from '../endgroup'
import { Cation, Monomer } from '../types'

export interface Result {
  monomers: Monomer[]
  cation: Cation
  endGroups: EndGroupTuple
  totalMass: number
}
