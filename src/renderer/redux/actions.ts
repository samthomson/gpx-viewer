import * as fs from 'fs'
import { history } from '../GPXApp';
import { GPXData } from '../../declarations';
import { parseGPXData } from '../lib/helper';


export type Action = {
	type: 'LOAD_FILE',
	fileData: GPXData,
  } | {
	type: 'START_PAGE',
  }
  
export const loadFile = (filePath: string): Action => {
	// load data
	const sFileData = fs.readFileSync(filePath, 'utf8');
	 
	const gpxData: GPXData = parseGPXData(sFileData)

	// change page
	history.push('/mapview');
	return {
		type: 'LOAD_FILE',
		fileData: gpxData,
	}
}
  
export const goToStartPage = (): Action => {
	history.push('/');
	return {
		type: 'START_PAGE',
	}
}