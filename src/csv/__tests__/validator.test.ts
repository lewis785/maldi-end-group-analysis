import { validateRow } from './../validator'
import { validateHeader, ValidationError } from '../validator'

describe('#validateHeader', () => {
  it('should throw validation error when header is too short', () => {
    expect(() => validateHeader([])).toThrowError(
      new ValidationError('Incorrect column count. Expected: 7 Recieved: 0')
    )
  })

  it('should throw validation error when header is too long', () => {
    expect(() =>
      validateHeader(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    ).toThrowError(
      new ValidationError('Incorrect column count. Expected: 7 Recieved: 8')
    )
  })

  it('should throw validation error when header is not correct', () => {
    expect(() =>
      validateHeader(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
    ).toThrowError(
      new ValidationError(
        'Header is not correct. Expected "Peak,Cation,Mass,Monomer,Mass,Endgroup,Mass" Recieved: "a,b,c,d,e,f,g"'
      )
    )
  })

  it('should not throw validation error if header correct', () => {
    expect(() =>
      validateHeader([
        'Peak',
        'Cation',
        'Mass',
        'Monomer',
        'Mass',
        'Endgroup',
        'Mass',
      ])
    ).not.toThrowError()
  })
})

describe('#validateRow', () => {
  it('should throw validation error is too few columns', () => {
    expect(() => validateRow([])).toThrowError(
      new ValidationError('Incorrect column count. Expected: 7 Recieved: 0')
    )
  })

  it('should throw validation error when header is too long', () => {
    expect(() =>
      validateRow(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'])
    ).toThrowError(
      new ValidationError('Incorrect column count. Expected: 7 Recieved: 8')
    )
  })

  it('should throw validation error if no values in row', () => {
    expect(() => validateRow(['', '', '', '', '', '', ''])).toThrowError(
      new ValidationError('No data found in row.')
    )
  })

  describe('peak validation', () => {
    it('should not throw validation error when row contains a peak value and is number', () => {
      expect(() =>
        validateRow(['100', '', '', '', '', '', ''])
      ).not.toThrowError()
    })

    it('should throw validation error when row contains a peak value and is not a number', () => {
      expect(() =>
        validateRow(['Square', '', '', '', '', '', ''])
      ).toThrowError(new ValidationError('Peak value must be a number.'))
    })

    it('should throw validation error when row contains a peak value and is a negative number', () => {
      expect(() => validateRow(['-100', '', '', '', '', '', ''])).toThrowError(
        new ValidationError('Peak value cannot be negative.')
      )
    })
  })
})
