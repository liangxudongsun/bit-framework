/**
 * @Author: Gongxh
 * @Date: 2025-05-26
 * @Description: 形状位置更新系统
 */

import { ecs } from "../../../header";
import { Position } from "../../component/basics/Position";
import { QTShape } from "../../component/basics/QTShape";
import { Scale } from "../../component/basics/Scale";
import { QuadTree } from "../../component/singleton/QuadTree";
import { ECSHelper } from "../../ECSHelper";

const { ecsystem } = ecs._ecsdecorator;

@ecsystem("ShapeUpdateSystem", { describe: "形状更新系统" })
export class ShapeUpdateSystem extends ecs.System {
    protected onInit(): void {
        this.matcher.allOf(Position, QTShape).optionalOf(Scale);
    }

    public update(_dt: number): void {
        const query = this.query;
        for (const [_entity, position, qtShape, scale] of query.iterate3(Position, QTShape, Scale)) {
            qtShape.shape.setPosition(position.x + qtShape.x, position.y + qtShape.y);
            if (scale) {
                qtShape.shape.setScale(scale.scale);
            }
        }
        ECSHelper.getSingleton(QuadTree).quadTree.update();
    }
}
