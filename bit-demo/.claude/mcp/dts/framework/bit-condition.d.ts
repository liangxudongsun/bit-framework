import { Module } from '@gongxh/bit-core';

/**
 * @Author: Gongxh
 * @Date: 2025-02-17
 * @Description: 条件装饰器
 */
declare namespace _conditionDecorator {
    /** 获取组件注册信息 */
    function getConditionMaps(): Map<number, any>;
    /**
     * 条件装饰器
     * @param {number} conditionType 条件类型
     */
    function condition(conditionType: number): Function;
}

declare class ConditionManager {
    /** 初始化所有条件，并全部更新一次 */
    static initCondition(): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-02-14
 * @Description: 条件模式
 */
declare enum ConditionMode {
    /** 满足任意条件显示 */
    Any = 0,
    /** 满足所有条件显示 */
    All = 1
}

/**
 * @Author: Gongxh
 * @Date: 2025-02-14
 * @Description: 条件显示模块
 */

declare class ConditionModule extends Module {
    updateDeltaTime: number;
    /** 模块名称 */
    moduleName: string;
    init(): void;
    /** 模块初始化完成后调用的函数 */
    protected onInit(): void;
    onDestroy(): void;
}

export { ConditionManager, ConditionMode, ConditionModule, _conditionDecorator };
