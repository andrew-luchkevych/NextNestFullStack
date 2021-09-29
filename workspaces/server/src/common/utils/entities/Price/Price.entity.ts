import { Field } from "type-graphql";
import { Column } from "typeorm";
import { Constructor } from "../constructor";
import { IsFloat, MaxFloat, MaxFloatScale, MinFloat } from "../../validators/floatValidators";

export function EntityWithPrice<TBase extends Constructor>(Base: TBase) {
	abstract class BasePriceEntity extends Base {
		@Column({ nullable: false, type: "numeric", scale: 2 })
		@Field()
		@MaxFloat(1000000)
		@MinFloat(0)
		@MaxFloatScale(2)
		@IsFloat()
		price: number;
	}
	return BasePriceEntity;
}

export default EntityWithPrice;