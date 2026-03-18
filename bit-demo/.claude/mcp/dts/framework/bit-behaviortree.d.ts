/**
 * @Author: Gongxh
 * @Date: 2025-09-02
 * @Description: 行为树共享数据
 *
 * 专门用于存储和管理行为树执行过程中的共享数据
 */
/**
 * 黑板数据接口
 */
interface IBlackboard {
    getEntity<T>(): T;
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
    delete(key: string): void;
    has(key: string): boolean;
    clean(): void;
    createChild(scope?: number): IBlackboard;
}
/**
 * 黑板类
 */
declare class Blackboard implements IBlackboard {
    private readonly _data;
    parent?: Blackboard | undefined;
    children: Set<Blackboard>;
    /** 实体 */
    private readonly _entity;
    getEntity<T>(): T;
    constructor(parent?: Blackboard, entity?: any);
    /** 核心: 查找链实现 */
    get<T>(key: string): T;
    /** 写入: 只在当前层 */
    set<T>(key: string, value: T): void;
    /** 检查: 沿链查找 */
    has(key: string): boolean;
    delete(key: string): void;
    createChild(): Blackboard;
    clean(): void;
}
declare const globalBlackboard: Blackboard;

declare enum Status {
    FAILURE = 0,
    SUCCESS = 1,
    RUNNING = 2
}

interface IBTNode {
    readonly children: IBTNode[];
    /** 本节点的的黑板引用 */
    local: IBlackboard;
    /**
     * 初始化节点
     * @param root 树根节点的黑板
     * @param parent 父节点的黑板
     */
    _initialize(root: IBlackboard, parent: IBlackboard): void;
    tick(dt: number): Status;
    /**
     * 优先写入自己的黑板数据, 如果没有则写入父节点的黑板数据
     */
    set<T>(key: string, value: T): void;
    get<T>(key: string): T;
    /**
     * 写入树根节点的黑板数据
     */
    setRoot<T>(key: string, value: T): void;
    getRoot<T>(key: string): T;
    /**
     * 写入全局黑板数据
     */
    setGlobal<T>(key: string, value: T): void;
    getGlobal<T>(key: string): T;
    /** 获取关联的实体 */
    getEntity<T>(): T;
    /**
     * 递归清理子节点的打开状态
     * 用途:
     * 1.装饰节点的子节点未关闭，但是装饰节点关闭时，需要清理子节点的打开状态
     * 2.组合节点关闭，但是子节点可能还在运行，需要清理子节点的打开状态
     */
    cleanupChild(): void;
}
/**
 * 基础节点
 * 每个节点只管理自己需要的状态
 */
declare abstract class BTNode implements IBTNode {
    readonly children: IBTNode[];
    /** 树根节点的黑板引用 */
    protected _root: IBlackboard;
    /** 本节点的的黑板引用 可能等于 _parent */
    protected _local: IBlackboard;
    constructor(children?: IBTNode[]);
    _initialize(root: IBlackboard, parent: IBlackboard): void;
    /**
     * 初始化节点（首次执行时调用）
     * 子类重写此方法进行状态初始化
     */
    protected open(): void;
    protected close(): void;
    cleanupChild(): void;
    /**
     * 执行节点逻辑
     * 子类必须实现此方法
     * @returns 执行状态
     */
    abstract tick(dt: number): Status;
    getEntity<T>(): T;
    set<T>(key: string, value: T): void;
    get<T>(key: string): T;
    setRoot<T>(key: string, value: T): void;
    getRoot<T>(key: string): T;
    setGlobal<T>(key: string, value: T): void;
    getGlobal<T>(key: string): T;
    get local(): IBlackboard;
}

/**
 * 行为树
 * 所有节点全部添加到树中
 */
declare class BehaviorTree<T> {
    get root(): IBTNode;
    get blackboard(): IBlackboard;
    /**
     * constructor
     * @param entity 实体
     * @param root 根节点
     */
    constructor(entity: T, root: IBTNode);
    /**
     * 执行行为树
     */
    tick(dt: number): Status;
    /**
     * 完全重置行为树（核武器级别的重置）
     * 清空黑板并重置所有节点状态
     */
    reset(): void;
}

/**
 * 叶子节点 基类
 * 没有子节点
 */
declare abstract class LeafNode extends BTNode {
    constructor();
}
/**
 * 次数等待节点(无子节点)
 * 次数内，返回RUNNING
 * 超次，返回SUCCESS
 */
declare class WaitTicks extends LeafNode {
    private _max;
    private _value;
    constructor(maxTicks?: number);
    protected open(): void;
    tick(): Status;
}
/**
 * 时间等待节点 时间(秒)
 * 时间到后返回SUCCESS，否则返回RUNNING
 */
declare class WaitTime extends LeafNode {
    private _max;
    private _value;
    constructor(duration?: number);
    protected open(): void;
    tick(dt: number): Status;
}

/**
 * 组合节点基类
 * 有多个子节点
 *
 * 组合节点全部都有记忆能力
 */
