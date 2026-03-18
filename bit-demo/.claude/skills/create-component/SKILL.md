---
name: create-component
description: 创建符合项目规范的 ECS 组件
user-invocable: true
argument-hint: [组件名] [描述] [分类目录]
allowed-tools: Read(*), Write(*), Glob(*), Grep(*)
---

# 创建 ECS 组件

生成符合项目规范的 ECS 组件类。

## 参数解析
- `$ARGUMENTS[0]` = 组件名（PascalCase，如 Velocity）
- `$ARGUMENTS[1]` = 组件描述（如 "速度组件"）
- `$ARGUMENTS[2]` = 分类目录（如 basics、configure、mark、singleton，默认 "basics"）

## 执行步骤

### 1. 参考现有代码风格
读取以下文件了解项目代码风格：
- `assets/script/header.ts` — import 风格
- `assets/script/ecs/component/` 下 1-2 个现有组件文件

### 2. 确认组件类型
根据描述和分类判断组件类型：
- **数据组件**（basics）：包含 @ecsprop 属性，reset() 恢复默认值
- **配置组件**（configure）：包含 @ecsprop 属性，通常由编辑器配置
- **标记组件**（mark）：无属性，仅用于标记实体类型
- **单例组件**（singleton）：全局唯一，不使用 @ecsprop

### 3. 生成组件代码

**数据组件模板：**
```typescript
import { ecs } from "相对路径/header";
const { ecsclass, ecsprop } = ecs._ecsdecorator;

@ecsclass("组件名", { describe: "描述" })
export class 组件名 extends ecs.Component {
    @ecsprop({ type: "int", defaultValue: 0 })
    public 属性名: number = 0;

    public reset(): void {
        this.属性名 = 0;
    }
}
```

**标记组件模板：**
```typescript
import { ecs } from "相对路径/header";
const { ecsclass } = ecs._ecsdecorator;

@ecsclass("Tag组件名", { describe: "描述" })
export class Tag组件名 extends ecs.Component {
    public reset(): void {
    }
}
```

### 4. 保存文件
保存到 `assets/script/ecs/component/{分类目录}/{组件名}.ts`

### 5. 询问属性
如果是数据组件，询问用户需要哪些属性及其类型：
- `@ecsprop` 支持的 type：`"int"` / `"float"` / `"string"` / `"boolean"` / `"size"` / `"vec2"` / `"vec3"` / `"color"`
