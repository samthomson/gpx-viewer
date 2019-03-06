import * as fs from 'fs'
import { history } from '../GPXApp';
import { GPXData, GPXPoint } from '../../declarations';
import { parseGPXData } from '../lib/helper';


export type Action = {
	type: 'LOAD_FILE',
	fileData: GPXData,
	bFileLoading: boolean,
  } | {
	type: 'START_PAGE',
	fileData: GPXData,
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
	const gpxData: GPXData = parseGPXData(sFileData)

	// change page
	history.push('/mapview');
	return {
		type: 'LOAD_FILE',
		fileData: gpxData,
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
		fileData: null,
		type: 'START_PAGE',
	}
}

export const updatePointsInView = (pointsInView: Array<GPXPoint>): Action => {
	return { 
		type: 'UPDATE_POINTS_IN_VIEW',
		aPointsInView: pointsInView
	}
}