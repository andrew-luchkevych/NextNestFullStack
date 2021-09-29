import * as cookieParser from "cookie-parser";
import { Logger, ValidationPipe } from "@nestjs/common"
import { NestFactory } from "@nestjs/core"
import setupAdminPanel from "./admin/admin.plugin"
import { AppModule } from "./app.module"
import { ConfigService } from "./common/config/config.service"
import { Request, Response, NextFunction, json } from "express";

class App {
	constructor(private readonly configService: ConfigService) {
		this.run()
	}

	async run(): Promise<void> {
		const port = this.configService.get("PORT") || 3000;
		const app = await NestFactory.create(AppModule);
		app.use(cookieParser());
		app.useGlobalPipes(
			new ValidationPipe({
				skipMissingProperties: true,
			}),
		);
		app.use(json());

		app.use(function (req: Request, res: Response, next: NextFunction) {

			// Website you wish to allow to connect
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000");

			res.setHeader("Vary", "Origin");

			// Request methods you wish to allow
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

			// Request headers you wish to allow
			res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

			next();
		});

		await setupAdminPanel(app);
		await app.listen(port);
		Logger.log(`Server started on http://localhost:${port}/`, "Server")
	}
}

new App(new ConfigService(`.env.${process.env.NODE_ENV}`))