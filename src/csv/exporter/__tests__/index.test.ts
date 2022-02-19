import { Input, Result } from 'maldi/types'
import { exporter } from '..'

describe('#exporter', () => {
  const input: Input = {
    peaks: [
      { name: 'A', mass: 123 },
      { name: 'Peak B', mass: 543 },
    ],
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

  const results: Result[] = [
    {
      peak: { name: 'A', mass: 123 },
      monomers: [{ name: 'Lesomer', mass: 50, count: 2 }],
      cation: { name: 'K', mass: 10 },
      endGroups: [
        { name: 'Zebra', mass: 43 },
        { name: 'H', mass: 1 },
      ],
      mass: {
        target: 123,
        actual: 154,
        difference: 31,
      },
    },
    {
      peak: { name: 'Peak B', mass: 543 },
      monomers: [{ name: 'samomer', mass: 20, count: 13 }],
      cation: { name: 'Na', mass: 37 },
      endGroups: [
        { name: 'OH', mass: 17 },
        { name: 'Zebra', mass: 43 },
      ],
      mass: {
        target: 543,
        actual: 357,
        difference: 186,
      },
    },
  ]

  it('should generate header correctly', () => {
    const expected = `,,,,,Monomer,,,Cation,,,Endgroup,,
,,,,,Lesomer,samomer,,K,Na,,Zebra,OH,H
,,,,,50,20,,10,37,,43,17,1
Peak Name,Peak Mass,Actual Mass,Difference,,,,,,,,,,,
A,123,154,31,,2,0,,1,0,,1,0,1
Peak B,543,357,186,,0,13,,0,1,,1,1,0`

    expect(exporter(input, results)).toBe(expected)
  })
})
