import { ICheckUpdatePromiseResult, IPromiseResult } from '@gongxh/bit-core';

/**
 * @Author: Gongxh
 * @Date: 2025-04-19
 * @Description: 热更新实例
 */

interface IHotUpdateConfig {
    packageUrl: string;
    remoteManifestUrl: string;
    remoteVersionUrl: string;
    version: string;
}
interface IManifestResult extends IPromiseResult {
    manifest?: IHotUpdateConfig;
}
declare enum HotUpdateCode {
    /** 成功 */
    Succeed = 0,
    /** 平台不支持 不需要热更新 */
    PlatformNotSupported = -1000,
    /** 未初始化 */
    NotInitialized = -1001,
    /** 是最新版本 */
    LatestVersion = -1002,
    /** 更新中 */
    Updating = -1003,
    /** 加载本地manifest失败 */
    LoadManifestFailed = -1004,
    /** 下载manifest文件失败 */
    ParseManifestFailed = -1005,
    /** 下载version.manifest失败 */
    LoadVersionFailed = -1006,
    /** 解析version.manifest失败 */
    ParseVersionFailed = -1007,
    /** 更新失败 需要重试 */
    UpdateFailed = -1008,
    /** 更新错误 */
    UpdateError = -1009,
    /** 解压错误 */
    DecompressError = -1010
}
declare class HotUpdate {
    /** 资源管理器 */
    private _am;
    /** 更新进度回调 */
    private _progress;
    private _complete;
    get resVersion(): string;
    /** 获取 version.manifest 文件的远程地址 */
    private get versionUrl();
    constructor();
    /** 重试失败的资源 */
    retryUpdate(): void;
    /**
     * 检查是否存在热更新
     * 提供一个对外的方法检查是否存在热更新
     * @return {Promise<ICheckUpdatePromiseResult>}
     */
    checkUpdate(): Promise<ICheckUpdatePromiseResult>;
    /**
     * 开始热更新
     * @param res.skipCheck 是否跳过检查更新
     * @param res.progress 更新进度回调 kb: 已下载的资源大小, total: 总资源大小 (kb)
     * @param res.complete 更新结束回调 根据错误码判断 跳过还是重试失败资源
     */
    startUpdate(res: {
        skipCheck?: boolean;
        progress: (kb: number, total: number) => void;
        complete: (code: HotUpdateCode, message: string) => void;
    }): void;
    private startUpdateTask;
    /** 验证资源 */
    private _verifyCallback;
    /** 读取本地的project.manifest文件 */
    private readLocalManifest;
    /** 读取远程version.manifest文件内容 */
    private loadRemoteVersionManifest;
    /** 替换project.manifest中的内容 并刷新本地manifest */
    private refreshLocalManifest;
    /** 调用cc的接口检测更新 */
    private startCheckUpdate;
}

/**
 * @Author: Gongxh
 * @Date: 2025-03-20
 * @Description: 热更新管理器
 */

declare class HotUpdateManager {
    private static instance;
    static getInstance(): HotUpdateManager;
    /** 是否初始化了 */
    private _isInitialized;
    /** 本地manifest路径 */
    private _manifestUrl;
    /** 版本号 */
    private _version;
    /** 资源版本号 */
    private _resVersion;
    /** 可写路径 */
    private _writablePath;
    /** 是否正在更新 或者 正在检查更新 */
    private _updating;
    /** 更新实例 */
    private _hotUpdate;
    /**
     * 热更新文件存放的可写路径
     */
    get writablePath(): string;
    /**
     * 本地manifest路径
     */
    get manifestUrl(): string;
    /**
     * 传入的游戏版本号
     */
    get version(): string;
    /**
     * 获取资源版本号, 须初始化成功后再使用
     * @return 资源版本号 默认值 ‘0’
     */
    get resVersion(): string;
    set resVersion(version: string);
    /**
     * 1. 初始化热更新管理器
     * @param manifestUrl 传入本地manifest文件地址 资源的assets.nativeUrl
     * @param version 游戏版本号 eg: 1.0.0
     */
    init(manifestUrl: string, version: string): void;
    /**
     * 检查是否存在热更新
     * 提供一个对外的方法检查是否存在热更新
     * @return {Promise<ICheckUpdatePromiseResult>}
     */
    checkUpdate(): Promise<ICheckUpdatePromiseResult>;
    /**
     * 开始热更新
     * @param res.skipCheck 是否跳过检查更新
     * @param res.progress 更新进度回调 kb: 已下载的资源大小, total: 总资源大小 (kb)
     * @param res.complete 更新结束回调 根据错误码判断 跳过还是重试失败资源
     */
    startUpdate(res: {
        skipCheck: boolean;
        progress: (kb: number, total: number) => void;
        complete: (code: HotUpdateCode, message: string) => void;
    }): void;
    /** 重试失败的资源 */
    retryUpdate(): void;
}

export { HotUpdate, HotUpdateCode, HotUpdateManager };
export type { IManifestResult };
