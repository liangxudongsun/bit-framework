---
paths:
  - "assets/script/**/*.ts"
---

# bit-assets 资源加载模块

## AssetLoader 资源加载器
```typescript
const loader = new AssetLoader(batchName?)

loader.start([
    { bundle: "resources", path: "textures/hero", type: "SpriteFrame" },
    { bundle: "resources", path: "prefabs/bullet" }
])
```

### 生命周期方法（子类重写）
| 方法 | 说明 |
|------|------|
| `onStart()` | 加载开始 |
| `onProgress(current, total)` | 加载进度回调 |
| `onComplete(assets)` | 加载完成 |
| `onError(errorCode, message)` | 加载失败 |

### IAssetConfig 接口
```typescript
interface IAssetConfig {
    bundle?: string;    // bundle 名，默认 "resources"
    path: string;       // bundle 中的资源路径
    type?: string;      // 资源类型过滤
}
```

## AssetPool 资源缓存池
| 方法 | 说明 |
|------|------|
| `AssetPool.add(assets, bundle?, batchName?)` | 添加资源到池 |
| `AssetPool.get<T>(path, bundleName?)` | 获取资源 |
| `AssetPool.has(path, bundleName?)` | 检查资源是否存在 |
| `AssetPool.remove(path, bundleName?)` | 移除单个资源 |
| `AssetPool.removeBatch(batchName)` | 按批次移除 |
| `AssetPool.clear()` | 清空所有 |

## 使用约束
- 加载完成后资源自动存入 AssetPool
- 通过 `ASSETS.AssetLoader` / `ASSETS.AssetPool` 访问
- 场景切换时注意释放不再需要的资源批次
