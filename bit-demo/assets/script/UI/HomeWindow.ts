/**
 * @Author: Gongxh
 * @Date: 2024-12-11
 * @Description:
 */

import { CORE, UI } from "../header";
import { UIBaseWindow } from "./Window/UIBaseWindow";
const { uiclass, uiclick } = UI._uidecorator;

@uiclass("Window", "Home", "HomeWindow")
export class HomeWindow extends UI.Window {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
        this.type = UI.WindowType.CloseAll;
    }

    protected onShow(userdata?: unknown): void {
        CORE.log("HomeWindow onShow:", userdata);
        // console.log("this.status", this.status);
        // console.log("this.sta2", this.sta2);
        // console.log("this.bookCtrl", this.bookCtrl);
        // console.log("this.doneCtrl", this.doneCtrl);
        // console.log("this.resultCtrl", this.resultCtrl);
    }

    protected onClose(): void {
        CORE.log("HomeWindow onClose");
    }

    @uiclick
    private onClickUI(): void {
        UI.WindowManager.showWindow(UIBaseWindow, { name: "UI界面" });
    }

    @uiclick
    private onSocketWindow(): void {
        CORE.log("222");
    }

    @uiclick
    private onClickBtnCondition(): void {
        CORE.log("333");
    }


    /**
     * 进入ecs系统的界面
     */
    @uiclick
    private onECS(): void {
        CORE.log("444");
    }

    @uiclick
    private onClickBtnHotUpdate(): void {
        CORE.log("555");
    }

    @uiclick
    private onClickData(): void {
        CORE.log("666");
    }
}
