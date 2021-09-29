import { Field } from "type-graphql";
import {
	Column,
} from "typeorm";
import {
	IsNotEmpty,
} from "class-validator";
import { Constructor } from "../constructor";

export function EntityWithName<TBase extends Constructor>(Base: TBase) {
	abstract class BaseNameEntity extends Base {
		@Column({ nullable: false, type: "varchar", length: 100, default: "Name" })
		@Field()
		@IsNotEmpty()
		name: string;
	}
	return BaseNameEntity;
}

export default EntityWithName;