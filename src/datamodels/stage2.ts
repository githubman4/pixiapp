import * as path from 'path'
/// //////////////////////////////////////////////////////////
// import * as PIXI from "pixi.js-legacy";
import { PIXI } from '../config'
import { Model, SpriteObj } from './model'
import { ModelStage, STAGE_TYPE } from './modelStage'
/// //////////////////////////////////////////////////////////
// stage2の生成
export const CreateStage2 = (model: Model, stageType: STAGE_TYPE,
  PixiContainer: PIXI.Container,
  status: any,
  sp_objects: SpriteObj[]) => {
  const stg = new ModelStage(stageType, PixiContainer, status, (delta: number) => {
    // update animation

    /* PixiContainer.children.forEach((e) => {
      if (e.name === 'osman') {
        e.rotation -= 0.05 * delta
      }
    })
    */

    // 新しいオブジェのUPDATE
    sp_objects.forEach((e:SpriteObj) => {
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
function fnInitialize (model: Model, stg: ModelStage, sp_objects: SpriteObj[]) {
  // 前のステージに戻る
  const tx1 = path.resolve('./images', './ArrowLeft.gif')
  // const sp1 = new PIXI.Sprite(PIXI.Texture.from(tx1))
  const sp1 = new SpriteObj('arrow', tx1, stg, () => { })
  sp1.sp.anchor.x = 0
  sp1.sp.anchor.y = 0
  sp1.sp.interactive = true
  sp1.sp.buttonMode = true
  sp1.sp.position.set(0, 0)
  sp1.sp.on('pointertap', () => {
    model.changeStage(STAGE_TYPE.PLAY)
  })
  // stg.container.addChild(sp1)
  sp_objects.push(sp1)

  // ******************************************************
  const tx2 = path.resolve('./images', './human_dot_color.gif')
  const sp2 = new SpriteObj('osman', tx2, stg,
    (obj: SpriteObj, delta: number) => {
      obj.sp.rotation += 0.05 * delta
    })
  sp2.sp.anchor = new PIXI.Point(0.5, 0.5)
  sp2.sp.interactive = true
  sp2.sp.buttonMode = true
  sp2.sp.position.set(50, 50)
  sp2.sp.on('pointertap', () => {
    alert(sp2.name)
  })
  sp_objects.push(sp2)
  // ******************************************************
  const sp3 = new SpriteObj('pusman', tx2, stg, (obj: SpriteObj, delta: number) => {
    obj.sp.rotation += 0.05 * delta
  })
  sp3.sp.anchor = new PIXI.Point(0.5, 0.5)
  sp3.sp.interactive = true
  sp3.sp.buttonMode = true
  sp3.sp.position.set(150, 150)
  sp3.sp.on('pointertap', () => {
    alert(sp3.name)
  })
  sp_objects.push(sp3)

  // ******************************************************

  // 新しいスプライトオベジェクトの追加

  const sp4 = new SpriteObj('NEW Osman', tx2, stg, (obj:SpriteObj, delta: number) => {
    obj.sp.rotation -= 0.01 * delta
  })
  sp4.sp.position.set(80, 80)
  sp4.sp.on('pointertap', () => {
    alert(sp4.name)
  })
  sp_objects.push(sp4)
  // ******************************************************
}
/// //////////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////////
/// //////////////////////////////////////////////////////////
