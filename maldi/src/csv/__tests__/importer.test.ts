import { Input } from '../../maldi/types'
import { importer } from '../importer'

describe('#importer', () => {
  describe('valid input', () => {
    const path = `${__dirname}/data/multi_monomer.csv`
    let result: Input

    beforeEach(() => {
      result = importer(path)
    })

    it('should return correct peaks', () => {
      expect(result.peaks).toStrictEqual([
        { name: 'A', mass: 123 },
        { name: 'B', mass: 321 },
      ])
    })

    it('should return correct monomers', () => {
      expect(result.monomers).toStrictEqual([
        { name: 'Lactide', mass: 72 },
        { name: 'Propide', mass: 152 },
      ])
    })

    it('should return correct endGroups', () => {
      expect(result.endGroups).toStrictEqual([
        { name: 'OH', mass: 17 },
        { name: 'H', mass: 1 },
        { name: 'Magic', mass: 45 },
        { name: 'Something', mass: 12 },
        { name: 'Else', mass: 89 },
      ])
    })

    it('should return correct cations', () => {
      expect(result.cations).toStrictEqual([
        { name: 'K', mass: 39 },
        { name: 'Na', mass: 23 },
      ])
    })
  })
})
