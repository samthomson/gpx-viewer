// @ts-ignore
import { parseString } from 'xml2js'
// import * as xml2js from 'xml2js'
import { GPXData, GPXPoint } from '../../declarations'

export const parseGPXData = (sFileData: string): GPXData => {
	let jData: any;
	let name: string;
	let points: GPXPoint[] = []

	parseString(sFileData, function (err: any, result: any) {
		jData = result
	});

	// console.log(jData)
	if (
		// basic requirements
		jData && 
		jData.gpx && 
		jData.gpx.trk && 
		jData.gpx.trk.length > 0 && 

		// name
		jData.gpx.trk[0].name &&
		jData.gpx.trk[0].name.length > 0 &&
		
		// trackpoints
		jData.gpx.trk.length > 0 && 
		jData.gpx.trk[0].trkseg &&
		jData.gpx.trk[0].trkseg.length > 0
	) {
		// parse name
		name = jData.gpx.trk[0].name[0];

		// parse trackpoints

		// a trk can have multiple segments (trkseg)
		jData.gpx.trk[0].trkseg.map((segment: any) => {
			// try and parse all of its' points, and add them to just one structure
			let oPoints = segment.trkpt

			oPoints.map((p: any) => {
				let oPoint: GPXPoint = {
					// grab properties we're looking for
					latitude: Number(p.$.lat),
					longitude: Number(p.$.lon),
					time: p.time[0],
					elevation: Number(p.ele[0])
				}
				// console.log(oPoint)
				points.push(oPoint)
			})
		})
	}

	return {
		name,
		points
	}
}	