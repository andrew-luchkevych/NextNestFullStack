import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, HttpStatus } from "@nestjs/common";
import CreateUserDto from "src/entities/User/dto/create.dto";
import { AuthenticationService } from "./Authentication.service";
import RequestWithUser from "./Types/RequestWithUser.interface";
import { Response } from "express";
import JwtAuthenticationGuard from "./Strategies/Jwt/Jwt.guard";

@Controller("authentication")
export class AuthenticationController {
	constructor(
		private readonly authenticationService: AuthenticationService
	) { }

	@Post("register")
	async register(@Body() registrationData: CreateUserDto) {
		return this.authenticationService.register(registrationData);
	}

	@HttpCode(200)
	@Post("login")
	async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
		const { email, password } = request.body;
		console.log({ email, password });
		const user = await this.authenticationService.getAuthenticatedUser(email, password);
		const { token, expTime, cookie } = this.authenticationService.getAuthData(user);
		response.setHeader("Set-Cookie", cookie);
		user.password = undefined;
		const resp = {
			user,
			token,
			expTime,
		}
		return response.send(resp);
	}

	@UseGuards(JwtAuthenticationGuard)
	@Post("logout")
	async logOut(@Req() _: RequestWithUser, @Res() response: Response) {
		response.setHeader("Set-Cookie", this.authenticationService.getCookieForLogout());
		return response.sendStatus(HttpStatus.OK);
	}

}