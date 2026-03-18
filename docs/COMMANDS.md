# Bit Framework 命令速查

## 安装依赖

```bash
pnpm install
```

## 构建

```bash
pnpm build:all       # 按依赖顺序构建所有模块（推荐）
pnpm build           # 并行构建（不含 demo）
pnpm clean           # 清理所有 dist/

# 单模块构建
pnpm build:core | build:ui | build:ecs | build:ec | build:event
pnpm build:net | build:assets | build:quadtree | build:behaviortree
pnpm build:condition | build:minigame | build:hotupdate
```

## 开发监听

```bash
pnpm dev:core        # 监听 bit-core 变化自动构建
pnpm dev:ui          # 监听 bit-ui 变化自动构建

# 其他模块
pnpm --filter @gongxh/bit-ecs build --watch
```

## 版本管理

```bash
pnpm version:patch   # 所有模块 0.0.x → 0.0.x+1
pnpm version:minor   # 所有模块 0.x.0 → 0.x+1.0
pnpm version:major   # 所有模块 x.0.0 → x+1.0.0
```

版本类型选择：
- `patch` — bug 修复
- `minor` — 新功能（向后兼容）
- `major` — 破坏性变更

## 发布

```bash
# 前置：npm login（确认 npm whoami）

pnpm publish:all     # 发布所有模块

# 单模块发布（按依赖顺序）
pnpm publish:core    # 先发布核心
pnpm publish:event && pnpm publish:net   # 独立模块
pnpm publish:ui && pnpm publish:condition && pnpm publish:ec
pnpm publish:hotupdate && pnpm publish:minigame
pnpm publish:ecs && pnpm publish:assets && pnpm publish:quadtree && pnpm publish:behaviortree
```

## 完整发版流程

```bash
git pull origin main          # 1. 拉取最新
pnpm version:patch            # 2. 升版本号
pnpm build:all                # 3. 构建
git add . && git commit -m "chore: bump version to x.x.x" && git push  # 4. 提交
pnpm publish:all              # 5. 发布
git tag vx.x.x && git push --tags  # 6. 打标签
```

## Workspace 工具命令

```bash
pnpm list -r --depth 0       # 查看所有包
pnpm update -r               # 更新所有依赖
pnpm outdated                # 检查过时依赖
pnpm --filter "@gongxh/*" build  # 过滤执行
```

## 发布检查清单

- [ ] 代码已提交，git status 干净
- [ ] 版本号已更新
- [ ] `pnpm build:all` 无报错
- [ ] `npm whoami` 确认已登录 npm
