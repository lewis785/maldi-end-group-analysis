export interface NameMass {
  name: string
  mass: number
}

export interface Input {
  totalMass: number
  difference: number
  monomers: NameMass[]
  endGroups: NameMass[]
  cations: NameMass[]
}
