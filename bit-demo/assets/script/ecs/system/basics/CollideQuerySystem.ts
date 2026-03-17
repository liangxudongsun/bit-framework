/**
 * @Author: Gongxh
 * @Date: 2025-05-27
 * @Description: 碰撞查询系统
 */

import { Color, Sprite } from "cc";

import { ecs } from "../../../header";
import { CollideQuery } from "../../component/basics/CollideQuery";
import { QTShape } from "../../component/basics/QTShape";
import { Render } from "../../component/basics/Render";
import { QuadTree } from "../../component/singleton/QuadTree";
import { ECSHelper } from "../../ECSHelper";
const { ecsystem } = ecs._ecsdecorator;

@ecsystem("CollideQuerySystem", { describe: "碰撞查询系统" })
export class CollideQuerySystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(CollideQuery, QTShape, Render);
    }

    public update(_dt: number): void {
        const query = this.query;

        const tree = ECSHelper.getSingleton(QuadTree);
        if (!tree) {
            return;
        }
        for (const [_entity, collideQuery, qtShape, render] of query.iterate3(CollideQuery, QTShape, Render)) {
            const shapes = tree.quadTree.query(qtShape.shape, 1 << collideQuery.mask);
            if (shapes.length > 0) {
                render.node.getComponent(Sprite).color = Color.RED;
            } else {
                render.node.getComponent(Sprite).color = Color.WHITE;
            }
        }
    }
}
