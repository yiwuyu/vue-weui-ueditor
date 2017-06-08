// 判断参数是否是其中之一
export function oneOf (value, validList) {
	for (let val of validList) {
		if (val === value) {
			return true;
		}
	}
	return false;
};
