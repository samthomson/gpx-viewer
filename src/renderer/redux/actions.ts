import * as fs from 'fs'
import { history } from '../GPXApp';
import { GPXData, GPXPoint } from '../../declarations';
import { parseGPXData } from '../lib/helper';


export type Action = {
	type: 'LOAD_FILE',
	// fileData: GPXData,
	filename: string,
	filepoints: Array<GPXPoint>,
	bFileLoading: boolean,
  } | {
	type: 'START_PAGE',
	filename: string
	// fileData: GPXData,
  } | {
	type: 'START_LOADING_FILE',
	bFileLoading: boolean
  } | {
	type: 'UPDATE_POINTS_IN_VIEW',
	aPointsInView: Array<GPXPoint>
  }
  
export const loadFile = (filePath: string): Action => {
	// load data
	const sFileData = fs.readFileSync(filePath, 'utf8')	 

	var t0 = performance.now();
	const gpxData: GPXData = parseGPXData(sFileData)
	var t1 = performance.now();
	console.log("parsing data took " + (t1 - t0) + " milliseconds.")

	// change page
	history.push('/mapview');
	return {
		type: 'LOAD_FILE',
		// fileData: gpxData,
		filename: gpxData.name,
		filepoints: gpxData.points,
		bFileLoading: false
	}
}

export const startLoadingFile = (): Action => {
	return {
		type: 'START_LOADING_FILE',
		bFileLoading: true
	}
}
  
export const goToStartPage = (): Action => {
	history.push('/');
	return {
		// fileData: null,
		filename: '',
		// filepoints: [],
		type: 'START_PAGE',
	}
}

export const updatePointsInView = (pointsInView: Array<GPXPoint>): Action => {
	return { 
		type: 'UPDATE_POINTS_IN_VIEW',
		aPointsInView: pointsInView
	}
}