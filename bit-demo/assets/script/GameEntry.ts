import { _decorator, Node, sys } from "cc";

import { Debug } from "./Debug";
import { CORE, FGUI, UI } from "./header";
import { HomeWindow } from "./UI/HomeWindow";
const { ccclass, property, menu } = _decorator;
@ccclass("GameEntry")
@menu("bit/GameEntry")
export class GameEntry extends CORE.CocosEntry {
    @property(Node)
    private _root: Node = null;
    public onInit(): void {
        let deviceId = sys.localStorage.getItem("xBBres") as string;
        if (!deviceId || deviceId === "") {
            deviceId = "browser@" + Date.now().toString();
            sys.localStorage.setItem("xBBres", deviceId);
        }
        CORE.Platform.deviceId = deviceId;
        Debug.register();

        FGUI.UIPackage.loadPackage("ui/manual/Basics", () => {
            this.onResourceLoadComplete();
        });
    }

    /** 资源加载完成 */
    private onResourceLoadComplete(): void {
        // 1.5秒后打开 HomeWindow 窗口
        CORE.GlobalTimer.startTimer(() => {
            this.intoGame();
        }, 1.5, 0);
    }

    private intoGame(): void {
        UI.WindowManager.showWindow(HomeWindow, "这是一个测试窗口").then(() => {
            CORE.log("窗口显示成功");
            this._root.active = false;
        }).catch((err: Error) => {
            CORE.log("窗口显示失败", err.message);
        });
    }
}
