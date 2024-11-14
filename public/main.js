const { app, BrowserWindow, ipcMain, remote } = require("electron");
const exec = require("child_process").execSync;
const path = require("path");
const { stdout, stderr } = require("process");

function createWindow() {
  const win = new BrowserWindow({
    autoHideMenuBar: true,
    fullscreen: true,
    width: 1000,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  ipcMain.handle("run-command", (event, args) => {
    exec(`ren sample.txt newsample.txt`, (error, stdout, stderr) => {
      if (error) {
        console.log(error);
      }
    });
  });

  win.loadFile(path.join("dist", "index.html"));

  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
