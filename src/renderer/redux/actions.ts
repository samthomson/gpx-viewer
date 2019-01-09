import {  Dispatch } from 'redux';
import { history } from '../GPXApp';

const MAP_PAGE: string = 'MAP_PAGE'
const START_PAGE: string = 'START_PAGE'

export type Action = {
	type: 'MAP_PAGE',
	filePath: string,
  } | {
	type: 'START_PAGE',
  }
  
export const goToMapPage = (filePath: string): Action => {
	// change page
	history.push('/mapview');
	return {
		type: 'MAP_PAGE',
		filePath,
	}
}
  
export const goToStartPage = (): Action => {
	history.push('/');
	return {
		type: 'START_PAGE',
	}
}