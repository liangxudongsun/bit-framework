/**
 * @Author: Gongxh
 * @Date: 2025-12-29
 * @Description:
 */

import { UI } from "../../header";
const { uiheader } = UI._uidecorator;

@uiheader("Basics", "Header2")
export class Header2 extends UI.Header {
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Bang;
    }

    protected onShow(_userdata: { title: string }): void {

    }
}
