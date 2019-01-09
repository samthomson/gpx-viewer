import {  Dispatch } from 'redux';
import fs from 'fs'
import { history } from '../GPXApp';

const MAP_PAGE: string = 'MAP_PAGE'
const START_PAGE: string = 'START_PAGE'

export type Action = {
	type: 'LOAD_FILE',
	fileData: string,
  } | {
	type: 'START_PAGE',
  }
  
export const loadFile = (filePath: string): Action => {
	// load data
 	const sFileData = fs.readFileSync(filePath, 'utf8');

	// change page
	history.push('/mapview');
	return {
		type: 'LOAD_FILE',
		fileData: sFileData,
	}
}
  
export const goToStartPage = (): Action => {
	history.push('/');
	return {
		type: 'START_PAGE',
	}
}