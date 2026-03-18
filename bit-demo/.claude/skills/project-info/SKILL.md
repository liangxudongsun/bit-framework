---
name: project-info
description: 查询项目的窗口、组件、系统、实体等信息
user-invocable: true
argument-hint: [windows|components|systems|entities|all]
allowed-tools: Read(*), Glob(*), Grep(*)
---

# 项目信息查询

根据参数查询并展示项目信息。

## 参数
`$ARGUMENTS` 可选值：`windows` / `components` / `systems` / `entities` / `all`（默认 `all`）

## 查询规则

### windows — 所有 UI 窗口
1. 用 Grep 扫描 `assets/script/` 下所有含 `@uiclass` 的 `.ts` 文件
2. 提取装饰器参数：窗口组名、FGUI 包名、窗口名
3. 以表格展示：窗口名 | 包名 | 组名 | 文件路径

### components — 所有 ECS 组件
1. 用 Grep 扫描 `assets/script/ecs/component/` 下所有含 `@ecsclass` 的文件
2. 提取组件名、描述
3. 读取文件获取 `@ecsprop` 属性列表
4. 以表格展示：组件名 | 描述 | 属性 | 文件路径

### systems — 所有 ECS 系统
1. 用 Grep 扫描 `assets/script/ecs/system/` 下所有含 `@ecsystem` 的文件
2. 提取系统名、描述
3. 读取文件获取 matcher 配置（allOf/anyOf/excludeOf）
4. 以表格展示：系统名 | 描述 | 查询组件 | 文件路径

### entities — 所有实体配置
1. 用 Glob 扫描 `extensions-config/entity/` 下所有 `.json` 文件
2. 读取每个 JSON，提取 name、alias、group、components
3. 以表格展示：实体名 | 别名 | 分组 | 组件列表

### all — 以上全部
按顺序执行所有查询，每个类别用标题分隔。

## 输出格式
使用 Markdown 表格，按类别分组，包含文件链接便于跳转。
