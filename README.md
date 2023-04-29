# MediaWiki-extension-EditGPT
[![License: GPL v2](https://img.shields.io/badge/License-GPLv2-blue.svg?style=flat-square&logo=GNU)](https://www.gnu.org/licenses/gpl-2.0) [![MediaWiki: >=1.35.0](https://img.shields.io/badge/MediaWiki-%3E%3D1.35.0-%2336c?style=flat-square&logo=Wikipedia)](https://www.mediawiki.org)

![1682183013977](https://user-images.githubusercontent.com/67463076/233797285-cd138313-97e9-48f0-9be9-d7c1c930dd24.png)

在 MediaWiki 的编辑页面中调用 ChatGPT。

## 前言
随便写写的扩展，本人没系统学习过前后端，这个扩展是边学边写出来。原理很简单，扩展在编辑页面和预览页面加入 HTML 代码和 CSS 元素以生成 ChatGPT 对话框。再使用 JavaScript 代码向后端发送问题，处理完信息后返回并输出。

## 要求
| MediaWiki | >= 1.35 |
| :- | :- |
|  PHP | >= 7<br>扩展需要使用 cURL 函数，确保 libcurl 包已安装。可在 phpinfo 内查询 cURL 是否开启。|

此外，请确保主机能够访问外网，包括防火墙配置或主机安全组设置。同时，为了避免地域原因导致您的 OpenAI 账户被封禁，请确保主机地域符合 OpenAI 要求。具体名单请参阅[支持的国家/地区](https://platform.openai.com/docs/supported-countries)。<br>网站主机位于香港地区的用户请不要直接使用，可更换主机为台湾地区、日本、新加坡等受支持的地区，也可使用[代理 API ](https://www.openai-asia.com/)或[云函数](https://cloud.tencent.com/product/scf)远程执行，具体可参阅网上其他教程。

## 特性
* 通过后端发送请求。
* 权限节点为`useeditgpt`。默认仅`sysop`权限组可用。
* 查询历史询问记录。（暂未实现，等待扩展更新）
* 可设置固定话术。（暂未实现，等待扩展更新）
* 对话框界面基于皮肤 Citizen 开发，可能有些 CSS 变量在其他皮肤上无法正常运行。
* 目前只能在源代码编辑下出现，在可视化编辑（VisualEditor）下不可用。
* 编辑页面的 GPT 不能上下文对话。

## 安装
1. 在`/extensions`目录下输入`git clone https://github.com/AurLemon/MediaWiki-extension-EditGPT.git`。
2. 将解压后的文件夹重命名为`EditGPT`。
3. 在`LocalSettings.php`文件中添加`wfLoadExtension( 'EditGPT' );`加载扩展
4. ✔️ 完成。前往 Special:版本 页面中查看是否被正确加载。如果启用了缓存可重启服务器或 PHP。

## 配置
1. 在`LocalSettings.php`文件中添加`$wgEditGPTAPIKey = 'sk-xxxxxxxxxxxxxxxxxxxxx';`配置 API Key。
2. 如果有需要，可以为其它权限组配置使用 GPT 的权限。如允许界面管理员使用扩展`$wgGroupPermissions['interface-admin']['useeditgpt'] = true;`。

## 参数
| 用途 | 参数 | 简介 |
| :- | :- | :- |
| API 链接 | `$wgEditGPTAPIBase` | API 链接。默认为 OpenAI 的地址，如果需要更换为其它代理站点，可更换此信息。<br>如`https://api.openai-azure.com`。 |
| API Key | `$wgEditGPTAPIKey` | 无
| 调用模型 | `$wgEditGPTModel` | 调用的模型。 |
| 最大 Token | `$wgEditGPTMaxTokens` | 最大 Token 数值。 |
| 模型温度 | `$wgEditGPTTemperature` | 模型温度，具体介绍可参见 OpenAI 的介绍。 |
| 模型角色 | `$wgEditGPTRole` | 模型角色。 |
| 安全令牌 | `$wgEditGPTSecurityToken` | 验证令牌，避免恶意请求后端。可自行设置。 |
