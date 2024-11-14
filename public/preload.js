const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  executeCmd: () => ipcRenderer.invoke("run-command"),
  // setScreen: (toggle) => ipcRenderer.invoke("set-screen", toggle),
});
