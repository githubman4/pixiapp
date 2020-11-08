/// //////////////////////////////////////////////////////////
// import * as PIXI from "pixi.js-legacy";
// import { PIXI } from "../config";
/// //////////////////////////////////////////////////////////
// ステージ更新用の関数を定義
export interface IStageStruct {
    update(d: number): void;
}
/// //////////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////////
/**
 * コンテナーの識別用
 */
export enum STAGE_TYPE {
    MENU = 0,
    PLAY = 1,
    STAGE2 = 2,
}
/// //////////////////////////////////////////////////////////
export class ModelStage implements IStageStruct {
    // 更新関数
    public stagetype: STAGE_TYPE; // ステージ識別
    // eslint-disable-next-line no-undef
    public container: PIXI.Container; // コンテナ
    public status: {}; // 全体のステータス
    public update: (arg0: number) => void;

    // コンストラクタ
    // eslint-disable-next-line no-undef
    constructor (stagetype: STAGE_TYPE, container: PIXI.Container, status: any, update: any) {
      this.stagetype = stagetype
      this.container = container
      this.update = update
      this.status = status
    }

  // public update(_D: number): void { };
}
