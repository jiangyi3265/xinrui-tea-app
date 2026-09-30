# H5 打包与部署

## 为什么之前空白

项目根目录保留着 uni-app 的初始模板，但恢复后的 81 个页面采用另一个重建脚本。原来 HBuilderX 发行没有调用该脚本，产物只有模板，实际应用也依赖本地 Node API。

现在 `vite.config.js` 已接入 H5 发行适配，生成完整页面、静态资源和浏览器模拟接口。资源地址自动适配部署目录。

## HBuilderX 发行

1. 在项目目录执行一次 `npm install`，命令行需要 Node.js 22+。
2. HBuilderX 选中“分销茶叶”项目，点击 **发行 → 网站（Web/H5）**。
3. 等待出现“导出 Web 成功”。输出目录是 `unpackage/dist/build/web/`。
4. 同时生成 `unpackage/dist/build/web.zip`。推荐上传这个完整压缩包，解压到网站根目录；解压后 `index.html` 和 `h5/` 在同一层级。也可以完整上传 `web/` 的内容，不能漏掉 `h5/`。
5. 通过 HTTP/HTTPS 地址访问网站。不要用 `file://` 双击 HTML。

本机检查实际发行产物：

```bash
npm run preview:uni
```

访问 http://localhost:5176/ 。此预览服务器只返回文件，没有业务 API。

## 命令行生成 dist

```bash
npm install
npm run build:h5
npm run preview
```

产物为 `dist/` 和完整部署包 `dist.zip`，预览地址 http://localhost:5175/ 。同样上传目录内容即可。

根入口 `index.html`、兼容入口 `h5/h5.html` 和 `h5/index.html` 均可使用。部署至 `/tea/` 这类子目录时，保留完整目录结构，访问 `/tea/`。hash 路由无需服务器重写规则。服务器须返回正确的 JavaScript/CSS MIME 类型；更新部署后刷新页面。

## 演示账号和数据

- 账号：13800138000；登录密码：tea-demo-2026。
- 交易密码：246810；演示短信验证码：123456。
- 登录、下单、模拟支付、凭证和订单状态保存在浏览器 localStorage。刷新后保留；清除网站数据后重置。不同浏览器、域名及部署目录的数据独立。
- 图片支持 PNG、JPEG、GIF、WebP，单张最大 2MB；浏览器存储有容量限制，建议使用小图。
- 支付、短信、充值、签约和绑卡均是演示，不产生真实业务。

需要原来的本地文件数据时，使用 `npm run dev`，访问 http://localhost:5173/h5/h5.html#/ 。Node 模式会关闭浏览器模拟层，继续使用 `.local/data.json` 和 `.local/uploads`。

## 支持边界

此次修复的是 **发行 H5/Web**。HBuilderX 的“运行到浏览器”仍对应根目录原始模板；调试恢复页面使用上面的 npm 预览方式。本工程基于原 Vue 2 H5 发布模块恢复，没有转换成原始 `.vue` 页面，不支持直接将这些恢复页面发行为 App/小程序。修改 `src/pages/` 后重新发行或运行 `npm run build:h5`。

## 资源完整性检查

HBuilderX 发行和 npm 打包都会校验三个入口引用的脚本与样式是否存在，缺失时直接构建失败。部署 ZIP 只收录恢复后的应用，包含入口和完整 `h5/`，不包含 uni-app 起始模板的 `assets/`。

如果只上传入口和模板的 `assets/`、`static/logo.png`，浏览器请求 `/h5/static/…` 会全部 404。这正是 2026-09-20 在 hahacaye.oksja.cn 上查到的白屏原因。更新后的入口会显示缺失资源地址，方便定位上传遗漏。
