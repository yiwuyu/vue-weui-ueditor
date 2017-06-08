<template>
	<div :class="`toolitem_${content.name}${content.value? content.value : ''}`">
		<Tooltip :content="content.title" placement="top" class="weui_tooltip" :class="`${checked? 'checked' : ''}`" :enterable="!1">
			<button @click="onToolbuttonClick" :disabled="disabled" class="weui_edui_button">
				<i class="weui_edui_icon"></i>
			</button>
		</Tooltip>
	</div>
</template>
<script type="text/ecmascript-6">
	import Tooltip from '../../Tooltip';
	export default {
		name: 'weui-editor-toolbutton-component',
		components: {Tooltip},
		props: {
			content: Object,
			toolState: [Number, Boolean],
			toolValue: [Number, String, Boolean],
			imageFloatMask: Boolean
		},
		computed: {
			disabled() {
				return this.content.status.indexOf('disabled') > -1 && (this.imageFloatMask && this.content.name === 'imagefloat' || this.toolState < 0);
			},
			checked() {
				return this.content.status.indexOf('checked') > -1 && (this.toolValue && this.toolValue === this.content.value || this.toolState === 1);
			}
		},
		methods: {
			init() {
				// console.info(`<${this.content.prefix ? this.content.prefix : ''}${this.content.name}${this.content.value ? this.content.value : ''}-toolselect-component> inited`);
			},
			onToolbuttonClick() {
				this.$emit('on-toolbutton-click', this.content.name, this.content.value);
			}
		},
		mounted() {
			this.init();
		}
	};
</script>
