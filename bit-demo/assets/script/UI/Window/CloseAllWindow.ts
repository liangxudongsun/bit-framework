/**
 * @Author: Gongxh
 * @Date: 2025-12-30
 * @Description:
 */
import { UI } from "../../header";
const { uiclass } = UI._uidecorator;

@uiclass("Window", "Window", "CloseAllWindow")
export class CloseAllWindow extends UI.Window {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
        this.type = UI.WindowType.CloseAll;
    }

    protected onShow(_userdata?: unknown): void {

    }

    protected onClose(): void {
    }
}
