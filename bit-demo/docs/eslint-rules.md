# ESLint 代码规范

## 规则说明

所有规则均为 **警告（warn）级别**，不会阻断构建。

### 代码质量

| 规则 | 说明 | 可自动修复 |
|------|------|-----------|
| `no-explicit-any` | 禁止使用 `any` 类型 | 否 |
| `eqeqeq` | 禁止 `==`，必须使用 `===` | ✓ |
| `ban-ts-comment` | 禁止 `@ts-ignore` / `@ts-expect-error` | 否 |
| `explicit-function-return-type` | 函数必须声明返回类型（简单回调可省略） | 否 |
| `explicit-member-accessibility` | 类成员必须显式声明访问修饰符（构造函数除外） | ✓ |
| `no-unused-vars` | 未使用的变量/参数（允许 `_` 前缀跳过检查） | 否 |

### 命名规范

| 选择器 | 规则 | 示例 |
|--------|------|------|
| 类 | PascalCase | `PlayerManager` |
| 接口 | `I` + PascalCase | `IWindow` |
| 类型别名 | `T` + PascalCase | `TCallback` |
| 枚举 | PascalCase | `GameState` |
| 枚举成员 | UPPER_CASE | `RUNNING` |
| 泛型参数 | `T` + PascalCase | `TKey` |
| 私有属性 | 必须加 `_` 前缀 | `private _count` |
| 私有方法 | 禁止 `_` 前缀 | `private doUpdate()` |
| 布尔变量 | 必须以语义前缀开头 | `isLoaded`、`hasData` |

布尔前缀：`is` / `has` / `should` / `can` / `will` / `need` / `allow` / `enable` / `disable` / `show` / `hide`

### 类成员排序

```
static public 属性 → static protected 属性 → static private 属性
→ public 属性 → protected 属性 → private 属性
→ constructor
→ 方法（public / protected / private 顺序不限）
```

### import 排序（可自动修复）

分组顺序：内置模块 → 第三方 → 内部模块 → 相对路径，组间空行，同组按字母排序。

### 格式化（保存时自动修复）

| 规则 | 配置 |
|------|------|
| 缩进 | 4 空格 |
| 引号 | 双引号 |
| 分号 | 强制 |
| 尾随逗号 | 禁止 |
| 行尾空格 | 禁止 |
| 文件末尾换行 | 强制 |
| 运算符间距 | 强制空格 |
| 对象花括号间距 | `{ key: value }` |
