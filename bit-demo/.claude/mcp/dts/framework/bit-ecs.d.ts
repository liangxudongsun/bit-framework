import { Size, Vec2, Vec3, Color } from 'cc';

/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 组件接口
 */
interface IComponent {
    /** 组件销毁时 用来重置数据 */
    reset(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 组件接口
 */

declare abstract class Component implements IComponent {
    /**
     * 组件类型, 自动分配
     */
    static ctype: number;
    /**
     * 组件名称
     */
    static cname: string;
    /**
     * 组件销毁时 用来重置数据
     */
    abstract reset(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description:
 */

interface ComponentType<T extends Component> {
    new (): T;
    ctype: number;
    cname: string;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description: 实体仅仅是一个不为0的整数
 */
type Entity = number;

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description: 检测当前环境是否支持BigInt 并提供Mask的接口
 */
/**
 * 掩码基类接口
 */
interface IMask {
    size: number;
    set(num: number): IMask;
    delete(num: number): IMask;
    has(num: number): boolean;
    any(other: IMask): boolean;
    include(other: IMask): boolean;
    clear(): IMask;
    isEmpty(): boolean;
    values(): Set<number>;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-18
 * @Description: 查询器接口
 */

interface IQueryResult {
    entitys: Entity[];
    /** 通用迭代器实现，会产生极少的GC */
    iterate<T extends Component>(c1: ComponentType<T>): IterableIterator<[Entity, T]>;
    iterate<T1 extends Component, T2 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>): IterableIterator<[Entity, T1, T2]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>): IterableIterator<[Entity, T1, T2, T3]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>, c4: ComponentType<T4>): IterableIterator<[Entity, T1, T2, T3, T4]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component, T5 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>, c4: ComponentType<T4>, c5: ComponentType<T5>): IterableIterator<[Entity, T1, T2, T3, T4, T5]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component, T5 extends Component, T6 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>, c4: ComponentType<T4>, c5: ComponentType<T5>, c6: ComponentType<T6>): IterableIterator<[Entity, T1, T2, T3, T4, T5, T6]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component, T5 extends Component, T6 extends Component, T7 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>, c4: ComponentType<T4>, c5: ComponentType<T5>, c6: ComponentType<T6>, c7: ComponentType<T7>): IterableIterator<[Entity, T1, T2, T3, T4, T5, T6, T7]>;
    iterate<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component, T5 extends Component, T6 extends Component, T7 extends Component, T8 extends Component>(c1: ComponentType<T1>, c2: ComponentType<T2>, c3: ComponentType<T3>, c4: ComponentType<T4>, c5: ComponentType<T5>, c6: ComponentType<T6>, c7: ComponentType<T7>, c8: ComponentType<T8>): IterableIterator<[Entity, T1, T2, T3, T4, T5, T6, T7, T8]>;
    /** 零GC 单组件迭代器 */
    iterate1<T extends Component>(comp: ComponentType<T>): IterableIterator<[Entity, T]>;
    /** 零GC 双组件迭代器 */
    iterate2<T1 extends Component, T2 extends Component>(comp1: ComponentType<T1>, comp2: ComponentType<T2>): IterableIterator<[Entity, T1, T2]>;
    /** 零GC 三组件迭代器 */
    iterate3<T1 extends Component, T2 extends Component, T3 extends Component>(comp1: ComponentType<T1>, comp2: ComponentType<T2>, comp3: ComponentType<T3>): IterableIterator<[Entity, T1, T2, T3]>;
    /** 零GC 四组件迭代器 */
    iterate4<T1 extends Component, T2 extends Component, T3 extends Component, T4 extends Component>(comp1: ComponentType<T1>, comp2: ComponentType<T2>, comp3: ComponentType<T3>, comp4: ComponentType<T4>): IterableIterator<[Entity, T1, T2, T3, T4]>;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description: 查询构建器模式
 */

declare class Matcher {
    /**
     * 匹配器关注的所有组件类型
     */
    get indices(): number[];
    /**
     * 匹配器需要获取的组件类型
     */
    get components(): number[];
    /**
     * 必须包含的组件
     * @param componentTypes 组件类型
     */
    allOf(...componentTypes: ComponentType<Component>[]): Matcher;
    /**
     * 必须包含其中任意一个 性能消耗比较大 慎用
     * 如果要用, 最好和 allOf 一起使用
     * @param componentTypes 组件类型
     */
    anyOf(...componentTypes: ComponentType<Component>[]): Matcher;
    /**
     * 必须排除
     * @param componentTypes 组件类型
     */
    excludeOf(...componentTypes: ComponentType<Component>[]): Matcher;
    /**
     * 可选的组件
     * @param componentTypes 组件类型
     */
    optionalOf(...componentTypes: ComponentType<Component>[]): Matcher;
    /**
     * 判断是否匹配
     * @param mask 组件掩码
     * @returns 是否匹配
     */
    isMatch(mask: IMask): boolean;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description: 系统基类
 */

declare abstract class System implements ISystem {
    /** 世界 */
    world: World;
    /** 查询器结果 */
    query: IQueryResult;
    /** 系统名称 */
    get name(): string;
    /**
     * 创建匹配器规则
     * 最后必须调用 build() 方法
     */
    protected get matcher(): Matcher;
    /**
     * 系统初始化
     * 在这里写匹配器规则
     */
    protected abstract onInit(): void;
    /**
     * 系统更新
     * @param {number} dt 时间间隔
     */
    abstract update(dt: number): void;
    /**
     * 设置系统启用/禁用
     */
    setEnabled(enabled: boolean): void;
    /**
     * 获取系统启用/禁用
     */
    isEnabled(): boolean;
    /**
     * 清除系统
     */
    clear(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description: 系统组 - 可包含多个子系统的容器系统
 */

declare class SystemGroup implements ISystem {
    /**
     * 世界引用
     */
    world: World;
    /**
     * 系统名称
     */
    get name(): string;
    /**
     * 帧间隔
     * @param frameInterval 帧间隔
     */
    private frameInterval;
    /**
     * 系统组实例化
     * @param name 系统组名称
     * @param frameInterval 帧间隔 (1=每帧, 2=隔帧, 3=每3帧一次...)
     */
    constructor(name: string, frameInterval?: number);
    /**
     * 添加子系统或子系统组
     * @param system 子系统或子系统组
     * @returns 系统组
     */
    addSystem(system: ISystem): this;
    /**
     * 更新所有启用的子系统
     * @param dt 时间间隔
     */
    update(dt: number): void;
    /**
     * 启用/禁用系统组
     * @param enabled 是否启用
     */
    setEnabled(enabled: boolean): void;
    /**
     * 系统是否启用
     * @returns 是否启用
     */
    isEnabled(): boolean;
    /**
     * 根据名称查找子系统
     * @param name 系统名称
     * @returns 子系统
     */
    getSystem(name: string): ISystem;
    /**
     * 清除所有子系统
     */
    clear(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description:
 */

interface SystemType<T extends System> {
    new (world: World, name: string): T;
    cname: string;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-13
 * @Description:
 */

declare class World {
    /** 世界名字 */
    readonly name: string;
    /** 最大实体数量 */
    readonly max: number;
    /** 获取实体数量 */
    get entityCount(): number;
    /**
     * 创建一个世界
     * @param name 世界名字
     * @param max 最大实体数量
     */
    constructor(name: string, max?: number);
    /**
     * 添加系统
     * @param system 系统
     */
    addSystem(system: ISystem): SystemGroup;
    /**
     * 世界初始化
     */
    initialize(): void;
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
    createEntity(entityName: string, customInfo?: Record<string, Record<string, any>>): {
        entity: Entity;
        components: Record<string, Component>;
    };
    /**
     * 创建一个空实体 (实体仅包含一个ID)
     * @returns 实体
     */
    createEmptyEntity(): Entity;
    /**
     * 移除实体
     * @param entity 实体
     */
    removeEntity(entity: Entity): void;
    /**
     * 添加组件 实际是加入缓冲池，等待帧结束时执行
     * @param entity 实体
     * @param comp 组件类型
     * @returns 组件实例
     */
    addComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>, props?: Record<string, any>): T;
    /**
     * 移除组件 实际是加入缓冲池，等待帧结束时执行
     * @param entity 实体
     * @param comp 组件类型
     */
    removeComponent<T extends IComponent>(entity: Entity, ...comps: ComponentType<T>[]): void;
    /**
     * 获取组件
     * @param entity 实体
     * @param comp 组件类型
     * @returns 组件
     */
    getComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>): T | undefined;
    /**
     * 检查实体是否包含组件
     * @param entity 实体
     * @param comp 组件类型
     * @returns 是否包含
     */
    hasComponent<T extends IComponent>(entity: Entity, comp: ComponentType<T>): boolean;
    /**
     * 获取系统
     * @param system 系统类型
     * @returns 系统
     */
    getSystem<T extends System>(system: SystemType<System>): ISystem;
    /**
     * 更新世界
     * @param dt 时间间隔
     */
    update(dt: number): void;
    /**
     * 遍历所有实体
     */
    forEachEntity(callback: (entity: Entity) => void): void;
    /**
     * 清理整个世界
     */
    clear(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-15
 * @Description: 系统接口 - 所有系统和系统组都实现此接口
 */

interface ISystem {
    /** 系统名称 */
    name: string;
    /** 世界 */
    world: World;
    /** 系统更新 */
    update(dt: number): void;
    /** 设置系统启用/禁用 */
    setEnabled(enabled: boolean): void;
    /** 获取系统启用/禁用 */
    isEnabled(): boolean;
    /** 获取系统查询器 */
    clear(): void;
}
/** 系统查询器数据 */
interface IQueryData {
    /** 必须包含的组件 */
    includes?: ComponentType<IComponent>[];
    /** 必须排除的组件 */
    excludes?: ComponentType<IComponent>[];
    /** 可选包含的组件 */
    optionals?: ComponentType<IComponent>[];
}

/**
 * @Author: Gongxh
 * @Date: 2025-05-19
 * @Description: 配置数据
 */
declare class Data {
    /** 实体的配置数据 map的key: 实体名, value中的name:组件名 props:组件属性 */
    private static readonly entityMap;
    static parse(config: Record<string, any>): void;
    /** 通过实体名获取实体配置 */
    static getEntityConfig(name: string): {
        name: string;
        props: Record<string, any>;
    }[];
}

/**
 * @Author: Gongxh
 * @Date: 2025-01-14
 * @Description: 实体组件装饰器
 */

declare namespace _ecsdecorator {
    type ECPropType = "int" | "float" | "string" | "boolean" | "size" | "vec2" | "vec3" | "color" | "asset" | "spriteframe" | "jsonAsset" | "particle" | "animation" | "audio" | "prefab" | "skeleton" | "enum" | "array" | "object" | "entity";
    interface ECPropInfoBase {
        /** 属性默认值 */
        defaultValue?: any;
        /** 编辑器中的显示名称 */
        displayName?: string;
        /** 编辑器中的提示 */
        tips?: string;
    }
    interface ECPropInfoNumber extends ECPropInfoBase {
        /** 属性类型 */
        type: "int" | "float";
        /** 默认值:0 */
        defaultValue?: number;
    }
    interface ECPropInfoBoolean extends ECPropInfoBase {
        /** 属性类型 */
        type: "boolean";
        /** 默认值:false */
        defaultValue?: boolean;
    }
    interface ECPropInfoSize extends ECPropInfoBase {
        /** 属性类型 */
        type: "size";
        /** 默认值:Size(0,0) */
        defaultValue?: Size;
    }
    interface ECPropInfoVec extends ECPropInfoBase {
        /** 属性类型 */
        type: "vec2" | "vec3";
        /** 默认值: Vec2(0,0) | Vec3(0,0,0) */
        defaultValue?: Vec2 | Vec3;
    }
    interface ECPropInfoString extends ECPropInfoBase {
        /** 属性类型 */
        type: "string" | "asset" | "spriteframe" | "jsonAsset" | "particle" | "animation" | "audio" | "prefab" | "skeleton" | "entity";
        /** 默认值: "" */
        defaultValue?: string;
    }
    interface ECPropInfoColor extends ECPropInfoBase {
        /** 属性类型 */
        type: "color";
        /** 默认值:Color(255, 255, 255, 255) */
        defaultValue?: Color;
    }
    interface ECPropInfoArray extends ECPropInfoBase {
        /** 属性类型 */
        type: "array";
        /** 类型格式 当类型是复合类型enum、array、object时必须 */
        format: ECPropType | ECPropInfo;
    }
    interface ECPropInfoObject extends ECPropInfoBase {
        /** 属性类型 */
        type: "object";
        /** 类型格式 当类型是复合类型enum、array、object时必须 */
        format: Record<string, ECPropType> | Record<string, ECPropInfo>;
    }
    interface ECPropInfoEnum extends ECPropInfoBase {
        type: "enum";
        /** 枚举值 */
        format: object;
        /** 默认值 */
        defaultValue?: string | number;
    }
    export type ECPropInfo = ECPropInfoNumber | ECPropInfoBoolean | ECPropInfoSize | ECPropInfoVec | ECPropInfoString | ECPropInfoColor | ECPropInfoArray | ECPropInfoObject | ECPropInfoEnum;
    /**
     * 组件注册数据结构
     */
    export interface ECComponentInfo {
        /** 组件名 */
        name: string;
        /** 组件描述 */
        describe: string;
        /** 属性 */
        props: Record<string, ECPropInfo>;
    }
    /** 获取组件注册信息 */
    export function getComponentMaps(): Map<any, ECComponentInfo>;
    /** 通过组件类型获取组件名 */
    export function getComponentName(type: number): string;
    /** 通过组件名获取组件构造函数 */
    export function getComponentCtor(name: string): any;
    /** 通过系统构造函数获取名字 */
    export function getSystemName(ctor: any): string;
    /**
     * ecs组件装饰器
     * @param {string} res.describe 组件描述
     */
    export function ecsclass(name: string, res?: {
        describe?: string;
    }): Function;
    /**
     * ecs系统装饰器
     * @param {string} res.describe 组件描述
     */
    export function ecsystem(name: string, res?: {
        describe?: string;
    }): Function;
    /** 组件属性装饰器 */
    export function ecsprop(options: ECPropInfo): any;
    export {};
}

export { Component, Data, System, SystemGroup, World, _ecsdecorator };
export type { ComponentType, Entity, IQueryData, IQueryResult, SystemType };
