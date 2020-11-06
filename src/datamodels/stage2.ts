import * as path from "path";
/////////////////////////////////////////////////////////////
// import * as PIXI from "pixi.js-legacy";
import { PIXI } from "../config";
import { Model } from "./model";
import { ModelStage, STAGE_TYPE } from "./modelStage";
/////////////////////////////////////////////////////////////
// stage2の生成
export const CreateStage2 = (model: Model, stageType: STAGE_TYPE,
    PixiContainer: PIXI.Container,
    status: any) => {
    const stg = new ModelStage(stageType, PixiContainer, status, () => {
        // update　animation
    });
    fnInitialize(model, stg);
    return stg;
};
/////////////////////////////////////////////////////////////
/**
 * 初期化
 * @param model
 * @param stg
 */
function fnInitialize(model: Model, stg: ModelStage) {
    // 前のステージに戻る
    const tx1 = path.resolve("./images", "./ArrowLeft.gif");
    const sp1 = new PIXI.Sprite(PIXI.Texture.from(tx1));
    sp1.anchor.x = 0;
    sp1.anchor.y = 0;
    sp1.interactive = true;
    sp1.buttonMode = true;
    sp1.position.set(0, 0);
    sp1.on("pointertap", () => {
        model.changeStage(STAGE_TYPE.PLAY);
    });
    stg.container.addChild(sp1);
    // ******************************************************
    const tx2 = path.resolve("./images", "./human_dot_color.gif");
    const sp2 = new PIXI.Sprite(PIXI.Texture.from(tx2));
    sp2.anchor = new PIXI.Point(0.5, 0.5);
    sp2.interactive = true;
    sp2.buttonMode = true;
    sp2.name = "osman";
    sp2.position.set(50, 50);
    sp2.on("pointertap", () => {
        alert(sp2.name);
    });
    stg.container.addChild(sp2);
    // ******************************************************

}
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
