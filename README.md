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

此外，请确保主机能够访问外网，包括防火墙配置或主机安全组设置。同时，为了避免地域原因导致您的 OpenAI 账户被封禁，请确保主机地域符合 OpenAI 要求。具体名单请参阅[支持的国家/地区](https://platform.openai.com/docs/supported-countries)。

网站主机位于香港地区的用户请不要直接使用，可更换主机为台湾地区、日本、新加坡等受支持的地区，也可使用[代理 API ](https://www.openai-asia.com/)或[云函数](https://cloud.tencent.com/product/scf)远程执行。云函数操作办法可参阅[教程](https://github.com/riba2534/openai-scf-goproxy)。在执行完成后，将访问链接填入`$wgEditGPTAPIBase`即可。

## 特性
* 通过后端发送请求。
* 权限节点为`useeditgpt`。默认仅`sysop`权限组可用。
* 查询历史询问记录。（暂未实现，等待扩展更新）
* 可设置固定话术。
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
3. 如果需要配置预设话术，可以根据以下例子配置。
```php
$wgEditGPTSpeech = [
	[
		"name" => "润色",
		"describe" => "请用中文帮我润色一下这段文字，让他的条理和逻辑更加顺畅。"
	],
	[
		"name" => "组合",
		"describe" => "请你帮我把这几点总结成一段文字。"
	]
];
```

## 参数
| 用途 | 参数 | 简介 | 值 |
| :- | :- | :- | :- |
| API 链接 | `$wgEditGPTAPIBase` | API 链接。默认为 OpenAI 的地址，若使用云函数远程执行或其它代理站点，需要更换此配置文件。 | 字符串，默认值为`https://api.openai.com` |
| API Key | `$wgEditGPTAPIKey` | API 密钥。 | 字符串，无默认值，必填 |
| 调用模型 | `$wgEditGPTModel` | 调用的模型。此外，因请求尾链为`/v1/chat/completions`，暂不支持`text-embedding-ada-002`等其它请求方式的模型。 | 字符串，默认值为`gpt-3.5-turbo` |
| 最大 Token | `$wgEditGPTMaxTokens` | 客户端接受的最大 Token 数值。 | 字符串，默认值为`2048` |
| 模型温度 | `$wgEditGPTTemperature` | 模型温度，具体介绍可参见 OpenAI 的介绍。 | 字符串，默认值为`0.7` |
| 模型角色 | `$wgEditGPTRole` | 模型角色。 | 字符串，默认值为`assistant` |
| 话术 | `$wgEditGPTSpeech` | 预设话术。设置话术后，用户可以根据此处设定的话术信息发送请求。<br>话术示例：`设定的话术信息`+`提问的信息`。 | 数组，可参照上方示例配置 |
| 安全令牌 | `$wgEditGPTSecurityToken` | 验证令牌，避免恶意请求后端。可自行设置。 | 字符串 |
