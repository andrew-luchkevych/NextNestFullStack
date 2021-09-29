import { Field } from "type-graphql";
import {
	Column,
} from "typeorm";
import { Constructor } from "../constructor";

export function EntityWithImage<TBase extends Constructor>(Base: TBase) {
	abstract class BaseImageEntity extends Base {
		@Column({ type: "varchar", length: 10485760, nullable: true })
		@Field()
		image: string;
	}
	return BaseImageEntity;
}

export default EntityWithImage;