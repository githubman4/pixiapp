
'use strict'
import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { IFelectronMessage, MSG } from '../renderer/define'
/// //////////////////////////////////////////////////////

let win: BrowserWindow

/// //////////////////////////////////////////////////////
function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 800,
    // tslint:disable-next-line:object-literal-sort-keys
    height: 600,
    // kiosk:true,
    // frame: false,
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true
      // nodeIntegration: false,
      // preload: path.resolve(__dirname, './index.js'),
      /*
                ***** 重 要 *****
                PIXI.jsなどのモジュールではpreloadが使用できない。
                その場合は,nodeIntegrationをtrueに設定する。

                nodeIntegration: true

                またhtmlファイルには以下のようなスクリプトを記述しなくてはならない

                <script src="../../output/index.js"></script>

            */

    }
  })

  win.loadFile('src/public/index.html')

  // デベロッパーツールの起動
  win.webContents.openDevTools()

  win.on('closed', () => { win.destroy() })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

/// //////////////////////////////////////////////////////
ipcMain.on(MSG.MSG_EXIT, () => {
  win.destroy()
})

/// //////////////////////////////////////////////////////
ipcMain.on(MSG.MSG1, (event: any, _ARG: any) => {
  // console.log(arg);
  const reMsg: IFelectronMessage = { error: null, message: ' connected  ipc Message connection!!', anydata: null }
  event.sender.send(MSG.RE_MSG1, reMsg)
})
/// //////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////
// Open page2 window (modal)
ipcMain.on(MSG.MSG_OPEN_PAGE2, (_EV: any, _ARG: IFelectronMessage) => {
  const childWindows = new BrowserWindow({
    modal: true,
    parent: win,
    show: false,
    webPreferences: {
      // nodeIntegration: true,
      nodeIntegration: false,
      preload: path.resolve(__dirname, './page2.js')
      /*
                ***** 重 要 *****
                PIXI.jsなどのモジュールではpreloadが使用できない。
                その場合は,nodeIntegrationをtrueに設定する。

                nodeIntegration: true

                またhtmlファイルには以下のようなスクリプトを記述しなくてはならない

                <script src="../../output/index.js"></script>

            */

    }
  })

  childWindows.loadFile('./src/public/page2.html')
  // console.log(__dirname);

  childWindows.once('ready-to-show', () => {
    childWindows.show()
  })
})
/// //////////////////////////////////////////////////////
