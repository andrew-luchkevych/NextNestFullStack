import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsEmail } from "class-validator"

@Entity()
class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ unique: true })
	@IsEmail()
	email: string;

	@Column()
	name: string;

	@Column()
	password: string;
}

export default User;