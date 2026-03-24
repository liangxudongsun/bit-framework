/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 
 */

import { Color, Size, Vec2, Vec3 } from "cc";
import { CommandPool } from "./command/CommandPool";
import { Component } from "./component/Component";
import { ComponentPool } from "./component/ComponentPool";
import { ComponentType } from "./component/ComponentType";
import { IComponent } from "./component/IComponent";
import { Data } from "./Data";
import { _ecsdecorator } from "./ECSDecorator";
import { Entity } from "./entity/Entity";
import { EntityPool } from "./entity/EntityPool";
import { Matcher } from "./query/Matcher";
import { QueryPool } from "./query/QueryPool";
import { ISystem } from "./system/ISystem";
import { System } from "./system/System";
import { SystemGroup } from "./system/SystemGroup";
import { SystemType } from "./system/SystemType";

export class World {
    /** 世界名字 */
    public readonly name: string;

    /** 最大实体数量 */
    public readonly max: number = 0;

    /** 
     * 组件池
     * @internal
     */
    public componentPool: ComponentPool = null;
    /** 
     * 实体池
     * @internal
     */
    public entityPool: EntityPool = null;
    /**
     * 命令池
     * @internal
     */
    private commandPool: CommandPool = null;
    /**
     * 查询器池
     * @internal
     */
    private queryPool: QueryPool = null;
    /**
     * 根系统
     * @internal
     */
    private rootSystem: SystemGroup = null;

    /** 获取实体数量 */
    public get entityCount(): number { return this.entityPool.size }

    /**
     * 创建一个世界
     * @param name 世界名字
     * @param max 最大实体数量
     */
    constructor(name: string, max: number = 1 << 18) {
        this.name = name;
        this.max = max;
        // 初始化根系统
        this.rootSystem = new SystemGroup("RootSystem");
        this.rootSystem.world = this;

        // 世界名不能重复
        const worlds = World.getWorldMap();
        if (worlds.has(name)) {
            throw new Error(`World名称 "${name}" 已存在，不允许重名`);
        }
    }

    /**
     * 添加系统
     * @param system 系统
     */
    public addSystem(system: ISystem): SystemGroup {
        return this.rootSystem.addSystem(system);
    }

    /** 
     * 世界初始化
     */
    public initialize(): void {
        if (this.componentPool) {
            throw new Error("World已经初始化过，请不要重复初始化");
        }
        // 初始化组件池
        this.componentPool = new ComponentPool();
        // 初始化实体池
        this.entityPool = new EntityPool(this.componentPool, this.max);
        // 初始化命令池
        this.commandPool = new CommandPool(this.entityPool);
        // 初始化查询器池
        this.queryPool = new QueryPool(this.componentPool, this.entityPool, this.commandPool);

        // 系统初始化
        this.rootSystem._initialize();

        // 注册到全局世界列表，供调试工具使用
        World.getWorldMap().set(this.name, this);
    }

    /** 
     * 通过配置数据创建实体
     * @param entityName 实体名 (kunpo-ec插件中导出的实体名)
     * @param customInfo 自定义信息 
     * {
     *     "组件名": {
     *         "属性名1": "属性值"
     *         "属性名2": "属性值"
     *     },
     *     "组件名2": {
     *         "属性名1": "属性值"
     *         "属性名2": "属性值"
     *     }
     * }
     * @returns 实体和组件
     */
    public createEntity(entityName: string, customInfo?: Record<string, Record<string, any>>): { entity: Entity, components: Record<string, Component> } {
        const entity = this.entityPool.createEntity();
        const entityConfig = Data.getEntityConfig(entityName);
        return { entity: entity, components: this.addComponents(entity, entityConfig, customInfo) };
    }

    /** 
     * 创建一个空实体 (实体仅包含一个ID)
     * @returns 实体
     */
    public createEmptyEntity(): Entity {
        return this.entityPool.createEntity();
    }

    /** 
     * 移除实体
     * @param entity 实体
     */
    public removeEntity(entity: Entity): void {
        this.commandPool.delEntity(entity);
    }

