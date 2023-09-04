type Opacity = 0 | 0.1 | 0.2 | 0.3 | 0.4 | 0.5 | 0.6 | 0.7 | 0.8 | 0.9 | 1

const hexToRgba = (colorHex: string, alpha: Opacity = 1): string => {
  const [r, g, b] =
    colorHex.match(/[a-fA-F0-9]{2}/g)?.map((hex) => parseInt(hex, 16)) || []
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const rgbToRgba = (colorRgb: string, alpha: Opacity = 1): string => {
  const [r, g, b] = colorRgb.match(/\d+(.\d+)?/g) || []
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

const hslToHsla = (colorHsl: string, alpha: Opacity = 1): string => {
  const [h, s, l] = colorHsl.match(/(\d+(\.\d+)?)/g) || []
  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}

export const opacity = (color: string, alpha: Opacity) => {
  if (color.startsWith('hsl')) {
    return hslToHsla(color, alpha)
  }

  if (color.startsWith('rgb')) {
    return rgbToRgba(color, alpha)
  }

  if (color.startsWith('#')) {
    return hexToRgba(color, alpha)
  }

  return color
}
