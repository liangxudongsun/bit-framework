# MCP 向量知识库

基于框架和 Cocos Creator 3.8.8 的 `.d.ts` 类型定义构建的语义搜索知识库，为 Claude Code 提供 API 查询能力。

## 目录结构

```
.claude/mcp/
├── src/
│   ├── server.js          # MCP 服务入口
│   ├── searcher.js        # 向量搜索引擎
│   └── build-index.js     # 索引构建脚本
├── dts/                   # 类型定义源文件（索引的输入）
│   ├── framework/         # 框架 .d.ts（从 node_modules/@gongxh/ 复制）
│   └── cocos/             # Cocos cc.d.ts（从引擎安装目录复制）
├── index/                 # 构建产物（结构化索引 + 向量）
│   ├── framework.json
│   ├── framework-vectors.json
│   ├── cocos.json
│   └── cocos-vectors.json
├── models/                # 向量模型缓存（自动下载，已 gitignore）
├── package.json
└── .gitignore
```

## 重新训练数据

当框架版本更新或需要刷新索引时，按以下步骤操作：

### 1. 更新 .d.ts 文件

**框架类型定义**（从 node_modules 复制最新版本）：

```bash
cd /path/to/bit-demo

# 复制所有 @gongxh 包的类型定义
for pkg in bit-assets bit-core bit-ecs bit-event bit-net bit-behaviortree bit-hotupdate bit-minigame bit-condition bit-quadtree bit-ui; do
  src="node_modules/@gongxh/$pkg/dist/$pkg.d.ts"
  if [ -f "$src" ]; then
    cp "$src" .claude/mcp/dts/framework/
  fi
done

# 复制 fairygui 类型定义
cp node_modules/fairygui-cc/dist/fairygui.d.ts .claude/mcp/dts/framework/
```

**Cocos Creator 类型定义**（从引擎安装目录复制）：

```bash
# macOS 默认路径，版本号按实际调整
cp "/Applications/Cocos/Creator/3.8.8/CocosCreator.app/Contents/Resources/resources/3d/engine/bin/.declarations/cc.d.ts" .claude/mcp/dts/cocos/
```

> 注意：`temp/declarations/cc.d.ts` 只是引用文件，不包含实际类型定义。必须从引擎安装目录复制。

### 2. 重建索引

```bash
cd .claude/mcp

# 安装依赖（首次或依赖更新后）
npm install

# 构建索引（国内使用镜像加速模型下载）
HF_ENDPOINT=https://hf-mirror.com npm run sync
```

首次运行会下载向量模型（~120MB），缓存在 `models/` 目录，后续运行直接使用缓存。

### 3. 构建产物

构建完成后会生成 4 个文件：

| 文件 | 说明 |
|------|------|
| `index/framework.json` | 框架类/接口结构化索引 |
| `index/framework-vectors.json` | 框架语义向量（384维） |
| `index/cocos.json` | Cocos API 结构化索引 |
| `index/cocos-vectors.json` | Cocos 语义向量（384维） |

## 使用方式

MCP 通过 `.mcp.json` 配置自动接入 Claude Code，提供 4 个查询工具：

| 工具 | 用途 | 示例 |
|------|------|------|
| `search_api(query, source?)` | 语义搜索 | `search_api("延迟执行")` |
| `get_module(moduleName)` | 查看模块所有类 | `get_module("bit-ui")` |
| `get_class(className)` | 查看类完整定义 | `get_class("Window")` |
| `get_method(className, methodName)` | 查看方法签名 | `get_method("Node", "addChild")` |

`source` 参数：`"framework"` / `"cocos"` / `"all"`（默认 all）

## 技术细节

- **向量模型**：`Xenova/paraphrase-multilingual-MiniLM-L12-v2`（384 维，支持 112 种语言）
- **搜索原理**：将查询词和类的描述文本编码为向量，通过余弦相似度匹配
- **中英互搜**：中文"延迟执行"可命中英文 API `scheduleOnce`
- **相似度阈值**：默认 0.3，低于此值的结果被过滤
- **Node.js 版本要求**：>= 22
