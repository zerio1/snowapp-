# Snow App 手机远控版 0.2.41 发布说明

## 这是什么

在电脑上运行 Snow App，然后直接用手机浏览器远程控制同一个真实 AI 会话。手机无需安装 App：局域网扫码即可连接，也可以通过自有服务器和 HTTPS 域名从公网访问。

手机端支持查看和继续会话、发送文字/图片/文件、切换模型和推理强度、停止生成，以及使用会话、项目、Skills、MCP、权限、角色、审查和变更摘要等面板。远控使用高熵令牌鉴权，不会创建一套与电脑割裂的聊天数据。

## 0.2.41 修复

- 修复从旧版全用户安装升级时，安装器可能提示 Snow App 无法关闭或 `Failed to uninstall old application files ... : 2` 的问题。
- 安装包统一为 Windows 全用户安装，匹配既有安装记录与卸载器权限。
- 安装器升级前会通过专用参数请求正在运行的 Snow App 正常退出；程序会跳过普通关窗确认并执行已有清理流程。
- 保留 electron-builder 的进程检查和旧版卸载回退路径。
- 仓库首页和发布文案改为以“手机远控真实会话”为核心。
- 版本提升至 `0.2.41`。

## 使用入口

1. 在 Windows 电脑安装并打开 Snow App。
2. 打开设置中的“手机远控”。
3. 同一局域网内用手机扫描二维码，或复制地址到手机浏览器。
4. 公网访问请使用自己的服务器、域名和 HTTPS；详细步骤见 `README_zh.md`。

## 来源、署名与许可

本项目基于 [MayDay-wpf/snow-app](https://github.com/MayDay-wpf/snow-app) 继续开发，并保留原项目 MIT 许可。

手机远控体验参考并复现了 **GPT Mini by [CoimgRain](https://github.com/CoimgRain)**：[https://github.com/CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。

> GPT Mini 仅允许个人、学习、研究、评估等非商业用途使用。允许 fork、修改和继续公开发布，但必须保留对原项目和作者的清晰署名：**GPT Mini by [CoimgRain](https://github.com/CoimgRain)**，并附上原项目链接：[https://github.com/CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。未经作者事先书面授权，不得用于商业服务、付费托管、SaaS、中转服务、代部署收费、转售访问权或其他商业化用途。

完整条款见 `LICENSE`、`LICENSE-CODEX-MINI` 和 `THIRD_PARTY_NOTICES.md`。

## Windows 下载

Git 仓库只提交源码；以下文件作为 GitHub Release `v0.2.41` 附件提供：

| 文件 | 字节数 | SHA-256 |
| --- | ---: | --- |
| `Snow App Setup 0.2.41.exe` | 185,871,262 | `ec48eaa68907164415ed5f6a4cd52f0f29528872720cc3d2932f446f9b89505a` |
| `Snow App 0.2.41.exe` | 185,654,692 | `ea2c517fa4732d5a0a0befae68e2f50d163ab3bd8536f3c425fe9af88c268f36` |

`Setup` 是安装版，另一个是便携版。两个文件当前均未进行 Authenticode 商业代码签名，请只从本仓库 Release 下载并核对 SHA-256。

## 验证证据

- 安装器升级回归测试：2/2 通过。
- TypeScript 检查、移动资源检查和文档检查全部通过。
- 手机远控测试：35/35 通过。
- Windows 完整构建成功；NSIS 明确以 `perMachine=true` 生成安装包。
- `win-unpacked` 隔离生产 smoke 通过：鉴权、附件、幂等发送、手机布局、菜单、主题、焦点及管理面板均正常。
- 安装器专用退出握手在真实打包程序上通过，主程序退出并释放远控端口。
- 视口：320×568、390×844、844×390、1100×760 均无横向溢出，11 个操作菜单项全部可命中，横屏菜单可滚动。
- Portable 的 NSIS/7-Zip 完整性测试为 `Everything is Ok`。
- 原生模块与 `frpc.exe` 均存在并已校验；发布内容不含 `.snow`、数据库、私钥或证书。

## 已知环境限制

- 当前 Windows 文件未做商业代码签名，首次运行可能出现 SmartScreen 提示。
- 为避免触碰本机真实安装和用户数据，自动验证使用独立临时配置；现有 `D:\snowapp\Snow App` 的原地升级需要下载者用 0.2.41 安装包完成最终确认。
