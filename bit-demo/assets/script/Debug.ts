/**
 * @Author: Gongxh
 * @Date: 2025-12-29
 * @Description:
 */

import { EventKeyboard, Input, input, KeyCode } from "cc";
import { DEBUG } from "cc/env";

import { UI } from "./header";
import { HomeWindow } from "./UI/HomeWindow";
import { CloseAllWindow } from "./UI/Window/CloseAllWindow";
import { CloseOneWindow } from "./UI/Window/CloseOneWindow";
import { HideAllWindow } from "./UI/Window/HideAllWindow";
import { HideOneWindow } from "./UI/Window/HideOneWindow";
import { NormalWindow1 } from "./UI/Window/NormalWindow1";
import { NormalWindow2 } from "./UI/Window/NormalWindow2";

export class Debug {
    public static register(): void {
        if (DEBUG) {
            this.registerSystemEvent();
        }
    }
    private static registerSystemEvent(): void {
        input.on(Input.EventType.KEY_DOWN, (event: EventKeyboard) => {
            if (event.keyCode === KeyCode.NUM_1) {
                UI.WindowManager.showWindow(NormalWindow1);
            } else if (event.keyCode === KeyCode.NUM_2) {
                UI.WindowManager.showWindow(NormalWindow2);
            } else if (event.keyCode === KeyCode.NUM_3) {
                UI.WindowManager.showWindow(HideOneWindow);
            } else if (event.keyCode === KeyCode.NUM_4) {
                UI.WindowManager.showWindow(HideAllWindow);
            } else if (event.keyCode === KeyCode.NUM_5) {
                UI.WindowManager.showWindow(CloseOneWindow);
            } else if (event.keyCode === KeyCode.NUM_6) {
                UI.WindowManager.showWindow(CloseAllWindow);
            } else if (event.keyCode === KeyCode.NUM_7) {

            } else if (event.keyCode === KeyCode.NUM_8) {

            } else if (event.keyCode === KeyCode.NUM_9) {

            } else if (event.keyCode === KeyCode.NUM_0) {
                UI.WindowManager.showWindow(HomeWindow);
            } else if (event.keyCode === KeyCode.KEY_F) {

            } else if (event.keyCode === KeyCode.KEY_G) {

            } else if (event.keyCode === KeyCode.KEY_H) {

            } else if (event.keyCode === KeyCode.KEY_J) {

            }
        });
    }
}

