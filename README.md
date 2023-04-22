# MediaWiki-extensions-EditGPT
在 MediaWiki 的编辑页面中调用 ChatGPT。

## 前言
随便写写的扩展，本人没系统学习过，这是边学边写出来的233

## 原理
扩展在编辑页面 &action=edit 和预览页面 &action=sumbit 生成 ChatGPT 对话框。再使用 JavaScript 代码向后端发送问题，处理完信息后返回并输出。

## 一些须知
* 界面基于皮肤 Citizen 开发，可能有些 CSS 变量在其他皮肤上无法正常运行。
* 目前只能在源代码编辑下出现，在可视化编辑（VisualEditor）下不可用。
* 编辑页面的 GPT 不能上下文对话。

## 实现功能
* 可以通过信息
* 权限组

## 开发中功能
* 在特殊页面 Special:ChatGPT 实现上下文对话，但是很废 Token。
