# Snow App 手机远控 0.2.40 发布说明

## 本次版本

- 修复手机端操作菜单被面板裁切、无法完整滚动和点击的问题，并补齐关闭、返回与焦点恢复行为。
- 统一发送、停止、禁用、加号、关闭和空状态 Snow 标记的主题语义色。
- 修复 Windows 生产包中 `frpc` 的平台目录解析。
- 原生模块加载器固定优先使用当前平台的规范文件，避免误载时间戳残留构建。
- 收紧 electron-builder 文件白名单，排除 `native/target` Rust 编译缓存；安装包和便携版由约 642 MB 降至约 186 MB。
- 新增并加强手机页面、部署资源、原生加载器和打包白名单回归测试。
- 版本提升至 `0.2.40`。

## 来源、署名与许可

本项目基于 [MayDay-wpf/snow-app](https://github.com/MayDay-wpf/snow-app) 继续开发，并保留原项目 MIT 许可。

手机远控体验参考并复现了 **GPT Mini by [CoimgRain](https://github.com/CoimgRain)**：[https://github.com/CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。

> GPT Mini 仅允许个人、学习、研究、评估等非商业用途使用。允许 fork、修改和继续公开发布，但必须保留对原项目和作者的清晰署名：**GPT Mini by [CoimgRain](https://github.com/CoimgRain)**，并附上原项目链接：[https://github.com/CoimgRain/Codex-Mini](https://github.com/CoimgRain/Codex-Mini)。未经作者事先书面授权，不得用于商业服务、付费托管、SaaS、中转服务、代部署收费、转售访问权或其他商业化用途。

完整条款见 `LICENSE`、`LICENSE-CODEX-MINI` 和 `THIRD_PARTY_NOTICES.md`。

## 发布产物

Git 仓库只提交源码；以下二进制作为 GitHub Release `v0.2.40` 附件上传：

| 文件 | 字节数 | SHA-256 |
| --- | ---: | --- |
| `Snow App Setup 0.2.40.exe` | 185,887,519 | `36EA1A74F6F271577EA1783DD646CE0FE5AAF4C888D017A43FCEF85BF9B0D2B2` |
| `Snow App 0.2.40.exe` | 185,655,441 | `4F477B5427AF811D046079F9317DC936F3334537441DAEFA8CC90AC1BCCBCC5A` |

两个 Windows 可执行文件当前均未进行 Authenticode 商业代码签名。下载者应从 GitHub Release 获取，并用上述 SHA-256 校验完整性。

## 验证证据

- `npm.cmd run check:ts`：退出码 0。
- `npm.cmd run check:mobile`：退出码 0。
- `npm.cmd run test:remote-control`：35/35 通过，退出码 0。
- `npm.cmd run build:win`：退出码 0，成功生成 NSIS、Portable 和 `win-unpacked`。
- 精简后的 `win-unpacked` 隔离生产 smoke：退出码 0；401 鉴权、附件、幂等发送、图片按需读取、Skills/MCP/权限/角色/审查/变更摘要、操作菜单、主题、焦点、命令面板和移动行为全部通过。
- 视口：320×568、390×844、844×390、1100×760 均无横向溢出，11 个操作菜单项全部可命中，横屏菜单可滚动。
- Portable 7-Zip 完整性测试：`Everything is Ok`；SFX 尾部数据提示为自解压封装的预期警告。
- `app.asar` 共 28,036 个条目，`native/target` 条目为 0；必需原生模块及固定 SHA-256 的 `frpc 0.71.0` 均存在。
- 发布内容未包含 `.snow`、隔离 user-data、数据库、私钥、证书或 loose 敏感命名文件；源码发布前另做 Git 暂存区审计。

## 已知环境限制

- 本轮未持有商业代码签名证书，因此 Windows 产物状态为 `NotSigned`。
- 受 Windows Defender 隔离测试端 `frps.exe` 影响，本轮无法重新跑完整公网 FRP 链；打包的客户端 `frpc.exe` 已按 manifest 的 SHA-256 校验，用户此前已完成功能验收。
