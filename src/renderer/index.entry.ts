
"use strict";

// フロントエンドライブラリの呼び出し

///////////////////////////////////////////////////////////////
// レンダラープロセスでやりとりするipcRenderer
import { ipcRenderer } from "electron";
import * as PIXI from "pixi.js-legacy";
import { SCREEN } from "../config";
import { Model } from "../datamodels/model";
///////////////////////////////////////////////////////////////
// >>
import { IFelectronMessage, MSG } from "./define";

// PIXI.js アプリケーショんの作成
const pixiapp = new PIXI.Application({
    width: SCREEN.WIDTH,
    // tslint:disable-next-line:object-literal-sort-keys
    height: SCREEN.HEIGHT,
    backgroundColor: 0x1099bb,
    antialias: false,
    resolution: 1,
});

// スケールの変更
pixiapp.renderer.resize(SCREEN.WIDTH, SCREEN.HEIGHT);
pixiapp.stage.scale.set(SCREEN.SCALE);
pixiapp.stage.interactive = true;
PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;
PIXI.settings.ROUND_PIXELS = true;

// add body tag
const divStage = document.getElementById("pixi_stage") as HTMLDivElement;
divStage.appendChild(pixiapp.view);

// モデルを追加
const model = new Model(pixiapp);

///////////////////////////////////////////////////////////////
/**
 * ルーチン
 */
pixiapp.ticker.add((delta: number) => {

    model.update(delta);

});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

////////// ページ読み込み後　//////////////////////////////
window.onload = function () {
    // ipc通信
    const send: IFelectronMessage = { error: null, message: null, anydata: null };
    ipcRenderer.send(MSG.MSG1, send);

    // page2（modal）open
    const btnPage2 = document.getElementById("btn_page2") as HTMLButtonElement;
    btnPage2.addEventListener("click", fnSendConfigWindow);

    const btnExit = this.document.getElementById("btn_exit") as HTMLButtonElement;
    btnExit.addEventListener("click", () => {
        ipcRenderer.send(MSG.MSG_EXIT, null);
    });
};
///////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const f1: HTMLFormElement = document.getElementById("comment-form") as HTMLFormElement;
    f1.onsubmit = () => {
        const commentInput: HTMLInputElement = document.getElementById("comment-input") as HTMLInputElement;
        if (commentInput.value === "") {
            return false;

        }

        const newComment: HTMLLIElement = document.createElement("li");
        newComment.innerText = commentInput.value;
        const cm: HTMLUListElement = document.getElementById("comments") as HTMLUListElement;
        cm.appendChild(newComment);
        commentInput.value = "";
        return false;
    };
});
///////////////////////////////////////////////////////////////
// 受信('msg1-reply')
// 非同期通信の受信の応答処理（asynchronous-replyチャンネル）
ipcRenderer.on(MSG.RE_MSG1, (_EV: any, arg: IFelectronMessage) => {
    // "pong"が出力される
    // console.log(event);
    if (arg.message !== null) {
        const fff: HTMLDivElement = document.getElementById("div-msg1") as HTMLDivElement;
        fff.innerText = arg.message;
    }

});
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
function fnSendConfigWindow() {
    const send: IFelectronMessage = { error: null, message: null, anydata: null };
    ipcRenderer.send(MSG.MSG_OPEN_PAGE2, send);
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
