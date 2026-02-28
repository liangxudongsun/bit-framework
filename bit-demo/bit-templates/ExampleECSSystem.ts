import { ecsystem, System, World } from '@gongxh/bit-ecs';
import { HealthComponent } from './ExampleECSComponent';

@ecsystem('HealthSystem')
export class HealthSystem extends System {

    protected onInit(world: World): void {
        // 系统初始化
    }

    public update(dt: number): void {
        // 查询所有有 HealthComponent 的实体并处理
        this.world.iterate1(HealthComponent, (entity, health) => {
            // 处理逻辑
        });
    }
}
