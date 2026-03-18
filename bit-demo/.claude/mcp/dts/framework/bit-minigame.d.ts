/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 小游戏广告接口
 */
/** 激励视频广告 */
interface IMiniRewardAds {
    /**
     * 广告初始化
     * @param adUnitId 广告位ID
     * 不启用多广告实例
     */
    init(adUnitId: string): void;
    /**
     * 显示广告
     */
    showAds(res: {
        success: () => void;
        fail: (errCode: number, errMsg: string) => void;
    }): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 小游戏一些通用方法
 */
interface IMiniCommon {
    /**
     * 获取冷启动参数
     */
    getLaunchOptions(): Record<string, any>;
    /**
     * 获取热启动参数
     */
    getHotLaunchOptions(): Record<string, any>;
    /**
     * 获取基础库版本号
     */
    getLibVersion(): string;
    /**
     * 获取运行平台 合法值（ios | android | ohos | windows | mac | devtools | iPad）
     * 微信上 iPad 会返回 ios
     */
    getPlatform(): 'ios' | 'android' | 'ohos' | 'windows' | 'mac' | 'devtools' | 'iPad';
    /**
     * 获取运行类型
     * 合法值（release | debug）
     */
    getEnvType(): 'release' | 'debug';
    /**
     * 宿主程序版本 (这里指微信、抖音、支付宝版本)
     */
    getHostVersion(): string;
    /**
     * 获取屏幕尺寸
     */
    getScreenSize(): {
        width: number;
        height: number;
    };
    /**
     * 退出小程序
     */
    exitMiniProgram(): void;
    /**
     * 复制到剪切板
     */
    setClipboardData(text: string): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 小游戏支付接口
 */
interface IMiniPayParams {
    /**
     * 支付金额 (元)
     */
    rmb: number;
    /**
     * 订单号
     */
    orderId: string;
    /**
     * 是否为沙盒环境 0: 正式环境 1: 沙盒环境
     */
    sandbox?: 0 | 1;
    /**
     * 商品ID
     */
    shopId: string;
    /**
     * 商品名
     */
    shopName: string;
    /**
     * 额外信息
     */
    extraInfo?: Record<string, any>;
    /**
     * 接口调用成功的回调函数
     * @param res.code 支付结果码
     * @param res.message 支付结果信息
     */
    success: (res: {
        code: number;
        message: string;
    }) => void;
    /**
     * 接口调用失败的回调函数
     * @param res.errCode 错误码
     * @param res.errMsg 错误信息
     */
    fail: (res: {
        errCode: number;
        errMsg: string;
    }) => void;
}
interface IMiniPay {
    /**
     * 初始化 (不需要的参数传null)
     * @param offerId 商户号
     * @param unitPriceQuantity 单价数量  1元 / 后台设置的价格单位
     */
    init(offerId: string, unitPriceQuantity: number): void;
    /**
     * 是否满足限定的价格等级
     * @param rmb 价格 (元)
     * @returns 是否满足限定的价格等级
     */
    isPayable(rmb: number): boolean;
    /**
     * 支付
     */
    pay(res: IMiniPayParams): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 小游戏辅助类
 */

declare class MiniHelper {
    /** 基础数据 */
    private static _common;
    /** 广告 */
    private static _ad;
    /** 支付 */
    private static _pay;
    static common<T extends IMiniCommon>(): T;
    static ad<T extends IMiniRewardAds>(): T;
    static pay<T extends IMiniPay>(): T;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description:
 */
/** 记录一些错误码 */
declare const MiniErrorCode: {
    /** 支付未初始化 */
    PAY_NOT_INIT: {
        code: number;
        msg: string;
    };
    /** ios禁止支付 */
    IOS_FORBIDDEN: {
        code: number;
        msg: string;
    };
    /** 当前平台未实现支付 */
    PAY_NOT_IMPLEMENTED: {
        code: number;
        msg: string;
    };
    /** 版本号低 */
    VERSION_LOW: {
        code: number;
        msg: string;
    };
    /** 广告未初始化 */
    AD_NOT_INIT: {
        code: number;
        msg: string;
    };
    /** 广告中途退出*/
    AD_EXIT: {
        code: number;
        msg: string;
    };
    /** 广告正在播放中 不允许重复调用 */
    AD_PLAYING: {
        code: number;
        msg: string;
    };
};
/** 统一价格限制列表 (微信、支付宝和字节 取交集) */
declare const PriceLimitList: number[];

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 微信广告
 */

declare class WechatAds implements IMiniRewardAds {
    private _adUnitId;
    private _video_ad;
    /**
     * 广告成功回调
     */
    private _success;
    /**
     * 广告失败回调
     */
    private _fail;
    init(adUnitId: string): void;
    /**
     * 显示广告
     */
    showAds(res: {
        success: () => void;
        fail: (errCode: number, errMsg: string) => void;
    }): void;
    private createVideoAd;
    /** 防止多次回调 */
    private reset;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 微信小游戏工具类
 */

declare class WechatCommon implements IMiniCommon {
    private _launchOptions;
    private _accountInfo;
    /** 基础库 2.25.3 开始支持的信息 */
    private _appBaseInfo;
    private _deviceInfo;
    private _windowInfo;
    /** 从基础库 2.20.1 开始，本接口停止维护 */
    private _systemInfo;
    /**
     * 获取冷启动参数
     */
    getLaunchOptions(): WechatMiniprogram.LaunchOptionsApp;
    /**
     * 获取热启动参数
     */
    getHotLaunchOptions(): WechatMiniprogram.LaunchOptionsApp;
    /**
     * 获取基础库版本号
     */
    getLibVersion(): string;
    /**
     * 宿主程序版本 (这里指微信版本)
     */
    getHostVersion(): string;
    /**
     * 获取运行平台
     */
    getPlatform(): 'ios' | 'android' | 'ohos' | 'windows' | 'mac' | 'devtools';
    /**
     * 获取版本类型
     */
    getEnvType(): 'release' | 'debug';
    /**
     * 退出小程序
     */
    exitMiniProgram(): void;
    getScreenSize(): {
        width: number;
        height: number;
    };
    /**
     * 复制到剪切板
     */
    setClipboardData(text: string): void;
    private getAppBaseInfo;
    private getVersionInfo;
    getDeviceInfo(): WechatMiniprogram.DeviceInfo;
    getWindowInfo(): WechatMiniprogram.WindowInfo;
    private getSystemInfo;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 微信支付
 */

declare class WechatPay implements IMiniPay {
    private _offerId;
    private _unitPriceQuantity;
    init(offerId: string, unitPriceQuantity: number): void;
    isPayable(rmb: number): boolean;
    pay(res: IMiniPayParams): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 支付宝广告
 */

declare class AlipayAds implements IMiniRewardAds {
    private _adUnitId;
    private _video_ad;
    /**
     * 广告成功回调
     */
    private _success;
    /**
     * 广告失败回调
     */
    private _fail;
    init(adUnitId: string): void;
    showAds(res: {
        success: () => void;
        fail: (errCode: number, errMsg: string) => void;
    }): void;
    private createVideoAd;
    /** 防止多次回调 */
    private reset;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 支付宝小游戏工具类
 */

declare class AlipayCommon implements IMiniCommon {
    private _launchOptions;
    private _systemInfo;
    private _accountInfo;
    getLaunchOptions(): AliyMiniprogram.AppLaunchOptions;
    getHotLaunchOptions(): Record<string, any>;
    /**
     * 获取基础库版本号
     */
    getLibVersion(): string;
    /**
     * 获取运行平台 合法值（ios | android | ohos | windows | mac | devtools）
     */
    getPlatform(): 'ios' | 'android' | 'ohos' | 'windows' | 'mac' | 'devtools' | 'iPad';
    /**
     * 获取版本类型
     */
    getEnvType(): 'release' | 'debug';
    /**
     * 宿主程序版本 (这里指支付宝 或其他宿主 版本)
     */
    getHostVersion(): string;
    /**
     * 获取屏幕尺寸
     */
    getScreenSize(): {
        width: number;
        height: number;
    };
    /**
     * 退出当前小程序 (必须通过点击事件触发才能调用成功)
     */
    exitMiniProgram(): void;
    /**
     * 复制到剪切板
     */
    setClipboardData(text: string): void;
    private getSystemInfo;
    private getAccountInfo;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 支付宝支付
 */

declare class AlipayPay implements IMiniPay {
    private _unitPriceQuantity;
    init(offerId: string, unitPriceQuantity: number): void;
    isPayable(rmb: number): boolean;
    pay(res: IMiniPayParams): void;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 字节跳动广告
 */

declare class BytedanceAds implements IMiniRewardAds {
    private _adUnitId;
    private _video_ad;
    /**
     * 广告成功回调
     */
    private _success;
    /**
     * 广告失败回调
     */
    private _fail;
    init(adUnitId: string): void;
    /**
     * 显示广告
     */
    showAds(res: {
        success: () => void;
        fail: (errCode: number, errMsg: string) => void;
    }): void;
    private createVideoAd;
    /** 防止多次回调 */
    private reset;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-11
 * @Description: 字节跳动小游戏工具类
 */

declare class BytedanceCommon implements IMiniCommon {
    private _launchOptions;
    private _systemInfo;
    private _envInfo;
    /**
     * 获取冷启动参数
     */
    getLaunchOptions(): BytedanceMiniprogram.LaunchParams;
    /**
     * 获取热启动参数
     */
    getHotLaunchOptions(): BytedanceMiniprogram.LaunchParams;
    /**
     * 获取基础库版本号
     */
    getLibVersion(): string;
    /**
     * 宿主程序版本 (这里指今日头条、抖音等版本)
     */
    getHostVersion(): string;
    /**
     * 宿主 APP 名称。示例："Toutiao"
     * 见 [https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/system/system-information/tt-get-system-info-sync]
     */
    getHostName(): string;
    /**
     * 获取运行平台
     */
    getPlatform(): 'ios' | 'android' | 'ohos' | 'windows' | 'mac' | 'devtools';
    /**
     * 获取版本类型
     */
    getEnvType(): 'release' | 'debug';
    /**
     * 退出小程序
     */
    exitMiniProgram(): void;
    getScreenSize(): {
        width: number;
        height: number;
    };
    /**
     * 复制到剪切板
     */
    setClipboardData(text: string): void;
    private getEnvInfo;
    private getSystemInfo;
}

/**
 * @Author: Gongxh
 * @Date: 2025-04-12
 * @Description: 抖音支付
 * https://developer.open-douyin.com/docs/resource/zh-CN/mini-game/develop/api/payment/tt-request-game-payment
 */

declare class BytedancePay implements IMiniPay {
    private _unitPriceQuantity;
    init(offerId: string, unitPriceQuantity: number): void;
    isPayable(rmb: number): boolean;
    pay(res: IMiniPayParams): void;
    private payAndroid;
    private payIos;
}

export { AlipayAds, AlipayCommon, AlipayPay, BytedanceAds, BytedanceCommon, BytedancePay, MiniErrorCode, MiniHelper, PriceLimitList, WechatAds, WechatCommon, WechatPay };
export type { IMiniCommon, IMiniPay, IMiniRewardAds };
