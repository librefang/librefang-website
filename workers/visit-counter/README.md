# Visit Counter Worker 部署指南

## 1. 创建 KV Namespace

```bash
# 安装 wrangler (如果没有)
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 KV namespace
wrangler kv:namespace create VISIT_COUNTER
```

## 2. 配置 wrangler.toml

将上一步获取的 KV namespace ID 填入 `wrangler.toml`:

```toml
[[kv_namespaces]]
binding = "VISIT_COUNTER"
id = "你的-namespace-id"
```

## 3. 部署 Worker

```bash
cd workers/visit-counter
wrangler deploy
```

## 4. 在网站中嵌入跟踪脚本

在 HTML 的 `<head>` 中添加:

```html
<script src="https://librefang-counter.你的用户名.workers.dev/script.js" async></script>
```

## 5. 获取访问量 API

- 总访问量: `https://librefang-counter.你的用户名.workers.dev/api`
- 今日访问: `https://librefang-counter.你的用户名.workers.dev/api`

## 6. 示例响应

```json
{
  "total": 12500,
  "today": 328,
  "date": "2026-03-12"
}
```

## 本地测试

```bash
wrangler dev
# 测试: curl http://localhost:8787/api
```
