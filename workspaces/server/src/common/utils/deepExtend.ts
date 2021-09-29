export const deepExtend = function (init: any, ...args: any[]) {
	if (Array.isArray(init)) return undefined;
	if (!args) return undefined;
	if (typeof init !== "object") return undefined;

	const length = args.length;
	if (!length) return undefined;
	const res = {...init};
	args
		.filter(arg => arg)
		.forEach(arg => {
			const keys = Object.keys(arg);
			keys.forEach(key => {
				if (!res.hasOwnProperty(key)) {
					res[key] = arg[key];
				} else if (Array.isArray(arg[key])) {
					res[key] = [...res[key], ...arg[key]];
				} else if (typeof arg[key] === "object") {
					res[key] = deepExtend(res[key], arg[key]);
				} else {
					res[key] = arg[key];
				}
			})
		});
	return res;
};

export default deepExtend;