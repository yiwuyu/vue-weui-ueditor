export const ueConfig = {
	toolbars: [[]],
	initialFrameWidth: null,
	initialFrameHeight: 400
};

export const selectOptions = {
	// 段前后距
	rowspacing: [
		{label: '5', value: '5'},
		{label: '10', value: '10'},
		{label: '15', value: '15'},
		{label: '20', value: '20'},
		{label: '25', value: '25'}
	],
	lineheight: [
		{label: '1', value: '1'},
		{label: '1.5', value: '1.5'},
		{label: '1.75', value: '1.75'},
		{label: '2', value: '2'},
		{label: '3', value: '3'},
		{label: '4', value: '4'},
		{label: '5', value: '5'}
	],
	orderedlist: [
		{label: '1,2,3...', value: 'decimal'},
		{label: 'a,b,c...', value: 'lower-alpha'},
		{label: 'i,ii,iii...', value: 'lower-roman'},
		{label: 'A,B,C...', value: 'upper-alpha'},
		{label: 'Ⅰ,Ⅱ,Ⅲ...', value: 'upper-roman'}
		// 百度也没有
		// {label: '', value: 'cn'},
		// {label: '', value: 'cn1'},
		// {label: '', value: 'cn2'},
		// {label: '', value: 'num'},
		// {label: '', value: 'num1'},
		// {label: '', value: 'num2'}
	],
	unorderedlist: [
		{label: '○ 大圆圈', value: 'circle'},
		{label: '● 小圆点', value: 'disc'},
		{label: '■ 小方块', value: 'square'}
		// 百度也没有
		// {label: '小圆圈', value: 'dot'},
		// {label: '破折号', value: 'dash'}
	],
	fontsize: [
		{label: '10px', value: 10},
		{label: '11px', value: 11},
		{label: '12px', value: 12},
		{label: '14px', value: 14},
		{label: '16px', value: 16},
		{label: '18px', value: 18},
		{label: '20px', value: 20},
		{label: '24px', value: 24},
		{label: '36px', value: 36}
	]
};
