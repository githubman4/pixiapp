import * as path from 'path'
/// //////////////////////////////////////////////////////////
// import * as PIXI from "pixi.js-legacy";
import { PIXI } from '../config'
import { Model, SpriteObject } from './model'
import { ModelStage, STAGE_TYPE } from './modelStage'
/// //////////////////////////////////////////////////////////
// stage2の生成
export const CreateStage2 = (model: Model, stageType: STAGE_TYPE,
  PixiContainer: PIXI.Container,
  status: any,
  sp_objects: SpriteObject[]) => {
  const stg = new ModelStage(stageType, PixiContainer, status,
    (delta: number) => {
      // 新しいオブジェのUPDATE
      sp_objects.forEach((e: SpriteObject) => {
        e.update(e, delta)
      })

      // PixiContainer.children[1].rotation += 0.05 * delta
    })
  fnInitialize(model, stg, sp_objects)
  return stg
}
/// //////////////////////////////////////////////////////////

/// //////////////////////////////////////////////////////////
/**
 * 初期化
 * @param model
 * @param stg
 */
function fnInitialize(model: Model, stg: ModelStage, sp_objects: SpriteObject[]) {
  // 前のステージに戻る
  const tx1 = path.resolve('./images', './ArrowLeft.gif')
  const sp1 = new SpriteObject('arrow', tx1, stg, () => { })
  sp1.superObj
    .anchor.x = 0
  sp1.superObj
    .anchor.y = 0
  sp1.superObj
    .interactive = true
  sp1.superObj
    .buttonMode = true
  sp1.superObj
    .position.set(0, 0)
  sp1.superObj
    .on('pointertap', () => {
      model.changeStage(STAGE_TYPE.PLAY)
    })
  // stg.container.addChild(sp1)
  sp_objects.push(sp1)

  // ******************************************************
  const tx2 = path.resolve('./images', './human_dot_color.gif')
  const sp2 = new SpriteObject('osman', tx2, stg,
    (obj: SpriteObject, delta: number) => {
      obj.superObj.rotation += 0.05 * delta
    })
  sp2.superObj.anchor = new PIXI.Point(0.5, 0.5)
  sp2.superObj.interactive = true
  sp2.superObj.buttonMode = true
  sp2.superObj.position.set(50, 50)
  sp2.superObj.on('pointertap', () => {
    alert(sp2.name)
  })
  sp_objects.push(sp2)
  // ******************************************************
  const sp3 = new SpriteObject('pusman', tx2, stg, (obj: SpriteObject, delta: number) => {
    obj.superObj.rotation += 0.05 * delta
  })
  sp3.superObj.anchor = new PIXI.Point(0.5, 0.5)
  sp3.superObj.interactive = true
  sp3.superObj.buttonMode = true
  sp3.superObj.position.set(150, 150)
  sp3.superObj.on('pointertap', () => {
    alert(sp3.name)
  })
  sp_objects.push(sp3)

  // ******************************************************

  // 新しいスプライトオベジェクトの追加

  const sp4 = new SpriteObject('NEW Osman', tx2, stg, (obj: SpriteObject, delta: number) => {
    obj.superObj.rotation -= 0.01 * delta
  })
  sp4.superObj.position.set(80, 80)
  sp4.superObj.on('pointertap', () => {
    alert(sp4.name)
  })
  sp_objects.push(sp4)
  // ******************************************************
}
/// //////////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////////
