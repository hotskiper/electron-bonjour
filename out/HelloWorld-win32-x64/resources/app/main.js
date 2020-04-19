// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const express = require('express')
const path = require('path')
const expressApp = express()
const bonjourClient = require('bonjour')()

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  createServer(mainWindow)
  bonjourLink()
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

function createServer(mainWindow) {
  expressApp.get('/users', (req, res) => {
    mainWindow.loadFile('index2.html')
    res.send('page changed')
  })

  expressApp.get('/users2', (req, res) => {
    mainWindow.loadFile('index.html')
    res.send('page changed')
  })

  expressApp.listen(3002, () => {
    console.log('http://localhost:3002')
  })
}

function bonjourLink() {
  //查找所有的type=http的服务
  bonjourClient.find({ type: 'http' }, function (service) {
    //获取服务名为my-is-hostA的ip地址
  if (service.name === 'my-is-hostA') {
    console.log("主机A的IP：" + JSON.stringify(service))
  }
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
