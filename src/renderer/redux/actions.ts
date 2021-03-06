import * as fs from 'fs'
import { history } from '../GPXApp';
import { GPXData, GPXPoint } from '../../declarations';
import { parseGPXData } from '../lib/helper';


export type Action = {
	type: 'LOAD_FILE',
	filename: string,
	filepoints: Array<GPXPoint>,
	aPointsInView: Array<GPXPoint>,
	bFileLoading: boolean,
  } | {
	type: 'START_PAGE',
	filename: string
  } | {
	type: 'START_LOADING_FILE',
	bFileLoading: boolean
  } | {
	type: 'UPDATE_POINTS_IN_VIEW',
	oBounds: any
  }
  
export const loadFile = (filePath: string): Action => {
	// load data
	const sFileData = fs.readFileSync(filePath, 'utf8')	 
	const gpxData: GPXData = parseGPXData(sFileData)

	// change page
	history.push('/mapview');
	return {
		type: 'LOAD_FILE',
		filename: gpxData.name,
		filepoints: gpxData.points,
		aPointsInView: gpxData.points,
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
		filename: '',
		type: 'START_PAGE',
	}
}

export const updatePointsInView = (oBounds: any): Action => {
	return { 
		type: 'UPDATE_POINTS_IN_VIEW',
		oBounds: oBounds
	}
}