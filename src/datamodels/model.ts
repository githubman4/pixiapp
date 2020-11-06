"use strict";
/////////////////////////////////////////////////////////////
import * as path from "path";
// import * as PIXI from "pixi.js-legacy";
import { PIXI } from "../config";
import { ModelStage, STAGE_TYPE } from "./modelStage";
/////////////////////////////////////////////////////////////
import { CreateStage2 } from "./stage2";
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
export class Model {
    public app: PIXI.Application; // PIXI.js アプリケーション
    public Stages: ModelStage[] = []; // ステージの配列
    public Status: {}; // ステータス
    // 現在のコンテナー
    public currentContainerNum: STAGE_TYPE;

    // =====================================================//
    /**
     * コンストラクタ
     */
    constructor(app: PIXI.Application) {
        this.app = app;
        this.currentContainerNum = STAGE_TYPE.MENU;
        this.Status = {};
        this.initialize();
    }
    // =====================================================//
    /**
     * 初期化
     */
    public initialize() {
        // ステージ1生成
        const stage0 = new ModelStage(STAGE_TYPE.MENU, new PIXI.Container(), this.Status,
            (_DELTA: number) => {
                // update animation
            });

        // ステージ1追加
        this.Stages.push(stage0);
        this.app.stage.addChild(stage0.container);

        // スプライトの生成
        const p = path.resolve("./images", "./button_ok32.gif");
        // console.log(p);
        const sprite1 = new PIXI.Sprite(PIXI.Texture.from(p));
        sprite1.anchor.set(0.5);
        sprite1.interactive = true;
        sprite1.buttonMode = true;
        sprite1.visible = true;
        sprite1.on("pointertap", () => {
            this.changeStage(STAGE_TYPE.PLAY);
        });
        sprite1.position.set(57, 57);
        // コンテナ1にスプライトを追加
        stage0.container.addChild(sprite1);
        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
        // ステージ２追加
        const stage1 = new ModelStage(STAGE_TYPE.PLAY, new PIXI.Container(), this.Status,
            (delta: number) => {
                // update animation
                stage1.container.children[0].rotation += 0.05 * delta;
            });

        // ステージ2追加
        this.Stages.push(stage1);
        this.app.stage.addChild(stage1.container);

        // スプライトの生成
        const p2 = path.resolve("./images", "./human_dot.gif");
        const sprite2 = new PIXI.Sprite(PIXI.Texture.from(p2));
        sprite2.anchor.set(0.5);
        sprite2.interactive = true;
        sprite2.buttonMode = true;
        sprite2.on("pointertap", () => {
            alert("human");
        });

        sprite2.position.set(100, 100);

        // コンテナ2にスプライトを追加
        stage1.container.addChild(sprite2);

        const p3 = path.resolve("./images", "./ArrowRight.gif");
        const sprite3 = new PIXI.Sprite(PIXI.Texture.from(p3));
        sprite3.anchor.x = 0;
        sprite3.anchor.y = 0;
        sprite3.interactive = true;
        sprite3.buttonMode = true;
        sprite3.position.set(100, 0);
        sprite3.on("pointertap", () => {
            this.changeStage(STAGE_TYPE.STAGE2);
        });

        stage1.container.addChild(sprite3);

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
        // 仮装ステージ３追加（別ファイル実装)
        const stage2 = CreateStage2(this, STAGE_TYPE.STAGE2, new PIXI.Container(), this.Status);

        this.Stages.push(stage2);

        this.app.stage.addChild(stage2.container);

        // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
        // 初期ステージ
        this.currentContainerNum = STAGE_TYPE.MENU;

        this.changeStage(STAGE_TYPE.MENU);
    }
    // =====================================================//
    /**
     * ステージの切り替え
     * @param stagetype
     */
    public changeStage(stagetype: STAGE_TYPE) {
        this.currentContainerNum = stagetype;
        for (const cnt of this.Stages) {
            if (cnt.stagetype === stagetype) {
                cnt.container.visible = true;
            } else {
                cnt.container.visible = false;
            }
        }
    }
    // =====================================================//
    /**
     * Update アニメーション
     */
    public update(delta: number) {
        this.Stages[this.currentContainerNum].update(delta);
    }
    // =====================================================//
}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
