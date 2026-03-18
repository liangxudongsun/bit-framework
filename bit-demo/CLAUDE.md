# 项目规范

## 引擎版本
- Cocos Creator 3.8.8，严格使用该版本 API
- 禁止使用废弃 API：cc.loader、cc.Class、cc.director.getScheduler 旧写法、Action 动作系统

## 框架模块
| 需求 | 使用模块 | 规则文件 |
|------|---------|---------|
| UI 窗口 | bit-ui → Window 基类 + @uiclass 装饰器 | `.claude/rules/ui-module.md` |
| FGUI 工作流 | FairyGUI 节点结构读取和代码生成 | `.claude/rules/fgui-workflow.md` |
| ECS 工作流 | 组件/系统开发流程 | `.claude/rules/ecs-workflow.md` |
| 事件通信 | bit-event → GlobalEvent | `.claude/rules/event-module.md` |
| 定时器/平台 | bit-core → GlobalTimer / Platform / Screen | `.claude/rules/core-module.md` |
| 资源加载 | bit-assets → AssetLoader / AssetPool | `.claude/rules/assets-module.md` |
| 网络请求 | bit-net → HttpManager / Socket | `.claude/rules/net-module.md` |
| 行为树AI | bit-behaviortree → BehaviorTree | `.claude/rules/behaviortree-module.md` |
| 碰撞检测 | bit-quadtree → QuadTree | `.claude/rules/quadtree-module.md` |
| 热更新 | bit-hotupdate → HotUpdateManager | — |

## 自动化技能（Skills）
| 命令 | 用途 | 参数 |
|------|------|------|
| `/create-window` | 创建 UI 窗口类 | 窗口名 FGUI包名 [窗口组名] |
| `/create-component` | 创建 ECS 组件 | 组件名 描述 [分类目录] |
| `/create-system` | 创建 ECS 系统 | 系统名 描述 [分类目录] |
| `/project-info` | 查询项目信息 | windows/components/systems/entities/all |

## 代码规范
- 禁止跨模块直接调用，事件通信必须通过 GlobalEvent
- 禁止 `any` 类型，必须定义明确类型
- UI 窗口必须继承 Window 基类，使用 @uiclass 装饰器注册
- 新建窗口/组件/系统时，使用对应的 `/create-window`、`/create-component`、`/create-system` 技能
- 详细命名规范和质量规则 → `.claude/rules/code-style.md`（写 .ts 代码时自动加载）

## 项目关键路径
| 路径 | 说明 |
|------|------|
| `assets/script/` | 游戏脚本代码 |
| `assets/script/header.ts` | 统一导出：ASSETS, CORE, ecs, FGUI, QT, UI |
| `assets/script/ecs/` | ECS 组件和系统 |
| `FguiCreator3.8/assets/` | FGUI 工程（按包分目录，含 XML 节点定义） |
| `extensions-config/entity/` | 实体配置 JSON（只读） |
| `extensions-config/fgui/` | FGUI 插件配置（代码写完后生成，不可用于了解节点结构） |

## 查询 API（MCP 知识库）
项目内嵌了 MCP 向量知识库（`.claude/mcp/`），基于框架和 Cocos Creator 3.8.8 的 .d.ts 构建，支持中英文语义搜索。

| 工具 | 用途 | 示例 |
|------|------|------|
| `search_api(query, source?)` | 语义搜索 API | `search_api("延迟执行")` / `search_api("Node", "cocos")` |
| `get_module(moduleName)` | 查看模块所有类 | `get_module("bit-ui")` / `get_module("cocos")` |
| `get_class(className)` | 查看类完整定义 | `get_class("Window")` / `get_class("Node")` |
| `get_method(className, methodName)` | 查看方法签名 | `get_method("Window", "onShow")` |

- `source` 参数：`"framework"` / `"cocos"` / `"all"`（默认 all）
- 遇到不确定的框架或 Cocos API，优先用 MCP 查询而非猜测
- 索引重建：`cd .claude/mcp && npm run sync`

## 踩坑记录与架构决策
遇到相关场景时主动查阅 docs/ 下的文档：

| 文档 | 内容 | 何时查阅 |
|------|------|---------|
| `docs/pitfalls/fgui-pitfalls.md` | FGUI 常见坑和反模式 | 写 UI 窗口代码时 |
| `docs/pitfalls/ecs-pitfalls.md` | ECS 常见坑和反模式 | 写 ECS 组件/系统时 |
| `docs/architecture/ecs-design.md` | ECS 架构决策记录 | 修改 ECS 架构或添加新系统时 |


# 工作流执行标准 (WORKFLOW ENFORCEMENT)
处理任何中大型需求时，强制遵循以下步骤 (参考 Superpowers 工作流)：
1. **Plan (计划)**: 输出一个简短的 Markdown 列表，说明你打算修改哪些文件，以及核心思路。
2. **Wait (等待)**: 询问用户：“这个计划是否符合预期？是否可以开始编写代码？”
3. **Execute (执行)**: 获得批准后，再输出具体的代码或执行文件修改。