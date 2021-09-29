export function applyInheritance(derivedCtor: any, constructors: any[]) {
	constructors.forEach((baseCtor) => {
		Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
			Object.defineProperty(
				derivedCtor.prototype,
				name,
				Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
				Object.create(null)
			);
		});
	});
}

export function getExtendedAbstractClass(classes: any[]) {
	if (!classes.length) {
		abstract class A { };
		return A as any;
	}
	const cloned = [...classes];
	const First = cloned.shift();
	if (cloned.length) {
		const A = getExtendedAbstractClass(cloned);
		return A;
	} else {
		abstract class A extends First { };
		return A as any;
	}
}

export default applyInheritance;