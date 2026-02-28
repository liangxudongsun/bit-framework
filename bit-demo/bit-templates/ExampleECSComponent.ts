import { Component, ecsclass, ecsprop } from '@gongxh/bit-ecs';

@ecsclass('HealthComponent')
export class HealthComponent extends Component {
    @ecsprop({ type: Number, default: 100 })
    public hp: number = 100;

    @ecsprop({ type: Number, default: 100 })
    public maxHp: number = 100;

    /** 组件重置（对象池回收时调用）*/
    public reset(): void {
        this.hp = 100;
        this.maxHp = 100;
    }
}
