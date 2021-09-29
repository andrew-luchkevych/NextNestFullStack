import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "src/common/config/config.service";
import { UserService } from "src/entities/User/User.service";
import TokenPayload from "../../Types/TokenPayload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => request?.cookies?.Authentication || request?.header("Authentication") || "",
			]),
			secretOrKey: configService.get("JWT_SECRET"),
		});
	}

	async validate(payload: TokenPayload) {
		return this.userService.getById(payload.id);
	}
}