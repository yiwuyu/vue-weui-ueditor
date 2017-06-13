# vue-weui-ueditor

> A Wrapper of UEditor for vue 2.xwith mp.weixin weuiUI

<p align="center">
	<a href="https://github.com/yiwuyu/vue-weui-ueditor">
		<img src="https://img.shields.io/badge/build-passing-brightgreen.svg" alt="">
		<img src="https://img.shields.io/badge/npm-v0.2.0-blue.svg" alt="">
		<img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="">
	</a>
</p>

## Intro

Weui-ueditor is a simple and beautiful rich editor based on [ueditor](http://ueditor.baidu.com/website/), and with weui.

## Install

```
$ npm i vue-weui-ueditor --S
```
Or using cnpm

```
$ cnpm i vue-weui-ueditor --S
```

## Usage

```
<template>
	<div id="app">
		<weuiUEditor></weuiUEditor>
	</div>
</template>
<script>
	import weuiUEditor from 'vue-weui-ueditor';

	import 'vue-weui-ueditor/dist/vue-weui-ueditor.min.css';
	export default {
		name: 'app',
		components: {
			weuiUEditor
		}
	};
</script>

```

### Attributes
| param  | description | type | optional | default |
| ------ | ----------- | ---- | -------- | ------- |
| config | 见下表 | Object | null, object | {} |
| content | 父子间传递的编辑器内容 | string | - | '' |
| editorTopOffset | 滚动的时候编辑器的工具条浮层距离 | Number | - | 0 |
| on-editor-ready | 编辑器初始化回调 | Function | null | null |

### Method
| name | description | params |
| --- | --- | -- |
| setContent | 设置编辑器内容 | (String html)
| execCommand | 执行编辑器cmd，用于拓展 [UEditor API doc](http://ueditor.baidu.com/doc/) | (String cmdName, argv)
| getContent | 获取编辑内容. type['Content'(defalut), 'AllHtml', 'PlainTxt']，当默认值时，可以通过参数定义编辑器内置的判空规则 | (String type, Function fn) |

### Config
| key | description | type | optional | default |
| --- | ---- | -- | --- | --- |
| selectOptions | 下拉的选择按钮 | Object | {'rowspacing', 'lineheight', 'orderedlist', 'unorderedlist', 'fontsize'} | 见optional

待扩展




## License

This is available under [the MIT license](https://opensource.org/licenses/mit-license.php.
