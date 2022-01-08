import { generateEndGroupCombinations } from '../endgroup'
import { EndGroup } from '../endgroup'

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
    console.log(generateEndGroupCombinations(endGroups))
    expect(generateEndGroupCombinations(endGroups).length).toBe(7)
  })
})
