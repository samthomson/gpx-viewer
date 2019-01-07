import { app, BrowserWindow } from 'electron'

let win = null

function createWindow () {
	// Create the browser window.
	win = new BrowserWindow({ width: 1200, height: 800 })
    win.webContents.openDevTools()

	// and load the index.html of the app.
	win.loadFile('./../html/index.html')
}

app.on('ready', createWindow)