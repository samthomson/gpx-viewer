import { GPXData, GPXPoint } from "../../declarations";

export namespace Store {

	export type App = {
		haveAFile: boolean
		filename: string,
		filepoints: Array<GPXPoint>,
		bFileLoading: boolean,
		aPointsInView: Array<GPXPoint>
	}
  
	export type All = {
	  app: App
	}
}
  