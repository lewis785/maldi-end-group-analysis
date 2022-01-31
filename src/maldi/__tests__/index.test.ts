import { Monomer, Result } from './../types'
import { generateMalidResults } from '..'
import { Cation, EndGroup } from '../types'

describe('#generateMalidResults', () => {
  const cations: Cation[] = [
    { name: 'Cation A', mass: 5 },
    { name: 'Cation B', mass: 10 },
  ]
  const endGroups: EndGroup[] = [
    { name: 'EndGroup A', mass: 5 },
    { name: 'EndGroup B', mass: 10 },
    { name: 'EndGroup C', mass: 15 },
  ]

  describe('singular monomer', () => {
    const monomers: Monomer[] = [{ name: 'Monomer A', mass: 10 }]
    let result: Result[]

    describe('threshold is zero', () => {
      beforeEach(() => {
        result = generateMalidResults(100, 0, monomers, endGroups, cations)
      })

      it('should return array containing 7 elements', () => {
        expect(result.length).toBe(7)
      })

      it('should only contain results with mass difference of zero', () => {
        result.forEach((ele) => expect(ele.mass.difference).toBe(0))
      })

      it('should only contain results where actual mass is 100', () => {
        result.forEach((ele) => expect(ele.mass.actual).toBe(100))
      })
    })

    describe('threshold is five', () => {
      beforeEach(() => {
        result = generateMalidResults(100, 5, monomers, endGroups, cations)
      })

      it('should return array containing 21 elements', () => {
        expect(result.length).toBe(21)
      })

      it('should only contain resultw where mass difference is 5 or less', () => {
        result.forEach((ele) =>
          expect(ele.mass.difference).toBeLessThanOrEqual(5)
        )
      })

      it('should only contain results where actual mass is between 95 and 105', () => {
        result.forEach((ele) => {
          expect(ele.mass.actual).toBeGreaterThanOrEqual(95)
          expect(ele.mass.actual).toBeLessThanOrEqual(105)
        })
      })
    })
  })
})
