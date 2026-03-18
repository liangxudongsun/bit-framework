---
paths:
  - "assets/script/**/*.ts"
---

# bit-ui 窗口模块

## Window 生命周期（按调用顺序）
1. `onInit()` — 只调用一次，设置 adapterType 和 type，绑定事件
2. `onAdapted()` — 屏幕适配完成后调用（可选）
3. `onShow(data?)` — 每次显示调用，刷新数据
4. `onHide()` — 窗口被隐藏时调用（可选）
5. `onShowFromHide()` — 从隐藏状态恢复显示（可选）
6. `onToTop()` — 窗口置顶时调用（可选）
7. `onToBottom()` — 窗口被覆盖时调用（可选）
8. `onClose()` — 窗口销毁时调用，清理资源

## WindowType 枚举
| 类型 | 行为 |
|------|------|
| `Normal` | 普通窗口，不影响其他窗口 |
| `CloseOne` | 打开时关闭当前顶部窗口 |
| `CloseAll` | 打开时关闭同组所有窗口 |
| `HideAll` | 打开时隐藏同组所有窗口 |

## AdapterType 枚举
| 类型 | 说明 |
|------|------|
| `Full` | 全屏适配 |
| `Bang` | 刘海屏适配（安全区内） |

## 窗口操作 API
- 打开：`WindowManager.showWindow(WindowClass, userdata?)`
- 关闭自身：`this.removeSelf()` 或 `this.close()`
- 关闭其他：`WindowManager.closeWindow(WindowClass)`
- 隐藏：`WindowManager.hideWindow(WindowClass)`
- 查询：`WindowManager.hasWindow(name)` / `getWindow(WindowClass)`

## @uiclass 装饰器参数
```typescript
@uiclass(groupName, pkgName, componentName, inlinePkgs?)
```
- `groupName` — 窗口组名（如 "Window"、"ToastWindow"）
- `pkgName` — FGUI 包名（如 "Home"、"Basics"）
- `componentName` — FGUI 组件名（与类名通常一致）
- `inlinePkgs` — 内联包名（可选，依赖的其他 FGUI 包）
