const { app, BrowserWindow } = require('electron')
const url = require("url");
const path = require("path");

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen:true,
    webPreferences: {
      nodeIntegration: true,
      devTools: false
    },
    icon: __dirname + '/app_icon.png'
  })

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/billing/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})