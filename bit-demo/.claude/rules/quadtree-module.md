---
paths:
  - "assets/script/**/*.ts"
---

# bit-quadtree 四叉树碰撞模块

## QuadTree 四叉树
```typescript
// 创建
const tree = new QuadTree(x, y, width, height, maxDepth?, maximum?)
// maxDepth 默认 4，maximum 默认 20（每节点最大形状数）

// 形状管理
tree.insert(shape)        // 插入形状
tree.remove(shape)        // 移除形状
tree.update()             // 更新树（动态对象位置变化后调用）
tree.clear()              // 清空树

// 碰撞查询
const results = tree.query(shape, binaryMask?, result?)
// binaryMask: -1 不过滤，其他值按位掩码过滤
```

## 形状工厂函数
```typescript
import { QT } from "../header";

// 创建圆形
const circle = QT.createCircle(radius, binaryMask?)

// 创建矩形
const box = QT.createBox(x, y, width, height, binaryMask?)

// 创建多边形
const polygon = QT.createPolygon(points?, binaryMask?)
```

## IShape 通用方法
```typescript
shape.setPosition(x, y)    // 设置位置
shape.setScale(value)       // 设置缩放
shape.setRotation(angle)    // 设置旋转（度）
shape.setMask(mask)         // 设置碰撞掩码
shape.destroy()             // 销毁
shape.reset()               // 重置（对象池）
```

## binaryMask 碰撞过滤
- 使用位运算进行碰撞分类：`1 << EntityType.HERO`
- `query` 时传入掩码只返回匹配的形状
- `-1` 表示不过滤，查询所有形状

## 与 ECS 集成
- 在 ECS 中通过单例组件持有 QuadTree 实例
- Shape 生成系统（ShapeGenerate）负责为实体创建碰撞形状
- 碰撞查询系统（CollideQuerySystem）执行碰撞检测
