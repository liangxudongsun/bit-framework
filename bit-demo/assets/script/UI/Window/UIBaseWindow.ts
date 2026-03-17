/**
 * @Author: Gongxh
 * @Date: 2025-12-27
 * @Description:
 */
import { CORE, UI } from "../../header";
const { uiclass, uiclick } = UI._uidecorator;

@uiclass("Window", "Window", "UIBaseWindow")
export class UIBaseWindow extends UI.Window {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
        this.type = UI.WindowType.HideAll;
    }

    protected onShow(userdata: { name: string }): void {
        CORE.log("UIBaseWindow onShow:", userdata);

    }

    protected onClose(): void {
        CORE.log("UIBaseWindow onClose");
    }


    /** 关闭自己 */
    @uiclick
    private onCloseSelf(): void {
        this.removeSelf();
    }
}
