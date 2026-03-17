import { HorizontalTextAlignment, Label, Node } from "cc";

import { CORE, FGUI, UI } from "../../header";

/*
 * @Description: 通用Toast提示
 * @Author: Gongxh
 * @Date: 2021-04-27 09:20:14
 */
interface IToastData {
    text: string; // 文本
    duration?: number; // 持续时间
    swallowTouch?: boolean; // 吞噬touch事件
    showMask?: boolean; // 显示遮罩
    align?: HorizontalTextAlignment; // 对齐方式
}

const { uiclass, uiprop } = UI._uidecorator;
@uiclass("ToastWindow", "Basics", "ToastWindow")
export class ToastWindow extends UI.Window {
    @uiprop private _labTips: FGUI.GTextField;
    @uiprop private _bgMask: FGUI.GGraph;
    @uiprop private _toast: FGUI.GComponent;

    private _swallowTouch: boolean = false; // 吞噬touch事件
    protected onInit(): void {
        this.adapterType = UI.AdapterType.Full;
        this.type = UI.WindowType.Normal;
    }

    protected onAdapted(): void {
        this._bgMask.width = CORE.Screen.ScreenWidth;
        this._bgMask.height = CORE.Screen.ScreenHeight;
    }

    /**
     * 参数说明
     * @param {string} data.text toast文本
     * @param {number} data.duration 存在时间（ < 0）为常驻 default 2秒
     * @param {boolean} data.swallowTouch 吞噬touch事件 default 不吞噬
     * @param {boolean} data.showMask 是否显示半透明遮罩 (当显示遮罩时，必定吞噬touch事件) default 不显示
     * @param {Label.HorizontalAlign} data.align 横向文本对齐方式 default 居中对齐
     */
    protected onShow(data: IToastData): void {
        this._bgMask.visible = data.showMask;
        this._swallowTouch = data.showMask ? true : (data.swallowTouch || false);
        this.opaque = this._swallowTouch;
        if (this._swallowTouch) {
            this.node.on(Node.EventType.TOUCH_END, () => { }, this.node);
        } else {
            this.node.targetOff(this.node);
        }

        this._labTips.text = data.text;

        const align = data.align || Label.HorizontalAlign.CENTER;
        this._labTips.align = align;
        this._labTips.autoSize = FGUI.AutoSizeType.Both;
        this._labTips.ensureSizeCorrect();
        // 调整文本尺寸
        const maxWidht = 504;
        if (this._labTips.width > maxWidht) {
            this._labTips.autoSize = FGUI.AutoSizeType.Height;
            this._labTips.width = maxWidht;
            this._labTips.ensureSizeCorrect();
        } else {
            this._labTips.autoSize = FGUI.AutoSizeType.Both;
        }

        const show = this._toast.getTransition("show");
        const hide = this._toast.getTransition("hide");
        show.stop(true);
        hide.stop(true);
        show.play(() => {
            const duration = data.duration || 2.0;
            if (duration > 0) {
                hide.play(() => {
                    this.removeSelf();
                }, 1, duration);
            }
        }, 1, 0);
    }

    protected onClose(): void {

    }
}
