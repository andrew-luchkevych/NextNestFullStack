import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { ConfigService } from "src/common/config/config.service";
import PostgresErrorCodes from "src/common/utils/pgErrorCodes";
import CreateUserDto from "src/entities/User/dto/create.dto";
import User from "src/entities/User/User.entity";
import { UserService } from "src/entities/User/User.service";
import TokenPayload from "./Types/TokenPayload.interface";

@Injectable()
export class AuthenticationService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
	) { }

	public async register(registrationData: CreateUserDto) {
		const hashedPassword = await bcrypt.hash(registrationData.password, 10);
		try {
			const createdUser = await this.userService.create({
				...registrationData,
				password: hashedPassword
			});
			createdUser.password = undefined;
			return createdUser;
		} catch (error) {
			if (error?.code === PostgresErrorCodes.UNIQUE_VIOLATION) {
				throw new HttpException('User with that email already exists', HttpStatus.BAD_REQUEST);
			}
			throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public async getAuthenticatedUser(email: string, plainTextPassword: string) {
		try {
			const user = await this.userService.getByEmail(email);
			await this.verifyPassword(plainTextPassword, user.password);
			user.password = undefined;
			return user;
		} catch (error) {
			console.log(error);
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}

	public getAuthData(user: User) {
		const { id, email, name } = user;
		const payload: TokenPayload = { id, email, name };
		const token = this.jwtService.sign(payload);
		const expTime = this.configService.get("JWT_EXPIRATION_TIME");
		return {
			token,
			expTime: this.configService.get("JWT_EXPIRATION_TIME"),
			cookie: `Authentication=${token}; HttpOnly; Path=/; MaxAge=${expTime}`,
		}
	}

	public getCookieForLogout() {
		return "Authentication=; HttpOnly; Path=/; Max-Age=0";
	}

	private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
		const isPasswordMatching = await bcrypt.compare(
			plainTextPassword,
			hashedPassword
		);
		if (!isPasswordMatching) {
			throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
		}
	}
}