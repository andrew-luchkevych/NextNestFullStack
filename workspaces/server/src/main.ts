import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import { json } from "express";
import { NestFactory } from "@nestjs/core"
import { Logger, ValidationPipe } from "@nestjs/common"
import { ConfigService } from "./common/config/config.service"
import setupAdminPanel from "./admin/admin.plugin"
import { AppModule } from "./app.module"

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
		app.use(helmet());
		app.use(json());
		app.enableCors();

		await setupAdminPanel(app);
		await app.listen(port);
		Logger.log(`Server started on http://localhost:${port}/`, "Server")
	}
}

new App(new ConfigService(`.env.${process.env.NODE_ENV}`))