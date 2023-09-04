import { opacity } from '../opacity'

describe('#opacity', () => {
  describe('when color is hex', () => {
    it('should return rgba color', () => {
      expect(opacity('#123456', 0.5)).toEqual('rgba(18, 52, 86, 0.5)')
    })
  })

  describe('when color is rgb', () => {
    it('should return rgba color', () => {
      expect(opacity('rgb(12, 34, 56)', 0.5)).toEqual('rgba(12, 34, 56, 0.5)')
    })
  })

  describe('when color is hsl', () => {
    it.each([
      ['whole percentages', 'hsl(12, 34%, 56%)', 'hsla(12, 34%, 56%, 0.5)'],
      [
        'decimal percentages',
        'hsl(12, 34.45%, 56.67%)',
        'hsla(12, 34.45%, 56.67%, 0.5)',
      ],
      [
        'mixed percentages',
        'hsl(12, 34.45%, 56%)',
        'hsla(12, 34.45%, 56%, 0.5)',
      ],
    ])('should return hsla color when %s', (_, input, expected) => {
      expect(opacity(input, 0.5)).toEqual(expected)
    })
  })
})
