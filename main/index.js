const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const path = require('path');
const Store = require('electron-store');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow, raceWindow, settingsWindow, createWindow;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            contextIsolation: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.setMenu(null);

    if (isDev) {
        installExtension([REACT_DEVELOPER_TOOLS])
            .then(() => {
                mainWindow.loadURL('http://localhost:3000?Main');
                mainWindow.webContents.openDevTools({ mode: 'detach' });
            }).catch(err => console.log('An error occurred: ', err));
    } else mainWindow.loadURL(`file://${path.join(__dirname, '../build/index.html?Main')}`);
}

app.whenReady().then(() => {
    createMainWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
});
