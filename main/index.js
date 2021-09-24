const { app, BrowserWindow, dialog, globalShortcut, ipcMain } = require('electron');
const contextMenu = require('electron-context-menu');
const fs = require('fs');
const path = require('path');
const Store = require('electron-store');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const isDev = process.env.NODE_ENV === 'development';

let mainWindow, raceWindow, settingsWindow, createWindow;

contextMenu({
    window: mainWindow,
    prepend: (defaultActions, parameters, browserWindow) => [
        {
            label: "Screenshot",
            click: async () => {
                const img = await browserWindow.capturePage();
                const dir = dialog.showOpenDialogSync({
                    "title": "Select Directory to Save Image",
                    "properties": [
                        "openDirectory"
                    ]
                })[0];
                const file = path.join(dir, `/Splitwatch_${new Date().toISOString().replace(/\:|\./g, "-").replace("T", "_").replace("Z", "")}.png`);
                fs.writeFileSync(file, img.toPNG());
            }
        },
        {
            label: "Quit",
            click: () => app.quit()
        }
    ]
});

function createMainWindow() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 300,
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInWorker: true,
            nodeIntegrationInSubFrames: true,
            enableRemoteModule: true,
            contextIsolation: false
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
