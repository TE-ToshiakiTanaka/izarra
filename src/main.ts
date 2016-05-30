/// <reference path="./typings/index.d.ts"/>

import path = require('path');
import electron = require('electron');
const app: Electron.App = electron.app;
const BrowserWindow: typeof Electron.BrowserWindow = electron.BrowserWindow;

interface flashData {
    filename: string;
    version: string;
}

var flashPlugin: {[key: string]: flashData} = {};
flashPlugin["win32"] = { filename: 'pepflashplayer.dll', version: '21.0.0.216'};
flashPlugin["linux"] = { filename: 'libpepflashplayer.so', version: '21.0.0.216'};
flashPlugin["darwin"] = {filename: 'PepperFlashPlayer.plugin',version: '21.0.0.216'};

var pepperPluginData = flashPlugin[process.platform];
var flashPath = path.join(__dirname, 'plugin', process.platform, pepperPluginData.filename);

app.commandLine.appendSwitch('ppapi-flash-path', flashPath);
app.commandLine.appendSwitch('ppapi-flash-version', flashPlugin[process.platform].version);

class Izarra {
    mainWindow: Electron.BrowserWindow = null;

    constructor(public app: Electron.App) {
        this.app.on('window-all-closed', () => {this.onWindowAllClosed();});
        this.app.on('ready', this.onReady);
    }

    onWindowAllClosed() {
        if(process.platform != 'darwin') {
            console.log("onWindowAllClosed");
            this.app.quit();
        }
    }

    onReady() {
        this.mainWindow = new BrowserWindow({
            width: 1600,
            height: 800,
            frame: true,
            transparent: false,
            resizable: false,
            webPreferences: {
                'plugins': true
            }
        });

        this.mainWindow.loadURL(path.join(__dirname, 'html', 'index.html'));
        this.mainWindow.on('closed', () => {
            this.mainWindow = null;
        });
    }
}

const izarra = new Izarra(app);
