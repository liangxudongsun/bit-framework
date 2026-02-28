import { Module } from '@gongxh/bit-core';
import { GlobalEvent } from '@gongxh/bit-event';

/** Manager 单例模式，通过 Module 基类管理生命周期 */
export class ExampleManager extends Module {

    private static _instance: ExampleManager;
    public static get instance(): ExampleManager {
        return ExampleManager._instance;
    }

    protected onInit(): void {
        ExampleManager._instance = this;
        // 监听事件
        GlobalEvent.add('SOME_EVENT', this.onSomeEvent, this);
    }

    public destroy(): void {
        // 移除所有事件监听
        GlobalEvent.removeByTarget(this);
    }

    private onSomeEvent(data: unknown): void {
        // 处理事件
    }
}
