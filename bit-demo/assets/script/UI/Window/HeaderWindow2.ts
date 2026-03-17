/**
 * @Author: Gongxh
 * @Date: 2026-01-05
 * @Description: 带header2的弹窗
 */

import { UI } from "../../header";
import { Header2 } from "../Basics/Header2";
const { uiclass, uiclick } = UI._uidecorator;

@uiclass("Window", "Window", "HeaderWindow2")
export class HeaderWindow2 extends UI.Window {
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

    public getHeaderInfo<T>(): UI.HeaderInfo<T> {
        return UI.HeaderInfo.create(Header2, { title: "header2" });
    }
}
