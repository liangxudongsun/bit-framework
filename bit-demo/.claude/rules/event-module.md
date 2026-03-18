---
paths:
  - "assets/script/**/*.ts"
---

# bit-event 事件通信

## 核心规则
- 跨模块通信必须使用 GlobalEvent，禁止直接引用其他模块的类
- 事件名使用字符串常量，建议集中定义在常量文件中

## API
| 方法 | 说明 |
|------|------|
| `GlobalEvent.add(name, callback, target)` | 添加事件监听，返回 eventId |
| `GlobalEvent.addOnce(name, callback, target)` | 添加一次性监听 |
| `GlobalEvent.send(name, ...args)` | 发送事件 |
| `GlobalEvent.sendToTarget(name, target, ...args)` | 发送给指定目标 |
| `GlobalEvent.remove(eventId)` | 按 ID 移除 |
| `GlobalEvent.removeByTarget(target)` | 按目标移除所有监听 |
| `GlobalEvent.removeByName(name)` | 按事件名移除 |
| `GlobalEvent.removeByNameAndTarget(name, target)` | 按名称+目标移除 |

## 使用约束
- 窗口/组件销毁时必须调用 `GlobalEvent.removeByTarget(this)` 清理监听
- callback 中 this 指向由第三个参数 target 决定，不要用箭头函数替代
- 事件参数需明确类型，禁止传 `any`
