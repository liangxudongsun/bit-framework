/**
 * @Author: Gongxh
 * @Date: 2025-05-23
 * @Description:
 */
import { ecs, QT } from "../../../header";
const { ecsclass } = ecs._ecsdecorator;

@ecsclass("QTShape", { describe: "四叉树形状组件" })
export class QTShape extends ecs.Component {
    public x: number = 0;
    public y: number = 0;
    public shape: QT.IShape;

    public reset(): void {
        this.x = 0;
        this.y = 0;
        this.shape.destroy();
        this.shape = null;
    }
}
