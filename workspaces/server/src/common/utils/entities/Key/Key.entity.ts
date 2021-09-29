import { Field } from "type-graphql";
import {
	Column,
} from "typeorm";
import { Constructor } from "../constructor";

export function EntityWithKey<TBase extends Constructor>(Base: TBase) {
	abstract class BaseKeyEntity extends Base {
		@Column({ type: "varchar", length: "1000", nullable: false, unique: true })
		@Field()
		key: string;
	}
	return BaseKeyEntity;
}

export default EntityWithKey;