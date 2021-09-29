import { buildMessage, ValidateBy, ValidationOptions } from "class-validator";

export const IsFloat = (validationOptions?: ValidationOptions) => ValidateBy({
	name: "isFloat",
	validator: {
		validate: (value: any) => {
			let v: number = null;
			try {
				v = parseFloat(value);
			} catch (e) {
				return false;
			}
			if (v === null) return false;
			if (isNaN(v)) return false;
			return true;
		},
		defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must be a correct value', validationOptions),
	}
}, validationOptions)
export const MaxFloat = (maxValue: number, validationOptions?: ValidationOptions) => ValidateBy({
	name: "maxFloat",
	constraints: [maxValue],
	validator: {
		validate: (value, args) => Number(value) <= args.constraints[0],
		defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must not be greater than $constraint1', validationOptions),
	},
}, validationOptions);

export const MinFloat = (minValue: number, validationOptions?: ValidationOptions) => ValidateBy({
	name: "minFloat",
	constraints: [minValue],
	validator: {
		validate: (value, args) => Number(value) >= args.constraints[0],
		defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must not be less than $constraint1', validationOptions),
	},
}, validationOptions);

export const MaxFloatScale = (scale: number, validationOptions?: ValidationOptions) => ValidateBy({
	name: "maxFloatScale",
	constraints: [scale],
	validator: {
		validate: (value, args) => (Number(value).toString().split(".")?.[1]?.length || 0) <= args.constraints[0],
		defaultMessage: buildMessage(eachPrefix => eachPrefix + '$property must not contains more that $constraint1 decimals', validationOptions),
	}
}, validationOptions);