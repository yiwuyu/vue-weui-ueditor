<template>
	<div class="weui_toolbar_box">
		<div class="weui__box_wrap">
			<div class="weui__box_inner" v-clickoutside="onMaskShow">
				<div class="weui_toolbar" v-for="(toolbar, row) in toolbars">
					<div v-for="(item, col) in toolbar" class="toolitem">
						<ToolButton
							v-if="item.type === 'toolbtn'"
							:content="item"
							:imageFloatMask="imageFloatMask"
							class="toolitem toolbutton"
							:key="`${item.name}${item.value?item.value:''}`"
							:toolState="toolStates[item.name]"
							:toolValue="!toolStates[item.name] && toolValues[item.name]"
							@on-toolbutton-click="handleButtonClick"
						></ToolButton>
						<ToolColorPicker
							v-if="item.type === 'toolcolorpicker'"
							:content="item"
							:defaultValue="toolValues[`${item.name}`]"
							class="toolitem toolcolorpicker"
							:listVisible="listVisible"
							@on-toolpicker-click="handleButtonClick"
						></ToolColorPicker>
						<ToolSelect
							v-if="item.type === 'toolselect'"
							:content="item"
							:defaultValue="toolValues[`${item.prefix ? item.prefix : ''}${item.name}${item.value ? item.value : ''}`]"
							:valueList="selectOptions[item.name]"
							class="toolitem toolselect"
							:listVisible="listVisible"
							:key="`${item.name}${item.value?item.value:''}`"
							@on-toolselect-click="handleButtonClick"
						></ToolSelect>
						<ToolInput
							v-if="item.type === 'toolinput'"
							:content="item"
							:defaultValue="toolValues[`${item.name}`]"
							:valueList="selectOptions[item.name]"
							class="toolitem toolinput"
							:listVisible="listVisible"
							:key="item.name"
							@on-toolinput-click="handleButtonClick"
						></ToolInput>
						<span class="toolseparator" v-if="item.type === 'separator'" :key="row + '|' + col"></span>
					</div>
				</div>
			</div>
			<div class="weui__box_shadow" v-show="maskVisible"></div>
		</div>
	</div>	
</template>
<script type="text/ecmascript-6">
	import clickoutside from '@/utils/clickoutside';
	import ToolInput from './ToolInput';
	import ToolButton from './ToolButton';
	import ToolSelect from './ToolSelect';
	import ToolColorPicker from './ToolColorPicker';
	export default {
		name: 'toolbar-component',
		components: {ToolInput, ToolButton, ToolSelect, ToolColorPicker},
		directives: {clickoutside},
		props: {
			maskVisible: Boolean,
			listVisible: Boolean,
			imageFloatMask: Boolean,
			toolStates: Object,
			toolValues: Object,
			selectOptions: Object
		},
		data() {
			return {
				toolbars: [
					[
						{
							name: 'undo',
							title: '撤销',
							type: 'toolbtn',
							status: 'disabled'
						}, {
							name: 'redo',
							title: '重做',
							type: 'toolbtn',
							status: 'disabled'
						}, {
							type: 'separator'
						}, {
							name: 'fontsize',
							title: '字号',
							type: 'toolinput'
						}, {
							name: 'blockquote',
							title: '引用',
							type: 'toolbtn',
							status: 'checked'
						}, {
							name: 'horizontal',
							title: '分割线',
							type: 'toolbtn',
							status: ''
						}, {
							name: 'removeformat',
							title: '清除格式',
							type: 'toolbtn',
							status: ''
						}, {
							name: 'formatmatch',
							title: '格式刷',
							type: 'toolbtn',
							status: ''
						}
					], [
						{
							name: 'bold',
							title: '加粗',
							type: 'toolbtn',
							status: 'checked'
						}, {
							name: 'italic',
							title: '斜体',
							type: 'toolbtn',
							status: 'checked'
						}, {
							name: 'underline',
							title: '下划线',
							type: 'toolbtn',
							status: ''
						}, {
							name: 'forecolor',
							title: '字体颜色',
							type: 'toolcolorpicker'
						}, {
							name: 'backcolor',
							title: '背景色',
							type: 'toolcolorpicker'
						}, {
							type: 'separator'
						}, {
							name: 'indent',
							title: '首行缩进',
							type: 'toolbtn',
							status: 'checked'
						}, {
							type: 'separator'
						}, {
							name: 'justify',
							title: '居左对齐',
							type: 'toolbtn',
							value: 'left',
							status: 'checked'
						}, {
							name: 'justify',
							title: '居中对齐',
							type: 'toolbtn',
							value: 'center',
							status: 'checked'
						}, {
							name: 'justify',
							title: '居右对齐',
							type: 'toolbtn',
							value: 'right',
							status: 'checked'
						}, {
							name: 'justify',
							title: '两端对齐',
							type: 'toolbtn',
							value: 'justify',
							status: 'checked'
						}, {
							type: 'separator'
						}, {
							name: 'rowspacing',
							title: '段前距',
							type: 'toolselect',
							value: 'top'
						}, {
							name: 'rowspacing',
							title: '段后距',
							type: 'toolselect',
							value: 'bottom'
						}, {
							name: 'lineheight',
							title: '行间距',
							type: 'toolselect'
						}, {
							type: 'separator'
						}, {
							name: 'orderedlist',
							title: '有序列表',
							type: 'toolselect',
							prefix: 'insert'
						}, {
							name: 'unorderedlist',
							title: '无序列表',
							type: 'toolselect',
							prefix: 'insert'
						}, {
							type: 'separator'
						}, {
							name: 'imagefloat',
							title: '默认',
							type: 'toolbtn',
							value: 'none',
							status: 'checked disabled'
						}, {
							name: 'imagefloat',
							title: '左浮动',
							type: 'toolbtn',
							value: 'left',
							status: 'checked disabled'
						}, {
							name: 'imagefloat',
							title: '右浮动',
							type: 'toolbtn',
							value: 'right',
							status: 'checked disabled'
						}, {
							name: 'imagefloat',
							title: '居中',
							type: 'toolbtn',
							value: 'center',
							status: 'checked disabled'
						}, {
							name: 'insertImage',
							title: '图片',
							type: 'extra-button'
						}
					]
				]
			};
		},
		methods: {
			init() {
				// console.info('<weui-toolbar-component> inited');
			},
			onMaskShow() {
				this.$emit('on-maskvisible-change', !0);
			},
			handleButtonClick(name, value, dir) {
				this.$emit('on-editor-execCommand', name, value, dir);
			}
		},
		mounted() {
			this.init();
		}
	};
</script>
