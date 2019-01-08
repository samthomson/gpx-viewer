import { app, BrowserWindow } from 'electron'
import * as path from 'path'

let win = null

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({ width: 1200, height: 800 })
    win.webContents.openDevTools()

	// and load the index.html of the app.
	const sIndex = path.resolve('./html/index.html')
	win.loadFile(sIndex)
}

app.on('ready', createWindow)