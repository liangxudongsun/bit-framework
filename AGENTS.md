# BIT FRAMEWORK - AI AGENT KNOWLEDGE BASE

**Generated:** 2026-01-20  
**Commit:** 7796745  
**Branch:** main

## OVERVIEW

Cocos Creator 3.x 游戏开发框架 Monorepo。12 个独立 TypeScript 模块，pnpm workspace 管理，Rollup 构建。

## STRUCTURE

```
bit-framework/
├── bit-core/        # 核心工具库 (Time, Platform, Timer, Utils)
├── bit-ui/          # FairyGUI UI 管理 (窗口、装饰器)
├── bit-ecs/         # 高性能 ECS 架构
├── bit-ec/          # Cocos 适配 EC 架构
├── bit-event/       # 全局事件系统
├── bit-net/         # HTTP + WebSocket
├── bit-assets/      # 资源加载管理
├── bit-quadtree/    # 四叉树碰撞检测
├── bit-behaviortree/# AI 行为树
├── bit-condition/   # UI 条件显示 (红点)
├── bit-minigame/    # 小游戏平台适配
├── bit-hotupdate/   # 热更新系统
└── bit-demo/        # Cocos Creator 示例项目
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| 添加新模块 | 根目录 | 参照现有 bit-* 结构，更新 pnpm-workspace.yaml |
| 修改构建配置 | `rollup.config.base.mjs` | 所有模块共用此基础配置 |
| 模块依赖关系 | `ARCHITECTURE.md` | 含 mermaid 依赖图 |
| 发布流程 | `COMMANDS.md` | 完整构建/发布命令 |
| UI 窗口定义 | `bit-ui/src/window/` | Window, Header 基类 |
| ECS 组件/系统 | `bit-ecs/src/` | Component, System, World |
| 装饰器定义 | 各模块 `*Decorator.ts` | @uiclass, @ecsclass, @ecclass 等 |

## MODULE DEPENDENCIES

```
独立模块 (零依赖):
  bit-event, bit-ecs, bit-net, bit-assets, bit-quadtree, bit-behaviortree

依赖 bit-core:
  bit-ui, bit-condition, bit-minigame, bit-hotupdate

特殊依赖:
  bit-ec → bit-event
  bit-hotupdate → bit-core + bit-net
  bit-ui/bit-condition → fairygui-cc (外部)
```

## CONVENTIONS

### TypeScript
- `strictNullChecks: false` - Cocos Creator 兼容性考量
- `experimentalDecorators: true` - 装饰器广泛使用
- 每个模块独立 `tsconfig.json`，继承根配置

### 构建输出
每个模块 `dist/` 目录生成:
- `*.mjs` / `*.cjs` - ESM/CommonJS
- `*.min.mjs` / `*.min.cjs` - 压缩版
- `*.d.ts` - 类型定义

### 包命名
- npm scope: `@gongxh/bit-*`
- workspace 引用: `"@gongxh/bit-core": "workspace:*"`

### 装饰器模式
| 模块 | 装饰器 | 用途 |
|------|--------|------|
| bit-ui | `@uiclass`, `@uiprop`, `@uiclick` | UI 窗口注册 |
| bit-ecs | `@ecsclass`, `@ecsprop`, `@ecsystem` | ECS 组件/系统 |
| bit-ec | `@ecclass`, `@ecprop` | EC 组件 |
| bit-condition | `@condition` | 条件类注册 |
| bit-behaviortree | `@ClassAction`, `@prop` | 行为树节点 |

## ANTI-PATTERNS

- **禁止循环依赖** - 单向依赖流，需双向通信用 bit-event
- **禁止 `as any`** - 类型安全优先
- **禁止空 catch** - 必须处理错误
- **禁止直接修改 dist/** - 只修改 src/，重新构建

## COMMANDS

```bash
# 安装依赖
pnpm install

# 构建
pnpm build           # 并行构建所有模块
pnpm build:all       # 按依赖顺序构建
pnpm build:core      # 单模块构建
pnpm clean           # 清理 dist/

# 开发
pnpm dev:core        # 监听模式

# 版本管理
pnpm version:patch   # 所有模块升 patch

# 发布
pnpm publish:core    # 发布单模块
pnpm publish:all     # 发布所有
```

## NOTES

- **FairyGUI 依赖**: bit-ui, bit-condition 需要 fairygui-cc
- **Cocos 类型**: 根 tsconfig 引用 `@cocos/creator-types`
- **Demo 项目**: bit-demo 是 Cocos Creator 项目，用于测试
- **外部资源**: src/index.ts 导出所有公开 API
- **配套编辑器**: bit-ui, bit-ecs, bit-ec, bit-behaviortree 有付费可视化编辑器 (Cocos Store)
