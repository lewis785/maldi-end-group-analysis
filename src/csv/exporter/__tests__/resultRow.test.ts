import { Input, Result } from '../../../maldi/types'
import { generateResultRow } from './../resultRow'

describe('#generateResultRow', () => {
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

  const baseResult: Result = {
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

  const differentResult: Result = {
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
  }

  const dataProvider: [string, Result, (string | number)[]][] = [
    [
      'first result',
      baseResult,
      ['A', 123, 154, 31, '', 2, 0, '', 1, 0, '', 1, 0, 1],
    ],
    [
      'second result',
      differentResult,
      ['Peak B', 543, 357, 186, '', 0, 13, '', 0, 1, '', 1, 1, 0],
    ],
    [
      'contains no endgroups',
      {
        ...baseResult,
        endGroups: [
          { name: 'empty', mass: 0 },
          { name: 'empty', mass: 0 },
        ],
      },
      ['A', 123, 154, 31, '', 2, 0, '', 1, 0, '', 0, 0, 0],
    ],
    [
      'two endGroups are the same',
      {
        ...baseResult,
        endGroups: [
          { name: 'Zebra', mass: 43 },
          { name: 'Zebra', mass: 43 },
        ],
      },
      ['A', 123, 154, 31, '', 2, 0, '', 1, 0, '', 2, 0, 0],
    ],
  ]

  it('should create result row of length fourteen', () => {
    expect(generateResultRow(baseResult, input).length).toBe(14)
  })

  it.each(dataProvider)(
    'should match expected result when %s',
    (_, result, expected) => {
      expect(generateResultRow(result, input)).toStrictEqual(expected)
    }
  )

  it('should throw error if more than one monomer matches column', () => {
    const duplicateMonomerResult = {
      ...baseResult,
      monomers: [
        { name: 'Lesomer', mass: 50 },
        { name: 'Lesomer', mass: 50 },
      ],
    } as Result

    expect(() => generateResultRow(duplicateMonomerResult, input)).toThrowError(
      new Error('Multiple monomers match column - Name: Lesomer Mass: 50')
    )
  })
})
