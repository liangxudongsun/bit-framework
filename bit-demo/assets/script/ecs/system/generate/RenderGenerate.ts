/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description:
 */
import { instantiate, Node, Prefab as ccPrefab, Sprite,SpriteFrame as ccSpriteFrame } from "cc";

import { ASSETS, ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { Render } from "../../component/basics/Render";
import { Prefab, SpriteFrame } from "../../component/configure/Asset";
import { ECSHelper } from "../../ECSHelper";
const { ecsystem } = ecs._ecsdecorator;

@ecsystem("RenderGenerate", { describe: "初始化渲染系统" })
export class RenderGenerate extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position).anyOf(Prefab, SpriteFrame).excludeOf(Render);
    }

    public update(_dt: number): void {
        const query = this.query;

        for (const [entity, position, prefab, spriteFrame] of query.iterate3(Position, Prefab, SpriteFrame)) {
            if (prefab) {
                const asset = ASSETS.AssetPool.getByUUID<ccPrefab>(prefab.uuid);
                const node = instantiate(asset);
                node.setPosition(position.x, position.y);
                ECSHelper.node.addChild(node);
                node.layer = 1 << 1;

                const render = this.world.addComponent(entity, Render);
                render.node = node;

                // 删除组件
                this.world.removeComponent(entity, Prefab);
            } else if (spriteFrame) {
                const node = new Node(`${entity}`);
                const sprite = node.addComponent(Sprite);
                sprite.spriteFrame = ASSETS.AssetPool.getByUUID<ccSpriteFrame>(spriteFrame.uuid);
                node.setPosition(position.x, position.y);
                ECSHelper.node.addChild(node);
                node.layer = 1 << 1;

                const render = this.world.addComponent(entity, Render);
                render.node = node;

                this.world.removeComponent(entity, SpriteFrame);
            }
        }
    }
}
