const horseNames: string[] = [
  'Barbara',
  'Ada',
  'Grace',
  'Joan',
  'Cloe',
  'Katie',
  'Hedy',
  'Annie',
  'Radia',
  'Karen',
  'Susan',
  'Evelyn',
  'Lin',
  'Marry',
  'Shafi',
  'Fei',
  'Lovely',
  'Clarke',
  'Hami',
  'Sparck',
] as const

export default horseNames
export type HorseName = (typeof horseNames)[number]
