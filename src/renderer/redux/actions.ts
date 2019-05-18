import * as fs from 'fs'
import { history } from '../GPXApp'
import { GPXData, GPXPoint } from '../../declarations'

export const enum ActionType {
	SET_FILE_LOADING_STATUS = 'SET_FILE_LOADING_STATUS',
	START_PAGE = 'START_PAGE',
	START_LOADING_FILE = 'START_LOADING_FILE',
	UPDATE_POINTS_IN_VIEW = 'UPDATE_POINTS_IN_VIEW',
	LOADING_FILE_SUCCEEDED = 'LOADING_FILE_SUCCEEDED',
	LOADING_FILE_FAILED = 'LOADING_FILE_FAILED',
}

export type Action =
	| {
			type: ActionType.LOADING_FILE_SUCCEEDED
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
			filename: string
	  }
	| {
			type: ActionType.UPDATE_POINTS_IN_VIEW
			oBounds: any
	  }
	| {
			type: ActionType.LOADING_FILE_FAILED
			bFileLoading: boolean
	  }
	| {
			type: ActionType.SET_FILE_LOADING_STATUS
			bFileLoading: boolean
	  }

export const startLoadingFile = (sPath: string): Action => {
	return {
		type: ActionType.START_LOADING_FILE,
		bFileLoading: true,
		filename: sPath,
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

export const readingFileFailed = () => {
	return {
		type: ActionType.LOADING_FILE_FAILED,
		bFileLoading: true,
	}
}
export const setFileLoading = (bFileLoading: boolean) => {
	return {
		type: ActionType.SET_FILE_LOADING_STATUS,
		bFileLoading,
	}
}

export const readingFileSucceded = (gpxData: GPXData) => {
	// change page
	history.push('/mapview')
	return {
		type: ActionType.LOADING_FILE_SUCCEEDED,
		filepoints: gpxData.points,
		aPointsInView: gpxData.points,
		bFileLoading: false,
	}
}
