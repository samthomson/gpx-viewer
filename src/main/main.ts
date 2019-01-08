import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'

let mainWindow = null

function createWindow () {
	// Create the browser window.
	mainWindow = new BrowserWindow({ width: 1200, height: 800 })
    mainWindow.webContents.openDevTools()

	// and load the index.html of the app.
	mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        })
	);
	
}

app.on('ready', createWindow)