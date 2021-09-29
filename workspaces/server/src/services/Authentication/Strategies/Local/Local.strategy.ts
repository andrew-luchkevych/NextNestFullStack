import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import User from "src/entities/User/User.entity";
import { AuthenticationService } from "../../Authentication.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private authenticationService: AuthenticationService) {
		super({
			usernameField: "email"
		});
	}
	async validate(email: string, password: string): Promise<User> {
		return this.authenticationService.getAuthenticatedUser(email, password);
	}
}