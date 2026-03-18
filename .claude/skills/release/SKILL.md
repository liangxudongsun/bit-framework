---
name: release
description: Use when publishing a new version of bit-framework to npm. Handles version bump, build, git commit, npm publish, and git tag in sequence.
---

# Release

执行 bit-framework 完整发版流程：升级版本号 → 构建所有模块 → 提交代码 → 发布到 npm → 打 git tag。

## 用法

```
/release [patch|minor|major]
```

- `patch`（默认）— bug 修复，0.0.x → 0.0.x+1
- `minor` — 新功能，0.x.0 → 0.x+1.0
- `major` — 破坏性变更，x.0.0 → x+1.0.0

## 执行步骤

收到 `/release` 命令后，按以下步骤执行：

### 第一步：确认版本类型

如果用户没有指定类型，询问：
> 发版类型是 patch（bug修复）、minor（新功能）还是 major（破坏性变更）？

### 第二步：检查当前状态

```bash
git status
git log --oneline -5
```

确认工作区干净（无未提交的修改）。如果有未提交内容，提示用户先提交。

### 第三步：从 package.json 获取当前版本

```bash
cat package.json | grep '"version"' | head -1
```

告知用户当前版本和即将升级到的版本，请求确认。

### 第四步：升级版本号

```bash
pnpm version:{type}
```

例如 `pnpm version:patch`

### 第五步：构建所有模块

```bash
pnpm build:all
```

如果构建失败，停止流程并报告错误。

### 第六步：获取新版本号并提交

```bash
NEW_VERSION=$(cat package.json | grep '"version"' | head -1 | sed 's/.*"version": "\(.*\)".*/\1/')

git add .
git commit -m "chore: bump version to $NEW_VERSION"
git push
```

### 第七步：发布到 npm

确认已登录 npm：
```bash
npm whoami
```

按依赖顺序发布：
```bash
pnpm publish:core
pnpm publish:event
pnpm publish:net
pnpm publish:ecs
pnpm publish:assets
pnpm publish:quadtree
pnpm publish:behaviortree
pnpm publish:ui
pnpm publish:condition
pnpm publish:ec
pnpm publish:minigame
pnpm publish:hotupdate
```

### 第八步：打 git tag

```bash
git tag v$NEW_VERSION
git push --tags
```

### 完成

汇报发版结果：版本号、发布的模块列表、tag。
