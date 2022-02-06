import { validateRow } from './../validator'
import { validateHeader, ValidationError } from '../validator'

describe('#validateHeader', () => {
  it('should throw validation error when header is too short', () => {
    expect(() => validateHeader([])).toThrowError(
      new ValidationError('Incorrect column count. Expected: 8 Recieved: 0')
    )
  })

  it('should throw validation error when header is too long', () => {
    expect(() =>
      validateHeader(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
    ).toThrowError(
      new ValidationError('Incorrect column count. Expected: 8 Recieved: 9')
    )
  })

  it('should throw validation error when header is not correct', () => {
    expect(() =>
      validateHeader(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    ).toThrowError(
      new ValidationError(
        'Header is not correct. Expected "Peak Name,Peak Mass,Cation Name,Cation Mass,Monomer Name,Monomer Mass,Endgroup Name,Endgroup Mass" Recieved: "a,b,c,d,e,f,g,h"'
      )
    )
  })

  it('should not throw validation error if header correct', () => {
    expect(() =>
      validateHeader([
        'Peak Name',
        'Peak Mass',
        'Cation Name',
        'Cation Mass',
        'Monomer Name',
        'Monomer Mass',
        'Endgroup Name',
        'Endgroup Mass',
      ])
    ).not.toThrowError()
  })
})

describe('#validateRow', () => {
  it('should throw validation error is too few columns', () => {
    expect(() => validateRow([])).toThrowError(
      new ValidationError('Incorrect column count. Expected: 8 Recieved: 0')
    )
  })

  it('should throw validation error when header is too long', () => {
    expect(() =>
      validateRow(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'])
    ).toThrowError(
      new ValidationError('Incorrect column count. Expected: 8 Recieved: 9')
    )
  })

  it('should throw validation error if no values in row', () => {
    expect(() => validateRow(['', '', '', '', '', '', '', ''])).toThrowError(
      new ValidationError('No data found in row.')
    )
  })

  describe('peak validation', () => {
    it('should not throw validation error when row contains a peak value and is number', () => {
      expect(() =>
        validateRow(['A', '100', '', '', '', '', '', ''])
      ).not.toThrowError()
    })

    it('should throw validation error when row contains a peak value and is not a number', () => {
      expect(() =>
        validateRow(['A', 'Square', '', '', '', '', '', ''])
      ).toThrowError(new ValidationError('Peak value must be a number.'))
    })

    it('should throw validation error when row contains a peak value and is a negative number', () => {
      expect(() =>
        validateRow(['A', '-100', '', '', '', '', '', ''])
      ).toThrowError(new ValidationError('Peak value cannot be negative.'))
    })
  })

  describe('monomer validation', () => {
    it('should not throw validation error when monomer name and mass are valid', () => {
      expect(() =>
        validateRow(['', '', '', '', 'A', '123', '', ''])
      ).not.toThrowError()
    })

    it('should throw validation error if monomer name but no mass', () => {
      expect(() => validateRow(['', '', '', '', 'A', '', '', ''])).toThrowError(
        new ValidationError('Monomer does not have a mass.')
      )
    })

    it('should throw validation error if monomer has mass but no name', () => {
      expect(() =>
        validateRow(['', '', '', '', '', '123', '', ''])
      ).toThrowError(new ValidationError('Monomer does not have a name.'))
    })

    it('should throw validation error when monomer mass is not a number', () => {
      expect(() =>
        validateRow(['', '', '', '', 'A', 'Square', '', ''])
      ).toThrowError(new ValidationError('Monomer mass must be a number.'))
    })

    it('should throw validation error when monomer mass is negative', () => {
      expect(() =>
        validateRow(['', '', '', '', 'A', '-125', '', ''])
      ).toThrowError(new ValidationError('Monomer mass cannot be negative.'))
    })
  })
})
