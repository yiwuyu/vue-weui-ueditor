<template>
	<div :class="[prefixCls]" @mouseenter="handleShowPopper()" @mouseleave="handleHidePopper()">
		<div class="toggle" :class="[prefixCls + '-rel']" ref="reference" @mouseenter="handleShowPopper('inner')" @mouseleave="handleHidePopper('inner')">
			<slot></slot>
		</div>
		<transition name="fade">
			<div :class="[prefixCls + '-popper']" ref="popper" v-show="!disabled && (visible || always)">
			<div :class="[prefixCls + '-content']">
				<div :class="[prefixCls + '-arrow']"></div>
				<div :class="[prefixCls + '-inner']">
				<slot name="content">{{ content }}</slot>
				</div>
			</div>
			</div>
		</transition>
	</div>
</template>
<script type="text/ecmascript-6">
	import './tooltip.css';
	import Popper from '../base/popper';
	import {oneOf} from '../../utils/assist';

  const prefixCls = 'weui-tooltip';

	export default {
		name: 'tooltip-component',
		mixins: [Popper],
		props: {
			placement: {
				validator (value) {
					return oneOf(value, ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']);
				},
				default: 'bottom'
			},
			content: {
				type: [String, Number],
				default: ''
			},
			delay: {
				type: Number,
				default: 0
			},
			disabled: {
				type: Boolean,
				default: false
			},
			controlled: {	// under this prop,Tooltip will not close when mouseleave
				type: Boolean,
				default: false
			},
			always: {
				type: Boolean,
				default: false
			},
			enterable: {
				type: Boolean,
				default: true
			}
		},
		data () {
			return {
				prefixCls: prefixCls
			};
		},
		methods: {
			handleShowPopper(inner) {
				if (this.enterable && inner || (!this.enterable && !inner)) {
					return;
				}
				this.timeout = setTimeout(() => {
					this.visible = true;
				}, this.delay);
			},
			handleHidePopper(inner) {
				if (this.enterable && inner || (!this.enterable && !inner)) {
					return;
				}
				clearTimeout(this.timeout);
				if (!this.controlled) {
					this.visible = false;
				}
			}
		}
	};
</script>
