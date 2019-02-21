import { GPXData } from "../../declarations";

export namespace Store {

	export type App = {
		haveAFile: boolean
		fileData: GPXData
		bFileLoading: boolean
	}
  
	export type All = {
	  app: App
	}
}
  