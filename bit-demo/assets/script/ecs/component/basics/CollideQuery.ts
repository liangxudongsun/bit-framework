/**
 * @Author: Gongxh
 * @Date: 2025-05-27
 * @Description: 碰撞查询组件 用来设置可以碰撞的类型
 */

import { Enum } from "cc";

import { ecs } from "../../../header";
import { EEntityType } from "../header/EntityType";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("CollideQuery", { describe: "碰撞查询组件" })
export class CollideQuery extends ecs.Component {
    @ecsprop({ type: "enum", format: Enum(EEntityType), defaultValue: EEntityType.NONE, displayName: "查询类型" })
    public mask: EEntityType = EEntityType.NONE;

    public reset(): void {
        this.mask = EEntityType.NONE;
    }
}
