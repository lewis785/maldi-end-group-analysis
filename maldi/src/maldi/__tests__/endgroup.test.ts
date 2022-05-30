import {
  EndGroupTuple,
  generateCationEndGroupCombinations,
  generateEndGroupCombinations,
} from '../endgroup'
import { EndGroup } from '../endgroup'
import { Cation } from '../types'

describe('#generateEndGroupCombinations', () => {
  const endGroups: EndGroup[] = [
    { name: 'a', mass: 1 },
    { name: 'b', mass: 2 },
    { name: 'c', mass: 3 },
  ]

  it('should return correct possible combinations', () => {
    const expectedCombinations = [
      [
        { name: 'a', mass: 1 },
        { name: 'a', mass: 1 },
      ],
      [
        { name: 'a', mass: 1 },
        { name: 'b', mass: 2 },
      ],
      [
        { name: 'a', mass: 1 },
        { name: 'c', mass: 3 },
      ],
      [
        { name: 'b', mass: 2 },
        { name: 'b', mass: 2 },
      ],
      [
        { name: 'b', mass: 2 },
        { name: 'c', mass: 3 },
      ],
      [
        { name: 'c', mass: 3 },
        { name: 'c', mass: 3 },
      ],
      [
        { name: 'empty', mass: 0 },
        { name: 'empty', mass: 0 },
      ],
    ]

    expect(generateEndGroupCombinations(endGroups)).toStrictEqual(
      expectedCombinations
    )
  })

  it('should return correct number of possible combinations', () => {
    expect(generateEndGroupCombinations(endGroups).length).toBe(7)
  })
})

describe('#generateCationEndGroupCombination', () => {
  const cations: Cation[] = [
    { name: 'x', mass: 1000 },
    { name: 'y', mass: 2000 },
  ]

  const tupleOne: EndGroupTuple = [
    { name: 'a', mass: 1 },
    { name: 'a', mass: 1 },
  ]

  const tupleTwo: EndGroupTuple = [
    { name: 'a', mass: 1 },
    { name: 'b', mass: 2 },
  ]

  const tupleThree: EndGroupTuple = [
    { name: 'empty', mass: 0 },
    { name: 'empty', mass: 0 },
  ]

  const endGroupTuple: EndGroupTuple[] = [tupleOne, tupleTwo, tupleThree]

  it('should return correct possible combination', () => {
    const expectedCombinations = [
      {
        cation: { name: 'x', mass: 1000 },
        endGroups: tupleOne,
        totalMass: 1002,
      },
      {
        cation: { name: 'x', mass: 1000 },
        endGroups: tupleTwo,
        totalMass: 1003,
      },
      {
        cation: { name: 'x', mass: 1000 },
        endGroups: tupleThree,
        totalMass: 1000,
      },
      {
        cation: { name: 'y', mass: 2000 },
        endGroups: tupleOne,
        totalMass: 2002,
      },
      {
        cation: { name: 'y', mass: 2000 },
        endGroups: tupleTwo,
        totalMass: 2003,
      },
      {
        cation: { name: 'y', mass: 2000 },
        endGroups: tupleThree,
        totalMass: 2000,
      },
    ]

    expect(
      generateCationEndGroupCombinations(endGroupTuple, cations)
    ).toStrictEqual(expectedCombinations)
  })

  it('should return correct number of possible combination', () => {
    expect(
      generateCationEndGroupCombinations(endGroupTuple, cations).length
    ).toBe(6)
  })
})
