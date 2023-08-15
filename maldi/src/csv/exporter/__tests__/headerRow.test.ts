import { Input } from '../../../maldi/types'
import { generateHeader } from '../headerRow'

describe('#generateHeader', () => {
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

  describe('valid input', () => {
    let result: string[][]
    beforeEach(() => {
      result = generateHeader(input)
    })

    it('should generate rows element count matches column count', () => {
      result.forEach((row) => expect(row.length).toBe(14))
    })

    it('should generate three rows', () => {
      expect(result.length).toBe(4)
    })

    it('should generate title row correctly', () => {
      expect(result[0]).toStrictEqual([
        '',
        '',
        '',
        '',
        '',
        'Monomer',
        '',
        '',
        'Cation',
        '',
        '',
        'Endgroup',
        '',
        '',
      ])
    })

    it('should generate names row correctly', () => {
      expect(result[1]).toStrictEqual([
        '',
        '',
        '',
        '',
        '',
        'Lesomer',
        'samomer',
        '',
        'K',
        'Na',
        '',
        'Zebra',
        'OH',
        'H',
      ])
    })

    it('should generate mass row correctly', () => {
      expect(result[2]).toStrictEqual([
        '',
        '',
        '',
        '',
        '',
        '50',
        '20',
        '',
        '10',
        '37',
        '',
        '43',
        '17',
        '1',
      ])
    })

    it('should generate peak row correctly', () => {
      expect(result[3]).toStrictEqual([
        'Peak Name',
        'Peak Mass',
        'Actual Mass',
        'Difference',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
      ])
    })

    it.each([
      ['peaks', { ...input, peaks: [] }],
      ['monomers', { ...input, monomers: [] }],
      ['cations', { ...input, cations: [] }],
      ['endGroups', { ...input, endGroups: [] }],
      ['all', { peaks: [], monomers: [], cations: [], endGroups: [] }],
    ])('should not throw range error when %s are empty', (_, input) => {
      expect(() => generateHeader(input)).not.toThrow(RangeError)
    })
  })
})
