import { Field } from "type-graphql";
import {
	Column,
	CreateDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	BeforeInsert,
	BeforeUpdate
} from "typeorm";
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	validateOrReject
} from "class-validator";
import { Constructor } from "../constructor";

export function EntityWithBase<TBase extends Constructor>(Base: TBase) {
	abstract class BaseEntity extends Base {
		@PrimaryGeneratedColumn("uuid")
		id: string;

		@Column({ nullable: false, type: "varchar", length: 100, default: "Name" })
		@Field()
		@IsNotEmpty()
		name: string;

		@CreateDateColumn({ nullable: false, type: "timestamp" })
		createdAt: number;

		@UpdateDateColumn({ type: "timestamp", nullable: true })
		updatedAt: number;

		@Column({ type: "varchar", length: 255, nullable: true })
		@Field()
		@IsOptional()
		@IsEmail()
		updatedBy: string;

		@Column({ type: "int", nullable: true })
		@Field()
		order: number;

		@BeforeInsert()
		@BeforeUpdate()
		validate = () => validateOrReject(this);
	}
	return BaseEntity;
}

export default EntityWithBase;