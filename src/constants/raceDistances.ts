const raceDistances: number[] = [1200, 1400, 1600, 1800, 2000, 2200]
export default raceDistances
export type RaceDistance = (typeof raceDistances)[number]
