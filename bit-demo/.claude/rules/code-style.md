---
paths:
  - "assets/script/**/*.ts"
---

# 代码风格与命名规范

## 命名规范

### 标识符格式
| 类型 | 格式 | 示例 |
|------|------|------|
| 类 | PascalCase | `PlayerManager` |
| 接口 | `I` + PascalCase | `IWindow`、`IPropsConfig` |
| 类型别名 | `T` + PascalCase | `TCallback`、`TEventData` |
| 枚举 | PascalCase | `GameState` |
| 枚举成员 | UPPER_CASE | `GAME_STATE.RUNNING` |
| 泛型参数 | `T` + PascalCase | `TKey`、`TValue` |
| 全局常量 | UPPER_CASE 或 camelCase | `MAX_RETRY`、`defaultConfig` |
| 变量 / 函数 / 方法 | camelCase | `playerCount`、`loadAsset()` |

### 类成员访问修饰符
- 所有成员必须**显式声明** `public` / `protected` / `private`（构造函数除外，不加 `public`）
- 私有属性：必须加 `_` 前缀，如 `private _count: number`
- 私有方法：**不加** `_` 前缀，如 `private doUpdate(): void`
- public / protected 属性：camelCase，`_` 前缀仅用于 `@internal` 标记

### 布尔命名
布尔类型必须以语义前缀开头：`is` / `has` / `should` / `can` / `will` / `need` / `allow` / `enable` / `disable` / `show` / `hide`

```typescript
private _isLoaded: boolean;       // 私有布尔属性
public isVisible: boolean;        // 公有布尔属性
const isReady = false;            // 布尔变量
function canAttack(isAlive: boolean): boolean  // 布尔参数
```

### 类成员排序
```
1. public static 属性
2. protected static 属性
3. private static 属性
4. public 实例属性
5. protected 实例属性
6. private 实例属性
7. public static 方法
8. protected static 方法
9. private static 方法
10. constructor
11. public 实例方法
12. protected 实例方法
13. private 实例方法
```

## 代码质量规则
- 函数体不超过 80 行（不含空行和注释）
- 所有函数必须声明返回类型（简单表达式回调可省略）
- 禁止 `==`，必须使用 `===`
- 类成员之间强制空行（连续单行属性声明之间可例外）
- 未使用的参数/变量以 `_` 开头命名（如 `_event`）
- import 顺序：内置模块 → 第三方 → 内部模块 → 相对路径，组间空行，同组按字母排序
