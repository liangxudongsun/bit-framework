/**
 * @Author: Gongxh
 * @Date: 2025-12-29
 * @Description:
 */

import { UI } from "../../header";
const { uiclass, uiclick } = UI._uidecorator;

@uiclass("Window", "Window", "NormalWindow1")
export class NormalWindow1 extends UI.Window {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
        this.type = UI.WindowType.Normal;
    }

    protected onShow(_userdata: { name: string }): void {

    }

    protected onClose(): void {

    }


    /** 关闭自己 */
    @uiclick
    private onCloseSelf(): void {
        this.removeSelf();
    }

    protected onEmptyAreaClick(): void {
        this.removeSelf();
    }
}
