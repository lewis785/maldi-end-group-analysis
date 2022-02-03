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
