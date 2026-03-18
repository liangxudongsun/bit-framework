---
paths:
  - "assets/script/**/*.ts"
---

# FGUI UI 工作流

## Claude 的职责边界
- Claude 只负责写 TypeScript 代码，不修改 FGUI 编辑器项目文件（FguiCreator3.8/ 目录）
- FGUI 界面设计、节点配置由开发者在 FairyGUI 编辑器中完成
- Claude 可以读取 FGUI 工程 XML 来了解界面节点结构

## 了解节点结构
- 读取 FGUI 工程 XML：`FguiCreator3.8/assets/{package}/{component}.xml`
- XML 中 `<displayList>` 包含所有子节点（graph/text/image/component）
- 节点的 `name` 属性对应代码中 `@uiprop` 的属性名
- `<controller>` 定义状态机，`<transition>` 定义过渡动画
- 通过 `<component src="xxx" fileName="xxx">` 识别引用的子组件类型

## FGUI 节点类型映射
| XML 节点 | FGUI 类型 | 用途 |
|----------|-----------|------|
| `<graph>` | `FGUI.GGraph` | 图形/遮罩 |
| `<text>` | `FGUI.GTextField` | 文本 |
| `<image>` | `FGUI.GImage` | 图片 |
| `<component>` + `<Button/>` | `FGUI.GButton` | 按钮 |
| `<component>` + `<Label/>` | `FGUI.GLabel` | 标签 |
| `<component>` + `<Slider/>` | `FGUI.GSlider` | 滑块 |
| `<component>` + `<ProgressBar/>` | `FGUI.GProgressBar` | 进度条 |
| `<component>` + `<ComboBox/>` | `FGUI.GComboBox` | 下拉框 |
| `<component>`（无扩展） | `FGUI.GComponent` | 通用组件容器 |

## 禁止读取
- `extensions-config/fgui/` 下的 JSON 是写完 UI 代码后在编辑器插件中配置保存的数据
- 不能用来了解节点结构，只有 FGUI 工程 XML 才是节点结构的来源

## 代码约定
- 使用 `const { uiclass, uiclick, uiprop } = UI._uidecorator` 解构装饰器
- `@uiprop` 属性使用 `_` 前缀（私有），类型用 FGUI 命名空间类型
- `@uiclick` 方法命名格式：`onXxx`（如按钮名 `btn_close` → 方法 `onCloseSelf`）
- 禁止直接操作 FGUI 原始节点路径，必须通过 `@uiprop` 绑定
- import 使用 header.ts 风格：`import { UI, FGUI } from "../header"`
