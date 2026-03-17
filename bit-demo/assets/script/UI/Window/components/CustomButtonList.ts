/**
 * @Author: Gongxh
 * @Date: 2026-01-04
 * @Description: 这是一个自定义组件
 */
import { log } from "@gongxh/bit-core";

import { FGUI, UI } from "../../../header";
import { CloseAllWindow } from "../CloseAllWindow";
import { CloseOneWindow } from "../CloseOneWindow";
import { HeaderWindow1 } from "../HeaderWindow1";
import { HeaderWindow2 } from "../HeaderWindow2";
import { HideAllWindow } from "../HideAllWindow";
import { HideOneWindow } from "../HideOneWindow";
import { NormalWindow1 } from "../NormalWindow1";
import { NormalWindow2 } from "../NormalWindow2";
const { uicom, uiclick } = UI._uidecorator;

/**
 * 自定义组件注册
 * 参数1：组件所属的包名
 * 参数2：组件的名称
 */
@uicom("Window", "CustomButtonList")
export class CustomButtonList extends FGUI.GComponent {

    protected onInit(): void {

    }

    protected onClose(): void {
        log("CustomButtonList onClose");
    }

    /** 打开关闭前一个窗口的窗口 */
    @uiclick
    private onCloseOne(): void {
        UI.WindowManager.showWindow(CloseOneWindow);
    }

    /** 打开关闭所有窗口的窗口 */
    @uiclick
    private onCloseAll(): void {
        UI.WindowManager.showWindow(CloseAllWindow);
    }

    @uiclick
    private onNormalWindow1(): void {
        UI.WindowManager.showWindow(NormalWindow1, { name: "normalWindow1" });
    }

    @uiclick
    private onNormalWindow2(): void {
        UI.WindowManager.showWindow(NormalWindow2);
    }

    @uiclick
    private onHideOneWindow(): void {
        UI.WindowManager.showWindow(HideOneWindow);
    }

    @uiclick
    private onHideAllWindow(): void {
        UI.WindowManager.showWindow(HideAllWindow);
    }

    @uiclick
    private onHeaderWindow1(): void {
        UI.WindowManager.showWindow(HeaderWindow1);
    }

    @uiclick
    private onHeaderWindow2(): void {
        UI.WindowManager.showWindow(HeaderWindow2);
    }
}
