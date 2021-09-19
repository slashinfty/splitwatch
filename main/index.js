const { app, BrowserWindow } = require('electron');
const path = require('path');
const { default: installExtension, REACT_DEVELOPER_TOOLS } = require('electron-devtools-installer');

const isDev = process.env.NODE_ENV === 'development';

function createMainWindow() {
  const win = new BrowserWindow({
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

  win.setMenu(null);

  if (isDev) {
    installExtension([REACT_DEVELOPER_TOOLS])
      .then(() => {
        win.loadURL('http://localhost:3000?Main');
        win.webContents.openDevTools({ mode: 'detach' });
      })
      .catch(err => console.log('An error occurred: ', err));
  } else win.loadURL(`file://${path.join(__dirname, '../build/index.html?Main')}`);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) mainWindow();
});
