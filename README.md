# Snow App 手机远控版

> 在电脑上运行 Snow App，用手机浏览器安全地查看并操控同一个 AI 会话。无需安装手机 App；局域网扫码即用，也支持通过自己的服务器和域名建立 HTTPS 公网入口。

[下载最新版](https://github.com/zerio1/snowapp-/releases/latest) · [中文完整说明](./README_zh.md) · [手机公网远控指南](./docs/zh-CN/2-使用指南/23-手机公网远控.md)

## 这是什么

Snow App 手机远控把桌面 Snow 已有的会话能力安全地延伸到手机浏览器：

```text
手机浏览器
  → 配对链接 / 一次性凭据
Snow App 内置 HTTP 服务
  → Renderer 安全桥
电脑上的真实 Snow 会话
```

它不是另一个聊天机器人，也不是把数据库复制到云端。电脑仍负责模型请求、工具执行、项目文件、终端和凭据存储；手机只通过受限接口控制当前 Snow。

## 手机端可以做什么

- 查看当前工作区、会话、消息、思考过程和工具执行状态
- 新建、切换、重命名、置顶和归档会话
- 发送消息、停止生成、上传图片和普通文件
- 切换模型、Profile、推理强度、Fast Mode
- 切换 Plan、Goal、Worktree、Workflow 和 YOLO 等已有模式
- 处理真实的工具授权与 `askUserQuestion`
- 查看 Skills、MCP、权限、角色、代码变更和审查摘要
- 使用适配手机、横屏、软键盘及日间/夜间主题的界面

桌面专属或高风险操作仍遵守 Snow 原有确认规则；手机端不会伪造成功或绕过敏感命令确认。

## 两种连接方式

### 同一 Wi-Fi：扫码即用

1. 在电脑上启动 Snow App。
2. 打开设置中的“手机远控”。
3. 保持手机与电脑处于同一可信局域网。
4. 扫描页面二维码，或把局域网地址复制到手机浏览器。

这种方式不需要公网服务器、域名、CDN 或额外证书。

### 外网访问：自建 FRP + HTTPS

设置页提供“四步公网部署”流程。你需要：

- 一台具有独立公网 IPv4 的 Linux 服务器；
- 一个自己的域名；
- 服务器的 SSH 登录凭据。

Snow 会部署并校验 FRP/Caddy 配置，电脑端只把专用本机监听端口交给内置 `frpc`。配置只有验证成功后才会通过系统安全存储加密保存。

项目不提供公共中转服务，也不会代收你的 Snow 凭据。

## 安全边界

- 至少 24 字节高熵凭据与一次性配对流程
- Header、查询参数和 HttpOnly Cookie 鉴权
- 查询参数建立 Cookie 后自动从地址栏移除
- 请求体大小、Content-Type、会话和 pending ID 校验
- 无宽泛 CORS，不开放 Electron/CDP 调试端口
- 工具参数、结果、日志和角色摘要做长度限制与凭据脱敏
- 手机接口不直接读取 SQLite，不返回 API Key、Cookie、SSH 密码或完整环境变量
- 可随时“轮换凭据”，立即撤销已配对手机和待发送附件

公网使用时请只使用自己控制的服务器和 HTTPS 域名。

## Windows 安装

当前发布提供 Windows x64：

- `Snow.App.Setup.<version>.exe`：安装版
- `Snow.App.<version>.exe`：免安装便携版

从 [GitHub Releases](https://github.com/zerio1/snowapp-/releases) 下载。安装版会以管理员权限升级现有的全用户 Snow 安装，并先请求旧进程完成清理退出。

当前构建没有商业 Authenticode 证书。Windows 出现信誉提示时，请确认下载来源为本仓库，并对照 Release 中公布的 SHA-256。

如果历史版本仍阻止升级，可先在系统托盘右键 Snow App →“退出”，再重新运行安装器；不要直接删除安装目录或用户数据。

## 从源码运行

环境要求：

- Node.js 18 或更高版本
- Rust stable 与 Cargo
- Windows 构建需要 Visual Studio Build Tools 的 C++ 工作负载

```powershell
npm install
npm run dev
```

检查与 Windows 打包：

```powershell
npm run check
npm run check:docs
npm run check:mobile
npm run test:remote-control
npm run build:win
```

打包结果位于 `dist/`。构建白名单不会包含 `native/target`、本机 `.snow` 状态或用户数据库。

## 项目来源与使用限制

本仓库基于 [MayDay-wpf/snow-app](https://github.com/MayDay-wpf/snow-app) 继续开发，保留 Snow App 上游的 MIT 许可。手机远控产品体验参考并复现了 **GPT Mini by [CoimgRain](https://github.com/CoimgRain)**：[CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。本项目为独立衍生项目，不代表上游官方合作或背书。

> **重要非商业声明：** GPT Mini 仅允许个人、学习、研究、评估等非商业用途使用。允许 fork、修改和继续公开发布，但必须保留对原项目和作者的清晰署名：**GPT Mini by [CoimgRain](https://github.com/CoimgRain)**，并附上原项目链接：[https://github.com/CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。未经作者事先书面授权，不得用于商业服务、付费托管、SaaS、中转服务、代部署收费、转售访问权或其他商业化用途。

完整条款见 [LICENSE](./LICENSE)、[LICENSE-CODEX-MINI](./LICENSE-CODEX-MINI) 和 [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md)。
