import { Input } from '../../../maldi/types'
import { exporter } from '..'

describe('#exporter', () => {
  const input: Input = {
    peaks: [{ name: 'A', mass: 123 }],
    monomers: [
      { name: 'Lesomer', mass: 50 },
      { name: 'samomer', mass: 20 },
    ],
    cations: [
      { name: 'K', mass: 10 },
      { name: 'Na', mass: 37 },
    ],
    endGroups: [
      { name: 'Zebra', mass: 43 },
      { name: 'OH', mass: 17 },
      { name: 'H', mass: 1 },
    ],
  }

  it('should generate header correctly', () => {
    expect(exporter(input, [])).toBe(
      ',,,,,Monomer,,,Cation,,,Endgroup,,\n,,,,,Lesomer,samomer,,K,Na,,Zebra,OH,H\n,,,,,50,20,,10,37,,43,17,1\nPeak Name,Peak Mass,Actual Mass,Difference,,,,,,,,,,,'
    )
  })
})
