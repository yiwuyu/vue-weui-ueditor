<template>
	<!-- weui编辑器 -->
	<div class="weui_editor">
		<!-- weui-UI -->
		<div class="weui_edui_wrap">
			<!-- weui工具栏 -->
			<div class="weui_editor_hd">
				<div class="weui_editor_toolbar_box_wrap" ref="toolbar">
					<weuiToolbar
						:toolStates="toolStates"
						:toolValues="toolValues"
						:imageFloatMask="imageMaskVisible"
						:selectOptions="selectOptions"
						:listVisible="listVisible"
						:maskVisible="toolbarMaskVisible"
						@on-editor-execCommand="onExecCommand"
						@on-maskvisible-change="onMaskVisibleChange"
					>
					</weuiToolbar>
				</div>
			</div>
			<div class="weui_editor_bd">
				<slot class="weui_editor_extra" name="header"></slot>
				<div class="weui_editor_body">
					<div ref="editor"></div>
				</div>
				<slot class="weui_editor_extra" name="footer"></slot>
			</div>
			<div class="weui_editor_ft"></div>
		</div>
		<slot class="weui_editor_loading" name="loading"></slot>
	</div>
</template>
<script type="text/ecmascript-6">
	import weuiToolbar from '../Toolbar';
	import './editor.stylus';
	import {selectOptions, ueConfig} from '../../config/config';
	import '../../config/ueditor.config';
	import '../../static/ueditor.all.min';
	import '../../static/lang/zh-cn/zh-cn';
	export default {
		name: 'weui-editor-component',
		components: {weuiToolbar},
		props: {
			content: {
				type: String,
				default: ''
			},
			config: {
				type: Object,
				default() {
					return {};
				}
			},
			editorTopOffset: {
				type: Number,
				default: 0
			}
		},
		computed: {
			selectOptions() {
				return Object.assign({}, selectOptions, this.config.selectOptions);
			}
		},
		data() {
			return {
				// 编辑器id
				id: 'weui_edui_' + Math.random(10),
				UE: window.UE || null,
				editor: null,
				_content: '',
				// 工具条状态和数据
				toolStates: {
					// 是否可操作 -1:不可用 0:可用 1:已操作
					undo: -1,
					redo: -1,
					blockquote: 0,
					horizontal: 0,
					removeformat: 0,
					formatmatch: 0,
					bold: 0,
					italic: 0,
					underline: 0,
					indent: 0
				},
				// 子组件的值，必须确保在此注册才能监听动态数据双向绑定
				toolValues: {
					fontsize: '16px',
					forecolor: '',
					backcolor: '',
					justify: '',
					imagefloat: '',
					lineheight: '',
					rowspacingtop: '',
					rowspacingbottom: '',
					insertorderedlist: '',
					insertunorderedlist: ''
				},
				listVisible: !0,
				toolbarMaskVisible: !0,
				imageMaskVisible: !1
			};
		},
		methods: {
			init() {
				console.info('<editor-component> inited');
				this.onSetContent();
			},
			onSetContent() {
				setTimeout(() => {
					this.editor.setContent(this.content || this._content || '');
					this.$emit('on-editor-ready');
				}, 800);
			},
			onExecCommand(name, value, dir) {
				this.editor.execCommand(name, value, dir);
			},
			onScroll() {
				const H = document.body.scrollTop;
				const toolbarboxWrapCss = getComputedStyle(this.toolbar.parentNode, false);
				const toolbarCss = getComputedStyle(this.toolbar, false);
				try {
					if (H > this.editorTopOffset) {
						this.toolbar.style.cssText = `top:${this.editorTopOffset}px;position:fixed;width:${toolbarboxWrapCss.width}`;
						this.toolbar.parentNode.style.cssText = `height:${toolbarCss.height}`;
					} else {
						this.toolbar.style.cssText = this.toolbar.parentNode.style.cssText = '';
					}
				} catch (e) {
					console.warn(e);
				}
			},
			getContent(txt) {
				txt = txt || 'getContent';
				return this.editor[txt]();
			},
			/**
			 * 监听ueditor 编辑器内容更改，返回给editor-component
			 * @createdAt 2017-05-15T10:19:22+0800
			 * @author yiwuyu
			 */
			onContentChange() {
				this.editor.addListener('contentChange', function() {
					this._content = this.editor.getContent();
				}.bind(this));
			},
			/**
			 * 监听编辑器光标选取改变，触发对toolbars的遮罩和状态option切换
			 * @createdAt 2017-05-15T10:20:24+0800
			 * @author yiwuyu
			 */
			onSelectionChange() {
				this.editor.addListener('selectionchange', function() {
					const statelist = Object.keys(this.toolStates);
					const valuelist = Object.keys(this.toolValues);

					for (let item of statelist) {
						this.toolStates[item] = this.editor.queryCommandState(item);
					}
					for (let item of valuelist) {
						if (item.indexOf('rowspacing') > -1) {
							// rowspacing的值比较特别
							this.toolValues[item] = this.editor.queryCommandValue('rowspacing', item.replace('rowspacing', ''));
						} else {
							this.toolValues[item] = this.editor.queryCommandValue(item) + '';
						}
					}
					// 图片浮动
					const dom = this.editor.selection.getRange().getClosedNode();
					if (dom && dom.tagName === 'IMG') {
						this.imageMaskVisible = !1;
					} else {
						this.imageMaskVisible = !0;
					}
				}.bind(this));
			},
			bindScrollEvent() {
				if (window.addEventListener) {
					window.addEventListener('scroll', this.onScroll, false);
				} else if (window.attachEvent) {
					window.attachEvent('scroll', this.onScroll);
				} else {
					window['onscroll'] = this.onScroll;
				}
			},
			onFocus() {
				this.editor.addListener('focus', function() {
					this.toolbarMaskVisible = !1;
					this.listVisible = !1;
				}.bind(this));
				this.editor.addListener('blur', function() {
					this.listVisible = !0;
				}.bind(this));
			},
			onMaskVisibleChange(val) {
				this.toolbarMaskVisible = !0;
			}
		},
		mounted() {
			this.toolbar = this.$refs.toolbar;
			this.$nextTick(() => {
				this.$refs.editor.id = this.id;
				this.editor = this.UE.getEditor(this.id, ueConfig);
				this.editor.ready(() => {
					this.init();
					this.onContentChange();
					this.onSelectionChange();
					this.onFocus();
					this.bindScrollEvent();
				});
			});
		}
	};
</script>
