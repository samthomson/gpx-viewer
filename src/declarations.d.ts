interface GPXData {
	name: string,
	points: GPXPoint[]
}

interface GPXPoint {
	latitude: number,
	longitude: number,
	time: string,
	elevation?: number,
}

export { GPXData, GPXPoint };