    /** 
     * 添加组件 实际是加入缓冲池，等待帧结束时执行
     * @param entity 实体
     * @param comp 组件类型
     * @returns 组件实例
     */
    public addComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>, props?: Record<string, any>): T {
        let component = this.componentPool.createComponent(comp.ctype);
        this.commandPool.addComponent(entity, comp.ctype, component);
        if (props) {
            for (const key in props) {
                (component as any)[key] = props[key];
            }
        }
        return component as T;
    }

    /** 
     * 添加组件 实际是加入缓冲池，等待帧结束时执行
     * @internal
     */
    private addComponents(entity: Entity, infos: { name: string, props: Record<string, any> }[], customInfo?: Record<string, Record<string, any>>): Record<string, Component> {
        let result = {} as Record<string, Component>;
        for (const { name, props } of infos) {
            const comp = _ecsdecorator.getComponentCtor(name);
            const mergedProps = (customInfo && customInfo[name]) ? Object.assign({}, props, customInfo[name]) : props;
            const convertedProps = this.convertProps(name, mergedProps);
            const component = this.addComponent(entity, comp, convertedProps);
            result[name] = component;
        }
        return result;
    }

    /** 
     * 将 JSON 配置中的原始数据转换为 Cocos Creator 对象
     * @internal
     */
    private convertProps(componentName: string, props: Record<string, any>): Record<string, any> {
        const meta = _ecsdecorator.getComponentPropMeta(componentName);
        if (!meta) return props;

        const converted: Record<string, any> = {};
        for (const key in props) {
            const propInfo = meta[key];
            if (propInfo) {
                converted[key] = this.convertValue(propInfo.type, props[key]);
            } else {
                converted[key] = props[key];
            }
        }
        return converted;
    }

    /** 
     * 根据属性类型转换单个值
     * @internal
     */
    private convertValue(type: string, value: any): any {
        switch (type) {
            case "color":
                if (Array.isArray(value)) {
                    return new Color(value[0], value[1], value[2], value[3]);
                }
                return value;
            case "vec2":
                if (value && !(value instanceof Vec2)) {
                    return new Vec2(value.x, value.y);
                }
                return value;
            case "vec3":
                if (value && !(value instanceof Vec3)) {
                    return new Vec3(value.x, value.y, value.z);
                }
                return value;
            case "size":
                if (value && !(value instanceof Size)) {
                    return new Size(value.width, value.height);
                }
                return value;
            default:
                return value;
        }
    }

    /** 
     * 移除组件 实际是加入缓冲池，等待帧结束时执行
     * @param entity 实体
     * @param comp 组件类型
     */
    public removeComponent<T extends IComponent>(entity: Entity, ...comps: ComponentType<T>[]): void {
        for (const comp of comps) {
            this.commandPool.delComponent(entity, comp.ctype);
        }
    }

    /** 
     * 获取组件
     * @param entity 实体
     * @param comp 组件类型
     * @returns 组件
     */
    public getComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>): T | undefined {
        return this.entityPool.getComponent(entity, comp.ctype) as T;
    }

    /** 
     * 检查实体是否包含组件
     * @param entity 实体
     * @param comp 组件类型
     * @returns 是否包含
     */
    public hasComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>): boolean {
        return this.entityPool.hasComponent(entity, comp.ctype);
    }

    /** 
     * 获取系统
     * @param system 系统类型
     * @returns 系统
     */
    public getSystem<T extends System>(system: SystemType<System>): ISystem {
        return this.rootSystem.getSystem(system.cname) as T;
    }

    /**
     * 更新世界
     * @param dt 时间间隔
     */
    public update(dt: number): void {
        // 执行缓冲池中的命令
        this.commandPool.update();
        // 更新系统
        this.rootSystem.update(dt);
    }

    /**
     * 创建查询构建器
     * @returns 查询构建器
     * @internal
     */
    public get matcher(): Matcher {
        return new Matcher(this.queryPool);
    }

    /**
     * 遍历所有实体
     */
    public forEachEntity(callback: (entity: Entity) => void): void {
        this.entityPool.forEachEntity(callback);
    }

    /**
     * 清理整个世界
     */
    public clear(): void {
        this.componentPool.clear();
        this.entityPool.clear();
        this.commandPool.clear();
        this.queryPool.clear();
        this.rootSystem.clear();

        // 从全局世界列表中移除
        World.getWorldMap().delete(this.name);
    }

    /** 获取全局世界列表 Map */
    private static getWorldMap(): Map<string, World> {
        let _g: any = globalThis || window;
        if (!_g["__ecsWorlds"]) {
            _g["__ecsWorlds"] = new Map<string, World>();
        }
        return _g["__ecsWorlds"];
    }
}