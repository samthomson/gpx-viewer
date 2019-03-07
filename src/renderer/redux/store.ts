import { GPXData, GPXPoint } from "../../declarations";

export namespace Store {

	export type App = {
		haveAFile: boolean
		// fileData: GPXData
		filename: string,
		filepoints: Array<GPXPoint>,
		bFileLoading: boolean,
		aPointsInView: Array<GPXPoint>
	}
  
	export type All = {
	  app: App
	}
}
  