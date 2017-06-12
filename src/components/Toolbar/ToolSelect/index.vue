<template>
	<div :class="`toolitem_${content.name}${content.value?content.value:''}`" v-clickoutside="onListHide">
		<Tooltip
			:content="content.title"
			placement="top"
			class="weui_tooltip"
			:enterable="!1">
			<div class="weui_edui_button_group" @click="onListShow">
				<button class="weui_edui_button">
					<i class="weui_edui_icon"></i>
				</button>
				<button class="weui_edui_button weui_edui_select">
					<i class="triangle"></i>
				</button>
			</div>
		</Tooltip>
		<div class="weui_edui_toolselect_list" v-show="listvisible">
			<ul>
				<li v-for="item in valueList" @click="onSelect(item.value)">
					<i class="checked" v-if="item.value === value"></i>
					<span>{{item.label}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Tooltip from '../../Tooltip';
	import clickoutside from '../../../utils/clickoutside';
	export default {
		name: 'weui-editor-toolselect-component',
		props: {
			content: Object,
			defaultValue: String,
			valueList: {
				type: Array,
				default() {
					return [];
				}
			},
			listVisible: Boolean
		},
		directives: {clickoutside},
		components: {Tooltip},
		data() {
			return {
				value: this.defaultValue,
				listvisible: !1
			};
		},
		methods: {
			init() {
				// console.info(`<${this.content.prefix ? this.content.prefix : ''}${this.content.name}${this.content.value ? this.content.value : ''}-toolselect-component> inited`);
			},
			onListShow() {
				this.listvisible = !0;
			},
			onListHide() {
				this.listvisible = !1;
			},
			onSelect(item) {
				this.value = item;
				this.$emit('on-toolselect-click', `${this.content.prefix ? this.content.prefix : ''}${this.content.name}`, item, this.content.value);
				this.onListHide();
			}
		},
		watch: {
			defaultValue(val) {
				this.value = val;
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
