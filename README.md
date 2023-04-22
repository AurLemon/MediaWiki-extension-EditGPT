# MediaWiki-extension-EditGPT
在 MediaWiki 的编辑页面中调用 ChatGPT。

## 前言
### 原理
随便写写的扩展，本人没系统学习过前后端，这个扩展是边学边写出来。原理很简单，扩展在编辑页面和预览页面加入 HTML 代码和 CSS 元素以生成 ChatGPT 对话框。再使用 JavaScript 代码向后端发送问题，处理完信息后返回并输出。

### 须知
* 对话框界面基于皮肤 Citizen 开发，可能有些 CSS 变量在其他皮肤上无法正常运行。
* 目前只能在源代码编辑下出现，在可视化编辑（VisualEditor）下不可用。
* 编辑页面的 GPT 不能上下文对话。

## 要求
| MediaWiki | >= 1.35 |
| :- | :- |
|  PHP | >= 7<br>扩展需要使用 cURL 函数，确保 libcurl 包已安装。|

## 功能
* 通过后端发送请求。
* 权限节点为`useeditgpt`。默认仅`sysop`权限组可用。
* 查询历史询问记录，页面刷新后消失。
* 可在特殊页面 Special:ChatGPT 实现上下文对话，权限节点为`specialchatgpt`。
* 可设置固定话术。

## 安装
1. 在`/extensions`目录下输入`git clone https://github.com/AurLemon/MediaWiki-extension-EditGPT.git`。
2. 将解压后的文件夹重命名为`EditGPT`。
3. 在`LocalSettings.php`文件中添加`wfLoadExtension( 'EditGPT' );`加载扩展

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
