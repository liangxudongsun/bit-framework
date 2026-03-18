---
paths:
  - "assets/script/**/*.ts"
---

# bit-behaviortree 行为树模块

## 核心类
- `BehaviorTree<T>` — 行为树，T 为实体类型
- `Blackboard` — 黑板数据存储（支持作用域链）
- `globalBlackboard` — 全局黑板实例

## 创建行为树
```typescript
// 从配置创建（编辑器导出）
const tree = createBehaviorTree<Entity>(config, entity)

// 手动创建
const tree = new BehaviorTree<Entity>(entity, rootNode)
```

## 执行
```typescript
const status = tree.tick(dt)  // 返回 Status.SUCCESS / FAILURE / RUNNING
tree.reset()                   // 重置树状态
```

## 自定义节点装饰器
| 装饰器 | 节点类型 | 子节点数 |
|--------|---------|---------|
| `@BT.ClassAction(name, info?)` | 行为节点 | 0 |
| `@BT.ClassCondition(name, info?)` | 条件节点 | 0 |
| `@BT.ClassComposite(name, info?)` | 组合节点 | 多个 |
| `@BT.ClassDecorator(name, info?)` | 装饰节点 | 1 |

## 节点属性装饰器
```typescript
@BT.prop({ type: BT.ParamType.int, description: "攻击距离", defaultValue: 100 })
public attackRange: number = 100;
```

## 黑板数据操作
| 方法 | 作用域 |
|------|--------|
| `this.set(key, value)` | 当前节点黑板 |
| `this.get(key)` | 沿作用域链向上查找 |
| `this.setRoot(key, value)` | 树根黑板 |
| `this.setGlobal(key, value)` | 全局黑板 |
| `this.getEntity<T>()` | 获取绑定的实体 |

## 内置节点
- `Selector` — 选择节点（OR 逻辑）
- `Sequence` — 顺序节点（AND 逻辑）
- `Inverter` — 结果反转装饰器
- `LimitTime` — 时间限制装饰器
- `WaitTicks` / `WaitTime` — 等待节点
