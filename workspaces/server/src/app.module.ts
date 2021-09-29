import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "./common/config/config.module";
import { ConfigService } from "./common/config/config.service";
import entities from "./entities";
import { ServeStaticModule } from "@nestjs/serve-static";
import AccessoriesModule from "./entities/Accessory/Accessory.module";
import { AuthenticationModule } from "./services/Authentication/Authentication.module";
import { UserModule } from "./entities/User/User.module";


const isDev = process.env.NODE_ENV === "development";

@Module({
	imports: [
		ServeStaticModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => [
				{
					rootPath: configService.get("UPLOAD_PATH"),
					serveRoot: "/public",
				},
				{
					rootPath: __dirname + "/../../client/dist",
					serveRoot: "/",
				}
			]
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				type: "postgres",
				host: configService.get("DB_HOST"),
				port: Number(configService.get("DB_PORT") || 5432),
				username: configService.get("DB_USER"),
				password: configService.get("DB_PASSWORD"),
				database: configService.get("DB_NAME"),
				synchronize: isDev,
				logging: isDev,
				dropSchema: false,
				entities: entities,
				migrations: [],
				subscribers: [],
			}),
		}),
		UserModule,
		AuthenticationModule,
		AccessoriesModule,
		GraphQLModule.forRoot({
			autoSchemaFile: "src/schema.gql",
			playground: isDev,
			debug: isDev,
			// context: ({ req }) => ({ req }),
		}),
	],
})
export class AppModule { }