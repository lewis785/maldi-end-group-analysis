import { Input, Result } from 'maldi/types'
import { generateResultRow } from './../resultRow'

describe('#generateResultRow', () => {
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

  const result: Result = {
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
  }

  it('should create result row of length fourteen', () => {
    expect(generateResultRow(result, input).length).toBe(14)
  })

  it('should match expected result', () => {
    expect(generateResultRow(result, input)).toStrictEqual([
      'A',
      123,
      154,
      31,
      '',
      2,
      0,
      '',
      1,
      0,
      '',
      1,
      0,
      1,
    ])
  })
})
