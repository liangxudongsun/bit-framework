/**
 * @Author: Gongxh
 * @Date: 2025-05-16
 * @Description: 这是一个单世界的例子
 */
import { Node } from "cc";

import { ecs } from "../header";
import { CollideQuerySystem } from "./system/basics/CollideQuerySystem";
import { LifeTimeSystem } from "./system/basics/LifeTimeSystem";
import { MoveSystem } from "./system/basics/MoveSystem";
import { ReboundSystem } from "./system/basics/ReboundSystem";
import { RenderSystem } from "./system/basics/RenderSystem";
import { ShapeUpdateSystem } from "./system/basics/ShapeUpdateSystem";
import { EntityLogSystem } from "./system/debug/EntityLogSystem";
import { RenderGenerate } from "./system/generate/RenderGenerate";
import { ShapeGenerate } from "./system/generate/ShapeGenerate";

export class ECSHelper {
    private static _world: ecs.World;
    private static _node: Node;
    private static _singleton: ecs.Entity;

    public static get world(): ecs.World {
        return this._world;
    }

    public static get node(): Node {
        return this._node;
    }

    /** 单例实体 */
    private static get singleton(): ecs.Entity {
        if (!this._singleton) {
            this._singleton = this._world.createEmptyEntity();
        }
        return this._singleton;
    }

    /** 只能注册一次 */
    public static register(node: Node): void {
        if (this._world) {
            return;
        }
        this._node = node;
        const world = new ecs.World("world", 1 << 13);

        const defGroup = new ecs.SystemGroup("default");
        defGroup
            .addSystem(new ShapeUpdateSystem())
            .addSystem(new MoveSystem())
            .addSystem(new ReboundSystem())
            .addSystem(new LifeTimeSystem())
            .addSystem(new RenderSystem())
        ;

        const generateGroup = new ecs.SystemGroup("generate");
        generateGroup
            .addSystem(new ShapeGenerate())
            .addSystem(new RenderGenerate())
        ;

        const gapGroup = new ecs.SystemGroup("gap", 1);
        gapGroup.addSystem(new CollideQuerySystem());

        const debugGroup = new ecs.SystemGroup("debug", 30);
        debugGroup.addSystem(new EntityLogSystem());

        world.addSystem(defGroup).addSystem(generateGroup).addSystem(gapGroup).addSystem(debugGroup);

        world.initialize();
        this._world = world;
    }

    /** 添加单例组件 */
    public static addSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): T {
        return this._world.addComponent(this.singleton, component);
    }

    /** 移除单例组件 */
    public static removeSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): void {
        this._world.removeComponent(this.singleton, component);
    }

    /** 获取单例组件 */
    public static getSingleton<T extends ecs.Component>(component: ecs.ComponentType<T>): T {
        return this._world.getComponent(this.singleton, component);
    }

    public static clear(): void {
        this._world.clear();
        this._singleton = null;
    }
}
