const horseNames: string[] = [
  'Barbara',
  'Ada',
  'Grace',
  'Joan',
  'Margaret',
  'Katherine',
  'Hedy',
  'Annie',
  'Radia',
  'Karen',
  'Susan',
  'Evelyn',
  'Lin',
  'Marissa',
  'Shafi',
  'Fei-Fei',
  'Lovelace',
  'Clarke',
  'Hamilton',
  'Sparck',
] as const

export default horseNames
export type HorseName = (typeof horseNames)[number]
