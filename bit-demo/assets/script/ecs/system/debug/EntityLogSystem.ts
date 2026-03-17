/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description:
 */
import { ecs } from "../../../header";
const { ecsystem } = ecs._ecsdecorator;

@ecsystem("EntityLogSystem", { describe: "实体日志系统" })
export class EntityLogSystem extends ecs.System {
    protected onInit(): void {

    }

    public update(_dt: number): void {
        console.log("实体数量:", this.world.entityCount);
        // this.world.forEachEntity((entity) => {
        //     console.log("实体:", entity);
        // });
    }
}
