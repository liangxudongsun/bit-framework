---
paths:
  - "assets/script/**/*.ts"
---

# bit-net 网络模块

## HttpManager HTTP 请求
```typescript
// POST 请求
HttpManager.post(url, data, responseType?, netEvent?, headers?, timeout?)

// GET 请求
HttpManager.get(url, data, responseType?, netEvent?, headers?, timeout?)
```

- `responseType`：`"text"` | `"json"` | `"arraybuffer"`
- `headers`：扁平数组格式 `[key1, value1, key2, value2, ...]`
- `timeout`：超时时间（秒）
- 通过回调接口 `IHttpEvent` 处理结果

### IHttpEvent 接口
```typescript
interface IHttpEvent {
    name?: string;
    data?: unknown;
    onComplete(response: IHttpResponse): void;
    onError(response: IHttpResponse): void;
}
```

### IHttpResponse 接口
```typescript
interface IHttpResponse {
    readonly message: string;
    readonly data: string | ArrayBuffer | object;
    readonly statusCode: number;
    readonly headers: Record<string, string>;
}
```

## Socket WebSocket
```typescript
const socket = new Socket(url, options?)

// 发送
socket.send(data: string)
socket.sendBuffer(data: ArrayBuffer)

// 关闭
socket.close(code?, reason?)

// 事件回调（赋值方式）
socket.onopen = () => {}
socket.onmessage = (data) => {}
socket.onerror = () => {}
socket.onclose = (code, reason) => {}
```

- `options.binaryType`：`"blob"` | `"arraybuffer"`
- `options.timeout`：连接超时（默认 3000ms）
