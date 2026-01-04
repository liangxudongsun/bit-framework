/**
 * @Author: Gongxh
 * @Date: 2025-12-27
 * @Description: 
 */
import { Core, UI } from "../../header";
const { uiclass, uiprop, uiclick, uicontrol, uitransition } = UI._uidecorator;

@uiclass("Window", "Window", "UIBaseWindow")
export class UIBaseWindow extends UI.Window {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
        this.type = UI.WindowType.HideAll;
    }

    protected onShow(userdata: { name: string }): void {
        Core.log("UIBaseWindow onShow:", userdata);

    }

    protected onClose(): void {
        Core.log("UIBaseWindow onClose");
    }


    /** 关闭自己 */
    @uiclick
    private onCloseSelf(): void {
        this.removeSelf();
    }
}
