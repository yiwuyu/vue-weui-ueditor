<template>
	<div :class="`toolitem_${content.name}`" v-clickoutside="onListHide">
		<Tooltip
			class="weui_tooltip"
			:content="content.title"
			placement="top"
			:enterable="false"
		>
			<div class="weui_edui_button_group" @click="onListShow">
				<button class="weui_edui_button">
					<i class="weui_edui_icon"></i>
					<i class="colorbar" :style="{backgroundColor: defaultValue}"></i>
				</button>
				<button class="weui_edui_button weui_edui_select">
					<i class="triangle"></i>
				</button>
			</div>
		</Tooltip>
		<div class="weui_edui_toolpicker_panel" v-show="listvisible">
			<div class="recent_color color_box">
				<p class="title">最近使用颜色</p>
				<button class="clear" title="清除颜色" @click="removeColor"></button><button v-for="item in recentColorList" :style="{backgroundColor: item}" :title="'#'+item" @click="onSelect(item)"></button>
			</div>
			<div class="basic_color color_box">
				<p class="title">基本色</p>
				<button v-for="item in baseColorList" :style="{backgroundColor: item}" :title="item" @click="onSelect(item)"></button>
			</div>
			<div class="input_color">
				<button class="preview" :style="{backgroundColor: value}" @click="onSelect('#'+value)"></button><div class="input_wrap"><input type="text" v-model="value"></div><button class="js_ok" @click="onSelect(value)">确认</button>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Tooltip from '../../Tooltip';
	import clickoutside from '../../../utils/clickoutside';
	export default {
		name: 'weui-editor-toolcolorpicker-component',
		props: {
			content: Object,
			defaultValue: String,
			listVisible: Boolean
		},
		directives: {clickoutside},
		components: {Tooltip},
		data() {
			return {
				value: this.defaultValue || '#FFFFFF',
				listvisible: !1,
				baseColorList: [
					'#ffffff', '#ffd7d5', '#ffdaa9', '#fffed5', '#d4fa00', '#73fcd6', '#a5c8ff', '#ffacd5', '#ff7faa', '#d6d6d6', '#ffacaa', '#ffb995', '#fffb00', '#73fa79', '#00fcff', '#78acfe', '#d84fa9', '#ff4f79', '#b2b2b2', '#d7aba9', '#ff6827', '#ffda51', '#00d100', '#00d5ff', '#0080ff', '#ac39ff', '#ff2941', '#888888', '#7a4442', '#ff4c00', '#ffa900', '#3da742', '#3daad6', '#0052ff', '#7a4fd6', '#d92142', '#000000', '#7b0c00', '#ff4c41', '#d6a841', '#407600', '#007aaa', '#021eaa', '#797baa', '#ab1942'
				]
			};
		},
		computed: {
			recentColorList() {
				let list = window.localStorage.recentColorList;
				if (list) {
					list = JSON.parse(list);
				} else {
					list = [];
				}
				return list;
			}
		},
		methods: {
			init() {
				// console.info(`<${this.content.name}-toolcolorpicker-component> inited`);
			},
			onListShow() {
				this.listvisible = !0;
			},
			onListHide() {
				this.listvisible = !1;
			},
			removeColor() {
				const type = this.content.name === 'backcolor' ? 'background-color' : 'color';
				this.$emit('on-toolpicker-click', 'removeformat', '', type);
				this.value = '#FFFFFF';
				this.onListHide();
			},
			/**
			 * 选取颜色
			 * @param     {String} item 选取的色值
			 * @param     {String} 目前只有removeFormat
			 * @createdAt 2017-05-16T16:25:21+0800
			 * @author yiwuyu
			 */
			onSelect(item) {
				this.value = item;
				this.$emit('on-toolpicker-click', this.content.name, item);
				this.onListHide();
				this.storeRecentColor(item);
			},
			storeRecentColor(item) {
				let list = this.recentColorList;
				let len = list.unshift(item);
				for (let i = 1; i < len; i++) {
					if (list[i] === item) {
						list.splice(i, 1);
						len--;
						break;
					}
				}
				if (len > 8) {
					list.length = 9;
				}
				window.localStorage.recentColorList = JSON.stringify(list);
			}
		},
		watch: {
			defaultValue(val) {
				this.value = val || '#FFFFFF';
			},
			listVisible(val) {
				if (!val) {
					this.listvisible = !1;
				}
			}
		},
		mounted() {
			this.init();
		}
	};
</script>

