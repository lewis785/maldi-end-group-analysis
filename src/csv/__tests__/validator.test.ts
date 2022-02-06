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
        'Header is not correct. Expected "Peak Name,Peak Mass,Monomer Name,Monomer Mass,Cation Name,Cation Mass,Endgroup Name,Endgroup Mass" Recieved: "a,b,c,d,e,f,g,h"'
      )
    )
  })

  it('should not throw validation error if header correct', () => {
    expect(() =>
      validateHeader([
        'Peak Name',
        'Peak Mass',
        'Monomer Name',
        'Monomer Mass',
        'Cation Name',
        'Cation Mass',
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

  it.each([
    ['Peak', ['Peak', '123', '', '', '', '', '', '']],
    ['Monomer', ['', '', 'Monomer', '123', '', '', '', '']],
    ['Cation', ['', '', '', '', 'Cation', '123', '', '']],
    ['Endgroup', ['', '', '', '', '', '', 'Endgroup', '123']],
  ])(
    'should not throw validation error when name and mass are valid',
    (type, input: string[]) => {
      expect(() => validateRow(input)).not.toThrowError()
    }
  )

  it.each([
    ['Peak', ['Peak', 'Square', '', '', '', '', '', '']],
    ['Monomer', ['', '', 'Monomer', 'Square', '', '', '', '']],
    ['Cation', ['', '', '', '', 'Cation', 'Square', '', '']],
    ['Endgroup', ['', '', '', '', '', '', 'Endgroup', 'Square']],
  ])(
    'should throw validation error when %s mass is not a number',
    (type, input: string[]) => {
      expect(() => validateRow(input)).toThrowError(
        new ValidationError(`${type} mass must be a number.`)
      )
    }
  )

  it.each([
    ['Peak', ['Peak', '-123', '', '', '', '', '', '']],
    ['Monomer', ['', '', 'Monomer', '-123', '', '', '', '']],
    ['Cation', ['', '', '', '', 'Cation', '-123', '', '']],
    ['Endgroup', ['', '', '', '', '', '', 'Endgroup', '-123']],
  ])(
    'should throw validation error when %s mass is a negative number',
    (type, input: string[]) => {
      expect(() => validateRow(input)).toThrowError(
        new ValidationError(`${type} mass cannot be negative.`)
      )
    }
  )

  it.each([
    ['Peak', ['', '123', '', '', '', '', '', '']],
    ['Monomer', ['', '', '', '123', '', '', '', '']],
    ['Cation', ['', '', '', '', '', '123', '', '']],
    ['Endgroup', ['', '', '', '', '', '', '', '123']],
  ])(
    'should throw validation error when %s has mass but no name',
    (type, input: string[]) => {
      expect(() => validateRow(input)).toThrowError(
        new ValidationError(`${type} does not have a name.`)
      )
    }
  )

  it.each([
    ['Peak', ['Peak', '', '', '', '', '', '', '']],
    ['Monomer', ['', '', 'Monomer', '', '', '', '', '']],
    ['Cation', ['', '', '', '', 'Cation', '', '', '']],
    ['Endgroup', ['', '', '', '', '', '', 'Endgroup', '']],
  ])(
    'should throw validation error when %s has name but no mass',
    (type, input: string[]) => {
      expect(() => validateRow(input)).toThrowError(
        new ValidationError(`${type} does not have a mass.`)
      )
    }
  )
})
