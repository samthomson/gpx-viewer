import { GPXData, GPXPoint } from "../../declarations";

export namespace Store {

	export type App = {
		haveAFile: boolean
		fileData: GPXData
		bFileLoading: boolean,
		aPointsInView: Array<GPXPoint>
	}
  
	export type All = {
	  app: App
	}
}
  