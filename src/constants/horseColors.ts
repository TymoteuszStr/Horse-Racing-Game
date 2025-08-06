const horseColors: string[] = [
  'red',
  'blue',
  'green',
  'orange',
  'purple',
  'darkkhaki',
  'cyan',
  'magenta',
  'lime',
  'teal',
  'pink',
  'brown',
  'black',
  'gray',
  'indigo',
  'gold',
  'silver',
  'coral',
  'maroon',
  'navy',
] as const

export default horseColors
export type HorseColor = (typeof horseColors)[number]
