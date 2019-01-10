import { GPXData } from "../../declarations";

export namespace Store {

	export type App = {
		haveAFile: boolean
		fileData: GPXData
	}
  
	export type All = {
	  app: App
	}
}
  