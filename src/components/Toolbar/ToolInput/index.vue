<template>
	<div :class="'toolitem_' + content.name" v-clickoutside="onListHide">
		<Tooltip
			:content="content.title"
			placement="top"
			class="weui_tooltip"
			:enterable="!1"
		>
			<div class="weui_edui_button_group" @click="onListShow">
				<input type="text" class="weui_edui_input" v-model="value" @blur="checkInput" @keyup.enter="blur">
				<button class="weui_edui_button weui_edui_select" @click="onListShow">
					<i class="triangle"></i>
				</button>
			</div>
		</Tooltip>
		<div class="weui_edui_toolselect_list" v-show="listvisible">
			<ul>
				<li v-for="item in valueList" @click="onSelect(item.value)">
					<i class="checked" v-if="item.value === value"></i>
					<span :style="{fontSize: item.label}">{{item.label}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Tooltip from '../../Tooltip';
	import clickoutside from '../../../utils/clickoutside';
	export default {
		name: 'weui-editor-toolinput-component',
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
				// console.info(`<${this.content.name}-toolinput-component> inited`);
			},
			onListShow() {
				this.listvisible = !0;
			},
			onListHide() {
				this.listvisible = !1;
			},
			onSelect(item) {
				this.value = item + 'px';
				this.$emit('on-toolinput-click', this.content.name, this.value);
				this.onListHide();
			},
			checkInput() {
				this.value = this.value.match(/\d+/g)[0] + 'px';
				this.$emit('on-toolinput-click', this.content.name, this.value);
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
