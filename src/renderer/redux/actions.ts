import * as fs from 'fs'
import { history } from '../GPXApp'
import { GPXData, GPXPoint } from '../../declarations'
import { parseGPXData } from '../lib/helper'

export const enum ActionType {
	LOAD_FILE,
	START_PAGE,
	START_LOADING_FILE,
	UPDATE_POINTS_IN_VIEW,
}

export type Action =
	| {
			type: ActionType.LOAD_FILE
			filename: string
			filepoints: Array<GPXPoint>
			aPointsInView: Array<GPXPoint>
			bFileLoading: boolean
	  }
	| {
			type: ActionType.START_PAGE
			filename: string
	  }
	| {
			type: ActionType.START_LOADING_FILE
			bFileLoading: boolean
	  }
	| {
			type: ActionType.UPDATE_POINTS_IN_VIEW
			oBounds: any
	  }

export const loadFile = (filePath: string): Action => {
	// load data
	const sFileData = fs.readFileSync(filePath, 'utf8')
	const gpxData: GPXData = parseGPXData(sFileData)

	// change page
	history.push('/mapview')
	return {
		type: ActionType.LOAD_FILE,
		filename: gpxData.name,
		filepoints: gpxData.points,
		aPointsInView: gpxData.points,
		bFileLoading: false,
	}
}

export const startLoadingFile = (): Action => {
	return {
		type: ActionType.START_LOADING_FILE,
		bFileLoading: true,
	}
}

export const goToStartPage = (): Action => {
	history.push('/')
	return {
		filename: '',
		type: ActionType.START_PAGE,
	}
}

export const updatePointsInView = (oBounds: any): Action => {
	return {
		type: ActionType.UPDATE_POINTS_IN_VIEW,
		oBounds: oBounds,
	}
}