declare abstract class Composite extends BTNode {
    constructor(...children: IBTNode[]);
    _initialize(global: IBlackboard, branch: IBlackboard): void;
    protected open(): void;
}
/**
 * 记忆选择节点 从上到下执行
 * 遇到 FAILURE 继续下一个
 * 遇到 SUCCESS 返回 SUCCESS 下次重新开始
 *
 * 遇到 RUNNING 返回 RUNNING 下次从该节点开始
 */
declare class Selector extends Composite {
    tick(dt: number): Status;
}
/**
 * 顺序节点 从上到下执行
 * 遇到 SUCCESS 继续下一个
 * 遇到 FAILURE 停止迭代 返回 FAILURE 下次重新开始
 *
 * 遇到 RUNNING 返回 RUNNING 下次从该节点开始
 */
declare class Sequence extends Composite {
    tick(dt: number): Status;
}
/**
 * 并行节点 从左到右依次执行所有子节点 必定全部执行一遍
 * 返回优先级 FAILURE > RUNNING > SUCCESS
 * 注意：这里的"并行"是逻辑概念，实际是顺序执行
 *
 * 记忆机制: 已经失败的子节点不会重复执行，只执行运行中的子节点
 */
declare class Parallel extends Composite {
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 随机选择节点
 * 随机选择一个子节点执行，支持权重
 * 返回子节点状态
 */
declare class RandomSelector extends Composite {
    private _totalWeight;
    private _weights;
    constructor(...children: IBTNode[]);
    protected open(): void;
    /** 根据权重随机选择子节点索引 */
    private selectRandomIndex;
    tick(dt: number): Status;
}
/**
 * 并行任意成功节点 从左到右依次执行所有子节点 必定全部执行一遍
 * 返回优先级 SUCCESS > RUNNING > FAILURE
 * 注意：这里的"并行"是逻辑概念，实际是顺序执行
 *
 * 记忆机制: 已经失败的子节点不会重复执行，只执行运行中的子节点
 */
declare class ParallelAnySuccess extends Composite {
    protected open(): void;
    tick(dt: number): Status;
}

/**
 * @Author: Gongxh
 * @Date: 2025-09-17
 * @Description: 条件节点基类
 */

/** 条件叶子节点 */
declare abstract class Condition extends LeafNode {
    /**
     * 判断是否满足条件
     * @returns 是否满足条件
     */
    protected abstract isEligible(): boolean;
    tick(): Status;
}

/**
 * @Author: Gongxh
 * @Date: 2025-09-01
 * @Description: 装饰节点 装饰节点下必须包含子节点
 */

/**
 * 修饰节点 基类
 * 有且仅有一个子节点
 */
declare abstract class Decorator extends BTNode {
    constructor(child: IBTNode);
}
/** 条件装饰节点基类 */
declare abstract class ConditionDecorator extends Decorator {
    /**
     * 判断是否满足条件
     * @returns 是否满足条件
     */
    protected abstract isEligible(): boolean;
    tick(dt: number): Status;
}
/**
 * 结果反转节点
 * 必须且只能包含一个子节点
 * 第一个Child Node节点, 返回 FAILURE, 本Node向自己的Parent Node也返回 SUCCESS
 * 第一个Child Node节点, 返回 SUCCESS, 本Node向自己的Parent Node也返回 FAILURE
 */
declare class Inverter extends Decorator {
    tick(dt: number): Status;
}
/**
 * 时间限制节点
 * 只能包含一个子节点
 * 规定时间内, 根据Child Node的结果, 本节点向自己的父节点也返回相同的结果
 * 超时后, 直接返回 FAILURE
 */
declare class LimitTime extends Decorator {
    protected _max: number;
    private _value;
    /**
     * 时间限制节点
     * @param child 子节点
     * @param max 最大时间 (秒) 默认1秒
     */
    constructor(child: IBTNode, max?: number);
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 次数限制节点
 * 必须且只能包含一个子节点
 * 次数超过后, 直接返回失败; 次数未超过, 返回子节点状态
 */
declare class LimitTicks extends Decorator {
    protected _max: number;
    private _value;
    constructor(child: IBTNode, max?: number);
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 循环节点 最大次数必须大于0
 * 必须且只能包含一个子节点
 * 子节点是成功或失败，累加计数
 * 次数超过之后返回子节点状态，否则返回 RUNNING
 */
declare class Repeat extends Decorator {
    protected _max: number;
    private _value;
    constructor(child: IBTNode, max?: number);
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 重复 -- 直到失败
 * 节点含义：重复执行直到失败，但最多重试max次
 * 必须且只能包含一个子节点
 *
 * 子节点成功 计数+1
 */
declare class RepeatUntilFailure extends Decorator {
    protected _max: number;
    private _value;
    constructor(child: IBTNode, max?: number);
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 重复 -- 直到成功
 * 节点含义：重复执行直到成功，但最多重试max次
 * 必须且只能包含一个子节点
 *
 * 子节点失败, 计数+1
 */
declare class RepeatUntilSuccess extends Decorator {
    protected _max: number;
    private _value;
    constructor(child: IBTNode, max?: number);
    protected open(): void;
    tick(dt: number): Status;
}
/**
 * 权重装饰节点
 */
declare class WeightDecorator extends Decorator {
    private _weight;
    constructor(child: IBTNode, weight?: number);
    tick(dt: number): Status;
    get weight(): number;
}

/**
 * @Author: Gongxh
 * @Date: 2025-09-16
 * @Description: 根据数据创建一颗行为树
 */

interface INodeConfig {
    id: string;
    className: string;
    parameters: Record<string, any>;
    children: string[];
}
declare function createBehaviorTree<T>(config: INodeConfig[], entity: T): BehaviorTree<T>;

/**
 * 行为树装饰器和元数据管理
 * 用于编辑器显示和配置节点信息
 */
declare namespace BT {
    /**
     * 参数类型枚举
     */
    enum ParamType {
        int = "number",
        float = "float",
        string = "string",
        bool = "boolean",
        object = "object",
        array = "array"
    }
    /**
     * 节点类型枚举
     */
    enum Type {
        /** 行为节点 */
        Action = "action",
        /** 条件节点 */
        Condition = "condition",
        /** 组合节点 */
        Composite = "composite",
        /** 装饰节点 */
        Decorator = "decorator"
    }
    /**
     * 参数描述接口
     */
    interface ParameterInfo {
        /** 参数名称 */
        name: string;
        /** 参数类型 */
        type: ParamType;
        /** 参数描述 */
        description?: string;
        /** 默认值 */
        defaultValue?: any;
        /** 步进 针对数字类型的变更的最小单位 */
        step?: number;
        /** 最小值 */
        min?: number;
        /** 最大值 */
        max?: number;
        /** 对象属性定义 - 仅当type为object时使用 */
        properties?: {
            [key: string]: Omit<ParameterInfo, "name">;
        };
        /** 数组元素类型 - 仅当type为array时使用 */
        itemType?: ParamType;
        /** 数组元素对象定义 - 仅当type为array且itemType为object时使用 */
        itemProperties?: {
            [key: string]: Omit<ParameterInfo, "name">;
        };
    }
    /**
     * 节点元数据接口
     */
    interface NodeMetadata {
        /** 节点名称 */
        name: string;
        /** 节点类名 */
        className: string;
        /** 节点分组 */
        group: string;
        /** 节点类型 */
        type: Type;
        /** 节点描述 */
        description: string;
        /** 参数列表 */
        parameters: ParameterInfo[];
        /** 最大子节点数量：0=不允许子节点，1=最多一个子节点，-1=无限制 */
        maxChildren: number;
    }
    /**
     * 节点属性装饰器
     */
    function prop(paramInfo: Omit<ParameterInfo, "name">): (target: any, propertyKey: string) => void;
    /**
     * 行为节点装饰器
     * @param name 节点的类名 编辑器导出数据中的节点名字
     * @param info.group 节点在编辑器中的分组
     * @param info.name 节点在编辑器中的中文名
     * @param info.desc 节点描述信息
     */
    function ClassAction(name: string, info?: {
        group?: string;
        name?: string;
        desc?: string;
    }): <T extends new (...args: any[]) => any>(constructor: T) => T;
    /**
     * 条件节点装饰器
     */
    function ClassCondition(name: string, info?: {
        group?: string;
        name?: string;
        desc?: string;
    }): <T extends new (...args: any[]) => any>(constructor: T) => T;
    /**
     * 组合节点装饰器
     */
    function ClassComposite(name: string, info?: {
        group?: string;
        name?: string;
        desc?: string;
    }): <T extends new (...args: any[]) => any>(constructor: T) => T;
    /**
     * 装饰节点装饰器
     */
    function ClassDecorator(name: string, info?: {
        group?: string;
        name?: string;
        desc?: string;
    }): <T extends new (...args: any[]) => any>(constructor: T) => T;
    /**
     * 获取所有节点元数据
     */
    function getAllNodeMetadata(): Map<any, NodeMetadata>;
    /**
     * 通过节点名 获取 节点构造函数
     */
    function getNodeConstructor(name: string): any;
    /**
     * 通过节点构造函数 找到节点元数据
     */
    function getNodeMetadata(ctor: any): NodeMetadata;
}

/** 行为树 */

declare const ClassAction: typeof BT.ClassAction;
declare const ClassCondition: typeof BT.ClassCondition;
declare const ClassComposite: typeof BT.ClassComposite;
declare const ClassDecorator: typeof BT.ClassDecorator;
declare const prop: typeof BT.prop;
declare const ParamType: typeof BT.ParamType;

export { BehaviorTree, Blackboard, ClassAction, ClassComposite, ClassCondition, ClassDecorator, Composite, Condition, ConditionDecorator, Decorator, Inverter, LeafNode, LimitTicks, LimitTime, Parallel, ParallelAnySuccess, ParamType, RandomSelector, Repeat, RepeatUntilFailure, RepeatUntilSuccess, Selector, Sequence, Status, WaitTicks, WaitTime, WeightDecorator, createBehaviorTree, globalBlackboard, prop };
export type { IBTNode, INodeConfig };
