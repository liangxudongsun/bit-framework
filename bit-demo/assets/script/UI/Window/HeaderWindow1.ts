/**
 * @Author: Gongxh
 * @Date: 2026-01-04
 * @Description: 带header1的弹窗
 */

import { UI } from "../../header";
import { Header1 } from "../Basics/Header1";
const { uiclass, uiclick } = UI._uidecorator;

@uiclass("Window", "Window", "HeaderWindow1")
export class HeaderWindow1 extends UI.Window {
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
        return UI.HeaderInfo.create(Header1, { name: "header1" });
    }
}
