---
paths:
  - "assets/script/**/*.ts"
---

# bit-core 核心模块

## GlobalTimer 定时器
| 方法 | 说明 |
|------|------|
| `GlobalTimer.startTimer(callback, interval, loop)` | 启动定时器，返回 timerId |
| `GlobalTimer.stopTimer(timerId)` | 停止定时器 |
| `GlobalTimer.pauseTimer(timerId)` | 暂停定时器 |
| `GlobalTimer.resumeTimer(timerId)` | 恢复定时器 |
| `GlobalTimer.clearAllTimer()` | 清除所有定时器 |

- `loop` 参数：0=执行一次，-1=无限循环，n=执行 n 次
- `interval` 单位为秒
- 对象销毁时必须停止关联的定时器，防止内存泄漏
- 通过 `CORE.GlobalTimer` 访问

## Platform 平台检测
- 布尔属性：`isNative` / `isMobile` / `isAndroid` / `isIOS` / `isWX` / `isBrowser` 等
- 枚举：`Platform.platform` 返回 `PlatformType`
- 通过 `CORE.Platform` 访问

## Screen 屏幕信息
- `ScreenWidth` / `ScreenHeight` — 屏幕实际尺寸
- `DesignWidth` / `DesignHeight` — 设计分辨率
- `SafeAreaHeight` — 安全区外高度（刘海屏）
- 通过 `CORE.Screen` 访问

## Time 时间工具
- `Time.now()` — 当前时间戳（毫秒）
- `Time.format(timestamp, pattern)` — 格式化时间
- `Time.isSameDay()` / `isSameWeek()` — 时间比较
- `Time.formatDuration(seconds, pattern)` — 格式化时长
- 通过 `CORE.Time` 访问

## 日志
- 使用 `CORE.log()` / `CORE.debug()` / `CORE.info()` / `CORE.warn()` / `CORE.error()`
- 禁止使用 `console.log` 等原生日志方法
