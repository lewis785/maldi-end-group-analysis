import { Monomer } from '../../types'
import { monomerCombinations } from '../monomerCombinations'

describe('#monomerCombinations', () => {
  describe('single monomer', () => {
    const monomer: Monomer = { name: 'A', mass: 25 }

    describe('monomer divides into target with no remainder', () => {
      const monomer: Monomer = { name: 'A', mass: 25 }

      it('should return four results', () => {
        expect(monomerCombinations(100, [monomer]).length).toBe(4)
      })

      it('should match expected result', () => {
        const expectedResult = [
          [{ ...monomer, count: 1 }],
          [{ ...monomer, count: 2 }],
          [{ ...monomer, count: 3 }],
          [{ ...monomer, count: 4 }],
        ]

        expect(monomerCombinations(100, [monomer])).toStrictEqual(
          expectedResult
        )
      })
    })

    describe('monomer divides into target with remainder', () => {
      const monomer: Monomer = { name: 'A', mass: 30 }

      it('should round down and return three results', () => {
        expect(monomerCombinations(100, [monomer]).length).toBe(3)
      })

      it('should match expected result', () => {
        const expectedResult = [
          [{ ...monomer, count: 1 }],
          [{ ...monomer, count: 2 }],
          [{ ...monomer, count: 3 }],
        ]

        expect(monomerCombinations(100, [monomer])).toStrictEqual(
          expectedResult
        )
      })
    })
  })
})
