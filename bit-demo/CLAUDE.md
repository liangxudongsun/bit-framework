# 项目规范

## 引擎版本
- Cocos Creator 3.8.8，严格使用该版本 API
- 禁止使用废弃 API：cc.loader、cc.Class、cc.director.getScheduler 旧写法、Action 动作系统

## 框架模块
| 需求 | 使用模块 |
|------|---------|
| UI 窗口 | bit-ui → Window 基类 + @uiclass 装饰器 |
| 事件通信 | bit-event → GlobalEvent |
| 游戏逻辑 | bit-ecs（高性能）或 bit-ec（Cocos 集成）|
| 资源加载 | bit-assets → AssetLoader / AssetPool |
| 网络请求 | bit-net → HttpManager / Socket |
| 定时器 | bit-core → GlobalTimer |
| 平台检测 | bit-core → Platform |
| 热更新 | bit-hotupdate → HotUpdateManager |
| 行为树AI | bit-behaviortree → BehaviorTree |
| 碰撞检测 | bit-quadtree → QuadTree |

## 代码规范
- 禁止跨模块直接调用，事件通信必须通过 GlobalEvent
- 禁止 `any` 类型，必须定义明确类型
- UI 窗口必须继承 Window 基类，使用 @uiclass 装饰器注册
- 新建任何类型组件前，先参考 bit-templates/ 下的对应模板

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

## 查询 API
已配置 MCP 知识库，遇到不确定的 API 用以下方式查询：
- 查模块：get_module("bit-ui")
- 查类：get_class("Window")
- 搜索：search_api("延迟执行")
