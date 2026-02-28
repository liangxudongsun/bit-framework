import { _decorator, Node } from 'cc';
import { Window, uiclass, uiprop, uiclick } from '@gongxh/bit-ui';

// @uiclass(分组名, fairygui包名, 组件名)
@uiclass('Common', 'UIPackage', 'ExampleWindow')
export class ExampleWindow extends Window {

    // @uiprop 标记FairyGUI组件属性
    @uiprop
    private btnClose!: fairygui.GButton;

    @uiprop
    private lblTitle!: fairygui.GTextField;

    /** 窗口初始化，只调用一次 */
    protected onInit(): void {
        // 绑定点击事件
        this.btnClose.onClick(this.onBtnClose, this);
    }

    /** 窗口显示时调用，data 为 show 时传入的参数 */
    protected onShow(data?: unknown): void {
        // 每次显示时刷新数据
    }

    /** 窗口隐藏时调用 */
    protected onHide(): void {
    }

    /** 窗口关闭销毁时调用 */
    protected onClose(): void {
        // 清理资源
    }

    @uiclick
    private onBtnClose(): void {
        this.close();
    }
}
